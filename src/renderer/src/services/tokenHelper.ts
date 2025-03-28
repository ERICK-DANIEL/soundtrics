export function getAccessTokenFromUrl(): string | null {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  return params.get('access_token')
}
