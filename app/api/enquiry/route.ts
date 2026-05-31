import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEnquiryEmail } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, division, product, message } = body

    if (!name || !email || !phone || !division || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // Save to Supabase
    const { error } = await supabaseAdmin
      .from('enquiries')
      .insert([{ name, email, phone, company, division, product, message }])

    if (error) throw error

    // Send email notification
    await sendEnquiryEmail({ name, email, phone, company, division, product, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Enquiry error:', err)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
