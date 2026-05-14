import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { preference } from "@/lib/mercadopago";

export async function POST(req: Request) {
  try {
    const { serviceId, barberId, date, time } = await req.json();
    const supabase = await createClient();

    if (!supabase)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch service details
    const { data: service } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (!service) {
      return NextResponse.json(
        { error: "Serviço não encontrado" },
        { status: 404 },
      );
    }

    // Create appointment in pending state
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        client_id: user.id,
        barber_id: barberId,
        service_id: serviceId,
        appointment_date: date,
        appointment_time: time,
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single();

    if (appointmentError) {
      return NextResponse.json(
        { error: "Erro ao criar agendamento" },
        { status: 500 },
      );
    }

    const origin = req.headers.get("origin");

    // Create Mercado Pago Preference
    const response = await preference.create({
      body: {
        items: [
          {
            id: service.id,
            title: service.name,
            quantity: 1,
            unit_price: service.price_cents / 100, // Mercado Pago uses decimal values
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: `${origin}/checkout/success`,
          failure: `${origin}/checkout/cancel`,
          pending: `${origin}/checkout/success`,
        },
        auto_return: "approved",
        metadata: {
          appointment_id: appointment.id,
          user_id: user.id,
        },
        external_reference: appointment.id,
      },
    });

    return NextResponse.json({
      id: response.id,
      url: response.init_point, // URL to redirect user to Mercado Pago checkout
    });
  } catch (error) {
    console.error("Mercado Pago Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
