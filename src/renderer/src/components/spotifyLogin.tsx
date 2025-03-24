import { useEffect, useState } from 'react'
import { loginWithSpotify } from '../services/spotifyAuth'
import { getAccessTokenFromUrl } from '../services/tokenHelper'
import { getSpotifyUserProfile } from '../services/spotifyUser'

export default function SpotifyLogin() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = getAccessTokenFromUrl()
    if (token) {
      getSpotifyUserProfile(token).then(setUser).catch(console.error)
    }
  }, [])

  return (
    <div>
      {user ? (
        <div>
          <h2>Bienvenido, {user.display_name}</h2>
          <p> {user.followers.total}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <button onClick={loginWithSpotify}>Iniciar sesión con Spotify</button>
      )}
    </div>
  )
}
