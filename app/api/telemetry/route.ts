import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { calc_type, partner_domain, inputs, results } = body

    // Fallback/validation to catch empty transmissions
    if (!calc_type || !inputs || !results) {
      return NextResponse.json({ error: "Missing required telemetry parameters" }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Automatically capture authenticated session context if a user is logged in
    const { data: { user } } = await supabase.auth.getUser()

    // Append telemetry record cleanly into our flexible JSONB schema layout
    const { error } = await supabase.from("calculation_history").insert({
      user_id: user?.id || null,
      calc_type,
      partner_domain: partner_domain || "direct",
      inputs, // Maps perfectly regardless of variable structures
      results // Maps perfectly regardless of output metrics
    })

    if (error) throw error

    return NextResponse.json({ success: true, message: "Telemetry packet committed to ledger" })
  } catch (error: any) {
    console.error("▲ [TELEMETRY API CRITICAL EXCEPTION]:", error.message)
    return NextResponse.json({ error: "Internal telemetry logging failure" }, { status: 500 })
  }
}
