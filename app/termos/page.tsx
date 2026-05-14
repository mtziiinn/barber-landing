"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Termos de Uso</h1>
            <p className="text-muted-foreground">Última atualização: 14 de maio de 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site da FadeZone, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nosso site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Agendamentos e Cancelamentos</h2>
            <p>
              Os agendamentos realizados através do site estão sujeitos à disponibilidade dos profissionais. Pedimos que cancelamentos ou remarcações sejam feitos com pelo menos 24 horas de antecedência. A barbearia reserva-se o direito de cobrar taxas por não comparecimento sem aviso prévio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Pagamentos</h2>
            <p>
              Os pagamentos realizados online são processados com segurança através do Mercado Pago. Ao realizar um pagamento, você concorda com os termos de serviço do processador de pagamentos. Valores pagos online por serviços não realizados devido a cancelamentos dentro do prazo serão reembolsados conforme nossa política vigente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Conduta do Usuário</h2>
            <p>
              Você concorda em utilizar o site apenas para fins lícitos e de uma forma que não infrinja os direitos de terceiros ou restrinja o uso do site por qualquer outra pessoa. Comportamentos proibidos incluem assediar ou causar angústia ou inconveniência a qualquer pessoa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Limitação de Responsabilidade</h2>
            <p>
              A FadeZone não será responsável por quaisquer danos diretos, indiretos ou consequentes decorrentes do uso ou da incapacidade de usar o site ou os serviços agendados através dele, exceto onde exigido por lei.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Modificações dos Termos</h2>
            <p>
              Reservamos o direito de revisar estes termos a qualquer momento sem aviso prévio. Ao continuar a usar o site após quaisquer alterações, você concorda em estar vinculado à versão revisada dos Termos de Uso.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild className="neon-border">
            <Link href="/">Aceito os Termos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
