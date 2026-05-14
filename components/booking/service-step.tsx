"use client"

import { Service, formatPrice } from "@/lib/types"
import { Clock, Check } from "lucide-react"

interface ServiceStepProps {
  services: Service[]
  selectedService: Service | null
  onSelect: (service: Service) => void
}

export function ServiceStep({ services, selectedService, onSelect }: ServiceStepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Escolha o servico</h2>
      <p className="text-muted-foreground mb-6">
        Selecione o servico que deseja realizar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`relative p-4 rounded-xl border text-left transition-all hover:border-primary/50 ${
              selectedService?.id === service.id
                ? "border-primary bg-primary/5"
                : "border-border bg-background"
            }`}
          >
            {selectedService?.id === service.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}

            <div className="flex items-start justify-between pr-8">
              <div>
                <h3 className="font-bold mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration_minutes} min</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-lg font-bold text-primary">
                {formatPrice(service.price_cents)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
