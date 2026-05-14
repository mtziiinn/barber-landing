import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, RefreshCw } from "lucide-react";

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ appointment_id?: string }>;
}) {
  const params = await searchParams;
  const appointmentId = params.appointment_id;

  // Cancel the pending appointment
  if (appointmentId) {
    const supabase = await createClient();
    if (supabase) {
      await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointmentId)
        .eq("payment_status", "pending");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Pagamento Cancelado</h1>

        <p className="text-muted-foreground mb-8">
          O pagamento foi cancelado e o agendamento nao foi confirmado. Voce
          pode tentar novamente ou escolher pagar na barbearia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Home
            </Link>
          </Button>
          <Button asChild className="neon-border">
            <Link href="/agendar">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
