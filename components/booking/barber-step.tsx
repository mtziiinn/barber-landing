"use client"

import { Barber } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Check, ArrowLeft } from "lucide-react"

interface BarberStepProps {
  barbers: Barber[]
  selectedBarber: Barber | null
  onSelect: (barber: Barber) => void
  onBack: () => void
}

export function BarberStep({ barbers, selectedBarber, onSelect, onBack }: BarberStepProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Escolha o barbeiro</h2>
          <p className="text-muted-foreground text-sm">
            Selecione o profissional de sua preferencia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelect(barber)}
            className={`relative p-6 rounded-xl border text-center transition-all hover:border-primary/50 ${
              selectedBarber?.id === barber.id
                ? "border-primary bg-primary/5"
                : "border-border bg-background"
            }`}
          >
            {selectedBarber?.id === barber.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary">
                {barber.name.charAt(0)}
              </span>
            </div>

            <h3 className="font-bold mb-2">{barber.name}</h3>

            {/* Specialties */}
            <div className="flex flex-wrap justify-center gap-1">
              {barber.specialties?.slice(0, 2).map((specialty: string) => (
                <span
                  key={specialty}
                  className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
