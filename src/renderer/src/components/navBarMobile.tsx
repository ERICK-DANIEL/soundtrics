import { useState } from 'react'
import icon from '../assets/images/soundtrics.svg'
import menu from '../assets/images/menuMobile.svg'
import styles from '../styles/navBarMobile.module.css'

const NavBarMobile: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="#" className={styles.headerBrand}>
            <img src={icon} alt="Icono" className={styles.headerBrandLogo} />
            <p className={styles.headerBrandText}>Soundtrics</p>
          </a>
          <img
            src={menu}
            alt="Menu mobile"
            className={styles.headerMenuMobile}
            onClick={handleMenu}
          />
        </div>
        <div className={styles.headerLine}></div>
      </header>
      <Menu open={menuOpen} onClose={handleClose} />
    </>
  )
}

interface MenuProps {
  open: boolean
  onClose: () => void
}

const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  return open ? (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem} onClick={onClose}>
          <a href="" className={styles.navigationLink}>
            Top songs
          </a>
        </li>
        <li className={styles.navigationItem} onClick={onClose}>
          <a href="" className={styles.navigationLink}>
            Top artists
          </a>
        </li>
        <li className={styles.navigationItem} onClick={onClose}>
          <a href="" className={styles.navigationLink}>
            Recently played
          </a>
        </li>
        <li className={styles.navigationItem} onClick={onClose}>
          <a href="" className={styles.navigationLink}>
            Top genres
          </a>
        </li>
        <li className={styles.navigationItem} onClick={onClose}>
          <a href="" className={styles.navigationLink}>
            Account
          </a>
        </li>
      </ul>
    </nav>
  ) : null
}

export default NavBarMobile
