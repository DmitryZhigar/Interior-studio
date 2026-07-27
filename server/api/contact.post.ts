import { Resend } from 'resend'

const defaultContactToEmail = 'sgrigorev353@gmail.com'

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
  const resendFromEmail =
    process.env.RESEND_FROM_EMAIL ||
    config.resendFromEmail ||
    'onboarding@resend.dev'
  const contactToEmail =
    process.env.CONTACT_TO_EMAIL ||
    config.contactToEmail ||
    defaultContactToEmail

  if (!resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email provider is not configured'
    })
  }

  const resend = new Resend(resendApiKey)

  const result = await resend.emails.send({
    from: resendFromEmail,
    to: contactToEmail,
    subject: `New request from ${name}`,
    replyTo: email || undefined,
    html: `
      <h1>New Contact Request</h1>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      ${email ? `<p><b>Email:</b> ${escapeHtml(email)}</p>` : ''}
      ${phone ? `<p><b>Phone:</b> ${escapeHtml(phone)}</p>` : ''}
      ${message ? `<p><b>Message:</b> ${escapeHtml(message)}</p>` : ''}
    `
  })

  if (result.error) {
    console.error('Failed to send contact email', result.error)

    throw createError({
      statusCode: result.error.statusCode || 502,
      statusMessage: result.error.message || 'Failed to send email'
    })
  }

  return {
    success: true,
    id: result.data?.id
  }
})
