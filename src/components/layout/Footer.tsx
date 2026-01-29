"use client";

import { useDictionary } from "@/context/DictionaryProvider";
import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  const { lang } = useDictionary();

  return (
    <footer className={styles.footer}>
      <hr />

      <div className={styles.logo}>
        <Image
          src="/soundtrics.svg"
          alt="Soundtrics Logo"
          width={24}
          height={24}
        />
        <span>Soundtrics</span>
      </div>

      <div className={styles.tools}>
        <span>Tools</span>
        <a href={`/${lang}/charts`}>My charts</a>
        <a href="/delete-duplicates">Delete duplicates songs</a>
      </div>

      <div className={styles.links}>
        <span>Links</span>
        <a href="">
          Twitter
          <i className="bi bi-twitter-x"></i>
        </a>
        <a href="">
          Spotify Profile
          <i className="bi bi-spotify"></i>
        </a>
      </div>

      <div className={styles.resources}>
        <span>Resources</span>
        <a href={`/${lang}/contact`}>Contact</a>
        <a href={`/${lang}/privacy`}>Privacy Policy</a>
        <a href={`/${lang}/terms`}>Terms of Service</a>
      </div>

      <div className={styles.copyright}>
        <span>This app is not affiliated with or endorsed by Spotify</span>
        <br />
        <span className={styles.copyrightText}>
          ©2025 Soundtrics. <br />
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}
