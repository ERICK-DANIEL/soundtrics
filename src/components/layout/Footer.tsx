"use client";

import { useDictionary } from "@/context/DictionaryProvider";
import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  const { dict, lang } = useDictionary();

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
        <span>{dict.footer.tools.title}</span>
        <a href={`/${lang}/charts`}>{dict.footer.tools.myCharts}</a>
        <a href="/delete-duplicates">{dict.footer.tools.duplicateRemover}</a>
      </div>

      <div className={styles.links}>
        <span>{dict.footer.links.title}</span>
        <a href="">
          {dict.footer.links.twitter}
          <i className="bi bi-twitter-x"></i>
        </a>
        <a href="">
          {dict.footer.links.spotify}
          <i className="bi bi-spotify"></i>
        </a>
        <a href="">
          {dict.footer.links.github}
          <i className="bi bi-github"></i>
        </a>
      </div>

      <div className={styles.resources}>
        <span>{dict.footer.resources.title}</span>
        <a href={`/${lang}/contact`}>{dict.footer.resources.contact}</a>
        <a href={`/${lang}/privacy`}>{dict.footer.resources.privacy}</a>
        <a href={`/${lang}/terms`}>{dict.footer.resources.terms}</a>
      </div>

      <div className={styles.copyright}>
        <span>{dict.footer.copyright.text}</span>
        <br />
        <span className={styles.copyrightText}>
          {dict.footer.copyright.copyright} <br />
          {dict.footer.copyright.rights}
        </span>
      </div>
    </footer>
  );
}
