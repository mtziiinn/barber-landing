import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function run() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Erro:', error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log('Perfis encontrados:');
    data.forEach(p => {
      console.log(`- ID: ${p.id} | Nome: ${p.full_name} | Role: ${p.role}`);
    });

    // Se houver apenas um usuário ou o Matheus, vamos promovê-lo
    const matheus = data.find(p => p.full_name && p.full_name.toLowerCase().includes('matheus'));
    const target = matheus || data[0];

    console.log(`\nPromovendo ${target.full_name} para ADMIN...`);
    const { error: upError } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', target.id);

    if (upError) console.error('Erro ao atualizar:', upError.message);
    else console.log('Sucesso! 🎉');
  } else {
    console.log('Nenhum perfil encontrado.');
  }
}

run();
