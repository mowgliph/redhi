"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ORDERBOOK_DATA = {
  bids: [
    { price: 0.284, amount: 1500.5, total: 426.14 },
    { price: 0.283, amount: 2200.75, total: 622.81 },
    { price: 0.282, amount: 1800.25, total: 507.67 },
  ],
  asks: [
    { price: 0.286, amount: 1200.0, total: 343.2 },
    { price: 0.287, amount: 1650.3, total: 473.64 },
    { price: 0.288, amount: 2100.8, total: 604.63 },
  ],
}

export function SpotTrading() {
  const [selectedPair, setSelectedPair] = useState("HIVE/HBD")
  const [orderType, setOrderType] = useState("limit")
  const [side, setSide] = useState("buy")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Trading Chart Placeholder */}
      <div className="lg:col-span-2">
        <Card className="card-gradient shadow-xl h-96">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground font-light text-xl">{selectedPair}</CardTitle>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger className="w-40 bg-muted/30 border-border/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="HIVE/HBD">HIVE/HBD</SelectItem>
                  <SelectItem value="BTC/HBD">BTC/HBD</SelectItem>
                  <SelectItem value="ETH/HBD">ETH/HBD</SelectItem>
                  <SelectItem value="HBD/USDT">HBD/USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 bg-gradient-to-br from-cinereous/20 to-rose-quartz/20 rounded-xl mx-auto mb-4 flex items-center justify-center border border-border/30">
                📈
              </div>
              <p className="font-medium">Price Chart</p>
              <p className="text-sm font-light">Integration with Lightweight Charts coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Form */}
      <div className="space-y-6">
        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-light text-xl">Place Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={side} onValueChange={setSide}>
              <TabsList className="grid w-full grid-cols-2 bg-muted/20 p-1 rounded-lg">
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white font-medium rounded-md transition-all duration-200"
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white font-medium rounded-md transition-all duration-200"
                >
                  Sell
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="bg-muted/30 border-border/50 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                <SelectItem value="limit">Limit Order</SelectItem>
                <SelectItem value="market">Market Order</SelectItem>
              </SelectContent>
            </Select>

            {orderType === "limit" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Price</label>
                <Input
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Amount</label>
              <Input
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm"
              />
            </div>

            <div className="bg-muted/20 p-4 rounded-xl border border-border/30 backdrop-blur-sm">
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Total:</span>
                <span className="font-medium text-foreground">
                  {price && amount ? (Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(6) : "0.00"} HBD
                </span>
              </div>
            </div>

            <Button
              className={`w-full font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                side === "buy" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              disabled={!amount || (orderType === "limit" && !price)}
            >
              {side === "buy" ? "Buy" : "Sell"} {selectedPair.split("/")[0]}
            </Button>
          </CardContent>
        </Card>

        {/* Orderbook */}
        <Card className="card-gradient shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground font-light text-lg">Order Book</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2 pb-2 border-b border-border/30 font-medium">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
            </div>

            {/* Asks */}
            {ORDERBOOK_DATA.asks.reverse().map((ask, index) => (
              <div key={index} className="text-xs grid grid-cols-3 gap-2 text-red-500 font-medium">
                <span>{ask.price.toFixed(6)}</span>
                <span>{ask.amount.toFixed(2)}</span>
                <span>{ask.total.toFixed(2)}</span>
              </div>
            ))}

            <div className="py-3 text-center text-lg font-semibold text-foreground border-y border-border/30 bg-muted/10 rounded-lg">
              0.285000
            </div>

            {/* Bids */}
            {ORDERBOOK_DATA.bids.map((bid, index) => (
              <div key={index} className="text-xs grid grid-cols-3 gap-2 text-green-500 font-medium">
                <span>{bid.price.toFixed(6)}</span>
                <span>{bid.amount.toFixed(2)}</span>
                <span>{bid.total.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
