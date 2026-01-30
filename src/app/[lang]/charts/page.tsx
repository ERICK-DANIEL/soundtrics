"use client";

import { useSession } from "next-auth/react";
import { getUserChartsData } from "@/lib/spotify-services";
import { SelectChartData } from "@/types/spotify";
import { useEffect, useState } from "react";
import styles from "@/app/[lang]/charts/page.module.css";
import { ChartCard } from "@/components/ChartCard";

export default function ChartsPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<SelectChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.accessToken) {
      getUserChartsData(session.user.accessToken as string)
        .then((chartsData) => setData(chartsData))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (loading) return null;
  if (!data) return null;

  const topTrack = data.topTracks[0];
  const topArtist = data.topArtists[0];

  return (
    <div className={styles.container}>
      <h1>Select your chart</h1>

      <div className={styles.grid}>
        {topTrack && (
          <ChartCard
            title="Top Tracks"
            name={topTrack.name}
            imageUrl={topTrack.album.images[0]?.url}
            subtitle="#1 Last 4 Weeks"
          />
        )}

        {topArtist && (
          <ChartCard
            title="Top Artists"
            name={topArtist.name}
            imageUrl={topArtist.images[0]?.url}
            subtitle="#1 Last 4 Weeks"
          />
        )}
      </div>
    </div>
  );
}
