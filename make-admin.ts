import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function makeAdmin() {
  const email = 'matheusgoncalves1502@gmail.com';
  console.log('--- Promovendo para Admin ---');

  const { data: profile, error: findError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (findError) {
    console.error('Erro ao buscar perfil:', findError.message);
    return;
  }

  console.log(`Usuário encontrado: ${profile.full_name} (${profile.id})`);
  console.log(`Role atual: ${profile.role}`);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Erro ao atualizar:', updateError.message);
  } else {
    console.log('\nSucesso! Agora você é ADMIN. 🎉');
    console.log('Recarregue a página do Dashboard para ver as mudanças.');
  }
}

makeAdmin();
