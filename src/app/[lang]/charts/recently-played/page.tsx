"use client";

import { useEffect, useState } from "react";
import { RecentlyPlayedItem } from "@/types/spotify";
import { getUserRecentlyPlayed } from "@/services/spotify-services";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";
import styles from "@/app/[lang]/charts/recently-played/page.module.css";

export default function RecentlyPlayedPage() {
  const [data, setData] = useState<RecentlyPlayedItem[] | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    getUserRecentlyPlayed(session.user.accessToken as string)
      .then(setData)
      .catch((err) => {
        console.error("Failed to fetch tracks:", err);
        setData([]);
      });
  }, [session, status]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown time";

    const date = new Date(dateString);

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isSessionLoading = status === "loading";
  const isFetchingTracks = status === "authenticated" && data === null;
  const hasTracks = !!data && data.length > 0;
  const showNoTracks = status === "authenticated" && data && data.length === 0;

  if (status === "unauthenticated") {
    return <div>Please log in to see your history.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Recently Played</h1>

      <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {isSessionLoading ? null : isFetchingTracks ? (
            <tr>
              <td colSpan={3}>
                <Loading message="Cargando tu música..." />
              </td>
            </tr>
          ) : hasTracks ? (
            data.map((item, index) => (
              <tr key={`${item.played_at}-${index}`}>
                <td>{item.track.name}</td>
                <td>{item.track.artists.map((a) => a.name).join(", ")}</td>
                <td>{formatDate(item.played_at)}</td>
              </tr>
            ))
          ) : showNoTracks ? (
            <tr>
              <td colSpan={3}>No recent tracks found.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
