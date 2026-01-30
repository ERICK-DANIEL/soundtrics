"use client";

import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import styles from "@/components/chartcard.module.css";

const fac = new FastAverageColor();

export function ChartCard({
  title,
  name,
  imageUrl,
  subtitle,
}: {
  title: string;
  name: string;
  imageUrl: string;
  subtitle: string;
}) {
  const [bgColor, setBgColor] = useState("rgb(0, 0, 0)");

  useEffect(() => {
    if (imageUrl) {
      fac
        .getColorAsync(imageUrl, {
          algorithm: "simple",
          ignoredColor: [255, 255, 255, 255],
        })
        .then((color) => {
          setBgColor(color.rgba.replace("1)", "0.6)"));
        })
        .catch(() => {});
    }
  }, [imageUrl]);

  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.name}>{name}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority
          className={styles.bgImage}
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}
