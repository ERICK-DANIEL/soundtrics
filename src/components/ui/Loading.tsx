"use client";

import styles from "@/components/ui/loading.module.css";

export default function Loading({ message = "" }: { message?: string }) {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderCircle}></div>
      <span className={styles.loaderMessage}>{message}</span>
    </div>
  );
}
