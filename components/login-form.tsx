"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GoogleLogin } from "@react-oauth/google";
import GoogleButton from "./google.botton";
import CustomGoogleButton from "./google.botton";


interface UserData {
  email: string
  name: string
  picture?: string
  profileComplete?: boolean
  fechaNacimiento?: string | null
  isForaneo?: boolean
  id_carrera?: string
}


export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null)


  const [step, setStep] = useState<"auth" | "info">("auth")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id_carrera: "",
    isForaneo: false,
  })



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
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      console.log("[v0] Login exitoso, redirigiendo...");
      router.push("/");
    } catch (err) {
      console.error("[v0] Error en login:", err);
      setError("Email o contraseña incorrectos");
    } finally {
      setIsLoading(false);
    }
  };



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

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          {/* Separador visual */}
          {/* Botón real de Google     */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          <CustomGoogleButton
            onAuthSuccess={handleGoogleAuthSuccess}
            onAuthError={handleGoogleAuthError}
          />

        </form>
      </CardContent>
    </Card>
  );
}
