import { MercadoPagoConfig, Preference } from 'mercadopago';

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000';

export const client = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 }
});

export const preference = new Preference(client);
