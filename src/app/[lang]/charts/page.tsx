"use client";

import { useSession } from "next-auth/react";
import { useDictionary } from "@/context/DictionaryProvider";
import { getUserChartsData } from "@/services/spotify-services";
import { SelectChartData } from "@/types/spotify";
import { useEffect, useState } from "react";
import { ChartCard } from "@/components/ChartCard";
import styles from "@/app/[lang]/charts/page.module.css";
import Image from "next/image";
import Link from "next/dist/client/link";

export default function ChartsPage() {
  const { lang } = useDictionary();
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
      <h1 className={styles.title}>Select your chart</h1>

      <div className={styles.cardsContainer}>
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

        <div className={styles.card}>
          <Link href={`/${lang}/charts/recently-played`}>
            <div className={styles.contentCard}>
              <h4 className={styles.titleCard}>Recently played songs</h4>
            </div>
            <div className={styles.imageWrapperCard}>
              <Image
                src={"/recently-played.png"}
                alt={"recently played songs"}
                fill
                priority
                className={styles.bgImageCard}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
