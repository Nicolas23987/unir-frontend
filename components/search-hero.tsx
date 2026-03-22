"use client"

import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useUniversitySearch } from "@/hooks/use-university-search"

export function SearchHero() {
  const [checkIn, setCheckIn] = useState("")
  const [guests, setGuests] = useState("")
  const [search, setSearch] = useState("")
  const [searchMode, setSearchMode] = useState(false)
  // const [universities, setUniversities] = useState([])




  const handleSearchMode = () => {
    setSearchMode(searchMode => !searchMode)
  }

  const { universities, loading } = useUniversitySearch(search)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted px-4 py-4 md:py-4">
      <div className="mx-auto max-w-6xl">

        {/* Search Form */}
        <div className="mx-auto max-w-4xl rounded-2xl md:rounded-full border border-border bg-card p-2 shadow-xl">




          <div className="grid gap-2 md:grid-cols-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Elige tu universidad"
                value={search}
                onChange={
                  (e) => {
                    handleSearchMode()
                    setSearch(e.target.value);
                  }
                }
                className="h-14 border-0 bg-transparent pl-11 focus-visible:ring-0"
              />


              {searchMode && (
                <div
                  style={{ background: "var(--background)" }}
                  className="absolute border w-full mt-4 mr-4 rounded-lg shadow-lg z-10"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-1 p-3 text-lg">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce [animation-delay:0.2s]">.</span>
                      <span className="animate-bounce [animation-delay:0.4s]">.</span>
                    </div>
                  ) : universities.length === 0 ? (
                    <div className="p-2 text-gray-400">
                      No se encontraron universidades
                    </div>
                  ) : (
                    universities.map((u: any) => (
                      <div
                        key={u.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleSearchMode()
                          setSearch(u.name)
                        }}
                      >
                        {u.name}
                      </div>
                    ))
                  )}
                </div>
              )}



            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="date"
                placeholder="Fecha de entrada"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-14 border-0 bg-transparent pl-11 focus-visible:ring-0"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Huéspedes"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                className="h-14 border-0 bg-transparent pl-11 focus-visible:ring-0"
              />
            </div>
            <Button className="h-14 md:rounded-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Compartido", "Privado", "Cerca del campus", "Con roomies", "Amueblado"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-border bg-background px-6 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
