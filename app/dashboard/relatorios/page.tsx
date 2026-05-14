"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, BarChart3, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/types";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalAppointments: 0,
    activeClients: 0,
    growth: "+12%"
  });
  const supabase = createClient();

  useEffect(() => {
    async function getData() {
      if (!supabase) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        setProfile(profileData);

        if (profileData?.role === 'admin' || profileData?.role === 'barber') {
          // Em um app real, faríamos queries agregadas aqui
          const { data: appointments } = await supabase.from("appointments").select("service:services(price_cents)").eq("payment_status", "paid_online");
          const revenue = appointments?.reduce((acc, curr: any) => acc + (curr.service?.price_cents || 0), 0) || 0;

          const { count: appCount } = await supabase.from("appointments").select("*", { count: 'exact', head: true });
          const { count: clientCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("role", "client");

          setStats({
            totalRevenue: revenue,
            totalAppointments: appCount || 0,
            activeClients: clientCount || 0,
            growth: "+15.3%"
          });
        }
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const cards = [
    { label: "Receita Total", value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: stats.growth },
    { label: "Agendamentos", value: stats.totalAppointments, icon: Calendar, trend: "+5.2%" },
    { label: "Clientes Ativos", value: stats.activeClients, icon: Users, trend: "+8.1%" },
    { label: "Taxa de Retenção", value: "84%", icon: TrendingUp, trend: "+2.4%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground">Analise o desempenho da sua barbearia</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <Card key={card.label} className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-emerald-500 font-medium mt-1">
                  {card.trend} <span className="text-muted-foreground">vs mês passado</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Desempenho Mensal</CardTitle>
            <CardDescription>Gráfico de evolução de vendas e agendamentos (Em breve)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-border/50">
             <div className="text-center">
               <BarChart3 className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
               <p className="text-muted-foreground">Gráficos interativos em desenvolvimento</p>
             </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
