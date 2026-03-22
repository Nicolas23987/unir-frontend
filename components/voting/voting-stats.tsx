"use client"

import { Users, Vote, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function VotingStats() {
  const [votes, setVotes] = useState(0)
  const targetVotes = 2847

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetVotes / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetVotes) {
        setVotes(targetVotes)
        clearInterval(timer)
      } else {
        setVotes(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="border-b bg-card px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Vote className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">{votes.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Votos Totales</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Candidatas</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">+342</p>
              <p className="text-sm text-muted-foreground">Votos Hoy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
