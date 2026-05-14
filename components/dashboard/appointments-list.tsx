"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Appointment, formatPrice, formatTime } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  Check,
  X,
  MoreVertical,
  Loader2,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppointmentsListProps {
  appointments: Appointment[];
  isAdmin: boolean;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-500" },
  confirmed: { label: "Confirmado", color: "bg-primary/20 text-primary" },
  completed: { label: "Concluido", color: "bg-green-500/20 text-green-500" },
  cancelled: {
    label: "Cancelado",
    color: "bg-destructive/20 text-destructive",
  },
};

const PAYMENT_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Aguardando", color: "text-yellow-500" },
  paid_online: { label: "Pago Online", color: "text-green-500" },
  paid_cash: { label: "Pago Local", color: "text-green-500" },
  refunded: { label: "Reembolsado", color: "text-muted-foreground" },
};

export function AppointmentsList({
  appointments,
  isAdmin,
}: AppointmentsListProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(appointmentId: string, status: string) {
    setLoading(appointmentId);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Erro ao conectar ao banco");

      const { error } = await supabase
        .from("appointments")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", appointmentId);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: `O agendamento foi marcado como ${STATUS_LABELS[status]?.label.toLowerCase()}.`,
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  }

  async function updatePaymentStatus(
    appointmentId: string,
    paymentStatus: string,
  ) {
    setLoading(appointmentId);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Erro ao conectar ao banco");

      const { error } = await supabase
        .from("appointments")
        .update({
          payment_status: paymentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", appointmentId);

      if (error) throw error;

      toast({
        title: "Pagamento atualizado",
        description: "O status de pagamento foi alterado com sucesso.",
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  }

  const upcomingAppointments = appointments.filter(
    (a) => a.status !== "cancelled" && a.status !== "completed",
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === "cancelled" || a.status === "completed",
  );

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-lg">
          {isAdmin ? "Todos os Agendamentos" : "Meus Agendamentos"}
        </h2>
      </div>

      {appointments.length === 0 ? (
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {/* Upcoming */}
          {upcomingAppointments.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">
                  Proximos ({upcomingAppointments.length})
                </span>
              </div>
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  isAdmin={isAdmin}
                  loading={loading === appointment.id}
                  onUpdateStatus={updateStatus}
                  onUpdatePayment={updatePaymentStatus}
                />
              ))}
            </div>
          )}

          {/* Past */}
          {pastAppointments.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">
                  Historico ({pastAppointments.length})
                </span>
              </div>
              {pastAppointments.slice(0, 5).map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  isAdmin={isAdmin}
                  loading={loading === appointment.id}
                  onUpdateStatus={updateStatus}
                  onUpdatePayment={updatePaymentStatus}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({
  appointment,
  isAdmin,
  loading,
  onUpdateStatus,
  onUpdatePayment,
}: {
  appointment: Appointment;
  isAdmin: boolean;
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onUpdatePayment: (id: string, status: string) => void;
}) {
  const status = STATUS_LABELS[appointment.status] || STATUS_LABELS.pending;
  const payment =
    PAYMENT_LABELS[appointment.payment_status] || PAYMENT_LABELS.pending;

  const date = new Date(appointment.appointment_date + "T00:00:00");

  return (
    <div className="p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${status.color}`}
            >
              {status.label}
            </span>
            <span className={`text-xs ${payment.color}`}>{payment.label}</span>
          </div>

          <h3 className="font-bold truncate">
            {appointment.service?.name || "Servico"}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {date.toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(appointment.appointment_time)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>
                {isAdmin
                  ? appointment.client?.full_name || "Cliente"
                  : appointment.barber?.name || "Barbeiro"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(appointment.service?.price_cents || 0)}
          </span>

          {isAdmin &&
            appointment.status !== "cancelled" &&
            appointment.status !== "completed" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MoreVertical className="w-4 h-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {appointment.status === "pending" && (
                    <DropdownMenuItem
                      onClick={() =>
                        onUpdateStatus(appointment.id, "confirmed")
                      }
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirmar
                    </DropdownMenuItem>
                  )}
                  {appointment.status === "confirmed" && (
                    <DropdownMenuItem
                      onClick={() =>
                        onUpdateStatus(appointment.id, "completed")
                      }
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Concluir
                    </DropdownMenuItem>
                  )}
                  {appointment.payment_status === "pending" && (
                    <DropdownMenuItem
                      onClick={() =>
                        onUpdatePayment(appointment.id, "paid_cash")
                      }
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Marcar como Pago
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onUpdateStatus(appointment.id, "cancelled")}
                    className="text-destructive focus:text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
      </div>
    </div>
  );
}
