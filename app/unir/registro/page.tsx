"use client"

import { MainNav } from "@/components/main-nav"
import { RegisterForm } from "@/components/register-form"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
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
            <h1 className="mb-2 text-3xl font-bold text-foreground">Crea tu cuenta</h1>
            <p className="text-muted-foreground">Únete a la comunidad de estudiantes</p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
