"use client"

export function LoadingSpinner() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-bright-pink to-blush rounded-xl flex items-center justify-center animate-pulse">
            <span className="text-white font-semibold text-xl">R</span>
          </div>
          <div className="absolute inset-0 w-12 h-12 border-2 border-bright-pink/30 rounded-xl animate-spin border-t-bright-pink"></div>
        </div>
        <p className="text-muted-foreground font-light">Loading RedHi...</p>
      </div>
    </div>
  )
}
