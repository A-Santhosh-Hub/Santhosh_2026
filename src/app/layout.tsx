import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-chalet", // Mapping Anton to 'chalet' var for now
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santhosh A | Portfolio of The Decade",
  description: "The official portfolio of Santhosh A. Developed by SanStudio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${anton.variable} font-sans antialiased bg-vice-midnight text-white`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Film Grain Overlay */}
        <div className="film-grain"></div>
      </body>
    </html>
  );
}
