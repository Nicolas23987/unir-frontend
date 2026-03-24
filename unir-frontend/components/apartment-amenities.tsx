import { Wifi, Utensils, Shirt, Wind, Disc as Desk, DoorOpen, Flower2, Shield } from "lucide-react"

interface ApartmentAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, any> = {
  Wifi: Wifi,
  "Wifi de alta velocidad": Wifi,
  Cocina: Utensils,
  "Cocina equipada": Utensils,
  Lavandería: Shirt,
  "Aire acondicionado": Wind,
  Escritorio: Desk,
  "Escritorio de estudio": Desk,
  Armario: DoorOpen,
  "Armario empotrado": DoorOpen,
  Balcón: Flower2,
  Seguridad: Shield,
  "Seguridad 24/7": Shield,
}

export function ApartmentAmenities({ amenities }: ApartmentAmenitiesProps) {
  return (
    <div className="border-b border-border py-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Lo que ofrece este lugar</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] || Wifi
          return (
            <div key={index} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{amenity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
