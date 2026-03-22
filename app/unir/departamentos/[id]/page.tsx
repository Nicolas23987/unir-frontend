"use client"

import { MainNav } from "@/components/main-nav"
import { ApartmentGallery } from "@/components/apartment-gallery"
import { ApartmentInfo } from "@/components/apartment-info"
import { ApartmentAmenities } from "@/components/apartment-amenities"
import { ApartmentReviews } from "@/components/apartment-reviews"
import { ApartmentLocation } from "@/components/apartment-location"
import { RoommatesSection } from "@/components/roommates-section"
import { BookingCard } from "@/components/booking-card"
import { LandlordCard } from "@/components/landlord-card"
import type { Apartment, Review, Roommate, Landlord } from "@/lib/types"

const mockApartment: Apartment = {
  id: "1",
  title: "Departamento moderno cerca de UNIR",
  description:
    "Hermoso departamento de 2 habitaciones con vista panorámica al parque. Ubicado a solo 5 minutos caminando del campus principal de UNIR. El espacio cuenta con iluminación natural, cocina equipada y zona de estudio. Perfecto para estudiantes que buscan comodidad y cercanía a la universidad.",
  location: "A 5 min del campus",
  address: "Av. Universidad 123, Guayaquil, Ecuador",
  price: 450,
  rating: 4.9,
  reviewCount: 127,
  images: [
    "/modern-apartment-bedroom-with-desk-and-window.jpg",
    "/bright-living-room-with-sofa.jpg",
    "/equipped-kitchen-with-appliances.jpg",
    "/clean-bathroom-shower.png",
    "/balcony-with-park-view.jpg",
  ],
  type: "shared",
  bedrooms: 2,
  bathrooms: 1,
  maxOccupants: 3,
  currentOccupants: 1,
  amenities: [
    "Wifi de alta velocidad",
    "Cocina equipada",
    "Lavandería",
    "Aire acondicionado",
    "Escritorio de estudio",
    "Armario empotrado",
    "Balcón",
    "Seguridad 24/7",
  ],
  verified: true,
  landlordId: "landlord-1",
  coordinates: { lat: -0.953325, lng: -80.745714 },
}

const mockRoommates: Roommate[] = [
  {
    id: "1",
    name: "Carlos Mendoza",
    age: 21,
    university: "UNIR",
    major: "Ingeniería de Sistemas",
    bio: "Estudiante de 4to año, me gusta estudiar en las tardes y mantener el espacio ordenado. Busco compañeros responsables.",
    photo: "/male-university-student.png",
    interests: ["Programación", "Videojuegos", "Deportes"],
  },
]

const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user-1",
    userName: "María González",
    userPhoto: "/female-student-avatar.png",
    rating: 5.0,
    comment:
      "Excelente departamento, muy limpio y cómodo. La ubicación es perfecta para ir a la universidad caminando. Carlos es un excelente roommate, muy respetuoso y ordenado.",
    date: "2025-01-15",
    categories: {
      cleanliness: 5.0,
      accuracy: 5.0,
      checkin: 5.0,
      communication: 5.0,
      location: 5.0,
      value: 4.8,
    },
  },
  {
    id: "2",
    userId: "user-2",
    userName: "Juan Pérez",
    userPhoto: "/male-student-avatar.png",
    rating: 4.8,
    comment:
      "Muy buen lugar para estudiantes. El wifi es rápido y hay buen ambiente de estudio. La cocina está bien equipada y el baño siempre limpio.",
    date: "2024-12-20",
    categories: {
      cleanliness: 5.0,
      accuracy: 4.5,
      checkin: 5.0,
      communication: 5.0,
      location: 5.0,
      value: 4.5,
    },
  },
  {
    id: "3",
    userId: "user-3",
    userName: "Ana Rodríguez",
    userPhoto: "/female-student-avatar.png",
    rating: 5.0,
    comment:
      "Súper recomendado! La cercanía a la universidad es increíble. El departamento tiene todo lo necesario y más. El arrendatario responde rápido a cualquier consulta.",
    date: "2024-11-10",
    categories: {
      cleanliness: 5.0,
      accuracy: 5.0,
      checkin: 5.0,
      communication: 5.0,
      location: 5.0,
      value: 5.0,
    },
  },
]

const mockLandlord: Landlord = {
  id: "landlord-1",
  name: "Roberto Sánchez",
  photo: "/professional-landlord-portrait.jpg",
  verified: true,
  joinDate: "2022-03-15",
  responseTime: "1 hora",
  responseRate: 98,
  properties: 5,
}

export default function ApartmentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  console.log("[v0] Loading apartment detail page for ID:", id)

  return (
    <>
      <MainNav />
      <main className="min-h-screen bg-background">
        <ApartmentGallery images={mockApartment.images} title={mockApartment.title} />

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ApartmentInfo apartment={mockApartment} />
              <ApartmentAmenities amenities={mockApartment.amenities} />
              {mockApartment.type === "shared" && mockApartment.currentOccupants > 0 && (
                <RoommatesSection roommates={mockRoommates} maxOccupants={mockApartment.maxOccupants} />
              )}
              <ApartmentReviews reviews={mockReviews} rating={mockApartment.rating} />
              <ApartmentLocation address={mockApartment.address} coordinates={mockApartment.coordinates} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <BookingCard apartment={mockApartment} />
                <LandlordCard landlord={mockLandlord} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
