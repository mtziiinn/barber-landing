"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Política de Privacidade</h1>
            <p className="text-muted-foreground">Última atualização: 14 de maio de 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Coleta de Informações</h2>
            <p>
              Coletamos informações que você nos fornece diretamente ao criar uma conta, agendar um serviço ou entrar em contato conosco. Isso pode incluir seu nome, endereço de e-mail, número de telefone e detalhes do agendamento.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Uso das Informações</h2>
            <p>
              Usamos as informações coletadas para processar seus agendamentos, enviar lembretes, processar pagamentos através do Mercado Pago e melhorar nossos serviços. Não compartilhamos suas informações pessoais com terceiros para fins de marketing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração ou destruição. Seus dados de autenticação são gerenciados de forma segura pelo Supabase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies para manter sua sessão ativa e melhorar a experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas algumas partes do site podem não funcionar corretamente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento através do seu perfil no sistema ou entrando em contato conosco.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Avisaremos sobre quaisquer alterações postando a nova política nesta página.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild className="neon-border">
            <Link href="/">Entendi</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
