import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEnquiryEmail({
  name, email, phone, company, division, product, message
}: {
  name: string, email: string, phone: string,
  company?: string, division: string, product: string, message: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.ENQUIRY_TO_EMAIL!,
    subject: `New Enquiry — ${division} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020b18;color:#e8f8ff;padding:32px;border-radius:8px;border:1px solid rgba(0,229,255,0.2)">
        <h2 style="color:#00e5ff;font-family:monospace;letter-spacing:2px">NEW ENQUIRY — DRON EDGE</h2>
        <hr style="border-color:rgba(0,229,255,0.2);margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#5a9ab5;width:140px">Name</td><td style="padding:8px 0;color:#e8f8ff"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Email</td><td style="padding:8px 0;color:#e8f8ff">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Phone</td><td style="padding:8px 0;color:#e8f8ff">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Company</td><td style="padding:8px 0;color:#e8f8ff">${company || 'Not provided'}</td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Division</td><td style="padding:8px 0;color:#00e5ff"><strong>${division}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Product</td><td style="padding:8px 0;color:#e8f8ff">${product}</td></tr>
        </table>
        <hr style="border-color:rgba(0,229,255,0.2);margin:16px 0"/>
        <p style="color:#5a9ab5;margin-bottom:8px">Message:</p>
        <p style="background:rgba(0,229,255,0.05);padding:16px;border-radius:4px;border-left:3px solid #00e5ff;color:#e8f8ff">${message}</p>
        <p style="color:rgba(90,154,181,0.5);font-size:12px;margin-top:24px">Dron Edge India Pvt. Ltd. · Noida, UP</p>
      </div>
    `
  })
}

export async function sendLeadEmail({
  name, email, phone, product
}: {
  name: string, email: string, phone: string, product: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.ENQUIRY_TO_EMAIL!,
    subject: `New Datasheet Lead — ${product} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020b18;color:#e8f8ff;padding:32px;border-radius:8px;border:1px solid rgba(0,229,255,0.2)">
        <h2 style="color:#00e5ff;font-family:monospace;letter-spacing:2px">NEW DATASHEET LEAD</h2>
        <hr style="border-color:rgba(0,229,255,0.2);margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#5a9ab5;width:140px">Name</td><td style="padding:8px 0;color:#e8f8ff"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Email</td><td style="padding:8px 0;color:#e8f8ff">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Phone</td><td style="padding:8px 0;color:#e8f8ff">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#5a9ab5">Product</td><td style="padding:8px 0;color:#00e5ff"><strong>${product}</strong></td></tr>
        </table>
        <p style="color:rgba(90,154,181,0.5);font-size:12px;margin-top:24px">Dron Edge India Pvt. Ltd. · Noida, UP</p>
      </div>
    `
  })
}
