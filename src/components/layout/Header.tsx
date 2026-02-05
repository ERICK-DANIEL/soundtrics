"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDictionary } from "@/context/DictionaryProvider";
import { usePathname } from "next/navigation";
import LoginButton from "../ui/LoginButton";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/layout/header.module.css";

export default function Header() {
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const { dict, lang } = useDictionary();
  const pathname = usePathname();

  const closeMenuMobile = () => setMenuMobileOpen(false);

  const getLinkClass = (path: string) =>
    pathname === `/${lang}${path}` ? styles.iconActive : styles.icon;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link
          href={`/${lang}/`}
          className={styles.logo}
          onClick={closeMenuMobile}
        >
          <Image src="/soundtrics.svg" alt="Logo" width={26} height={26} />
          Soundtrics
        </Link>

        <nav
          className={`${styles.nav} ${menuMobileOpen ? styles.navOpen : ""}`}
        >
          <Link
            href={`/${lang}/home`}
            className={getLinkClass("/home")}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-house-fill"></i>
            <span>{dict.header.home}</span>
          </Link>

          <div className={styles.menuChartsWrapper}>
            <Link
              href={`/${lang}/charts`}
              className={`${getLinkClass("/charts")} ${styles.menuChartsParent}`}
              onClick={closeMenuMobile}
            >
              <i className="bi bi-bar-chart-fill"></i>
              <span>{dict.header.charts}</span>
            </Link>

            <div className={styles.menuCharts}>
              <Link
                href={`/${lang}/charts/top-songs`}
                className={getLinkClass("/charts/top-songs")}
                onClick={closeMenuMobile}
              >
                <i className="bi bi-music-note-list"></i>
                <span>{dict.header.songs}</span>
              </Link>
              <Link
                href={`/${lang}/charts/top-artists`}
                className={getLinkClass("/charts/top-artists")}
                onClick={closeMenuMobile}
              >
                <i className="bi bi-person-lines-fill"></i>
                <span>{dict.header.artists}</span>
              </Link>
            </div>
          </div>

          <Link
            href={`/${lang}/tools`}
            className={getLinkClass("/tools")}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-tools"></i>
            <span>{dict.header.tools}</span>
          </Link>

          <Link
            href={`/${lang}/settings`}
            className={`${getLinkClass("/settings")} ${styles.menuDesktopOnly}`}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-gear-fill"></i>
            <span>{dict.header.settings}</span>
          </Link>
          <Link
            href={`/${lang}/profile`}
            className={`${getLinkClass("/profile")} ${styles.menuDesktopOnly}`}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-person-fill"></i>
            <span>{dict.header.profile}</span>
          </Link>
        </nav>

        <div className={styles.actions}>
          {status === "loading" ? (
            <div className={styles.loader}></div>
          ) : session ? (
            <div className={styles.userWrapper}>
              <div className={styles.userDropdown}>
                <div className={styles.userInfo}>
                  <p>{session.user?.name}</p>
                  <img
                    src={session.user?.image || "/user-profile.svg"}
                    alt="User Avatar"
                    className={styles.avatar}
                  />
                </div>

                <div className={styles.dropdownMenu}>
                  <Link href={`/${lang}/profile`}>
                    <i className="bi bi-person-fill"></i>
                    {dict.header.profile}
                  </Link>
                  <Link href={`/${lang}/settings`}>
                    <i className="bi bi-gear-fill"></i>
                    {dict.header.settings}
                  </Link>
                  <hr className={styles.divider} />
                  <button className={styles.logoutBtn}>
                    {dict.header.logout}
                  </button>
                </div>
              </div>

              <Image
                src="/menu-mobile.svg"
                className={styles.menuMobile}
                alt="Menu"
                width={30}
                height={30}
                onClick={() => setMenuMobileOpen(!menuMobileOpen)}
              />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
