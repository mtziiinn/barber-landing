"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scissors, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      if (!supabase) throw new Error('Erro de configuração');

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      toast({
        title: "Senha atualizada!",
        description: "Você já pode fazer login com sua nova senha.",
      });

      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar senha');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Senha Alterada!</h1>
          <p className="text-muted-foreground">
            Sua senha foi atualizada com sucesso. Você será redirecionado para o login em instantes...
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">Ir para Login Agora</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Senha</h1>
          <p className="text-muted-foreground mt-2">Escolha sua nova senha de acesso</p>
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full neon-border" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                'Salvar Nova Senha'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
