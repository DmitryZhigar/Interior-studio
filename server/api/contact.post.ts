import { Resend } from 'resend'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || (!email && !phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and contact details are required'
    })
  }

  const config = useRuntimeConfig()
  const resendApiKey = process.env.RESEND_API_KEY || config.resendApiKey

  if (!resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email provider is not configured'
    })
  }

  const resend = new Resend(resendApiKey)

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'dmitry.zhigar@Gmail.com',
    subject: `New request from ${name}`,
    html: `
      <h1>New Contact Request</h1>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      ${email ? `<p><b>Email:</b> ${escapeHtml(email)}</p>` : ''}
      ${phone ? `<p><b>Phone:</b> ${escapeHtml(phone)}</p>` : ''}
      ${message ? `<p><b>Message:</b> ${escapeHtml(message)}</p>` : ''}
    `
  })

  return {
    success: true
  }
})
