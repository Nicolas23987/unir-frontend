import { Shield, Calendar, Home, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function BookingRules() {
  const rules = [
    {
      icon: Calendar,
      title: "Política de cancelación",
      description: "Cancelación gratuita hasta 48 horas antes del check-in",
    },
    {
      icon: Home,
      title: "Reglas de la casa",
      description: "No fumar, no mascotas, horario de silencio de 10 PM a 8 AM",
    },
    {
      icon: Shield,
      title: "Depósito de seguridad",
      description: "Se requiere un depósito reembolsable de $200",
    },
    {
      icon: AlertCircle,
      title: "Importante",
      description: "Debes presentar identificación válida al momento del check-in",
    },
  ]

  return (
    <Card className="mb-6 border-border">
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">Antes de reservar</h2>
        <div className="space-y-4">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <div key={index} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">{rule.title}</h4>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
