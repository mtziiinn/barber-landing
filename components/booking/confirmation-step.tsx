"use client"

import { Service, Barber, formatPrice, formatDate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, CreditCard, Banknote, Loader2 } from "lucide-react"

interface ConfirmationStepProps {
  service: Service
  barber: Barber
  date: Date
  time: string
  paymentMethod: "online" | "cash"
  onPaymentMethodChange: (method: "online" | "cash") => void
  onBack: () => void
  onConfirm: () => void
  loading: boolean
  error: string | null
}

export function ConfirmationStep({
  service,
  barber,
  date,
  time,
  paymentMethod,
  onPaymentMethodChange,
  onBack,
  onConfirm,
  loading,
  error,
}: ConfirmationStepProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Confirmar agendamento</h2>
          <p className="text-muted-foreground text-sm">
            Revise os detalhes e confirme seu horario
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="bg-background border border-border rounded-xl p-6 mb-6">
        <h3 className="font-bold mb-4">Resumo do agendamento</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data e Hora</p>
              <p className="font-medium">
                {date.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })} as {time}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Servico</p>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.duration_minutes} minutos</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Barbeiro</p>
              <p className="font-medium">{barber.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(service.price_cents)}
          </span>
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">Forma de pagamento</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onPaymentMethodChange("online")}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              paymentMethod === "online"
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/50"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              paymentMethod === "online" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Pagar online</p>
              <p className="text-sm text-muted-foreground">Cartao ou PIX</p>
            </div>
          </button>

          <button
            onClick={() => onPaymentMethodChange("cash")}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              paymentMethod === "cash"
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:border-primary/50"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              paymentMethod === "cash" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}>
              <Banknote className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Pagar na barbearia</p>
              <p className="text-sm text-muted-foreground">Dinheiro ou cartao</p>
            </div>
          </button>
        </div>
      </div>

      {/* Confirm button */}
      <Button
        onClick={onConfirm}
        disabled={loading}
        className="w-full h-12 neon-border"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : paymentMethod === "online" ? (
          "Ir para pagamento"
        ) : (
          "Confirmar agendamento"
        )}
      </Button>
    </div>
  )
}
