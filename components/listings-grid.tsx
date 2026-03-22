"use client"

import { Star, MapPin, Users, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Apartment } from "@/lib/types"

interface ListingsGridProps {
  apartments: Apartment[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

export function ListingsGrid({ apartments, selectedId, hoveredId, onSelect, onHover }: ListingsGridProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {apartments.map((apartment) => {
          const isSelected = selectedId === apartment.id
          const isHovered = hoveredId === apartment.id

          return (
            <Card
              key={apartment.id}
              className={`group overflow-hidden border transition-all ${
                isSelected || isHovered ? "border-primary shadow-lg" : "border-border hover:shadow-md"
              }`}
              onMouseEnter={() => onHover(apartment.id)}
              onMouseLeave={() => onHover(null)}
            >
              <Link href={`/departamentos/${apartment.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={apartment.images[0] || "/placeholder.svg"}
                    alt={apartment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log("[v0] Favorito clicked for apartment:", apartment.id)
                    }}
                  >
                    <Heart className="h-4 w-4 text-foreground" />
                  </Button>
                  <Badge className="absolute left-2 top-2 bg-white/90 text-foreground hover:bg-white">
                    {apartment.type === "shared" ? "Compartido" : "Privado"}
                  </Badge>
                  {apartment.verified && (
                    <Badge className="absolute bottom-2 left-2 bg-primary text-white">Verificado</Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="mb-1 line-clamp-1 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {apartment.title}
                  </h3>
                  <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{apartment.location}</span>
                  </div>
                  <div className="mb-2 flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{apartment.rating}</span>
                      <span className="text-muted-foreground">({apartment.reviewCount})</span>
                    </div>
                    {apartment.type === "shared" && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>
                          {apartment.currentOccupants}/{apartment.maxOccupants} ocupado
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-foreground">${apartment.price}</span>
                    <span className="text-xs text-muted-foreground">/ mes</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
