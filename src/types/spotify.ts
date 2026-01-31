export interface SpotifyImage {
  url: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyAlbum {
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
}

export interface SelectChartData {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
}
