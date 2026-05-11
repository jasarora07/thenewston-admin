import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-10 rounded-2xl text-center shadow-2xl">
        <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-primary animate-bounce" />
        </div>
        
        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">
          Check Your <span className="text-primary">Inbox</span>
        </h2>
        
        <p className="text-zinc-400 text-sm uppercase font-bold leading-relaxed mb-8">
          We have sent a verification link to your email. 
          Please click it to activate your <span className="text-white">Intelligence ID</span> and access the terminal.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 border border-white/5 rounded-lg">
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
              Don't see it? Check your spam folder or wait 2 minutes.
            </p>
          </div>
          
          <Link 
            href="/auth/gate" 
            className="flex items-center justify-center gap-2 text-xs font-black text-zinc-400 hover:text-white transition-colors uppercase tracking-widest pt-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
