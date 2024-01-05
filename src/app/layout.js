import { Inter } from "next/font/google";
import "./globals.css";
import SparklesIcon from "@/components/SparklesIcon";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Captionator",
  description: "Auto-generate captions for your videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" sizes="any" />
      </head>
      <body
        className={
          inter.className +
          " bg-gradient-to-b from-bgGradientFrom to-bgGradientTo min-h-screen text-white"
        }
      >
        <main className="p-4 max-w-2xl mx-auto">
          <header className="flex justify-between my-8">
            <Link href="/" className="flex gap-1">
              <SparklesIcon />
              <span>Captionator</span>
            </Link>
            <nav className="flex gap-6 text-white/80">
              <Link href="/" className="">
                Home
              </Link>
              <Link href="/pricing" className="">
                Pricing
              </Link>
              <Link href="mailto:ajpalanki@gmail.com" className="">
                Contact
              </Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
