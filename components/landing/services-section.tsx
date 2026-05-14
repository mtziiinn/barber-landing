import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/types"
import { Clock, Scissors, Sparkles } from "lucide-react"

const fallbackServices = [
  { id: "1", name: "Corte Tradicional", description: "Corte classico masculino com maquina e tesoura", price_cents: 3500, duration_minutes: 30 },
  { id: "2", name: "Corte + Barba", description: "Corte completo com acabamento de barba", price_cents: 5500, duration_minutes: 45 },
  { id: "3", name: "Barba Completa", description: "Aparar, modelar e hidratar a barba", price_cents: 3000, duration_minutes: 30 },
  { id: "4", name: "Corte Degrade", description: "Corte moderno com degrade lateral", price_cents: 4000, duration_minutes: 40 },
  { id: "5", name: "Corte Kids", description: "Corte infantil ate 12 anos", price_cents: 2500, duration_minutes: 25 },
  { id: "6", name: "Sobrancelha", description: "Design e limpeza de sobrancelhas", price_cents: 1500, duration_minutes: 15 },
]

async function getServices() {
  try {
    const supabase = await createClient()
    if (!supabase) return fallbackServices
    
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("price_cents", { ascending: true })
    
    return data || fallbackServices
  } catch {
    return fallbackServices
  }
}

export async function ServicesSection() {
  const services = await getServices()

  const icons: Record<string, React.ReactNode> = {
    "Corte Tradicional": <Scissors className="w-6 h-6" />,
    "Corte + Barba": <Sparkles className="w-6 h-6" />,
    "Barba Completa": <Scissors className="w-6 h-6" />,
    "Corte Degrade": <Sparkles className="w-6 h-6" />,
    "Corte Kids": <Scissors className="w-6 h-6" />,
    "Sobrancelha": <Sparkles className="w-6 h-6" />,
    "Pigmentacao": <Sparkles className="w-6 h-6" />,
  }

  return (
    <section id="servicos" className="py-24 relative">
      <div className="absolute inset-0 urban-texture" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">O que oferecemos</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            NOSSOS <span className="text-primary">SERVICOS</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Do corte classico ao mais moderno, temos o servico perfeito pra voce. 
            Todos executados por profissionais experientes.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Popular badge */}
              {index === 1 && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {icons[service.name] || <Scissors className="w-6 h-6" />}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(service.price_cents)}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{service.duration_minutes} minutos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
