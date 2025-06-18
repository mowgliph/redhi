"use client"

import { useWallet } from "../providers"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Image from "next/image"

export function Header() {
  const { account, isConnected, disconnect } = useWallet()

  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <div className="dark:invert dark:brightness-0 dark:hover:brightness-100 hover:brightness-75 transition-all duration-300">
              <Image 
                src="/redhi_bw.svg" 
                alt="RedHi Logo" 
                width={40}
                height={40}
                priority
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-light text-foreground transition-colors duration-300">
            Red<span className="font-medium text-bright-pink">Hi</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {isConnected && account && (
            <>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground transition-colors duration-300">@{account.name}</p>
                <div className="flex space-x-4 text-xs text-muted-foreground transition-colors duration-300">
                  <span className="font-medium">{account.hive.toFixed(3)} HIVE</span>
                  <span className="font-medium">{account.hbd.toFixed(3)} HBD</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnect}
                className="border-border/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
