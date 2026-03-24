"use client"

import { MainNav } from "@/components/main-nav"
import { BookingSummary } from "@/components/booking-summary"
import { PaymentForm } from "@/components/payment-form"
import { BookingRules } from "@/components/booking-rules"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Apartment } from "@/lib/types"

const mockApartment: Apartment = {
  id: "1",
  title: "Departamento moderno cerca de UNIR",
  description: "Hermoso departamento de 2 habitaciones con vista panorámica",
  location: "A 5 min del campus",
  address: "Av. Universidad 123, Lima",
  price: 450,
  rating: 4.9,
  reviewCount: 127,
  images: ["/modern-apartment-bedroom.png"],
  type: "shared",
  bedrooms: 2,
  bathrooms: 1,
  maxOccupants: 3,
  currentOccupants: 1,
  amenities: ["Wifi", "Cocina", "Lavandería"],
  verified: true,
  landlordId: "landlord-1",
  coordinates: { lat: -12.0464, lng: -77.0428 },
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData")
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      router.push(`/departamentos/${id}`)
    }
  }, [id, router])

  if (!bookingData) {
    return null
  }

  return (
    <>
      <MainNav />
      <main className="min-h-screen bg-muted py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Confirma y paga</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <BookingRules />
              <PaymentForm apartment={mockApartment} bookingData={bookingData} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BookingSummary apartment={mockApartment} bookingData={bookingData} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
