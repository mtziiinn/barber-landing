import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testUpdate() {
  console.log('--- Testando Atualização de Agendamento ---');

  const { data: appointments, error: fetchError } = await supabase
    .from('appointments')
    .select('id, status')
    .limit(1);

  if (fetchError || !appointments || appointments.length === 0) {
    console.error('Erro ao buscar agendamento:', fetchError?.message || 'Nenhum agendamento.');
    return;
  }

  const app = appointments[0];
  console.log(`Agendamento ID: ${app.id} | Status Atual: ${app.status}`);

  const nextStatus = app.status === 'pending' ? 'confirmed' : 'pending';
  console.log(`Tentando mudar para: ${nextStatus}...`);

  const { error: updateError } = await supabase
    .from('appointments')
    .update({ status: nextStatus })
    .eq('id', app.id);

  if (updateError) {
    console.error('❌ Erro de permissão/RLS:', updateError.message);
  } else {
    console.log('✅ Sucesso! O agendamento foi atualizado no banco.');
  }
}

testUpdate();
