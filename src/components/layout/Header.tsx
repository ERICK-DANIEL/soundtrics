"use client";

import { signIn, useSession } from "next-auth/react";
import { useDictionary } from "@/context/DictionaryProvider";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/layout/header.module.css";

export default function Header() {
  const { data: session, status } = useSession();
  const { dict, lang } = useDictionary();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={`/${lang}/`} className={styles.logo}>
          <Image
            src="/soundtrics.svg"
            alt="Soundtrics Logo"
            width={26}
            height={26}
          />
          Soundtrics
        </Link>

        <nav className={styles.nav}>
          <Link
            href={`/${lang}/home`}
            className={
              pathname === `/${lang}/home` ? styles.iconActive : styles.icon
            }
          >
            <i className={`bi bi-house-fill`}></i>
            <span>{dict.header.home}</span>
          </Link>
          <Link
            href={`/${lang}/charts`}
            className={
              pathname === `/${lang}/charts` ? styles.iconActive : styles.icon
            }
          >
            <i className="bi bi-bar-chart-fill"></i>
            <span>{dict.header.charts}</span>
          </Link>
          <Link
            href={`/${lang}/tools`}
            className={
              pathname === `/${lang}/tools` ? styles.iconActive : styles.icon
            }
          >
            <i className="bi bi-tools"></i>
            <span>{dict.header.tools}</span>
          </Link>
        </nav>

        <div>
          {status === "loading" ? (
            <div></div>
          ) : session ? (
            <span className={styles.userInfo}>
              <p>{session.user?.name}</p>
              <img
                src={session.user?.image || "/user-profile.svg"}
                alt="User Avatar"
                width={40}
                height={40}
              />
            </span>
          ) : (
            <>
              <Image
                src={"/menu-mobile.svg"}
                className={styles.menuMobile}
                alt="Menu Mobile"
                width={30}
                height={30}
              />
              <button
                onClick={() => signIn("spotify")}
                className={styles.spotifyButton}
              >
                <Image
                  src="/spotify.svg"
                  alt="Spotify Logo"
                  width={30}
                  height={30}
                />
                Login with Spotify
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
