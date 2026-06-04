"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Logo from "./Logo";
import { useDarkMode } from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border/40 
                 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between p-4">

        <Logo />

        <div className="flex items-center gap-2">

          {/* THEME TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative rounded-full transition-all duration-300 
                       hover:bg-muted hover:scale-105 active:scale-95"
          >
            <span className="transition-transform duration-300">
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-muted-foreground" />
              )}
            </span>
          </Button>

        </div>
      </div>
    </nav>
  );
}