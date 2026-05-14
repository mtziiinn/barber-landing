import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function check() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('--- Verificando Perfis ---');
  data?.forEach(p => {
    console.log(`ID: ${p.id} | Nome: ${p.full_name} | Role: ${p.role}`);
  });
}

check();
