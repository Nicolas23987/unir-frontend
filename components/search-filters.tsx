"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const types = [
    { id: "shared", label: "Compartido" },
    { id: "private", label: "Privado" },
  ]

  const amenities = [
    { id: "wifi", label: "Wifi" },
    { id: "furnished", label: "Amueblado" },
    { id: "kitchen", label: "Cocina" },
    { id: "laundry", label: "Lavandería" },
    { id: "parking", label: "Estacionamiento" },
    { id: "gym", label: "Gimnasio" },
  ]

  const activeFiltersCount =
    selectedTypes.length + selectedAmenities.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  return (
    <div className="border-b border-border bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Más de 1000 alojamientos</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de búsqueda</SheetTitle>
              <SheetDescription>Personaliza tu búsqueda de departamentos</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Rango de precio</Label>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">${priceRange[0]}</span>
                  <span className="text-muted-foreground">${priceRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>

              {/* Type */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Tipo de alojamiento</Label>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type.id])
                          } else {
                            setSelectedTypes(selectedTypes.filter((t) => t !== type.id))
                          }
                        }}
                      />
                      <label
                        htmlFor={type.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Comodidades</Label>
                <div className="space-y-2">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity.id])
                          } else {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity.id))
                          }
                        }}
                      />
                      <label
                        htmlFor={amenity.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setPriceRange([0, 1000])
                    setSelectedTypes([])
                    setSelectedAmenities([])
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
