"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SwapInterface } from "./swap-interface"
import { SpotTrading } from "./spot-trading"
import { PerpetualTrading } from "./perpetual-trading"

export function TradingTabs() {
  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl">
          <TabsTrigger
            value="swap"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-bright-pink data-[state=active]:to-blush data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
          >
            Swap
          </TabsTrigger>
          <TabsTrigger
            value="spot"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-bright-pink data-[state=active]:to-blush data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
          >
            Spot Trading
          </TabsTrigger>
          <TabsTrigger
            value="perpetuals"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-bright-pink data-[state=active]:to-blush data-[state=active]:text-white font-medium rounded-lg transition-all duration-200"
          >
            Perpetuals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="swap" className="mt-8">
          <SwapInterface />
        </TabsContent>

        <TabsContent value="spot" className="mt-8">
          <SpotTrading />
        </TabsContent>

        <TabsContent value="perpetuals" className="mt-8">
          <PerpetualTrading />
        </TabsContent>
      </Tabs>
    </div>
  )
}
