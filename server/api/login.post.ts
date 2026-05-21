import { serialize } from 'cookie'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const adminLogin = process.env.ADMIN_LOGIN || config.adminLogin
  const adminPassword = process.env.ADMIN_PASSWORD || config.adminPassword
  const adminSessionSecret = process.env.ADMIN_SESSION_SECRET || config.adminSessionSecret

  if (!adminLogin || !adminPassword || !adminSessionSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin credentials are not configured'
    })
  }

  if (
    body.login !== adminLogin ||
    body.password !== adminPassword
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  setHeader(event, 'Set-Cookie', serialize(
    'admin-auth',
    adminSessionSecret,
    {
      httpOnly: false,
      path: '/',
      sameSite: 'strict',
      secure: false,
      maxAge: 60 * 60 * 24 * 7
    }
  ))

  return {
    success: true
  }
})
