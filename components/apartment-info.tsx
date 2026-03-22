"use client"

import { Star, MapPin, Users, Bed, Bath, Shield, Share2, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Apartment } from "@/lib/types"

interface ApartmentInfoProps {
  apartment: Apartment
}

export function ApartmentInfo({ apartment }: ApartmentInfoProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.title,
        text: `Mira este departamento: ${apartment.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  const handleSave = () => {
    console.log("[v0] Guardando departamento:", apartment.id)
    alert("Departamento guardado en tus favoritos")
  }

  return (
    <div className="border-b border-border pb-8">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold text-foreground">{apartment.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{apartment.rating}</span>
              <span className="text-muted-foreground">({apartment.reviewCount} reseñas)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{apartment.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartir</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave} className="gap-2 bg-transparent">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
          {apartment.verified && (
            <Badge className="gap-1 bg-primary text-white">
              <Shield className="h-3 w-3" />
              Verificado
            </Badge>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Bed className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">{apartment.bedrooms} habitaciones</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">{apartment.bathrooms} baños</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">
            Hasta {apartment.maxOccupants} personas
            {apartment.type === "shared" && ` (${apartment.currentOccupants} ocupado)`}
          </span>
        </div>
      </div>

      <p className="text-base leading-relaxed text-foreground">{apartment.description}</p>
    </div>
  )
}
