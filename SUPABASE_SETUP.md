# 🚀 Guia de Configuração do Supabase

## 📋 Pré-requisitos

Você já tem uma conta no Supabase e um projeto criado com as seguintes credenciais:
- **URL:** `https://hgwfgdphdowsdhtufgil.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 🔧 Passos de Configuração

### 1. Criar as Tabelas no Supabase

1. Acesse seu projeto no Supabase: https://supabase.com/dashboard
2. No menu lateral, clique em **SQL Editor**
3. Clique em **New Query**
4. Copie todo o conteúdo do arquivo `backend/supabase_setup.sql`
5. Cole no editor SQL
6. Clique em **RUN** ou pressione `Ctrl + Enter`

Isso irá criar:
- ✅ Tabela `products` (produtos do cardápio)
- ✅ Tabela `orders` (pedidos dos clientes)
- ✅ Tabela `status_checks` (verificações de status)
- ✅ Índices para melhor performance
- ✅ Políticas de segurança (RLS)
- ✅ Dados de exemplo (6 produtos)

### 2. Criar Usuário Administrador

1. No Supabase Dashboard, vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Preencha:
   - **Email:** `admin@royalburger.com`
   - **Password:** (escolha uma senha segura)
   - **Auto Confirm User:** ✅ Marque esta opção
4. Clique em **Create User**

### 3. Instalar Dependências do Backend

```bash
cd backend
pip install -r requirements.txt
```

Isso instalará o cliente do Supabase:
```
supabase>=2.3.0
postgrest>=0.14.0
```

### 4. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com suas credenciais:

```env
SUPABASE_URL="https://hgwfgdphdowsdhtufgil.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
CORS_ORIGINS="*"
```

### 5. Iniciar o Backend com Supabase

```bash
cd backend
python server.py
```

Ou com uvicorn:
```bash
uvicorn server:app --reload
```

O backend estará disponível em: `http://localhost:8000`

### 6. Testar a API

#### Verificar se está funcionando:
```bash
curl http://localhost:8000/api/
```

Resposta esperada:
```json
{
  "message": "Hello World",
  "backend": "Supabase"
}
```

#### Listar produtos:
```bash
curl http://localhost:8000/api/products
```

#### Criar conta:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "senha123",
    "name": "Usuário Teste"
  }'
```

#### Fazer login:
```bash
curl -X POST http://localhost:8000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@royalburger.com",
    "password": "sua_senha"
  }'
```

## 🎯 Funcionalidades Implementadas

### Autenticação Real com Supabase
- ✅ **Signup:** Criar nova conta de usuário
- ✅ **Signin:** Login com email e senha
- ✅ **Signout:** Logout seguro
- ✅ **Token JWT:** Autenticação baseada em token
- ✅ **Verificação de Admin:** Email `admin@royalburger.com` é admin

### Gerenciamento de Produtos
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Categorias: burger, drink, side, dessert
- ✅ Disponibilidade (disponível/indisponível)
- ✅ Upload de URL de imagens

### Gerenciamento de Pedidos
- ✅ Criar novos pedidos
- ✅ Listar todos os pedidos
- ✅ Atualizar status dos pedidos
- ✅ Informações completas do cliente
- ✅ Histórico de pedidos

## 🔒 Segurança (Row Level Security)

As políticas implementadas no Supabase:

### Produtos
- **Leitura:** Todos podem visualizar (público)
- **Criação/Edição/Exclusão:** Apenas usuários autenticados

### Pedidos
- **Criação:** Qualquer pessoa pode criar (checkout público)
- **Leitura:** 
  - Usuários podem ver seus próprios pedidos (por email)
  - Admins podem ver todos os pedidos
- **Atualização:** Apenas usuários autenticados (admins)

## 📊 Estrutura das Tabelas

### Products
```sql
id TEXT PRIMARY KEY
name TEXT
description TEXT
price DECIMAL(10, 2)
category TEXT
image TEXT
available BOOLEAN
created_at TIMESTAMPTZ
```

### Orders
```sql
id TEXT PRIMARY KEY
customer_name TEXT
customer_email TEXT
customer_phone TEXT
delivery_address TEXT
items JSONB
total DECIMAL(10, 2)
status TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

## 🐛 Solução de Problemas

### Erro: "relation 'products' does not exist"
- Execute o script SQL no SQL Editor do Supabase

### Erro: "Invalid API key"
- Verifique se o SUPABASE_KEY está correto no `.env`
- Use a chave **anon/public**, não a service_role key

### Erro: "Row Level Security"
- Certifique-se de que as políticas foram criadas
- Para testes, você pode desabilitar RLS temporariamente

### Produtos não aparecem
- Verifique se os dados de exemplo foram inseridos
- Execute a parte de INSERT do script SQL

## 🔄 Migração do MongoDB para Supabase

### Diferenças Principais:

| Aspecto | MongoDB | Supabase (PostgreSQL) |
|---------|---------|----------------------|
| Tipo | NoSQL | SQL (PostgreSQL) |
| Estrutura | Coleções/Documentos | Tabelas/Linhas |
| Schema | Flexível | Rígido (tipado) |
| Arrays | Nativo | JSONB |
| IDs | ObjectId | TEXT/UUID |

### Vantagens do Supabase:
- ✅ **Autenticação integrada** (built-in)
- ✅ **Row Level Security** (segurança por linha)
- ✅ **Realtime** subscriptions
- ✅ **Storage** para arquivos
- ✅ **Dashboard visual**
- ✅ **Backups automáticos**
- ✅ **API automática** (PostgREST)

## 📝 Próximos Passos

1. **Testar autenticação** no frontend
2. **Criar pedidos** via interface
3. **Gerenciar produtos** no painel admin
4. **Configurar Storage** para upload de imagens
5. **Implementar Realtime** para pedidos ao vivo
6. **Adicionar email** de confirmação de pedidos

## 🌐 Acesso ao Painel Admin

1. Acesse: `http://localhost:3000/login`
2. Faça login com: `admin@royalburger.com`
3. Acesse: `http://localhost:3000/admin`

## 📞 Suporte

- Documentação Supabase: https://supabase.com/docs
- Guia de RLS: https://supabase.com/docs/guides/auth/row-level-security
- API Reference: https://supabase.com/docs/reference/javascript

---

✅ **Configuração concluída!** Seu projeto agora usa Supabase como backend.
