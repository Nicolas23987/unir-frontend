"use client"

import { Crown, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">UNIR</span>
          </a>

          {/* Desktop Navigation - Removed "Nominadas" link */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#candidatas"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Candidatas
            </a>
            <a
              href="#comentarios"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Comentarios
            </a>
            <Button
              size="sm"
              className="rounded-full bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary/90"
            >
              Votar Ahora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Removed "Nominadas" link */}
      {isMenuOpen && (
        <div className="border-t border-primary/20 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <a
              href="#candidatas"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Candidatas
            </a>
            <a
              href="#comentarios"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Comentarios
            </a>
            <Button size="sm" className="mt-2 w-full rounded-full bg-primary text-white shadow-md hover:bg-primary/90">
              Votar Ahora
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
