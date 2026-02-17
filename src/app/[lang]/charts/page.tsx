"use client";

import { useState } from "react";
import styles from "@/app/[lang]/charts/page.module.css";

type View = "tracks" | "artists" | "recent";

export default function MyCharts() {
  const [activeView, setActiveView] = useState<View>("tracks");

  const renderContent = () => {
    switch (activeView) {
      case "tracks":
        return <div>Lista de Top Tracks...</div>;
      case "artists":
        return <div>Lista de Top Artists...</div>;
      case "recent":
        return <div>Lista de Recently Played...</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1>My Charts</h1>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <span
              onClick={() => setActiveView("tracks")}
              className={
                activeView === "tracks" ? styles.tabActive : styles.tabInactive
              }
            >
              Top tracks
            </span>
            <span
              onClick={() => setActiveView("artists")}
              className={
                activeView === "artists" ? styles.tabActive : styles.tabInactive
              }
            >
              Top artists
            </span>
            <span
              onClick={() => setActiveView("recent")}
              className={
                activeView === "recent" ? styles.tabActive : styles.tabInactive
              }
            >
              Recently played
            </span>
          </div>
        </div>

        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
