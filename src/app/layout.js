import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/3d/Background3D";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeCraft Studio",
  description: "Web Development & Digital Zen Portfolio",
  // Google Search Console Verification
  verification: {
    google: "9ExvvzK5QTymSZnLl5h0DxvvXilat7hmPAePiX5wJxg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500 selection:text-white`}
      >
        <SmoothScroll />
        <Background3D />
        <main className="relative z-10 w-full min-h-screen pointer-events-none">
          {children}
        </main>
        {/* <script src="https://feedback-widget-two.vercel.app/embed.js" data-id="tik3vTIor9Qsar1Ikr5u" strategy="lazyOnload"></script> */}
      </body>
    </html>
  );
}