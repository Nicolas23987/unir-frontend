"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Phone, MapPin, FileText, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function LandlordRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    bio: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Landlord registration:", formData)

    // Redirect to dashboard after successful registration
    router.push("/arrendatario/dashboard")
  }

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+51 999 999 999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="address"
                  type="text"
                  placeholder="Av. Principal 123, Lima"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">Número de documento *</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="DNI o RUC"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Sobre ti</Label>
              <Textarea
                id="bio"
                placeholder="Cuéntanos un poco sobre ti y tu experiencia como arrendatario..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="min-h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Documento de identidad</Label>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Sube una foto de tu DNI o documento</p>
                  <p className="text-xs text-muted-foreground">Formato: JPG, PNG (máx. 5MB)</p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  Seleccionar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
              Acepto los{" "}
              <button type="button" className="text-primary hover:underline">
                términos y condiciones
              </button>{" "}
              para arrendatarios y confirmo que la información proporcionada es verídica
            </label>
          </div>

          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Procesando registro..." : "Completar registro"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
