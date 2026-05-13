import { serialize } from 'cookie'

export default defineEventHandler(async (event) => {

const body = await readBody(event)

const config = useRuntimeConfig()

if (
body.login !== config.adminLogin ||
body.password !== config.adminPassword
) {
throw createError({
statusCode: 401,
statusMessage: 'Invalid credentials'
})
}

setHeader(event, 'Set-Cookie', serialize(
'admin-auth',
config.adminSessionSecret,
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
