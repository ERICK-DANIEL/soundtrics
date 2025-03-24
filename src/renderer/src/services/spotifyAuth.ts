const CLIENT_ID = 'f0d856fba4ac49a3bfe32c2dc5a4e372'
const REDIRECT_URI = 'http://localhost:5173/callback'
const SCOPES = 'user-read-private user-read-email'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`

export function loginWithSpotify() {
  window.location.href = AUTH_URL
}
