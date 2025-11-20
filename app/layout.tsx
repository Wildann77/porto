import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import ClientLayout from "./client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wildan Haifan Jadid | Full Stack Software Engineer",
  description:
    "Portfolio of Wildan Haifan Jadid, a Full Stack Software Engineer based in Brebes, Indonesia, specializing in JavaScript, TypeScript, React.js, Node.js.",
  keywords: [
    "Wildan Haifan Jadid",
    "Software Engineer",
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Brebes",
    "Indonesia",
  ],
  authors: [{ name: "Wildan Haifan Jadid" }],
  creator: "Wildan Haifan Jadid",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nihalmaskey.com",
    title: "Wildan Haifan Jadid | Full Stack Software Engineer",
    description:
      "Portfolio of Wildan Haifan Jadid, a Full Stack Software Engineer based in Brebes, Indonesia, specializing in JavaScript, TypeScript, React.js, Node.js.",
    siteName: "Wildan Haifan Jadid Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Wildan Haifan Jadid Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildan Haifan Jadid | Full Stack Software Engineer",
    description:
      "Portfolio of Wildan Haifan Jadid, a Full Stack Software Engineer based in Brebes, Indonesia, specializing in JavaScript, TypeScript, React.js, Node.js.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <Suspense>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
        <Analytics />

        {/* Portal container untuk dropdown theme toggle */}
        <div
          id="theme-portal"
          className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none"
        />
      </body>
    </html>
  );
}
