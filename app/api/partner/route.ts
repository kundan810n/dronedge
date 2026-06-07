import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, phone, email, tier, tierName, eligible, eligibilityData, formData } = body

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Save to Supabase
    await sb.from('partner_leads').insert([{
      name, company, phone, email, tier, tier_name: tierName,
      eligible, eligibility_data: eligibilityData,
      form_data: formData || null,
      created_at: new Date().toISOString()
    }])

    // Send email to Dron Edge
    const eligibleText = eligible ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'
    const subject = `${eligibleText} — Partner Application: ${name} (${tierName})`

    await resend.emails.send({
      from: 'info@dronedge.in',
      to: 'info@dronedge.in',
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#020b18;padding:24px;text-align:center;">
            <h1 style="color:#00e5ff;font-size:20px;margin:0;">DRONEDGE</h1>
            <p style="color:#5a9ab5;font-size:12px;margin:4px 0 0;">Partner Application ${eligible ? '— ELIGIBLE ✅' : '— NOT ELIGIBLE ❌'}</p>
          </div>
          <div style="padding:24px;background:#f9f9f9;">
            <h2 style="color:#333;font-size:16px;margin:0 0 16px;">Applicant Details</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;color:#666;width:40%;">Name</td><td style="padding:8px;font-weight:bold;">${name}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Company</td><td style="padding:8px;font-weight:bold;">${company}</td></tr>
              <tr><td style="padding:8px;color:#666;">Mobile</td><td style="padding:8px;">${phone}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Email</td><td style="padding:8px;">${email}</td></tr>
              <tr><td style="padding:8px;color:#666;">Tier Applied</td><td style="padding:8px;color:#00e5ff;font-weight:bold;">${tierName}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Eligibility</td><td style="padding:8px;font-weight:bold;color:${eligible ? 'green' : 'red'};">${eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}</td></tr>
            </table>

            <h2 style="color:#333;font-size:16px;margin:20px 0 12px;">Eligibility Check Data</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;color:#666;">Firm Type</td><td style="padding:8px;">${eligibilityData?.firmType || '-'}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Experience</td><td style="padding:8px;">${eligibilityData?.expYears || '-'} years</td></tr>
              <tr><td style="padding:8px;color:#666;">Turnover</td><td style="padding:8px;">${eligibilityData?.turnover || '-'}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Team Size</td><td style="padding:8px;">${eligibilityData?.teamSize || '-'}</td></tr>
              <tr><td style="padding:8px;color:#666;">GST</td><td style="padding:8px;">${eligibilityData?.gst || '-'}</td></tr>
            </table>

            ${formData ? `
            <h2 style="color:#333;font-size:16px;margin:20px 0 12px;">Full Application</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;color:#666;">Designation</td><td style="padding:8px;">${formData.designation || '-'}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">GSTIN</td><td style="padding:8px;">${formData.gst || '-'}</td></tr>
              <tr><td style="padding:8px;color:#666;">City/State</td><td style="padding:8px;">${formData.city || '-'}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;color:#666;">Territory</td><td style="padding:8px;">${formData.territory || '-'}</td></tr>
              <tr><td style="padding:8px;color:#666;">Background</td><td style="padding:8px;">${formData.bio || '-'}</td></tr>
            </table>
            ` : ''}
          </div>
          <div style="background:#020b18;padding:16px;text-align:center;">
            <p style="color:#5a9ab5;font-size:11px;margin:0;">dronedge.in · Partner Portal</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Partner API error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
