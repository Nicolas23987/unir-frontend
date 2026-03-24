"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, DollarSign, Shield, Users, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function BecomeLandlordPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Ingresos adicionales",
      description: "Genera ingresos pasivos alquilando tu propiedad a estudiantes confiables",
    },
    {
      icon: Shield,
      title: "Protección garantizada",
      description: "Verificamos a todos los inquilinos y ofrecemos seguro contra daños",
    },
    {
      icon: Users,
      title: "Comunidad estudiantil",
      description: "Acceso a una red de estudiantes universitarios verificados",
    },
    {
      icon: Clock,
      title: "Gestión simplificada",
      description: "Plataforma fácil de usar para gestionar reservas y pagos",
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Crea tu cuenta",
      description: "Regístrate como arrendatario y completa tu perfil",
    },
    {
      number: "2",
      title: "Publica tu propiedad",
      description: "Agrega fotos, descripción y detalles de tu departamento",
    },
    {
      number: "3",
      title: "Recibe solicitudes",
      description: "Los estudiantes interesados te contactarán directamente",
    },
    {
      number: "4",
      title: "Comienza a ganar",
      description: "Acepta reservas y recibe pagos de forma segura",
    },
  ]

  return (
    <>
      <MainNav />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Conviértete en arrendatario de Unir
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Alquila tu propiedad a estudiantes universitarios y genera ingresos adicionales de forma segura
            </p>
            <Link href="/arrendatario/registro">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">¿Por qué ser arrendatario?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Cómo funciona</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold text-foreground">$850</p>
                </div>
                <p className="text-sm text-muted-foreground">Ingreso promedio mensual</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold text-foreground">5,000+</p>
                </div>
                <p className="text-sm text-muted-foreground">Estudiantes activos</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <p className="text-4xl font-bold text-foreground">98%</p>
                </div>
                <p className="text-sm text-muted-foreground">Tasa de satisfacción</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary px-4 py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-white">¿Listo para comenzar?</h2>
            <p className="mb-8 text-lg text-white/90">
              Únete a cientos de arrendatarios que ya están generando ingresos con Unir
            </p>
            <Link href="/arrendatario/registro">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Registrarme como arrendatario
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
