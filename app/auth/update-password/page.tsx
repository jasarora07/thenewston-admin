"use client"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // This updates the password for the currently logged-in user 
    // (the link in the email logs them in automatically)
    const { error } = await supabase.auth.updateUser({ password })
    
    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      router.push("/calculate-financials?message=Password updated successfully")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl text-center">
        <h2 className="text-xl font-black text-white uppercase italic mb-6">Set New Security Key</h2>
        <form onSubmit={handleUpdate} className="space-y-4 text-left">
          <input 
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary text-sm"
            placeholder="New Password (min 6 chars)"
          />
          <button 
            disabled={loading}
            className="w-full bg-primary text-black font-black py-3 rounded-lg uppercase tracking-widest text-xs"
          >
            {loading ? "Updating..." : "Update & Enter Terminal"}
          </button>
        </form>
      </div>
    </div>
  )
}
