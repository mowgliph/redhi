"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Info } from "lucide-react"

const TRADING_PAIRS = [
  { from: "HIVE", to: "HBD", rate: 0.285 },
  { from: "HBD", to: "HIVE", rate: 3.51 },
  { from: "BTC", to: "HBD", rate: 106500 },
  { from: "ETH", to: "HBD", rate: 3850 },
  { from: "HBD", to: "USDT", rate: 1.02 },
]

export function SwapInterface() {
  const [fromToken, setFromToken] = useState("HIVE")
  const [toToken, setToToken] = useState("HBD")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount("")
    setToAmount("")
  }

  const calculateSwap = (amount: string) => {
    if (!amount) return ""
    const pair = TRADING_PAIRS.find((p) => p.from === fromToken && p.to === toToken)
    if (pair) {
      return (Number.parseFloat(amount) * pair.rate).toFixed(6)
    }
    return ""
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateSwap(value))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="card-gradient shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground font-light text-xl">Token Swap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">From</label>
            <div className="flex gap-3">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-32 bg-muted/30 border-border/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="HIVE">HIVE</SelectItem>
                  <SelectItem value="HBD">HBD</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwapTokens}
              className="border-border/50 hover:bg-muted/50 p-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ArrowUpDown className="w-4 h-4 text-cinereous" />
            </Button>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">To</label>
            <div className="flex gap-3">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-32 bg-muted/30 border-border/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="HIVE">HIVE</SelectItem>
                  <SelectItem value="HBD">HBD</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="bg-muted/20 border-border/30 text-foreground backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-xl border border-border/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Info className="w-4 h-4 text-cinereous" />
              <span className="font-medium">Swap Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Rate:</span>
                <span className="font-medium">
                  1 {fromToken} = {calculateSwap("1")} {toToken}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Slippage:</span>
                <span className="font-medium text-green-600">0.5%</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Fee:</span>
                <span className="font-medium">0.1%</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-bright-pink to-blush hover:from-bright-pink/90 hover:to-blush/90 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!fromAmount || !toAmount}
          >
            Swap Tokens
          </Button>
        </CardContent>
      </Card>

      <Card className="card-gradient shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground font-light text-xl">Recent Swaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { from: "HIVE", to: "HBD", amount: "100.00", time: "2 min ago" },
              { from: "HBD", to: "USDT", amount: "50.25", time: "5 min ago" },
              { from: "ETH", to: "HBD", amount: "0.5", time: "12 min ago" },
            ].map((swap, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-muted/20 rounded-lg border border-border/20 backdrop-blur-sm hover:bg-muted/30 transition-colors"
              >
                <div className="text-sm font-medium text-foreground">
                  {swap.amount} {swap.from} → {swap.to}
                </div>
                <div className="text-xs text-muted-foreground">{swap.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
