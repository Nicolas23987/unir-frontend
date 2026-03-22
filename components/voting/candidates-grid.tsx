"use client"

import { useState, useEffect, useRef } from "react"
import { CandidateCard } from "@/components/candidate-card"
import { AuthModal } from "@/components/auth-modal"
import { Trophy } from "lucide-react"
import type { Candidata } from "@/lib/types"

const mockCandidates: Candidata[] = [
  {
    id_candidata: "1",
    nombre: "María González",
    descripcion: "Apasionada por la enfermería comunitaria y el servicio social.",
    foto_url: "/young-nursing-student-portrait-professional.jpg",
    instagram_url: "https://instagram.com/maria.gonzalez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 487,
    votos_percentage: 18.5,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "2",
    nombre: "Ana Martínez",
    descripcion: "Dedicada a la investigación en cuidados intensivos.",
    foto_url: "/nursing-student-portrait-elegant.jpg",
    instagram_url: "https://instagram.com/ana.martinez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 423,
    votos_percentage: 16.1,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "3",
    nombre: "Sofía Rodríguez",
    descripcion: "Enfocada en pediatría y cuidado infantil.",
    foto_url: "/young-woman-nursing-student-portrait.jpg",
    instagram_url: "https://instagram.com/sofia.rodriguez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 398,
    votos_percentage: 15.1,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "4",
    nombre: "Valentina López",
    descripcion: "Interesada en salud mental y bienestar emocional.",
    foto_url: "/nursing-student-professional-portrait.jpg",
    instagram_url: "https://instagram.com/valentina.lopez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 356,
    votos_percentage: 13.5,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "5",
    nombre: "Isabella Torres",
    descripcion: "Especializada en geriatría y cuidado del adulto mayor.",
    foto_url: "/nursing-student-portrait-confident.jpg",
    instagram_url: "https://instagram.com/isabella.torres",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 334,
    votos_percentage: 12.7,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "6",
    nombre: "Camila Hernández",
    descripcion: "Comprometida con la salud pública y prevención.",
    foto_url: "/young-nursing-student-portrait-smiling.jpg",
    instagram_url: "https://instagram.com/camila.hernandez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 312,
    votos_percentage: 11.9,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "7",
    nombre: "Daniela Ramírez",
    descripcion: "Apasionada por la enfermería quirúrgica.",
    foto_url: "/nursing-student-portrait-professional-elegant.jpg",
    instagram_url: "https://instagram.com/daniela.ramirez",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 289,
    votos_percentage: 11.0,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
  {
    id_candidata: "8",
    nombre: "Lucía Flores",
    descripcion: "Dedicada a la enfermería materno-infantil.",
    foto_url: "/nursing-student-portrait-beautiful.jpg",
    instagram_url: "https://instagram.com/lucia.flores",
    id_carrera: "enf-1",
    id_evento: "evento-1",
    votos_count: 248,
    votos_percentage: 9.4,
    carrera: {
      id_carrera: "enf-1",
      nombre: "Enfermería",
      descripcion: null,
      id_facultad: "fac-1",
    },
  },
]

export function CandidatesGrid() {
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [candidates, setCandidates] = useState<Candidata[]>(mockCandidates)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [pendingVote, setPendingVote] = useState<string | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-candidate-id")
            if (id) setVisibleCards((prev) => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [candidates])

  const handleVote = (candidateId: string) => {
    if (votedFor !== null) return

    setPendingVote(candidateId)
    setShowAuthModal(true)
  }

  const handleAuthComplete = () => {
    if (pendingVote === null) return

    console.log("[v0] Voting for candidate:", pendingVote)

    setVotedFor(pendingVote)
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id_candidata === pendingVote
          ? {
              ...candidate,
              votos_count: (candidate.votos_count || 0) + 1,
            }
          : candidate,
      ),
    )
    setShowAuthModal(false)
    setPendingVote(null)
  }

  const sortedCandidates = [...candidates].sort((a, b) => (b.votos_count || 0) - (a.votos_count || 0))

  return (
    <>
      <section id="candidatas" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Conoce a las Candidatas
            </h2>
            <p className="mx-auto max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Estudiantes destacadas de la Facultad de Enfermería que representan excelencia académica y compromiso
              social.
            </p>
          </div>

          {votedFor && (
            <div className="mb-8 rounded-xl bg-primary/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <p className="text-lg font-semibold text-foreground">¡Gracias por votar!</p>
              <p className="text-sm text-muted-foreground">Tu voto ha sido registrado exitosamente</p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sortedCandidates.map((candidate, index) => (
              <div
                key={candidate.id_candidata}
                ref={(el) => {
                  if (el) cardRefs.current.set(candidate.id_candidata, el)
                }}
                data-candidate-id={candidate.id_candidata}
                className={`transition-all duration-700 ${
                  visibleCards.has(candidate.id_candidata) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CandidateCard
                  candidate={candidate}
                  rank={index + 1}
                  onVote={handleVote}
                  hasVoted={votedFor !== null}
                  isVotedFor={votedFor === candidate.id_candidata}
                />
              </div>
            ))}
          </div>

          <div id="resultados" className="mt-16 rounded-2xl bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-center text-2xl font-bold text-foreground">Ranking Actual</h3>
            <div className="space-y-4">
              {sortedCandidates.slice(0, 3).map((candidate, index) => {
                const percentage = candidate.votos_percentage?.toFixed(1) || "0.0"
                return (
                  <div key={candidate.id_candidata} className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold ${
                        index === 0
                          ? "bg-primary text-white"
                          : index === 1
                            ? "bg-secondary text-white"
                            : "bg-muted-foreground/20 text-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{candidate.nombre}</p>
                      <p className="text-sm text-muted-foreground">{candidate.carrera?.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{percentage}%</p>
                      <p className="text-xs text-muted-foreground">{candidate.votos_count} votos</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {showAuthModal && (
        <AuthModal
          onClose={() => {
            setShowAuthModal(false)
            setPendingVote(null)
          }}
          onAuthComplete={handleAuthComplete}
        />
      )}
    </>
  )
}
