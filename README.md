# 🍔 Royal Burger - Sistema de Pedidos Online

Sistema completo de pedidos online para restaurantes com painel administrativo.

**🚀 Backend 100% Supabase** - PostgreSQL + Autenticação + Realtime + Storage

## ⚡ Início Rápido

**Quer começar agora?** Veja o [QUICK_START.md](./QUICK_START.md) (5 minutos)

## 🚀 Funcionalidades

### Para Clientes
- 📱 Navegação pelo cardápio
- 🛒 Carrinho de compras
- 💳 Checkout e finalização de pedidos
- 📍 Localização das lojas
- 🎁 Ofertas e promoções

### Para Administradores
- 🔐 **Painel Administrativo Completo**
- 📦 Gerenciamento de produtos (adicionar, editar, deletar)
- 📋 Gerenciamento de pedidos em tempo real
- 📊 Dashboard com estatísticas
- 🔄 Atualização de status dos pedidos
- 💰 Controle de receitas

## 🛠️ Tecnologias

### Frontend
- React 18
- React Router
- Tailwind CSS
- Shadcn/ui Components
- Lucide Icons

### Backend
- FastAPI (Python)
- **Supabase** (PostgreSQL + Auth + Realtime)
- Pydantic

### Database
- PostgreSQL (via Supabase)
- Row Level Security (RLS)
- Autenticação integrada

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/samuel05015/AppMenuDigital.git
cd AppMenuDigital
```

### 2. Configure o Backend

```bash
cd backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# As variáveis de ambiente já estão configuradas no .env
```

**📊 Configure o Supabase:**

1. Execute o script SQL no Supabase SQL Editor para criar as tabelas
2. Crie um usuário admin com email: `admin@royalburger.com`
3. Veja instruções completas em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. Configure o Frontend

```bash
cd frontend

# Instale as dependências
npm install --legacy-peer-deps

# O arquivo .env já está configurado
```

### 4. Popular o Banco de Dados

Os dados de exemplo são inseridos automaticamente quando você executa o script SQL no Supabase.

O script `backend/supabase_setup.sql` já inclui:
- ✅ 6 produtos de exemplo (burgers, bebidas, acompanhamentos)
- ✅ Todas as tabelas necessárias
- ✅ Índices para performance
- ✅ Políticas de segurança (RLS)

## 🚀 Executando o Projeto

### Backend (Supabase)
```bash
cd backend
python server.py
```

Ou com uvicorn:
```bash
uvicorn server:app --reload
```

O backend estará disponível em: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm start
```
O frontend estará disponível em: `http://localhost:3000`

## 🔐 Acesso ao Painel Administrativo

1. Acesse o sistema: `http://localhost:3000`
2. Faça login com sua conta de administrador criada no Supabase:
   - **Email:** `admin@royalburger.com`
   - **Senha:** (a senha que você definiu no Supabase)
3. Clique no ícone de usuário e selecione "Painel Admin"
4. Ou acesse diretamente: `http://localhost:3000/admin`

📖 **Documentação completa:**
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Guia do Painel Administrativo
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Configuração do Supabase

## 📁 Estrutura do Projeto

```
AppMenuDigital/
├── backend/
│   ├── server.py              # API FastAPI com Supabase ⭐
│   ├── supabase_setup.sql     # Script SQL para criar tabelas ⭐
│   ├── test_supabase.py       # Script de teste da conexão
│   ├── requirements.txt       # Dependências Python
│   └── .env                   # Configurações (Supabase)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin.jsx      # Painel Administrativo
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── ...
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── context/           # Context API (Auth, Cart)
│   │   └── ...
│   └── package.json
├── ADMIN_GUIDE.md             # Guia do Painel Admin
└── SUPABASE_SETUP.md          # Guia de Configuração do Supabase ⭐
```

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/signup` - Criar nova conta
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/user` - Usuário atual

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto (requer auth)
- `PUT /api/products/{id}` - Atualizar produto (requer auth)
- `DELETE /api/products/{id}` - Deletar produto (requer auth)

### Pedidos
- `GET /api/orders` - Listar pedidos (requer auth para ver todos)
- `POST /api/orders` - Criar pedido
- `PATCH /api/orders/{id}/status` - Atualizar status (requer auth)

## 🎨 Categorias de Produtos

- `burger` - Hambúrgueres
- `drink` - Bebidas
- `side` - Acompanhamentos
- `dessert` - Sobremesas

## 📊 Status dos Pedidos

- `pending` - Pendente
- `preparing` - Preparando
- `ready` - Pronto
- `delivering` - Em Entrega
- `delivered` - Entregue
- `cancelled` - Cancelado

## 🔧 Desenvolvimento

### Adicionar novos componentes UI
```bash
cd frontend
npx shadcn-ui@latest add [component-name]
```

### Rodar testes
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
pytest
```

## 📝 TODO / Melhorias Futuras

- [x] ~~Autenticação JWT real~~ ✅ Implementado com Supabase
- [ ] Upload de imagens para produtos (Supabase Storage)
- [ ] Notificações em tempo real (Supabase Realtime)
- [ ] Sistema de cupons/promoções
- [ ] Relatórios e analytics
- [ ] Integração com pagamento
- [ ] App mobile (React Native)
- [ ] Email de confirmação de pedidos
- [ ] Sistema de avaliações de produtos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Samuel - [@samuel05015](https://github.com/samuel05015)

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

