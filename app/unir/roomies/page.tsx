"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoommateProfileCard } from "@/components/roommate-profile-card"
import { RoommateForumPost } from "@/components/roommate-forum-post"
import { Search, SlidersHorizontal, Sparkles, Users, MessageSquare, TrendingUp } from "lucide-react"
import { useState } from "react"
import type { RoommateProfile, RoommatePost } from "@/lib/types"
import { ProtectedRoute } from "@/components/protected-route"

export default function RoomiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data - would come from API
  const roommateProfiles: RoommateProfile[] = [
    {
      id: "1",
      userId: "user1",
      name: "María González",
      age: 20,
      photo: "/smiling-student.png",
      university: "Universidad de Guayaquil",
      major: "Ingeniería en Sistemas",
      yearOfStudy: 2,
      cityOfOrigin: "Quito",
      bio: "Estudiante de sistemas buscando roomie para compartir depa cerca de la U. Me gusta estudiar en casa, soy ordenada y tranquila. Busco alguien con quien compartir gastos y crear un buen ambiente de estudio.",
      lookingFor: "roommate",
      budget: { min: 200, max: 300 },
      moveInDate: "2025-02-01",
      interests: ["Programación", "Música", "Yoga", "Café", "Series"],
      lifestyle: {
        sleepSchedule: "early-bird",
        cleanliness: "very-clean",
        socialLevel: "moderate",
        studyHabits: "home",
        smoking: false,
        pets: false,
        cooking: "often",
        guests: "sometimes",
      },
      preferences: {
        gender: "female",
        ageRange: { min: 18, max: 25 },
        sameUniversity: true,
        sameMajor: false,
      },
      verified: true,
      compatibilityScore: 95,
      createdAt: "2025-01-10",
      lastActive: "2025-01-14",
    },
    {
      id: "2",
      userId: "user2",
      name: "Carlos Mendoza",
      age: 22,
      photo: "/young-man-student-casual.jpg",
      university: "Universidad de Guayaquil",
      major: "Administración de Empresas",
      yearOfStudy: 3,
      cityOfOrigin: "Cuenca",
      bio: "De Cuenca, estudiando administración. Busco roomie responsable para compartir depa. Soy social pero respeto los espacios. Me gusta cocinar y hacer ejercicio.",
      lookingFor: "room",
      budget: { min: 150, max: 250 },
      moveInDate: "2025-02-15",
      interests: ["Gym", "Fútbol", "Cocina", "Emprendimiento", "Viajes"],
      lifestyle: {
        sleepSchedule: "flexible",
        cleanliness: "clean",
        socialLevel: "social",
        studyHabits: "flexible",
        smoking: false,
        pets: false,
        cooking: "often",
        guests: "often",
      },
      preferences: {
        gender: "any",
        ageRange: { min: 20, max: 26 },
        sameUniversity: false,
        sameMajor: false,
      },
      verified: true,
      compatibilityScore: 88,
      createdAt: "2025-01-12",
      lastActive: "2025-01-14",
    },
    {
      id: "3",
      userId: "user3",
      name: "Ana Rodríguez",
      age: 19,
      photo: "/young-woman-student-books.jpg",
      university: "Universidad de Guayaquil",
      major: "Medicina",
      yearOfStudy: 1,
      cityOfOrigin: "Machala",
      bio: "Primera vez viviendo sola, busco roomie que entienda la vida universitaria. Estudio medicina así que paso mucho tiempo estudiando. Busco ambiente tranquilo pero amigable.",
      lookingFor: "roommate",
      budget: { min: 180, max: 280 },
      moveInDate: "2025-02-01",
      interests: ["Medicina", "Lectura", "Café", "Películas", "Plantas"],
      lifestyle: {
        sleepSchedule: "night-owl",
        cleanliness: "very-clean",
        socialLevel: "quiet",
        studyHabits: "home",
        smoking: false,
        pets: true,
        cooking: "sometimes",
        guests: "rarely",
      },
      preferences: {
        gender: "female",
        ageRange: { min: 18, max: 23 },
        sameUniversity: true,
        sameMajor: false,
      },
      verified: true,
      compatibilityScore: 92,
      createdAt: "2025-01-11",
      lastActive: "2025-01-14",
    },
  ]

  const forumPosts: RoommatePost[] = [
    {
      id: "1",
      authorId: "user1",
      author: roommateProfiles[0],
      title: "Busco roomie mujer para depa cerca de la U 🏠",
      content:
        "Hola! Soy María, estudio sistemas y busco una roomie para compartir un depa de 2 habitaciones cerca de la universidad. El depa cuesta $500 al mes, así que serían $250 c/u + servicios. Soy ordenada, tranquila y me gusta estudiar en casa. Si te interesa, escríbeme!",
      category: "looking-for-roommate",
      tags: ["mujer", "cerca-universidad", "estudiante", "ordenada"],
      likes: 24,
      comments: [
        {
          id: "c1",
          postId: "1",
          authorId: "user4",
          author: {
            id: "user4",
            name: "Laura Pérez",
            photo: "/woman-student.png",
          },
          content: "Hola María! Me interesa mucho. También estudio en la U y busco algo cerca. Te puedo escribir?",
          likes: 5,
          createdAt: "2025-01-13T10:30:00Z",
        },
      ],
      createdAt: "2025-01-12T15:00:00Z",
      updatedAt: "2025-01-13T10:30:00Z",
    },
    {
      id: "2",
      authorId: "user2",
      author: roommateProfiles[1],
      title: "Tips para convivir con roomies por primera vez?",
      content:
        "Hola comunidad! Es mi primera vez viviendo con roomies y quiero saber qué consejos me pueden dar para que la convivencia sea buena. Qué reglas establecieron? Cómo dividen los gastos? Gracias!",
      category: "advice",
      tags: ["consejos", "primera-vez", "convivencia"],
      likes: 45,
      comments: [
        {
          id: "c2",
          postId: "2",
          authorId: "user5",
          author: {
            id: "user5",
            name: "Diego Torres",
            photo: "/man-student.png",
          },
          content:
            "Lo más importante es establecer reglas claras desde el inicio: horarios de limpieza, cómo dividir gastos, respeto por los espacios. Y comunicación siempre!",
          likes: 12,
          createdAt: "2025-01-13T11:00:00Z",
        },
      ],
      createdAt: "2025-01-13T09:00:00Z",
      updatedAt: "2025-01-13T11:00:00Z",
    },
  ]

  return (
    <ProtectedRoute>
      <MainNav />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Encuentra tu Roomie Ideal</h1>
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Conecta con estudiantes universitarios que buscan compartir departamento. Usa nuestro sistema de
                compatibilidad para encontrar el match perfecto.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Estudiantes</div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Compatibilidad</div>
                </div>
                <div className="rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Tabs defaultValue="discover" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="discover" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Descubrir
              </TabsTrigger>
              <TabsTrigger value="forum" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Foro
              </TabsTrigger>
              <TabsTrigger value="matches" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Mis Matches
              </TabsTrigger>
            </TabsList>

            {/* Discover Tab */}
            <TabsContent value="discover" className="mt-6">
              {/* Search and Filters */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, universidad, intereses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>
              </div>

              {/* Quick Filters */}
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  De otras ciudades
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  Misma universidad
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  Verificados
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  Disponible ahora
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  Alta compatibilidad
                </Badge>
              </div>

              {/* Roommate Profiles Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {roommateProfiles.map((profile) => (
                  <RoommateProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum" className="mt-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Todos
                  </Button>
                  <Button variant="ghost" size="sm">
                    Busco Roomie
                  </Button>
                  <Button variant="ghost" size="sm">
                    Busco Cuarto
                  </Button>
                  <Button variant="ghost" size="sm">
                    Consejos
                  </Button>
                </div>
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Nueva Publicación
                </Button>
              </div>

              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <RoommateForumPost key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            {/* Matches Tab */}
            <TabsContent value="matches" className="mt-6">
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Users className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">Completa tu perfil para ver matches</h3>
                <p className="mt-2 text-muted-foreground">
                  Responde nuestro cuestionario de compatibilidad para encontrar roomies perfectos para ti
                </p>
                <Button className="mt-6">Completar Cuestionario</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </ProtectedRoute>
  )
}
