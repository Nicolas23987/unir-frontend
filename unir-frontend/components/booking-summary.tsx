import { Calendar, Users, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import type { Apartment } from "@/lib/types"

interface BookingSummaryProps {
  apartment: Apartment
  bookingData: {
    checkIn: string
    checkOut: string
    guests: number
    total: number
  }
}

export function BookingSummary({ apartment, bookingData }: BookingSummaryProps) {
  const calculateDays = () => {
    const start = new Date(bookingData.checkIn)
    const end = new Date(bookingData.checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const days = calculateDays()
  const serviceFee = bookingData.total * 0.1
  const totalWithFees = bookingData.total + serviceFee

  return (
    <Card className="sticky top-24 border-border">
      <CardContent className="p-6">
        <div className="mb-6 flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={apartment.images[0] || "/placeholder.svg"}
              alt={apartment.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{apartment.title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="font-semibold">{apartment.rating}</span>
              <span className="text-muted-foreground">({apartment.reviewCount})</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Detalles de la reserva</h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-foreground">Entrada</span>
                  <span className="font-medium text-foreground">
                    {new Date(bookingData.checkIn).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-foreground">Salida</span>
                  <span className="font-medium text-foreground">
                    {new Date(bookingData.checkOut).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Huéspedes</span>
              </div>
              <span className="font-medium text-foreground">{bookingData.guests}</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3 text-sm">
          <h4 className="font-semibold text-foreground">Desglose de precios</h4>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              ${apartment.price} x {days} {days === 1 ? "día" : "días"}
            </span>
            <span className="text-foreground">${bookingData.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tarifa de servicio</span>
            <span className="text-foreground">${serviceFee.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-base font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${totalWithFees.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
