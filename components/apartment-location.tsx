"use client"

import { MapPin } from "lucide-react"

interface ApartmentLocationProps {
  address: string
  coordinates: { lat: number; lng: number }
}

export function ApartmentLocation({ address, coordinates }: ApartmentLocationProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${coordinates.lat},${coordinates.lng}&zoom=15`

  return (
    <div className="py-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Ubicación</h2>
      <div className="mb-4 flex items-start gap-2">
        <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">{address}</p>
          <p className="text-sm text-muted-foreground">La ubicación exacta se mostrará después de la reserva</p>
        </div>
      </div>
      <iframe
        src={mapUrl}
        className="h-96 w-full rounded-xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del departamento"
      />
    </div>
  )
}
