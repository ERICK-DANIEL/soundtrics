"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDictionary } from "@/context/DictionaryProvider";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import LoginButton from "@/components/ui/LoginButton";
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
    pathname.startsWith(`/${lang}${path}`) ? styles.iconActive : styles.icon;

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${lang}/home` });
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {/* LOGO */}
        <div className={styles.columnLeft}>
          <Link
            href={`/${lang}/home`}
            className={styles.logo}
            onClick={closeMenuMobile}
          >
            <Image src="/soundtrics.svg" alt="Logo" width={26} height={26} />
            <span>Soundtrics</span>
          </Link>
        </div>

        {/* NAVEGACIÓN CENTRAL */}
        <nav
          className={`${styles.nav} ${menuMobileOpen ? styles.navOpen : ""}`}
        >
          <Link
            href={`/${lang}/charts`}
            className={`${getLinkClass("/charts")} ${styles.menuChartsParent}`}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-bar-chart-fill"></i>
            <span>{dict.header.charts}</span>
          </Link>

          <Link
            href={`/${lang}/tools`}
            className={getLinkClass("/tools")}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-tools"></i>
            <span>{dict.header.tools}</span>
          </Link>

          <Link
            href={`/${lang}/games`}
            className={getLinkClass("/games")}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-house-fill"></i>
            <span>{dict.header.games}</span>
          </Link>

          {/* Solo visibles en menú móvil */}
          <Link
            href={`/${lang}/settings`}
            className={`${getLinkClass("/settings")} ${styles.menuMobileOnly}`}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-gear-fill"></i>
            <span>{dict.header.settings}</span>
          </Link>
          <Link
            href={`/${lang}/profile`}
            className={`${getLinkClass("/profile")} ${styles.menuMobileOnly}`}
            onClick={closeMenuMobile}
          >
            <i className="bi bi-person-fill"></i>
            <span>{dict.header.profile}</span>
          </Link>
        </nav>

        {/* LOGIN / PERFIL DERECHA */}
        <div className={styles.columnRight}>
          <div className={styles.actions}>
            {status === "loading" ? (
              <div className={styles.loaderPlaceholder} />
            ) : session ? (
              <div className={styles.userWrapper}>
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{session.user?.name}</p>
                    <Image
                      src={session.user?.image || "/user-profile.svg"}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className={styles.avatar}
                    />
                  </div>

                  <div className={styles.dropdownMenu}>
                    <Link href={`/${lang}/profile`} className={styles.menu}>
                      <i className="bi bi-person-fill"></i>
                      {dict.header.profile}
                    </Link>
                    <Link href={`/${lang}/settings`} className={styles.menu}>
                      <i className="bi bi-gear-fill"></i>
                      {dict.header.settings}
                    </Link>
                    <hr className={styles.divider} />
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                      <i className="bi bi-box-arrow-right"></i>
                      {dict.header.logout}
                    </button>
                  </div>
                </div>

                <Image
                  src="/menu-mobile.svg"
                  className={styles.menuMobileBtn}
                  alt="Menu"
                  width={30}
                  height={30}
                  onClick={() => setMenuMobileOpen(!menuMobileOpen)}
                />
              </div>
            ) : (
              <div className={styles.loginWrapper}>
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
