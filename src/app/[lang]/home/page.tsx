"use client";

import { useDictionary } from "@/context/DictionaryProvider";
import Image from "next/image";
import styles from "@/app/[lang]/home/page.module.css";
import Link from "next/dist/client/link";

export default function Home() {
  const { lang, dict } = useDictionary();
  return (
    <>
      <main className={styles.main}>
        <h1>
          {dict.title.welcome} <br className={styles.mobileBreak} />
          <span className={styles.spotify}>{dict.title.spotify}</span>{" "}
          {dict.title.statistics}
        </h1>
        <span className={styles.subtitle}>{dict.title.subtitle}</span>
      </main>
      <section className={styles.cardsSection}>
        <Link href={`/${lang}/charts`} className={styles.card}>
          <div>
            <h3>
              {dict.cards.charts.title}
              <i className="bi bi-arrow-right-circle-fill"></i>
            </h3>
            <p>{dict.cards.charts.description}</p>
          </div>
        </Link>
        <Link href={`/${lang}/tools`} className={styles.card}>
          <div>
            <h3>
              {dict.cards.tools.title}{" "}
              <i className="bi bi-arrow-right-circle-fill"></i>
            </h3>
            <p>{dict.cards.tools.description}</p>
          </div>
        </Link>
        <Link href={`/${lang}/games`} className={styles.card}>
          <div>
            <h3>
              {dict.cards.games.title}
              <i className="bi bi-arrow-right-circle-fill"></i>
            </h3>
            <p>{dict.cards.games.description}</p>
          </div>
        </Link>
      </section>
      <section className={styles.howItWorksSection}>
        <h2>{dict.howItWorks.title}</h2>
        <p className={styles.subtitle}>{dict.howItWorks.subtitle}</p>
        <div className={styles.stepsContainer}>
          <span className={styles.step}>
            <span className={styles.stepIcon}>
              <i className="bi bi-door-open-fill"></i>
            </span>
            <p className={styles.stepTitle}>{dict.howItWorks.step1.title}</p>
            <p className={styles.stepDescription}>
              {dict.howItWorks.step1.description}
            </p>
          </span>
          <span className={styles.step}>
            <span className={styles.stepIcon}>
              <i className="bi bi-bar-chart-fill"></i>
            </span>
            <p className={styles.stepTitle}>{dict.howItWorks.step2.title}</p>
            <p className={styles.stepDescription}>
              {dict.howItWorks.step2.description}
            </p>
          </span>
          <span className={styles.step}>
            <span className={styles.stepIcon}>
              <i className="bi bi-file-earmark-music-fill"></i>
            </span>
            <p className={styles.stepTitle}>{dict.howItWorks.step3.title}</p>
            <p className={styles.stepDescription}>
              {dict.howItWorks.step3.description}
            </p>
          </span>
        </div>
      </section>
    </>
  );
}
