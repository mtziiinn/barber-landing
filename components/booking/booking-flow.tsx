"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Service, Barber, formatPrice } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ServiceStep } from "./service-step"
import { BarberStep } from "./barber-step"
import { DateTimeStep } from "./datetime-step"
import { ConfirmationStep } from "./confirmation-step"
import { Check, Loader2 } from "lucide-react"

interface BookingFlowProps {
  services: Service[]
  barbers: Barber[]
  userId: string
}

type Step = "service" | "barber" | "datetime" | "confirmation"

export function BookingFlow({ services, barbers, userId }: BookingFlowProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("service")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const steps: { key: Step; label: string }[] = [
    { key: "service", label: "Servico" },
    { key: "barber", label: "Barbeiro" },
    { key: "datetime", label: "Data/Hora" },
    { key: "confirmation", label: "Confirmacao" },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep)

  async function handleConfirm() {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (paymentMethod === "online") {
        // Redirect to checkout
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: selectedService.id,
            barberId: selectedBarber.id,
            date: selectedDate.toISOString().split("T")[0],
            time: selectedTime,
          }),
        })

        const data = await response.json()

        if (data.url) {
          window.location.href = data.url
          return
        }
      }

      // Create appointment directly for cash payment
      const supabase = createClient()
      const { error: insertError } = await supabase.from("appointments").insert({
        client_id: userId,
        service_id: selectedService.id,
        barber_id: selectedBarber.id,
        appointment_date: selectedDate.toISOString().split("T")[0],
        appointment_time: selectedTime,
        status: "pending",
        payment_status: "pending",
      })

      if (insertError) {
        throw insertError
      }

      router.push("/dashboard?booking=success")
    } catch (err) {
      setError("Erro ao criar agendamento. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index < currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : index === currentStepIndex
                    ? "bg-primary text-primary-foreground neon-border"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs mt-2 whitespace-nowrap ${
                  index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 ${
                  index < currentStepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-xl p-6">
        {currentStep === "service" && (
          <ServiceStep
            services={services}
            selectedService={selectedService}
            onSelect={(service) => {
              setSelectedService(service)
              setCurrentStep("barber")
            }}
          />
        )}

        {currentStep === "barber" && (
          <BarberStep
            barbers={barbers}
            selectedBarber={selectedBarber}
            onSelect={(barber) => {
              setSelectedBarber(barber)
              setCurrentStep("datetime")
            }}
            onBack={() => setCurrentStep("service")}
          />
        )}

        {currentStep === "datetime" && (
          <DateTimeStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            serviceDuration={selectedService?.duration_minutes || 30}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onContinue={() => setCurrentStep("confirmation")}
            onBack={() => setCurrentStep("barber")}
          />
        )}

        {currentStep === "confirmation" && selectedService && selectedBarber && selectedDate && selectedTime && (
          <ConfirmationStep
            service={selectedService}
            barber={selectedBarber}
            date={selectedDate}
            time={selectedTime}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onBack={() => setCurrentStep("datetime")}
            onConfirm={handleConfirm}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
