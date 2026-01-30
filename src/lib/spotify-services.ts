"use server";

import spotifyApi from "./spotify";

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
    console.error("Error obteniendo charts:", error);
    return null;
  }
}
