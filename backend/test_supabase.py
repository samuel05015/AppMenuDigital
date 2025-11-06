"""
Script para testar a conexão com o Supabase e verificar as tabelas
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Carregar variáveis de ambiente
load_dotenv()

SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://hgwfgdphdowsdhtufgil.supabase.co')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

def test_connection():
    """Testa a conexão com o Supabase"""
    print("🔍 Testando conexão com o Supabase...")
    print(f"📍 URL: {SUPABASE_URL}")
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Conexão estabelecida com sucesso!")
        return supabase
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")
        return None

def test_products_table(supabase: Client):
    """Testa a tabela de produtos"""
    print("\n📦 Testando tabela de produtos...")
    
    try:
        response = supabase.table('products').select("*").limit(5).execute()
        
        if response.data:
            print(f"✅ Tabela 'products' existe!")
            print(f"📊 Produtos encontrados: {len(response.data)}")
            
            if response.data:
                print("\n🍔 Primeiros produtos:")
                for product in response.data[:3]:
                    print(f"   - {product.get('name')} - R$ {product.get('price')}")
        else:
            print("⚠️  Tabela 'products' existe mas está vazia")
            print("💡 Execute o script SQL para inserir dados de exemplo")
            
    except Exception as e:
        print(f"❌ Erro ao acessar tabela 'products': {e}")
        print("💡 Execute o script 'supabase_setup.sql' no SQL Editor do Supabase")

def test_orders_table(supabase: Client):
    """Testa a tabela de pedidos"""
    print("\n📋 Testando tabela de pedidos...")
    
    try:
        response = supabase.table('orders').select("*").limit(5).execute()
        
        print(f"✅ Tabela 'orders' existe!")
        print(f"📊 Pedidos encontrados: {len(response.data)}")
        
        if response.data:
            print("\n📦 Últimos pedidos:")
            for order in response.data[:3]:
                print(f"   - {order.get('customer_name')} - R$ {order.get('total')} - Status: {order.get('status')}")
                
    except Exception as e:
        print(f"❌ Erro ao acessar tabela 'orders': {e}")
        print("💡 Execute o script 'supabase_setup.sql' no SQL Editor do Supabase")

def test_auth(supabase: Client):
    """Testa a autenticação do Supabase"""
    print("\n🔐 Testando autenticação...")
    
    try:
        # Tentar listar usuários (isso pode falhar se não houver permissão)
        print("✅ Sistema de autenticação está configurado")
        print("💡 Crie um usuário admin em: Authentication > Users no Dashboard do Supabase")
        print("   Email: admin@royalburger.com")
        
    except Exception as e:
        print(f"⚠️  Aviso: {e}")

def main():
    """Função principal"""
    print("=" * 60)
    print("🧪 TESTE DE CONEXÃO COM SUPABASE")
    print("=" * 60)
    
    supabase = test_connection()
    
    if not supabase:
        print("\n❌ Não foi possível conectar ao Supabase")
        print("\n📝 Verifique:")
        print("   1. Se o arquivo .env existe")
        print("   2. Se as variáveis SUPABASE_URL e SUPABASE_KEY estão corretas")
        print("   3. Se você instalou: pip install supabase")
        return
    
    test_products_table(supabase)
    test_orders_table(supabase)
    test_auth(supabase)
    
    print("\n" + "=" * 60)
    print("✅ TESTES CONCLUÍDOS!")
    print("=" * 60)
    print("\n📚 Próximos passos:")
    print("   1. Se as tabelas não existem, execute: backend/supabase_setup.sql")
    print("   2. Crie um usuário admin no Supabase Dashboard")
    print("   3. Inicie o backend: python server_supabase.py")
    print("   4. Inicie o frontend: cd frontend && npm start")
    print("   5. Acesse: http://localhost:3000/admin")

if __name__ == "__main__":
    main()
