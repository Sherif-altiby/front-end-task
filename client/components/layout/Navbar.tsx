"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Logo from "./Logo";
import { useDarkMode } from "@/hooks/useTheme";
 
export default function Navbar() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav className="flex items-center justify-between p-4 container">
      {/* Logo */}
      <Logo />

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </Button>
    </nav>
  );
}