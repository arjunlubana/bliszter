const apiBasePath = '/api/auth/'

export const websiteDomain = process.env.VERCEL_URL || window.location.origin

export const appInfo = {
  appName: 'Bliszter',
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
}
