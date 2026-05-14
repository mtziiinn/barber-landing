"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scissors, ArrowLeft, Loader2, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Erro de configuração');

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <MailCheck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">E-mail Enviado!</h1>
          <p className="text-muted-foreground">
            Enviamos as instruções de recuperação para <strong>{email}</strong>.
            Verifique sua caixa de entrada e spam.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Voltar para Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/auth/login" className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para login</span>
          </Link>

          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Recuperar senha</h1>
          <p className="text-muted-foreground mt-2">Digite seu e-mail para receber o link de redefinição</p>
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail cadastrado</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full neon-border" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
