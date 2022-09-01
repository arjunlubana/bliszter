const port = process.env.APP_PORT || 3000
const apiBasePath = '/api/auth/'

const websiteDomain =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL ||
    `http://localhost:${port}`

    console.log(websiteDomain)
const appInfo = {
  appName: 'Bliszter',
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
}

export { websiteDomain, appInfo }