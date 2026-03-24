"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ApartmentGalleryProps {
  images: string[]
  title: string
}

export function ApartmentGallery({ images, title }: ApartmentGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
          {/* Main Image */}
          <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-l-xl md:aspect-auto">
            <Image src={images[0] || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>

          {/* Secondary Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={`relative hidden aspect-[4/3] overflow-hidden md:block ${
                index === 1 ? "rounded-tr-xl" : index === 3 ? "rounded-br-xl" : ""
              }`}
            >
              <Image src={image || "/placeholder.svg"} alt={`${title} ${index + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-4 right-8 gap-2 border-border bg-background text-foreground hover:bg-muted"
          onClick={() => setShowAllPhotos(true)}
        >
          <Grid3x3 className="h-4 w-4" />
          Mostrar todas las fotos
        </Button>
      </div>

      {/* Full Gallery Dialog */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        <DialogContent className="max-w-5xl">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} ${currentIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border-border bg-background hover:bg-muted"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border-border bg-background hover:bg-muted"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
