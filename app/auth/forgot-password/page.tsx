import { resetPassword } from "../actions"
import Link from "next/link"

export default function ForgotPasswordPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl">
        <h2 className="text-xl font-black text-white uppercase italic mb-2">Reset Security Key</h2>
        <p className="text-zinc-500 text-[10px] uppercase font-bold mb-6">Enter your email to receive a recovery link.</p>
        
        <form action={resetPassword} className="space-y-4">
          <input 
            name="email" type="email" required 
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary text-sm"
            placeholder="name@company.com"
          />
          <button className="w-full bg-white text-black font-black py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-primary transition-all">
            Send Reset Link
          </button>
        </form>

        {searchParams.error && <p className="text-red-500 text-[10px] mt-4 uppercase font-bold">{searchParams.error}</p>}
        {searchParams.message && <p className="text-primary text-[10px] mt-4 uppercase font-bold">{searchParams.message}</p>}
        
        <Link href="/auth/gate" className="block text-center mt-6 text-[10px] text-zinc-600 font-bold uppercase hover:text-white transition-colors">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
