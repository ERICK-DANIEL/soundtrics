"use server";

import spotifyApi from "@/lib/spotify";

export async function getUserChartsData(accessToken: string) {
  try {
    spotifyApi.setAccessToken(accessToken);

    const [topTracks, topArtists] = await Promise.all([
      spotifyApi.getMyTopTracks({ limit: 1, time_range: "short_term" }),
      spotifyApi.getMyTopArtists({ limit: 1, time_range: "short_term" }),
    ]);

    return {
      topTracks: JSON.parse(JSON.stringify(topTracks.body.items)),
      topArtists: JSON.parse(JSON.stringify(topArtists.body.items)),
    };
  } catch (error) {
    console.error("Error in getUserChartsData", error);
    return null;
  }
}

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
