const port = process.env.APP_PORT || 3000

const apiBasePath = '/api/auth/'

export const websiteDomain = process.env.VERCEL_URL || window.location.origin
console.log(websiteDomain)

export const appInfo = {
  appName: 'Bliszter',
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
}
