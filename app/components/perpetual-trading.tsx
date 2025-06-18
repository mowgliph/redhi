"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

export function PerpetualTrading() {
  const [selectedPair, setSelectedPair] = useState("HIVE/HBD")
  const [side, setSide] = useState("long")
  const [leverage, setLeverage] = useState([10])
  const [amount, setAmount] = useState("")
  const [positions] = useState([
    {
      pair: "HIVE/HBD",
      side: "long",
      size: 1000,
      leverage: 20,
      entryPrice: 0.285,
      markPrice: 0.287,
      pnl: 7.02,
      pnlPercent: 2.46,
    },
  ])

  const calculateLiquidationPrice = () => {
    if (!amount) return 0
    const entryPrice = 0.285 // Mock current price
    const leverageValue = leverage[0]

    if (side === "long") {
      return entryPrice * (1 - 1 / leverageValue)
    } else {
      return entryPrice * (1 + 1 / leverageValue)
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Trading Interface */}
      <div className="lg:col-span-2 space-y-6">
        {/* Position Form */}
        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground font-light text-xl">Perpetual Trading</CardTitle>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger className="w-40 bg-muted/30 border-border/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="HIVE/HBD">HIVE/HBD</SelectItem>
                  <SelectItem value="BTC/HBD">BTC/HBD</SelectItem>
                  <SelectItem value="ETH/HBD">ETH/HBD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={side === "long" ? "default" : "outline"}
                onClick={() => setSide("long")}
                className={
                  side === "long"
                    ? "bg-green-500 hover:bg-green-600 text-white font-medium"
                    : "border-border/50 hover:bg-muted/50 font-medium"
                }
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Long
              </Button>
              <Button
                variant={side === "short" ? "default" : "outline"}
                onClick={() => setSide("short")}
                className={
                  side === "short"
                    ? "bg-red-500 hover:bg-red-600 text-white font-medium"
                    : "border-border/50 hover:bg-muted/50 font-medium"
                }
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Short
              </Button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Position Size (HBD)</label>
              <Input
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-muted-foreground">Leverage</label>
                <Badge variant="outline" className="border-bright-pink text-bright-pink bg-bright-pink/10 font-medium">
                  {leverage[0]}x
                </Badge>
              </div>
              <Slider
                value={leverage}
                onValueChange={setLeverage}
                max={50}
                min={1}
                step={1}
                className="w-full [&_[role=slider]]:bg-bright-pink [&_[role=slider]]:border-bright-pink"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>1x</span>
                <span>25x</span>
                <span>50x</span>
              </div>
            </div>

            <div className="bg-muted/20 p-4 rounded-xl border border-border/30 backdrop-blur-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Entry Price:</span>
                <span className="text-foreground font-semibold">0.285000 HBD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Position Value:</span>
                <span className="text-foreground font-semibold">
                  {amount ? (Number.parseFloat(amount) * leverage[0]).toFixed(2) : "0.00"} HIVE
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Liquidation Price:</span>
                <span className="text-red-500 font-semibold">{calculateLiquidationPrice().toFixed(6)} HBD</span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-semibold">High Risk Warning</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-300 font-light leading-relaxed">
                Trading with high leverage can result in significant losses. Only trade with funds you can afford to
                lose.
              </p>
            </div>

            <Button
              className={`w-full font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                side === "long"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              disabled={!amount}
            >
              Open {side === "long" ? "Long" : "Short"} Position
            </Button>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-light text-xl">Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            {positions.length > 0 ? (
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={index} className="bg-muted/20 p-4 rounded-xl border border-border/30 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-foreground font-semibold">{position.pair}</span>
                          <Badge
                            variant={position.side === "long" ? "default" : "destructive"}
                            className={position.side === "long" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                          >
                            {position.side.toUpperCase()} {position.leverage}x
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">Size: {position.size} HIVE</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-semibold ${position.pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {position.pnl >= 0 ? "+" : ""}
                          {position.pnl.toFixed(2)} HBD
                        </div>
                        <div
                          className={`text-xs font-medium ${position.pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          ({position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">Entry: </span>
                        <span className="text-foreground font-semibold">{position.entryPrice.toFixed(6)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Mark: </span>
                        <span className="text-foreground font-semibold">{position.markPrice.toFixed(6)}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-border/50 text-muted-foreground hover:bg-muted/50 font-medium"
                      >
                        Close 50%
                      </Button>
                      <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium">
                        Close Position
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <div className="w-16 h-16 bg-muted/20 rounded-xl mx-auto mb-4 flex items-center justify-center">📊</div>
                <p className="font-medium mb-1">No open positions</p>
                <p className="text-sm font-light">Open your first perpetual position to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Info */}
      <div className="space-y-6">
        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-light text-lg">Market Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Mark Price</span>
              <span className="text-foreground text-sm font-semibold">0.285000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">24h Change</span>
              <span className="text-green-500 text-sm font-semibold">+2.45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">24h Volume</span>
              <span className="text-foreground text-sm font-semibold">1.2M HBD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Open Interest</span>
              <span className="text-foreground text-sm font-semibold">850K HIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Funding Rate</span>
              <span className="text-blue-500 text-sm font-semibold">0.0125%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-light text-lg">Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Wallet Balance</span>
              <span className="text-foreground text-sm font-semibold">125.50 HIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Available Margin</span>
              <span className="text-foreground text-sm font-semibold">45.25 HBD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Used Margin</span>
              <span className="text-foreground text-sm font-semibold">14.25 HBD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">Unrealized PnL</span>
              <span className="text-green-500 text-sm font-semibold">+7.02 HBD</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
