"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface HiveAccount {
  name: string
  hive: number
  hbd: number
}

interface WalletContextType {
  account: HiveAccount | null
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
  mounted: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export function Providers({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<HiveAccount | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("redhi-theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("redhi-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const connect = async () => {
    try {
      // Mock connection for now - replace with actual Hive Keychain integration
      if (typeof window !== "undefined" && (window as any).hive_keychain) {
        // Simulate Hive Keychain connection
        const mockAccount = {
          name: "demo-user",
          hive: 125.5,
          hbd: 45.25,
        }
        setAccount(mockAccount)
        setIsConnected(true)
      } else {
        alert("Please install Hive Keychain extension")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setIsConnected(false)
  }

  // Prevent hydration mismatch by showing loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      <WalletContext.Provider value={{ account, isConnected, connect, disconnect }}>{children}</WalletContext.Provider>
    </ThemeContext.Provider>
  )
}
