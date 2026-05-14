import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment processing not configured" },
        { status: 503 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { serviceId, barberId, date, time } = body

    // Get service details
    const { data: service } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single()

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Get barber details
    const { data: barber } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single()

    // Create appointment first
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        client_id: user.id,
        service_id: serviceId,
        barber_id: barberId,
        appointment_date: date,
        appointment_time: time,
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single()

    if (appointmentError) {
      return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
    }

    // Dynamically import Stripe only when needed
    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-15.acacia",
    })

    // Create Stripe checkout session
    const origin = request.headers.get("origin") || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: service.name,
              description: `Agendamento com ${barber?.name || "barbeiro"} em ${date} às ${time}`,
            },
            unit_amount: service.price_cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        appointmentId: appointment.id,
        userId: user.id,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel?appointment_id=${appointment.id}`,
    })

    // Store stripe session id
    await supabase
      .from("payments")
      .insert({
        appointment_id: appointment.id,
        stripe_session_id: session.id,
        amount_cents: service.price_cents,
        payment_method: "online",
        status: "pending",
      })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
