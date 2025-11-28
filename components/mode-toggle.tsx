// components/mode-toggle.tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Menu as="div" className="relative z-[1000]">
      <Menu.Button className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-36 origin-top-right rounded-md border border-border bg-popover p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="space-y-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                    } group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                    } group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                    } group flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors`}
                  onClick={() => setTheme("system")}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  System
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
