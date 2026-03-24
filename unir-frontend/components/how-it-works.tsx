import { Search, UserCheck, Home, Shield } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Busca tu lugar ideal",
    description: "Explora departamentos verificados cerca de tu universidad con filtros personalizados",
  },
  {
    icon: UserCheck,
    title: "Conoce a tus roomies",
    description: "Ve perfiles de compañeros de cuarto potenciales antes de reservar",
  },
  {
    icon: Home,
    title: "Reserva fácilmente",
    description: "Proceso de reserva simple y seguro con confirmación instantánea",
  },
  {
    icon: Shield,
    title: "Vive tranquilo",
    description: "Todos los departamentos y arrendatarios están verificados por seguridad",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t bg-muted px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Cómo funciona</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Encontrar tu hogar universitario nunca fue tan fácil
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
