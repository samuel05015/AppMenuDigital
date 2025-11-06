# 🚀 Guia Rápido - Royal Burger com Supabase

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Configure o Supabase (2 min)

1. Acesse: https://supabase.com/dashboard
2. Abra seu projeto: https://hgwfgdphdowsdhtufgil.supabase.co
3. Vá em **SQL Editor** → **New Query**
4. Cole todo o conteúdo de `backend/supabase_setup.sql`
5. Clique em **RUN** ✅

### 2️⃣ Crie o Usuário Admin (1 min)

1. No Supabase Dashboard: **Authentication** → **Users**
2. Clique em **Add User**
3. Preencha:
   - Email: `admin@royalburger.com`
   - Password: (escolha uma senha - ANOTE!)
   - ✅ Marque "Auto Confirm User"
4. Clique em **Create User** ✅

### 3️⃣ Instale as Dependências (1 min)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install --legacy-peer-deps
```

### 4️⃣ Inicie os Servidores (1 min)

**Terminal 1 - Backend:**
```bash
cd backend
python server.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5️⃣ Acesse o Sistema ✅

1. Abra o navegador: http://localhost:3000
2. Faça login com:
   - Email: `admin@royalburger.com`
   - Senha: (a que você definiu)
3. Clique no ícone de usuário → **Painel Admin**

## 🎉 Pronto!

Agora você tem:
- ✅ Backend rodando com Supabase
- ✅ Frontend React funcionando
- ✅ 6 produtos no cardápio
- ✅ Painel admin completo
- ✅ Autenticação real com JWT

## 🔍 Verificar se está funcionando

### Teste o Backend:
```bash
# Abra outro terminal
curl http://localhost:8000/api/
```

Deve retornar:
```json
{
  "message": "Hello World",
  "backend": "Supabase"
}
```

### Teste os Produtos:
```bash
curl http://localhost:8000/api/products
```

Deve retornar uma lista com 6 produtos.

## ❓ Problemas Comuns

### "Error: relation 'products' does not exist"
➡️ Execute o script SQL no Supabase (passo 1)

### "Invalid credentials" ao fazer login
➡️ Certifique-se de criar o usuário admin no Supabase (passo 2)

### Backend não inicia
➡️ Verifique se instalou as dependências:
```bash
cd backend
pip install supabase postgrest
```

### Frontend não inicia
➡️ Use o flag `--legacy-peer-deps`:
```bash
cd frontend
npm install --legacy-peer-deps
```

## 📚 Próximos Passos

1. **Testar o Sistema:**
   - Adicione novos produtos no painel admin
   - Crie pedidos de teste
   - Altere status dos pedidos

2. **Personalizar:**
   - Modifique cores e estilos
   - Adicione novos campos aos produtos
   - Customize o layout

3. **Produção:**
   - Configure domínio personalizado
   - Ative HTTPS
   - Configure email de confirmação no Supabase

## 🆘 Precisa de Ajuda?

- 📖 Documentação completa: [README.md](./README.md)
- 🔐 Guia do Admin: [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- 🗄️ Configuração do Supabase: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

**Sistema 100% Supabase** - Sem MongoDB, sem complicações! 🎯
