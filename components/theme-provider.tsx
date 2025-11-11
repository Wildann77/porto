"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      {/* wajib! untuk dropdown supaya tidak merusak layout */}
      <div id="theme-portal" />
    </NextThemesProvider>
  )
}
