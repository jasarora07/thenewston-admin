'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/auth/gate?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/calculate-financials')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return redirect('/auth/gate?error=Could not initialize account')
  }

  // Redirect to a check-email page so users know to verify their inbox
  redirect('/auth/check-email')
}

// --- NEW CODE FOR FORGOT PASSWORD ---
export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // After clicking the email link, they go to the callback, 
    // then get pushed to the update-password page.
    redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
  })

  if (error) {
    return redirect('/auth/forgot-password?error=Could not send reset link')
  }

  return redirect('/auth/forgot-password?message=Check your email for the recovery link')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
