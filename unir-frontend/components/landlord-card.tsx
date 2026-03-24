import Link from "next/link"
import { Shield, Clock, MessageCircle, Building2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Landlord } from "@/lib/types"

interface LandlordCardProps {
  landlord: Landlord
}

export function LandlordCard({ landlord }: LandlordCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <Link href={`/perfil/${landlord.id}`} className="block mb-4 hover:opacity-80 transition-opacity">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={landlord.photo || "/placeholder.svg"} alt={landlord.name} />
              <AvatarFallback>{landlord.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{landlord.name}</h3>
                {landlord.verified && <Shield className="h-4 w-4 text-secondary" />}
              </div>
              <p className="text-sm text-muted-foreground">Arrendatario</p>
            </div>
          </div>
        </Link>

        <div className="mb-4 space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Tiempo de respuesta: {landlord.responseTime}</p>
              <p className="text-muted-foreground">Tasa de respuesta: {landlord.responseRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-foreground">{landlord.properties} propiedades</p>
          </div>
        </div>

        <Button variant="outline" className="w-full gap-2 bg-transparent">
          <MessageCircle className="h-4 w-4" />
          Contactar arrendatario
        </Button>
      </CardContent>
    </Card>
  )
}
