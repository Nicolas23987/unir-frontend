"use client"

import { MainNav } from "@/components/main-nav"
import { ProtectedRoute } from "@/components/protected-route"
import { Heart, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function FavoritosPage() {
  // Mock data - would come from API
  const favorites = [
    {
      id: "1",
      title: "Moderno Studio con Vista a la Ciudad",
      location: "Urdesa, Guayaquil",
      price: 280,
      rating: 4.9,
      reviewCount: 27,
      image: "/modern-apartment-bedroom.png",
    },
    {
      id: "2",
      title: "Departamento Compartido 2 Habitaciones",
      location: "Kennedy Norte, Guayaquil",
      price: 200,
      rating: 4.8,
      reviewCount: 15,
      image: "/shared-apartment-living-room.jpg",
    },
  ]

  return (
    <ProtectedRoute>
      <MainNav />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              Mis Favoritos
            </h1>
            <p className="mt-2 text-muted-foreground">Departamentos que has guardado para revisar más tarde</p>
          </div>

          {favorites.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                  <Link href={`/departamentos/${apartment.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={apartment.image || "/placeholder.svg"}
                        alt={apartment.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={(e) => {
                          e.preventDefault()
                          console.log("[v0] Removing from favorites:", apartment.id)
                        }}
                      >
                        <Heart className="h-4 w-4 fill-primary text-primary" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground line-clamp-1">{apartment.title}</h3>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{apartment.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium text-foreground">{apartment.rating}</span>
                          <span className="text-muted-foreground">({apartment.reviewCount})</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-foreground">${apartment.price}</span>
                        <span className="text-sm text-muted-foreground">/ mes</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No tienes favoritos aún</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Guarda departamentos que te interesen para encontrarlos fácilmente más tarde
                </p>
                <Link href="/buscar">
                  <Button>Explorar Departamentos</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}
