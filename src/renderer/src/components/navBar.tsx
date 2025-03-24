import { useSpotifyUser } from '../hooks/useSpotifyUser'
import icon from '../assets/images/soundtrics.svg'
import defaultProfilePic from '../assets/images/defaultProfilePic.svg'
import styles from '../styles/navBar.module.css'

const NavBar: React.FC = () => {
  const user = useSpotifyUser()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="#" className={styles.headerBrand}>
            <img src={icon} alt="Icono" className={styles.headerBrandLogo} />
            <p className={styles.headerBrandText}>Soundtrics</p>
          </a>
          <nav>
            <ul className={styles.navigationList}>
              <li>
                <a href="" className={styles.navigationLink}>
                  Top songs
                </a>
              </li>
              <li>
                <a href="" className={styles.navigationLink}>
                  Top artist
                </a>
              </li>
              <li>
                <a href="" className={styles.navigationLink}>
                  Top generes
                </a>
              </li>
              <li>
                <a href="" className={styles.navigationLink}>
                  Recently played
                </a>
              </li>
            </ul>
          </nav>
          {user ? (
            <div className={styles.headerProfile}>
              <p className={styles.headerProfileName}>{user.display_name}</p>
              <img
                src={user.images.length > 0 ? user.images[0].url : defaultProfilePic}
                alt="Foto de perfil"
                className={styles.headerProfilePic}
              />
            </div>
          ) : (
            <p className={styles.headerProfileName}>Login</p>
          )}
        </div>
        <div className={styles.headerLine}></div>
      </header>
    </>
  )
}

export default NavBar
