"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Scissors } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              FADE<span className="text-primary">ZONE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Servicos
            </a>
            <a href="#equipe" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Equipe
            </a>
            <a href="#localizacao" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Localizacao
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button asChild className="neon-border">
              <Link href="/agendar">Agendar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#servicos"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Servicos
              </a>
              <a
                href="#equipe"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Equipe
              </a>
              <a
                href="#localizacao"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Localizacao
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/auth/login">Entrar</Link>
                </Button>
                <Button asChild className="neon-border">
                  <Link href="/agendar">Agendar Horario</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
