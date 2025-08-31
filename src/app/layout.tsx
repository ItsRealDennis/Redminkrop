import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import WebGLBackground from "@/components/WebGLBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RedMinKrop — Fremtidens Sundhedsløsning",
  description: "En cinematisk digital oplevelse der transformerer måden virksomheder tænker medarbejdersundhed på",
  keywords: "RedMinKrop, sundhed, medarbejdersundhed, corporate wellness",
  openGraph: {
    title: "RedMinKrop — Fremtidens Sundhedsløsning",
    description: "En cinematisk digital oplevelse der transformerer måden virksomheder tænker medarbejdersundhed på",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className="grain">
        <CustomCursor />
        <WebGLBackground />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}