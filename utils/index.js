export function createPageUrl(name) {
  const map = {
    verify: '/verify',
    dashboard: '/dashboard',
    trendingalerts: '/trending-alerts',
    history: '/history',
    userprofile: '/user-profile',
  }
  return map[String(name || '').toLowerCase()] || '/verify'
}
