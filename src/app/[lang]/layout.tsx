import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProvider } from "@/context/DictionaryProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/app/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soundtrics",
  description:
    "A music analytics platform providing insights into your listening habits.",
  keywords: [
    "music analytics",
    "listening habits",
    "music insights",
    "audio analysis",
    "music trends",
    "personalized music data",
  ],
  creator: "Erick Daniel",
  icons: {
    icon: "/favicon.ico",
  },
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
          <Providers>
            <Header />
            <main style={{ flex: 1, width: "100%" }}>{children}</main>
            <Footer />
          </Providers>
        </DictionaryProvider>
      </body>
    </html>
  );
}
