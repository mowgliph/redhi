"use client"

import { useWallet } from "../providers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Zap } from "lucide-react"

export function WalletConnection() {
  const { connect } = useWallet()

  return (
    <div className="max-w-md mx-auto">
      <Card className="card-gradient shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-foreground flex items-center justify-center gap-3 text-xl font-light">
            <div className="p-2 bg-gradient-to-br from-bright-pink to-blush rounded-lg">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            Connect Your Hive Wallet
          </CardTitle>
          <CardDescription className="text-muted-foreground font-light">
            Connect with Hive Keychain to start trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={connect}
            className="w-full bg-gradient-to-r from-bright-pink to-blush hover:from-bright-pink/90 hover:to-blush/90 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect with Hive Keychain
          </Button>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-light">Secure authentication via Hive Keychain</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-light">Fast 3-second transactions on Hive</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
