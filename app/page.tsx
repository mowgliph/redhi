"use client"
import { useWallet, useTheme } from "./providers"
import { WalletConnection } from "./components/wallet-connection"
import { TradingTabs } from "./components/trading-tabs"
import { Header } from "./components/header"
import { LoadingSpinner } from "./components/loading-spinner"
import Image from "next/image"

export default function Home() {
  const { isConnected } = useWallet()
  const { mounted } = useTheme()

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8 max-w-2xl">
              <h1 className="text-5xl font-extralight text-foreground mb-6 tracking-tight flex items-center justify-center gap-3">
                Welcome to 
                <div className="flex items-center gap-2 h-8">
                  <div className="h-full aspect-square flex items-center">
                    <div className="dark:invert dark:brightness-0 dark:hover:brightness-100 hover:brightness-75 transition-all duration-300 h-full w-full">
                      <Image 
                        src="/redhi_bw.svg" 
                        alt="RedHi Logo" 
                        width={32} 
                        height={32} 
                        className="object-contain h-full w-full" 
                        priority 
                      />
                    </div>
                  </div>
                  <span className="font-medium text-bright-pink text-2xl">RedHi</span>
                </div>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 font-light">Decentralized Exchange on Hive Blockchain</p>
              <p className="text-muted-foreground leading-relaxed">
                Trade spot, perpetual contracts with up to 50x leverage, and swap tokens securely on the Hive
                blockchain. Connect your wallet to get started.
              </p>
            </div>
            <WalletConnection />
          </div>
        ) : (
          <TradingTabs />
        )}
      </main>
    </div>
  )
}
