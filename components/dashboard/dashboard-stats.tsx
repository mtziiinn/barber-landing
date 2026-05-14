import { formatPrice } from "@/lib/types"
import { Calendar, Clock, Users, DollarSign } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    todayAppointments: number
    pendingAppointments: number
    totalClients: number
    totalRevenue: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      label: "Agendamentos Hoje",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Pendentes",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Total de Clientes",
      value: stats.totalClients,
      icon: Users,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Receita Total",
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      isPrice: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
