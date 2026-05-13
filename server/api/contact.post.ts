import { Resend } from 'resend'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const config = useRuntimeConfig()

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({

    from: 'onboarding@resend.dev',

    to: 'dmitry.zhigar@Gmail.com',

    subject: `New request from ${body.name}`,

    html: `
      <h1>New Contact Request</h1>

      <p><b>Name:</b> ${body.name}</p>

      <p><b>Email:</b> ${body.email}</p>

      <p><b>Message:</b> ${body.message}</p>
    `
  })

  return {
    success: true
  }

})