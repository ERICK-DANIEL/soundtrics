"use server";

import spotifyApi from "@/lib/spotify";

export async function getUserRecentlyPlayed(accessToken: string) {
  try {
    spotifyApi.setAccessToken(accessToken);

    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 50,
    });

    return JSON.parse(JSON.stringify(recentlyPlayed.body.items));
  } catch (error) {
    console.error("Error in getUserRecentlyPlayed", error);
    return null;
  }
}
