import { createClient } from "@/lib/supabase/server"
import { Instagram, Award } from "lucide-react"

const fallbackBarbers = [
  { id: "1", name: "Joao Silva", specialties: ["Degrade", "Barba"] },
  { id: "2", name: "Pedro Santos", specialties: ["Corte Classico", "Sobrancelha"] },
  { id: "3", name: "Lucas Oliveira", specialties: ["Pigmentacao", "Degrade", "Barba"] },
]

async function getBarbers() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("barbers")
      .select("*")
      .eq("is_active", true)
    
    return data || fallbackBarbers
  } catch {
    return fallbackBarbers
  }
}

export async function TeamSection() {
  const barbers = await getBarbers()

  return (
    <section id="equipe" className="py-24 bg-card relative">
      <div className="absolute inset-0 urban-texture" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Conheca a equipe</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            NOSSOS <span className="text-primary">BARBEIROS</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Profissionais apaixonados pelo que fazem, sempre atualizados 
            com as ultimas tendencias do mercado.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={barber.id}
              className="group relative bg-background border border-border rounded-xl overflow-hidden"
            >
              {/* Avatar placeholder */}
              <div className="aspect-square bg-muted relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary">
                      {barber.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{barber.name}</h3>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {barber.specialties?.map((specialty: string) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{5 - index * 0.1} anos de experiencia</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
