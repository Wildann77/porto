"use client";

import type React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import NoScriptStyles from "@/components/noscript-styles";

const fontSans = localFont({
  src: "./fonts/Mona-Sans.woff2",
  variable: "--font-sans",
  weight: "200 900",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoScriptStyles />

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div
          className={cn(
            "min-h-screen bg-background font-mono antialiased",
            fontSans.variable
          )}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1001] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip to main content
          </a>

          <noscript>
            <div className="bg-yellow-100 p-4 text-center text-sm dark:bg-yellow-900">
              For the best experience, please enable JavaScript. Some features
              may be limited without it.
            </div>
          </noscript>

          <AnimatedBackground />
          <Header />
          <main id="main-content" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
