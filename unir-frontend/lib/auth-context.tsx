"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
  id: 1,
  google_id: "",
  email: "estudiante@unir.edu.ec",
  name: "María González",
  picture: "/student-profile.jpg",
  auth_provider: "email",
  created_at: "2024-01-15T10:00:00Z",
  last_login: new Date().toISOString(),
  role: "student",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("user_data")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  /**
   * Inicia sesión del usuario
   *
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   *
   * Llama al endpoint POST /api/auth/login
   * Espera recibir: { token: string, user: User }
   */
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      throw new Error("Credenciales inválidas")
    }

    const userData = await res.json()

    setUser(userData) 
    router.push("/")
  }
  /**
   * Registra un nuevo usuario
   *
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @param name - Nombre completo del usuario
   *
   * Llama al endpoint POST /api/auth/register
   * Espera recibir: { token: string, user: User }
   */
  const register = async (email: string, password: string, name: string) => {
    try {
      // En producción:
      // const response = await apiPost<{ token: string; user: User }>(
      //   API_ENDPOINTS.auth.register,
      //   { email, password, name }
      // )

      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockToken = "mock_jwt_token_" + Date.now()
      const userData = { ...MOCK_USER, email, name, created_at: new Date().toISOString() }

      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(userData))

      setToken(mockToken)
      setUser(userData)

      console.log("[v0] Registro exitoso:", { email, name })

      router.push("/")
    } catch (error) {
      console.error("[v0] Error en registro:", error)
      throw error
    }
  }

  /**
   * Cierra la sesión del usuario
   *
   * Llama al endpoint POST /api/auth/logout
   */
  const logout = () => {
    // En producción:
    // await apiPost(API_ENDPOINTS.auth.logout, {}, { token })

    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setToken(null)
    setUser(null)

    console.log("[v0] Sesión cerrada")

    router.push("/login")
  }

  /**
   * Actualiza los datos del usuario en el contexto
   */
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
