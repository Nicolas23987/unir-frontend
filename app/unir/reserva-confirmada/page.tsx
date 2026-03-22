"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Calendar, MapPin, Download, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  return (
    <>
      <MainNav />
      <main className="min-h-screen bg-muted py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
              <CheckCircle2 className="h-12 w-12 text-secondary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Reserva confirmada</h1>
            <p className="text-lg text-muted-foreground">Tu reserva ha sido procesada exitosamente</p>
          </div>

          <Card className="mb-6 border-border">
            <CardContent className="p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-foreground">Departamento moderno cerca de UNIR</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Av. Universidad 123, Lima</span>
                  </div>
                </div>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                  Confirmado
                </span>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-foreground">Fechas de estadía</h3>
                    <p className="text-sm text-muted-foreground">
                      Check-in: 15 de febrero, 2025 (3:00 PM)
                      <br />
                      Check-out: 15 de marzo, 2025 (11:00 AM)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-semibold text-foreground">Código de reserva</h3>
                  <p className="font-mono text-2xl font-bold text-primary">UNIR-2025-001</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="gap-2 bg-background">
              <Download className="h-4 w-4" />
              Descargar confirmación
            </Button>
            <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
              <MessageCircle className="h-4 w-4" />
              Contactar arrendatario
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Hemos enviado los detalles de tu reserva a tu correo electrónico
            </p>
            <Link href="/">
              <Button variant="link" className="text-primary">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
