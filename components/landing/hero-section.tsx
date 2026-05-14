import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Star, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 urban-texture" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">A barbearia mais estilosa da cidade</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-foreground">ESTILO E</span>
            <span className="block neon-glow text-primary">ATITUDE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Cortes modernos, ambiente descontraido e profissionais que entendem do assunto. 
            Aqui voce sai com o visual que sempre quis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild className="text-lg px-8 py-6 neon-border">
              <Link href="/agendar">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Horario
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <a href="#servicos">
                Ver Servicos
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Clientes satisfeitos</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">Anos de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">4.9</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-primary text-primary" />
                Avaliacao
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
