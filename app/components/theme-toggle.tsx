"use client"

import { useTheme } from "../providers"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl border-border/50" disabled>
        <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden border-border/50 hover:bg-muted/50 transition-all duration-300 w-10 h-10 p-0 rounded-xl group"
    >
      <div className="relative transition-all duration-300 transform group-hover:scale-110">
        {theme === "light" ? (
          <Moon className="w-4 h-4 text-cinereous transition-all duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-bright-pink transition-all duration-300" />
        )}
      </div>

      {/* Background animation */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-bright-pink/10 to-blush/10"
            : "bg-gradient-to-br from-cinereous/10 to-rose-quartz/10"
        }`}
      />
    </Button>
  )
}
