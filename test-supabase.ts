import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Carrega variáveis do .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testConnection() {
  console.log('--- Testando Conexão Supabase ---');
  console.log('URL:', supabaseUrl ? 'Configurada ✅' : 'AUSENTE ❌');
  console.log('Anon Key:', supabaseAnonKey ? 'Configurada ✅' : 'AUSENTE ❌');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('\nErro: Variáveis de ambiente não encontradas no arquivo .env.local');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Tenta buscar o nome da barbearia ou qualquer dado da tabela services
    const { data, error } = await supabase.from('services').select('count');

    if (error) {
      console.error('\nErro na resposta do Supabase:', error.message);
      if (error.message.includes('failed to fetch')) {
        console.log('Dica: Verifique se a URL do projeto está correta.');
      }
    } else {
      console.log('\nConexão bem-sucedida! 🎉');
      console.log('O banco de dados respondeu corretamente.');
    }
  } catch (err) {
    console.error('\nErro inesperado ao conectar:', err);
  }
}

testConnection();
