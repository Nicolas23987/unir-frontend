"use client"

import { useEffect, useState } from "react"
import type { Apartment } from "@/lib/types"

interface ListingsMapProps {
  apartments: Apartment[]
  selectedId: string | null
  hoveredId: string | null
  onSelectApartment: (id: string | null) => void
  onHoverApartment: (id: string | null) => void
}

export function ListingsMap({
  apartments,
  selectedId,
  hoveredId,
  onSelectApartment,
  onHoverApartment,
}: ListingsMapProps) {
  const [center, setCenter] = useState({ lat: -0.953325, lng: -80.745714 })

  useEffect(() => {
    if (apartments.length > 0) {
      const avgLat = apartments.reduce((sum, apt) => sum + apt.coordinates.lat, 0) / apartments.length
      const avgLng = apartments.reduce((sum, apt) => sum + apt.coordinates.lng, 0) / apartments.length
      setCenter({ lat: avgLat, lng: avgLng })
    }
  }, [apartments])

  const markers = apartments.map((apt) => `${apt.coordinates.lat},${apt.coordinates.lng}`).join("|")

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${center.lat},${center.lng}&zoom=13`

  return (
    <div className="relative h-full w-full">
      <iframe
        src={mapUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de departamentos"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg border border-accent">
        {apartments.length} departamentos en esta zona
      </div>

      <div className="absolute top-4 left-4 max-h-[calc(100%-2rem)] overflow-y-auto space-y-2 max-w-xs">
        {apartments.slice(0, 5).map((apt) => (
          <button
            key={apt.id}
            onClick={() => onSelectApartment(apt.id)}
            onMouseEnter={() => onHoverApartment(apt.id)}
            onMouseLeave={() => onHoverApartment(null)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              selectedId === apt.id || hoveredId === apt.id
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-background/95 backdrop-blur-sm shadow-md hover:shadow-lg"
            }`}
          >
            <div className="font-semibold text-sm truncate">{apt.title}</div>
            <div className="text-xs opacity-90">${apt.price}/mes</div>
          </button>
        ))}
      </div>
    </div>
  )
}
