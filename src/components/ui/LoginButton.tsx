import { signIn } from "next-auth/react";
import { useDictionary } from "@/context/DictionaryProvider";
import styles from "@/components/ui/loginButton.module.css";
import Image from "next/image";

export default function LoginButton() {
  const { dict } = useDictionary();

  return (
    <button onClick={() => signIn("spotify")} className={styles.spotifyButton}>
      <Image src="/spotify.svg" alt="Spotify Logo" width={30} height={30} />
      {dict.header.login}
    </button>
  );
}
