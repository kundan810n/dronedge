import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendLeadEmail } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, product, product_id } = body

    if (!name || !email || !phone || !product) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // Save lead
    const { error } = await supabaseAdmin
      .from('leads')
      .insert([{ name, email, phone, product, product_id }])

    if (error) throw error

    // Send email notification
    await sendLeadEmail({ name, email, phone, product })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
