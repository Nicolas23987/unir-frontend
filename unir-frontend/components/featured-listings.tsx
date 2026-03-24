"use client"

import { Star, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

//obtengo algo como esto en el backend, pero por ahora lo dejo hardcodeado
const mockListings = [
  {
    id: "1",
    title: "Departamento moderno cerca de UNIR",
    location: "A 5 min del campus",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image: "/modern-apartment-bedroom.png",
    type: "Compartido",
    roommates: 2,
    amenities: ["Wifi", "Cocina", "Lavandería"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "2",
    title: "Studio privado con vista panorámica",
    location: "Centro universitario",
    price: 650,
    rating: 5.0,
    reviews: 89,
    image: "/studio-apartment-city-view.jpg",
    type: "Privado",
    roommates: 0,
    amenities: ["Wifi", "Amueblado", "Gym"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "3",
    title: "Habitación en casa compartida",
    location: "Zona residencial tranquila",
    price: 320,
    rating: 4.8,
    reviews: 203,
    image: "/shared-house-bedroom.jpg",
    type: "Compartido",
    roommates: 3,
    amenities: ["Wifi", "Jardín", "Parking"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "4",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "5",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "6",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "7",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "8",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "9",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
  {
    id: "10",
    title: "Loft espacioso para estudiantes",
    location: "A 10 min caminando",
    price: 580,
    rating: 4.7,
    reviews: 156,
    image: "/spacious-loft-apartment.jpg",
    type: "Compartido",
    roommates: 1,
    amenities: ["Wifi", "Terraza", "Cocina"],
    lat: -0.9380,
    lng: -80.7095
  },
]

//ahora paso 

export function FeaturedListings() {
  return (
    <section className="px-4  py-0">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 lg:hidden ">
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Departamentos destacados</h2>
          <p className="text-lg text-muted-foreground">Los más populares entre estudiantes universitarios</p>
        </div>

        <div className="grid gap-6 grid-cols-2">
          {mockListings.map((listing) => (
            <Link key={listing.id} href={`departamentos/${listing.id}`}>
              <Card className="py-0 gap-1 group cursor-pointer overflow-hidden border-border transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge style={{ background: 'var(--primary)' }} className="absolute right-3 top-3 text-foreground hover:bg-white">
                    {listing.type}
                  </Badge>
                </div>
                <CardContent className="p-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-foreground">${listing.price}</span>
                    <span className="text-sm text-muted-foreground">/ mes</span>
                  </div>                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                  </div>
                  <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="mb-3 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{listing.rating}</span>
                      <span className="text-muted-foreground">({listing.reviews})</span>
                    </div>
                    {listing.roommates > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{listing.roommates} roomies</span>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {amenity}
                      </span>
                    ))}
                  </div>

                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
