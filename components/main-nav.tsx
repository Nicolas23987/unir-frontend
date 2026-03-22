"use client"

import { Building2, Home, Search, Users, User, Heart, MessageCircle, Heading } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthModal } from "./auth-modal"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const showLoginButton = pathname !== "/login";
  const { user, isAuthenticated, logout } = useAuth()
  const unreadMessages = 3
  const [showAuthModal, setShowAuthModal] = useState(false)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  const handleShowAuthModal = () => {
    setShowAuthModal(true)
  }

  const handleAuthComplete = () => {
    setShowAuthModal(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div style={{ height: 'var(--nav-height)' }} className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <span className="text-2xl font-bold text-foreground">Unir</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8">
              {isAuthenticated && (
                <>
                  <Link
                    href="/buscar"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive("/buscar") ? "text-primary" : "text-foreground",
                    )}
                  >
                    Buscar
                  </Link>
                  <Link
                    href="/roomies"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive("/roomies") ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Roomies
                  </Link>
                  <Link
                    href="/eventos/reina-enfermeria"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive("/eventos") ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Eventos
                  </Link>
                </>
              )}
              <Link
                href="convertirse-en-arrendatario"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/convertirse-en-arrendatario") ? "text-primary" : "text-muted-foreground",
                )}
              >
                Ser Arrendatario
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/mensajes">
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                      <MessageCircle className="h-5 w-5" />
                      {unreadMessages > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 flex items-center justify-center text-xs text-white border-2 border-background">
                          {unreadMessages}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <Link href="/favoritos">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.picture || undefined} alt={user?.name || "Usuario"} />
                          <AvatarFallback className="bg-primary text-white">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/perfil/${user?.id}`}>Mi Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/mis-reservas">Mis Reservas</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/favoritos">Favoritos</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-500">
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                showLoginButton && (
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-white shadow-md hover:bg-primary/90"
                    onClick={handleShowAuthModal}
                  >
                    Iniciar Sesión
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Unir</span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/mensajes">
                  <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9">
                    <MessageCircle className="h-5 w-5" />
                    {unreadMessages > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 p-0 flex items-center justify-center text-[10px] text-white border border-background">
                        {unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href={`/perfil/${user?.id}`}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.picture || undefined} alt={user?.name || "Usuario"} />
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (null)}
            {/*// : (
            //   <Link href="/login">
            //     <Button size="sm" variant="ghost">
            //       Entrar
            //     </Button>
            //   </Link>
            // )}/*/}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      {showLoginButton &&
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex items-center justify-around px-2 py-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors hover:bg-muted"
            >
              <Home
                className={cn(
                  "h-6 w-6",
                  isActive("/") && !isActive("/buscar") && !isActive("/roomies")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive("/") && !isActive("/buscar") && !isActive("/roomies")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                Inicio
              </span>
            </Link>

            <Link
              href="/buscar"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors hover:bg-muted"
            >
              <Search className={cn("h-6 w-6", isActive("/buscar") ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-xs font-medium", isActive("/buscar") ? "text-primary" : "text-muted-foreground")}>
                Buscar
              </span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/roomies"
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors hover:bg-muted"
                >
                  <Users className={cn("h-6 w-6", isActive("/roomies") ? "text-primary" : "text-muted-foreground")} />
                  <span
                    className={cn("text-xs font-medium", isActive("/roomies") ? "text-primary" : "text-muted-foreground")}
                  >
                    Roomies
                  </span>
                </Link>

                <Link
                  href="/favoritos"
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors hover:bg-muted"
                >
                  <Heart className={cn("h-6 w-6", isActive("/favoritos") ? "text-primary" : "text-muted-foreground")} />
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isActive("/favoritos") ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Favoritos
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors hover:bg-muted"
              >
                <User className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Entrar</span>
              </Link>
            )}
          </div>
        </nav>
      }

      {/* <div className="md:hidden h-20" /> */}
      {showAuthModal && (
        <AuthModal
          onClose={() => {
            setShowAuthModal(false)
          }}
          onAuthComplete={handleAuthComplete}
        />
      )}
    </>
  )
}
