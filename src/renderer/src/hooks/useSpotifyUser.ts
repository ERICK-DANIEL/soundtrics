import { useState, useEffect } from 'react'
import { getSpotifyUserProfile } from '../services/spotifyUser'
import { getAccessTokenFromUrl } from '../services/tokenHelper'

export function useSpotifyUser() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = getAccessTokenFromUrl()
    if (token) {
      getSpotifyUserProfile(token).then(setUser).catch(console.error)
    }
  }, [])

  return user
}
