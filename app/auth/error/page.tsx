import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Erro de autenticacao</h1>
        <p className="text-muted-foreground mb-8">
          Ocorreu um erro durante o processo de autenticacao. 
          Por favor, tente novamente.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Tentar novamente</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
