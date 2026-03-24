"use client"

import { MainNav } from "@/components/main-nav"
import { LandlordRegistrationForm } from "@/components/landlord-registration-form"
import { Building2 } from "lucide-react"
import Link from "next/link"

export default function LandlordRegistrationPage() {
  return (
    <>
      <MainNav />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <Link href="/" className="mx-auto mb-4 inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-7 w-7 text-white" />
              </div>
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Registro de arrendatario</h1>
            <p className="text-muted-foreground">Completa tu perfil para comenzar a publicar propiedades</p>
          </div>

          <LandlordRegistrationForm />
        </div>
      </main>
    </>
  )
}
