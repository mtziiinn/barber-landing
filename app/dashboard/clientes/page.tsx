"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Loader2,
  Users,
  Search,
  Mail,
  Phone,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const [newClient, setNewClient] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  async function fetchClients() {
    if (!supabase) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("full_name");
    setClients(data || []);
  }

  useEffect(() => {
    async function getData() {
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(profileData);

        if (profileData?.role === "admin" || profileData?.role === "barber") {
          await fetchClients();
        }
      }
      setLoading(false);
    }
    getData();
  }, []);

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setIsCreating(true);

    try {
      const { error } = await supabase.from("profiles").insert({
        id: uuidv4(),
        full_name: newClient.full_name,
        email: newClient.email,
        phone: newClient.phone,
        role: "client",
      });

      if (error) throw error;

      toast({
        title: "Cliente cadastrado",
        description: "O novo cliente foi adicionado com sucesso.",
      });

      setNewClient({ full_name: "", email: "", phone: "" });
      setIsDialogOpen(false);
      await fetchClients();
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description:
          error.message || "Verifique as permissões do banco de dados.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = profile?.role === "admin" || profile?.role === "barber";

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} isAdmin={isAdmin} />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
              <p className="text-muted-foreground">
                Gerencie a base de clientes da barbearia
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="neon-border">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <form onSubmit={handleCreateClient}>
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                    <DialogDescription>
                      Adicione um cliente manualmente à base de dados.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={newClient.full_name}
                        onChange={(e) =>
                          setNewClient({
                            ...newClient,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="Nome do cliente"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newClient.email}
                        onChange={(e) =>
                          setNewClient({ ...newClient, email: e.target.value })
                        }
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={newClient.phone}
                        onChange={(e) =>
                          setNewClient({ ...newClient, phone: e.target.value })
                        }
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full neon-border"
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        "Cadastrar Cliente"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Agendamentos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {client.full_name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        {client.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {client.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>---</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/clientes/${client.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Ver Detalhes
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClients.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
