"use client"

import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Apartment } from "@/lib/types"

interface BookingCardProps {
  apartment: Apartment
}

export function BookingCard({ apartment }: BookingCardProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days * (apartment.price / 30))
  }

  const total = calculateTotal()

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert("Por favor selecciona las fechas de entrada y salida")
      return
    }

    const bookingData = {
      apartmentId: apartment.id,
      checkIn,
      checkOut,
      guests,
      total,
    }

    // Store booking data in sessionStorage
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))

    // Navigate to booking confirmation page
    router.push(`/reservar/${apartment.id}`)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6">
        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">${apartment.price}</span>
          <span className="text-sm text-muted-foreground">/ mes</span>
        </div>

        <div className="mb-4 space-y-4">
          <div>
            <Label htmlFor="checkin" className="mb-2 block text-sm font-medium">
              Fecha de entrada
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="checkout" className="mb-2 block text-sm font-medium">
              Fecha de salida
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guests" className="mb-2 block text-sm font-medium">
              Huéspedes
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="guests"
                type="number"
                min={1}
                max={apartment.maxOccupants}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleReserve} className="mb-4 w-full bg-primary text-white hover:bg-primary/90">
          Reservar
        </Button>

        {total > 0 && (
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total estimado</span>
              <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">No se te cobrará todavía</p>
      </CardContent>
    </Card>
  )
}
