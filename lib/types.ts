export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: "client" | "admin" | "barber"
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string | null
  price_cents: number
  duration_minutes: number
  is_active: boolean
  created_at: string
}

export interface Barber {
  id: string
  user_id: string | null
  name: string
  specialties: string[] | null
  is_active: boolean
  created_at: string
}

export interface Appointment {
  id: string
  client_id: string
  barber_id: string | null
  service_id: string
  appointment_date: string
  appointment_time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  payment_status: "pending" | "paid_online" | "paid_cash" | "refunded"
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  service?: Service
  barber?: Barber
  client?: Profile
}

export interface Payment {
  id: string
  appointment_id: string
  stripe_session_id: string | null
  amount_cents: number
  payment_method: "online" | "cash" | "card_in_person" | null
  status: "pending" | "completed" | "failed" | "refunded"
  created_at: string
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  return time.slice(0, 5)
}
