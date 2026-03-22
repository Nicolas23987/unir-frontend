"use client"

import { MainNav } from "@/components/main-nav"
import { SearchFilters } from "@/components/search-filters"
import { ListingsGrid } from "@/components/listings-grid"
import { ListingsMap } from "@/components/listings-map"
import { useState } from "react"
import type { Apartment } from "@/lib/types"

const mockApartments: Apartment[] = [
  {
    id: "1",
    title: "Departamento moderno cerca de UNIR",
    description: "Hermoso departamento de 2 habitaciones con vista panorámica",
    location: "A 5 min del campus",
    address: "Av. Universidad 123, Guayaquil",
    price: 450,
    rating: 4.9,
    reviewCount: 127,
    images: [
      "/modern-bedroom-desk.png",
      "/cozy-apartment-living-room.png",
      "/modern-kitchen.png",
      "/apartment-bathroom.png",
    ],
    type: "shared",
    bedrooms: 2,
    bathrooms: 1,
    maxOccupants: 3,
    currentOccupants: 1,
    amenities: ["Wifi", "Cocina", "Lavandería", "Aire acondicionado"],
    verified: true,
    landlordId: "landlord-1",
    coordinates: { lat: -0.953325, lng: -80.745714 },
  },
  {
    id: "2",
    title: "Studio privado con vista panorámica",
    description: "Moderno studio completamente amueblado en el corazón de la ciudad",
    location: "Centro universitario",
    address: "Jr. Los Estudiantes 456, Guayaquil",
    price: 650,
    rating: 5.0,
    reviewCount: 89,
    images: ["/studio-apartment-with-city-view.jpg", "/studio-kitchen-area.jpg", "/studio-bathroom.jpg"],
    type: "private",
    bedrooms: 1,
    bathrooms: 1,
    maxOccupants: 1,
    currentOccupants: 0,
    amenities: ["Wifi", "Amueblado", "Gym", "Seguridad 24/7"],
    verified: true,
    landlordId: "landlord-2",
    coordinates: { lat: -0.954325, lng: -80.746714 },
  },
  {
    id: "3",
    title: "Habitación en casa compartida",
    description: "Acogedora habitación en casa con jardín y ambiente familiar",
    location: "Zona residencial tranquila",
    address: "Calle Las Flores 789, Guayaquil",
    price: 320,
    rating: 4.8,
    reviewCount: 203,
    images: ["/shared-house-bedroom.jpg", "/house-garden.jpg", "/shared-kitchen.jpg"],
    type: "shared",
    bedrooms: 4,
    bathrooms: 2,
    maxOccupants: 4,
    currentOccupants: 3,
    amenities: ["Wifi", "Jardín", "Parking", "Cocina compartida"],
    verified: true,
    landlordId: "landlord-3",
    coordinates: { lat: -0.952325, lng: -80.744714 },
  },
  {
    id: "4",
    title: "Loft espacioso para estudiantes",
    description: "Loft moderno con terraza y excelente iluminación natural",
    location: "A 10 min caminando",
    address: "Av. Universitaria 321, Guayaquil",
    price: 580,
    rating: 4.7,
    reviewCount: 156,
    images: ["/spacious-loft-apartment.jpg", "/loft-terrace.jpg", "/loft-living-area.jpg"],
    type: "shared",
    bedrooms: 2,
    bathrooms: 1,
    maxOccupants: 2,
    currentOccupants: 0,
    amenities: ["Wifi", "Terraza", "Cocina", "Lavandería"],
    verified: true,
    landlordId: "landlord-4",
    coordinates: { lat: -0.955325, lng: -80.747714 },
  },
  {
    id: "5",
    title: "Departamento cerca del metro",
    description: "Excelente ubicación con acceso directo al transporte público",
    location: "Junto a estación de metro",
    address: "Av. Grau 555, Guayaquil",
    price: 480,
    rating: 4.6,
    reviewCount: 94,
    images: ["/apartment-near-metro-station.jpg", "/apartment-balcony.jpg", "/furnished-bedroom.jpg"],
    type: "shared",
    bedrooms: 3,
    bathrooms: 2,
    maxOccupants: 3,
    currentOccupants: 2,
    amenities: ["Wifi", "Amueblado", "Balcón", "Cocina"],
    verified: true,
    landlordId: "landlord-5",
    coordinates: { lat: -0.951325, lng: -80.743714 },
  },
  {
    id: "6",
    title: "Mini departamento económico",
    description: "Perfecto para estudiantes que buscan economía y comodidad",
    location: "Cerca de bibliotecas",
    address: "Jr. Académico 888, Guayaquil",
    price: 380,
    rating: 4.5,
    reviewCount: 67,
    images: ["/small-affordable-apartment.jpg", "/compact-kitchen.jpg", "/study-desk-area.jpg"],
    type: "private",
    bedrooms: 1,
    bathrooms: 1,
    maxOccupants: 1,
    currentOccupants: 0,
    amenities: ["Wifi", "Cocina", "Escritorio"],
    verified: true,
    landlordId: "landlord-6",
    coordinates: { lat: -0.956325, lng: -80.748714 },
  },
]

export default function SearchPage() {
  const [apartments] = useState<Apartment[]>(mockApartments)
  const [selectedApartment, setSelectedApartment] = useState<string | null>(null)
  const [hoveredApartment, setHoveredApartment] = useState<string | null>(null)

  return (
    <>
      <MainNav />
      <main className="flex h-[calc(100vh-5rem)]">
        {/* Left side - Filters and Listings */}
        <div className="flex w-full flex-col overflow-hidden lg:w-1/2">
          <SearchFilters />
          <ListingsGrid
            apartments={apartments}
            selectedId={selectedApartment}
            hoveredId={hoveredApartment}
            onSelect={setSelectedApartment}
            onHover={setHoveredApartment}
          />
        </div>

        {/* Right side - Map */}
        <div className="hidden lg:block lg:w-1/2">
          <ListingsMap
            apartments={apartments}
            selectedId={selectedApartment}
            hoveredId={hoveredApartment}
            onSelectApartment={setSelectedApartment}
            onHoverApartment={setHoveredApartment}
          />
        </div>
      </main>
    </>
  )
}
