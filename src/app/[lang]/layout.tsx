import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProvider } from "@/context/DictionaryProvider";
import "@/app/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soundtrics",
  description: "Tu clon de Spotify con Next.js",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "es" | "en");

  return (
    <html lang={lang}>
      <body className={montserrat.variable}>
        <DictionaryProvider dict={dict} lang={lang}>
          <Providers>{children}</Providers>
        </DictionaryProvider>
      </body>
    </html>
  );
}
