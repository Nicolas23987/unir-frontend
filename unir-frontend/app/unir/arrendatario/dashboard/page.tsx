"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Plus, Eye, Calendar, DollarSign, Users, Star, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockProperties = [
  {
    id: "1",
    title: "Departamento moderno cerca de UNIR",
    image: "/modern-apartment-bedroom.png",
    status: "active",
    views: 342,
    bookings: 5,
    revenue: 2250,
    rating: 4.9,
  },
  {
    id: "2",
    title: "Studio privado con vista panorámica",
    image: "/studio-apartment-city-view.jpg",
    status: "active",
    views: 189,
    bookings: 3,
    revenue: 1950,
    rating: 5.0,
  },
]

const mockBookings = [
  {
    id: "1",
    property: "Departamento moderno cerca de UNIR",
    guest: "María González",
    checkIn: "2025-02-15",
    checkOut: "2025-03-15",
    status: "confirmed",
    amount: 450,
  },
  {
    id: "2",
    property: "Studio privado con vista panorámica",
    guest: "Carlos Mendoza",
    checkIn: "2025-02-20",
    checkOut: "2025-03-20",
    status: "pending",
    amount: 650,
  },
]

export default function LandlordDashboardPage() {
  return (
    <>
      <MainNav />
      <main className="min-h-screen bg-muted">
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Panel de arrendatario</h1>
                <p className="text-muted-foreground">Gestiona tus propiedades y reservas</p>
              </div>
              <Link href="/arrendatario/nueva-propiedad">
                <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Nueva propiedad
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Propiedades</p>
                    <p className="text-3xl font-bold text-foreground">2</p>
                  </div>
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reservas activas</p>
                    <p className="text-3xl font-bold text-foreground">8</p>
                  </div>
                  <Calendar className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos este mes</p>
                    <p className="text-3xl font-bold text-foreground">$4,200</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Calificación</p>
                    <p className="text-3xl font-bold text-foreground">4.95</p>
                  </div>
                  <Star className="h-8 w-8 fill-accent text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList>
              <TabsTrigger value="properties">Propiedades</TabsTrigger>
              <TabsTrigger value="bookings">Reservas</TabsTrigger>
              <TabsTrigger value="messages">Mensajes</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-4">
              {mockProperties.map((property) => (
                <Card key={property.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">{property.title}</h3>
                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                              Activo
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span>Vistas</span>
                            </div>
                            <p className="font-semibold text-foreground">{property.views}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Reservas</span>
                            </div>
                            <p className="font-semibold text-foreground">{property.bookings}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="h-4 w-4" />
                              <span>Ingresos</span>
                            </div>
                            <p className="font-semibold text-foreground">${property.revenue}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Star className="h-4 w-4" />
                              <span>Rating</span>
                            </div>
                            <p className="font-semibold text-foreground">{property.rating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-foreground">{booking.property}</h3>
                        <div className="mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{booking.guest}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Check-in: {new Date(booking.checkIn).toLocaleDateString("es-ES")}</span>
                          <span>Check-out: {new Date(booking.checkOut).toLocaleDateString("es-ES")}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="mb-2 text-2xl font-bold text-foreground">${booking.amount}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {booking.status === "confirmed" ? "Confirmado" : "Pendiente"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="messages">
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">No hay mensajes nuevos</h3>
                  <p className="text-sm text-muted-foreground">Los mensajes de tus huéspedes aparecerán aquí</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
