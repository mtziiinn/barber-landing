import Link from "next/link";
import { Scissors, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                FADE<span className="text-primary">ZONE</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              A barbearia mais estilosa da cidade. Cortes modernos, ambiente
              descontraido e atendimento de primeira.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Links Rapidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#servicos"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Servicos
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Equipe
                </a>
              </li>
              <li>
                <a
                  href="#localizacao"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Localizacao
                </a>
              </li>
              <li>
                <Link
                  href="/agendar"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Agendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold mb-4">Conta</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/login"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Entrar
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-up"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Criar Conta
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} FadeZone. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacidade"
              className="hover:text-primary transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="hover:text-primary transition-colors"
            >
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
