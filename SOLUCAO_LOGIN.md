# 🔧 Solução: Problema de Login

## ✅ Backend está rodando!

O backend está funcionando em `http://localhost:8000`

## ⚠️ Para fazer login funcionar, você PRECISA:

### 1️⃣ Executar o Script SQL no Supabase (OBRIGATÓRIO)

1. Acesse: https://supabase.com/dashboard
2. Abra seu projeto clicando nele
3. No menu lateral esquerdo, clique em **SQL Editor**
4. Clique no botão **New Query** (ou **+ New**)
5. **COPIE TODO O CONTEÚDO** do arquivo `backend/supabase_setup.sql`
6. **COLE** no editor SQL
7. Clique em **RUN** ou pressione `Ctrl + Enter`
8. Aguarde a mensagem de sucesso ✅

### 2️⃣ Criar o Usuário Admin (OBRIGATÓRIO)

1. No menu lateral do Supabase, clique em **Authentication**
2. Clique em **Users**
3. Clique no botão **Add User** (canto superior direito)
4. Preencha o formulário:
   ```
   Email: admin@royalburger.com
   Password: (escolha uma senha forte - ANOTE!)
   ```
5. **IMPORTANTE:** Marque a opção ✅ **Auto Confirm User**
6. Clique em **Create User**

### 3️⃣ Testar o Login

Agora você pode fazer login:

1. Abra: http://localhost:3000/login
2. Digite:
   - **Email:** `admin@royalburger.com`
   - **Senha:** (a senha que você criou no passo 2)
3. Clique em **Login**

## 🔍 Verificar se o Setup está OK

Execute este teste:

```bash
cd backend
python test_supabase.py
```

Isso vai verificar:
- ✅ Conexão com Supabase
- ✅ Tabelas criadas
- ✅ Produtos inseridos

## ❓ Ainda não funciona?

### Verificar Backend
Abra: http://localhost:8000/api/

Deve mostrar:
```json
{
  "message": "Hello World",
  "backend": "Supabase"
}
```

### Verificar Produtos
Abra: http://localhost:8000/api/products

Deve mostrar uma lista de produtos (se você executou o SQL)

### Verificar Erros no Console

1. Abra o navegador (F12)
2. Vá na aba **Console**
3. Tente fazer login
4. Veja se aparece algum erro vermelho

### Mensagens de Erro Comuns:

**"Invalid credentials"**
➡️ Email ou senha incorretos. Verifique se criou o usuário no Supabase

**"Failed to fetch" ou "Network Error"**
➡️ Backend não está rodando. Execute: `uvicorn server:app --reload`

**"relation 'products' does not exist"**
➡️ Não executou o script SQL no Supabase

**"User already registered"**
➡️ Tente fazer login em vez de cadastrar

## 📝 Checklist Completo

- [ ] Backend rodando (`uvicorn server:app --reload`)
- [ ] Frontend rodando (`npm start`)
- [ ] Script SQL executado no Supabase
- [ ] Usuário admin criado no Supabase
- [ ] Testado acesso ao http://localhost:8000/api/
- [ ] Testado login com credenciais corretas

## 🆘 Ajuda Extra

Se ainda não funcionar, me mande:

1. O erro que aparece no console do navegador (F12)
2. O erro que aparece no terminal do backend
3. Uma captura de tela da página de login

---

**🎯 Resumo: Você DEVE executar o SQL no Supabase e criar o usuário admin antes de tentar fazer login!**
