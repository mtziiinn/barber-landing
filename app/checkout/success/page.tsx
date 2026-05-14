import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Calendar, ArrowRight } from "lucide-react"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    redirect("/dashboard")
  }

  try {
    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
      const supabase = await createClient()
      const appointmentId = session.metadata?.appointmentId

      if (appointmentId) {
        // Update appointment payment status
        await supabase
          .from("appointments")
          .update({ payment_status: "paid_online" })
          .eq("id", appointmentId)

        // Update payment record
        await supabase
          .from("payments")
          .update({ status: "completed" })
          .eq("stripe_session_id", sessionId)
      }
    }
  } catch (error) {
    console.error("Error verifying session:", error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Pagamento Confirmado!</h1>
        
        <p className="text-muted-foreground mb-8">
          Seu agendamento foi confirmado e o pagamento foi processado com sucesso. 
          Voce recebera uma confirmacao por email.
        </p>

        <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proximo passo</p>
              <p className="font-medium">Compareça no horario agendado</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se de chegar alguns minutos antes do horario marcado. 
            Caso precise cancelar ou remarcar, entre em contato conosco.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              Voltar para Home
            </Link>
          </Button>
          <Button asChild className="neon-border">
            <Link href="/dashboard">
              Ver Meus Agendamentos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
