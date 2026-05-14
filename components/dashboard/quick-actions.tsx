import Link from "next/link"
import { Calendar, Plus, Users, Settings, BarChart3 } from "lucide-react"

interface QuickActionsProps {
  isAdmin: boolean
}

export function QuickActions({ isAdmin }: QuickActionsProps) {
  const clientActions = [
    {
      label: "Novo Agendamento",
      description: "Agende um novo horario",
      href: "/agendar",
      icon: Plus,
      primary: true,
    },
    {
      label: "Meu Perfil",
      description: "Atualize seus dados",
      href: "/dashboard/perfil",
      icon: Settings,
    },
  ]

  const adminActions = [
    {
      label: "Novo Agendamento",
      description: "Crie um agendamento",
      href: "/agendar",
      icon: Plus,
      primary: true,
    },
    {
      label: "Gerenciar Servicos",
      description: "Adicione ou edite servicos",
      href: "/dashboard/servicos",
      icon: Calendar,
    },
    {
      label: "Clientes",
      description: "Veja todos os clientes",
      href: "/dashboard/clientes",
      icon: Users,
    },
    {
      label: "Relatorios",
      description: "Analise o desempenho",
      href: "/dashboard/relatorios",
      icon: BarChart3,
    },
  ]

  const actions = isAdmin ? adminActions : clientActions

  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-lg">Acoes Rapidas</h2>
      </div>

      <div className="p-4 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-primary/50 ${
              action.primary
                ? "bg-primary/5 border-primary/30"
                : "border-border bg-background"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              action.primary ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">{action.label}</p>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
