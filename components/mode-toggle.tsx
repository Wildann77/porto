// components/mode-toggle.tsx
"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

const themeItems = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
]

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Menu as="div" className="relative z-[1000] size-9">
      <Menu.Button className="relative flex size-9 items-center justify-center rounded-full border border-border/45 bg-background/55 text-foreground shadow-sm backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ease-out hover:border-primary/35 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Sun
          aria-hidden="true"
          className="absolute h-4.5 w-4.5 rotate-0 scale-100 transition-transform duration-300 ease-out dark:-rotate-90 dark:scale-0"
        />
        <Moon
          aria-hidden="true"
          className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-transform duration-300 ease-out dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Toggle theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-180"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-120"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="fixed right-4 top-16 z-[1001] max-h-[calc(100dvh-5rem)] w-36 origin-top-right overflow-y-auto overscroll-contain rounded-lg border border-border/45 bg-background/58 p-1.5 text-foreground shadow-lg shadow-foreground/5 backdrop-blur-xl focus:outline-none md:right-6">
          <div className="space-y-1">
            {themeItems.map((item) => {
              const Icon = item.icon

              return (
                <Menu.Item key={item.value}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={cn(
                        "group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-[background-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active && "bg-primary/10 text-foreground"
                      )}
                      onClick={() => setTheme(item.value)}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
