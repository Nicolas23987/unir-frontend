// AuthModal.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Instagram, Search } from "lucide-react"
import CustomGoogleButton from "./google.botton"

interface AuthModalProps {
  onClose: () => void
  onAuthComplete: () => void
}

interface UserData {
  email: string
  name: string
  picture?: string
  profileComplete?: boolean
  fechaNacimiento?: string | null
  isForaneo?: boolean
  id_carrera?: string
}

const carreras = [
  "Enfermería",
  "Medicina",
  "Odontología",
  "Psicología",
  "Nutrición",
  "Fisioterapia",
  "Trabajo Social",
  "Ingeniería Civil",
  "Ingeniería de Sistemas",
  "Administración de Empresas",
  "Derecho",
  "Arquitectura",
  "Comunicación Social",
  "Contaduría Pública",
  "Economía",
]

export function AuthModal({ onClose, onAuthComplete }: AuthModalProps) {
  const [step, setStep] = useState<"auth" | "info">("auth")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id_carrera: "",
    isForaneo: false,
  })
  const [careerSearch, setCareerSearch] = useState("")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGoogleAuthSuccess = (userData: any, credential: string) => {
    console.log("Autenticación exitosa:", userData)
    
    // Verificar si el perfil está completo según la respuesta del servidor
    if (userData.serverData?.profileComplete) {
      // Perfil completo - proceder directamente
      console.log("Perfil completo, procediendo...")
      onAuthComplete()
    } else {
      // Perfil incompleto - mostrar formulario de información
      console.log("Perfil incompleto, mostrando formulario...")
      
      // Pre-cargar los datos de Google en el formulario
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        id_carrera: "",
        isForaneo: false,
      })
      
      // Guardar los datos del usuario para referencia
      setUserData(userData)
      
      // Cambiar al paso de información
      setStep("info")
    }
  }

  const handleGoogleAuthError = (error: string) => {
    console.error("Error en autenticación Google:", error)
    // Aquí podrías mostrar un mensaje de error al usuario
  }

  const handleSocialAuth = (provider: string) => {
    console.log(`[v0] Authenticating with ${provider}`)
    // Simular autenticación para otros proveedores
    setTimeout(() => {
      setStep("info")
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("[v0] Student info:", formData)
    e.preventDefault()
    setLoading(true)
    
    try {
      
      // Aquí enviarías los datos completos del formulario al servidor
      const res = await fetch("http://localhost:300/auth/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          ...formData,
          // Incluir datos adicionales del usuario si es necesario
          picture: userData?.picture,
        }),
      })
      
      if (!res.ok) {
        throw new Error("Error al completar el perfil")
      }

      const result = await res.json()
      console.log("Perfil completado:", result)
      
      // Notificar que la autenticación y perfil están completos
      onAuthComplete()
      
    } catch (error) {
      console.error("Error completando perfil:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCarreras = carreras.filter((carrera) => 
    carrera.toLowerCase().includes(careerSearch.toLowerCase())
  )

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {step === "auth" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Inicia Sesión
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <CustomGoogleButton 
                onAuthSuccess={handleGoogleAuthSuccess}
                onAuthError={handleGoogleAuthError}
              />

              <Button
                onClick={() => handleSocialAuth("Facebook")}
                className="w-full h-12 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Continuar con Facebook
              </Button>
              <Button
                onClick={() => handleSocialAuth("Instagram")}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Continuar con Instagram
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Completa tu Información
              </DialogTitle>
              <DialogDescription className="text-center">
                Necesitamos algunos datos adicionales para finalizar tu registro
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Institucional</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.correo@universidad.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="career">Carrera</Label>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar carrera..."
                    value={careerSearch}
                    onChange={(e) => setCareerSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
                <Select
                  value={formData.id_carrera}
                  onValueChange={(value) => setFormData({ ...formData, id_carrera: value })}
                  required
                >
                  <SelectTrigger id="career">
                    <SelectValue placeholder="Selecciona tu carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCarreras.length > 0 ? (
                      filteredCarreras.map((carrera) => (
                        <SelectItem key={carrera} value={carrera}>
                          {carrera}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        No se encontraron carreras
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="foraneo"
                  checked={formData.isForaneo}
                  onCheckedChange={(checked) => setFormData({ ...formData, isForaneo: checked as boolean })}
                />
                <Label htmlFor="foraneo" className="text-sm font-normal cursor-pointer">
                  Soy estudiante foráneo
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12"
                disabled={loading}
              >
                {loading ? "Completando registro..." : "Finalizar Registro"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}