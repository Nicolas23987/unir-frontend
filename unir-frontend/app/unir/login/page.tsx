"use client"

import { MainNav } from "@/components/main-nav"
import { LoginForm } from "@/components/login-form"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"



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

export default function LoginPage() {


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
    <>
      <MainNav />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="mx-auto mb-4 inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-7 w-7 text-white" />
              </div>
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground">Inicia sesión para continuar</p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-medium text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
