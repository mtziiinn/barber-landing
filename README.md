# ✂️ FADE ZONE | Barbearia Urbana

Bem-vindo ao repositório da **FADE ZONE**, uma plataforma moderna de agendamento online e gestão para barbearias. Desenvolvida com as tecnologias mais recentes do ecossistema Web para oferecer uma experiência fluida tanto para o cliente quanto para o proprietário.

---

## 🚀 Funcionalidades

### Para Clientes:
- **Agendamento Inteligente:** Fluxo de agendamento em passos (Serviço > Barbeiro > Data/Hora > Confirmação).
- **Pagamento Online:** Integração com Mercado Pago para pagamentos via Pix ou Cartão.
- **Área do Cliente:** Dashboard para visualizar agendamentos, status de pagamento e gerenciar perfil.
- **Autenticação Segura:** Cadastro, login e recuperação de senha via Supabase.

### Para Administradores (Barbeiros/Donos):
- **Painel de Controle:** Visão geral de agendamentos e estatísticas diárias.
- **Gestão de Clientes:** Listagem, busca e cadastro manual de clientes.
- **Gestão de Serviços:** Controle total sobre o catálogo de serviços, preços e durações.
- **Relatórios:** Análise de faturamento e métricas de crescimento.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Banco de Dados & Auth:** [Supabase](https://supabase.com/)
- **Pagamentos:** [Mercado Pago SDK](https://www.mercadopago.com.br/developers/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Configuração Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/mtziiinn/barber-landing.git
   cd barber-landing
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz e adicione:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   MERCADO_PAGO_ACCESS_TOKEN=seu_token_do_mercado_pago
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 📦 Deploy (Vercel)

Este projeto está pronto para ser implantado na **Vercel**. 
1. Conecte seu repositório GitHub.
2. Adicione as mesmas Variáveis de Ambiente configuradas no `.env.local`.
3. O deploy será feito automaticamente a cada novo *push*.

---

## 📜 Licença

Este projeto é para fins de demonstração e estudo. Sinta-se à vontade para usar e adaptar.

---

Desenvolvido com ⚡ por [Mts](https://github.com/mtziiinn)
