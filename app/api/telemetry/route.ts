import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize a direct, backend-safe connection using your public environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseBackend = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { calc_type, partner_domain, inputs, results } = body

    // Fast payload validation
    if (!calc_type || !inputs || !results) {
      return NextResponse.json({ error: "Missing required telemetry parameters" }, { status: 400 })
    }

    // Insert directly into the ledger table using our static backend instance
    const { error } = await supabaseBackend.from("calculation_history").insert({
      calc_type,
      partner_domain: partner_domain || "direct",
      inputs,
      results
    })

    if (error) {
      console.error("❌ [SUPABASE DATABASE REJECTION]:", error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Telemetry packet committed to ledger" })
  } catch (error: any) {
    console.error("▲ [TELEMETRY API CRITICAL EXCEPTION]:", error.message)
    return NextResponse.json({ error: "Internal telemetry logging failure" }, { status: 500 })
  }
}
