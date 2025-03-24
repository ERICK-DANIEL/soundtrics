export async function getSpotifyUserProfile(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener datos del usuario')
  }

  return response.json()
}
