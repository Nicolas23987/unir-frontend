"use client"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, GraduationCap, MapPin, Calendar, Heart, MessageCircle, Star, Home, Mail, Phone } from "lucide-react"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = params.id

  // Mock user data - replace with API call
  const user = {
    id: userId,
    name: "María González",
    email: "maria.gonzalez@unir.edu.ec",
    phone: "+593 99 123 4567",
    photo: "/student-woman.jpg",
    verified: true,
    university: "Universidad Internacional del Ecuador",
    major: "Ingeniería en Sistemas",
    semester: "6to Semestre",
    age: 21,
    bio: "Estudiante de ingeniería apasionada por la tecnología y el desarrollo web. Me gusta conocer gente nueva y compartir experiencias. Busco un lugar tranquilo para estudiar cerca de la universidad.",
    location: "Guayaquil, Ecuador",
    joinDate: "Enero 2024",
    interests: ["Programación", "Música", "Deportes", "Lectura", "Viajes"],
    preferences: {
      cleanliness: "Muy limpio",
      noise: "Ambiente tranquilo",
      schedule: "Madrugador",
      pets: "Me gustan los animales",
    },
    stats: {
      reviews: 12,
      rating: 4.8,
      reservations: 3,
      favorites: 15,
    },
    reviews: [
      {
        id: "1",
        from: "Carlos Mendoza",
        fromPhoto: "/student-man.jpg",
        rating: 5,
        comment: "Excelente compañera de departamento, muy respetuosa y ordenada.",
        date: "Hace 2 meses",
      },
      {
        id: "2",
        from: "Ana Torres",
        fromPhoto: "/student-woman-2.jpg",
        rating: 5,
        comment: "María es una persona muy amable y considerada. Recomendada 100%.",
        date: "Hace 4 meses",
      },
    ],
    currentApartment: {
      id: "1",
      title: "Departamento cerca de UNIR",
      image: "/modern-apartment.jpg",
      price: 350,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          ← Volver
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    {user.verified && <Shield className="h-5 w-5 text-secondary" />}
                  </div>
                  <p className="text-muted-foreground mb-4">{user.age} años</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        {user.stats.rating}
                      </div>
                      <p className="text-xs text-muted-foreground">{user.stats.reviews} reseñas</p>
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{user.stats.reservations}</div>
                      <p className="text-xs text-muted-foreground">Reservas</p>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Enviar mensaje
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      Agregar a favoritos
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{user.major}</p>
                      <p className="text-muted-foreground">{user.university}</p>
                      <p className="text-muted-foreground">{user.semester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground">{user.location}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground">Miembro desde {user.joinDate}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground">{user.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user.currentApartment && (
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Departamento actual
                  </h3>
                  <img
                    src={user.currentApartment.image || "/placeholder.svg"}
                    alt={user.currentApartment.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <p className="font-medium text-foreground mb-1">{user.currentApartment.title}</p>
                  <p className="text-sm text-muted-foreground">${user.currentApartment.price}/mes</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Acerca de</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                <TabsTrigger value="preferences">Preferencias</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="border-border">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Biografía</h3>
                      <p className="text-foreground leading-relaxed">{user.bio}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Intereses</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Verificación</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-secondary" />
                          <span className="text-foreground">Identidad verificada</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-secondary" />
                          <span className="text-foreground">Email verificado</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap className="h-4 w-4 text-secondary" />
                          <span className="text-foreground">Estudiante verificado</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{user.stats.reviews} reseñas</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= user.stats.rating ? "fill-secondary text-secondary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-foreground">{user.stats.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {user.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start gap-4 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.fromPhoto || "/placeholder.svg"} alt={review.from} />
                              <AvatarFallback>{review.from[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-foreground">{review.from}</h4>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="flex mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating ? "fill-secondary text-secondary" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-foreground leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Preferencias de convivencia</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-foreground">Limpieza</span>
                        <Badge variant="secondary">{user.preferences.cleanliness}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-foreground">Nivel de ruido</span>
                        <Badge variant="secondary">{user.preferences.noise}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-foreground">Horario</span>
                        <Badge variant="secondary">{user.preferences.schedule}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-foreground">Mascotas</span>
                        <Badge variant="secondary">{user.preferences.pets}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
