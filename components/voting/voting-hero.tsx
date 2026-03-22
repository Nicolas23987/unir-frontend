"use client"

import { Crown, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function VotingHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 text-center md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,98,146,0.1),transparent_40%)]" />

      {/* Floating sparkles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Sparkles className="h-4 w-4 text-primary/20" />
          </div>
        ))}
      </div>

      <div
        className={`relative mx-auto max-w-5xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm border border-primary/30">
          <Crown className="h-5 w-5 text-primary" />
          <span>Votación Abierta 2025</span>
        </div>

        <h1 className="mb-6 text-balance font-sans text-5xl font-bold leading-tight text-primary drop-shadow-lg md:text-7xl">
          UNIR
        </h1>

        <div className="mb-4 space-y-2">
          <p className="text-balance text-2xl font-semibold text-foreground md:text-3xl">Reina de Belleza</p>
          <p className="text-balance text-lg font-light text-muted-foreground md:text-xl">Facultad de Enfermería</p>
        </div>

        <p className="mx-auto mb-8 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Vota por tu candidata favorita y sé parte de esta celebración de talento, dedicación y excelencia académica.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#candidatas"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:bg-primary/90"
          >
            Ver Candidatas
          </a>
          <a
            href="#comentarios"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10 px-8 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-primary/20 hover:border-primary/60"
          >
            Ver Comentarios
          </a>
        </div>
      </div>
    </section>
  )
}
