# 🔐 Painel Administrativo - Royal Burger

## 📋 Visão Geral

O painel administrativo permite que administradores gerenciem produtos e pedidos do restaurante de forma eficiente.

## 🚀 Funcionalidades

### 📦 Gerenciamento de Produtos
- ✅ **Adicionar novos produtos** ao cardápio
- ✏️ **Editar produtos existentes** (nome, descrição, preço, categoria, imagem)
- 🗑️ **Deletar produtos** do cardápio
- 👁️ **Visualizar todos os produtos** em uma tabela organizada
- 🔄 **Alterar disponibilidade** de produtos

### 📋 Gerenciamento de Pedidos
- 📊 **Visualizar todos os pedidos** recebidos
- 🔄 **Atualizar status dos pedidos**:
  - ⏳ Pendente
  - 👨‍🍳 Preparando
  - ✅ Pronto
  - 🚚 Em Entrega
  - ✔️ Entregue
  - ❌ Cancelado
- 📞 **Ver informações do cliente** (nome, telefone, endereço)
- 💰 **Visualizar valor total** de cada pedido
- 📝 **Ver itens do pedido** em detalhes

### 📊 Dashboard
- 📈 **Estatísticas em tempo real**:
  - Total de produtos cadastrados
  - Total de pedidos recebidos
  - Pedidos pendentes
  - Receita total

## 🔑 Como Acessar

### 1. Login como Administrador

Para acessar o painel administrativo, faça login com uma conta de administrador:

**Credenciais:**
- **Email:** `admin@royalburger.com`
- **Senha:** A senha que você definiu ao criar o usuário no Supabase

⚠️ **Importante:** O usuário admin deve ser criado no Supabase (veja [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

### 2. Acessar o Painel

Após fazer login como administrador, você terá acesso ao painel de duas formas:

1. **Via Menu do Usuário:**
   - Clique no ícone de usuário no canto superior direito
   - Selecione "Painel Admin" no menu dropdown

2. **Via URL Direta:**
   - Acesse: `http://localhost:3000/admin`

## 🛠️ API Endpoints

### Produtos

#### Listar todos os produtos
```
GET /api/products
```

#### Criar novo produto
```
POST /api/products
Body: {
  "name": "Nome do Produto",
  "description": "Descrição",
  "price": 25.90,
  "category": "burger",
  "image": "url_da_imagem",
  "available": true
}
```

#### Atualizar produto
```
PUT /api/products/{product_id}
Body: {
  "name": "Novo Nome",
  "price": 29.90,
  ...
}
```

#### Deletar produto
```
DELETE /api/products/{product_id}
```

### Pedidos

#### Listar todos os pedidos
```
GET /api/orders
```

#### Criar novo pedido
```
POST /api/orders
Body: {
  "customer_name": "Nome do Cliente",
  "customer_phone": "11999999999",
  "customer_email": "cliente@email.com",
  "delivery_address": "Rua Exemplo, 123",
  "items": [
    {
      "name": "X-Bacon",
      "quantity": 2,
      "price": 25.90
    }
  ],
  "total": 51.80
}
```

#### Atualizar status do pedido
```
PATCH /api/orders/{order_id}/status
Body: {
  "status": "preparing"
}
```

## 📱 Interface

### Tela de Produtos
- Tabela com todos os produtos
- Botão "Adicionar Produto" abre um modal
- Cada produto tem botões de editar e deletar
- Imagem miniatura de cada produto
- Badge de status (Disponível/Indisponível)

### Tela de Pedidos
- Cards para cada pedido
- Informações completas do cliente
- Lista de itens do pedido
- Dropdown para alterar status
- Badge colorido indicando status atual
- Valor total destacado

### Dashboard
- 4 cards com estatísticas principais
- Design limpo e intuitivo
- Ícones representativos
- Cores da marca (laranja/vermelho)

## 🎨 Categorias de Produtos

- `burger` - Hambúrgueres
- `drink` - Bebidas
- `side` - Acompanhamentos
- `dessert` - Sobremesas

## 🔒 Segurança

✅ **Implementação Atual com Supabase:**
- Autenticação real com JWT tokens via Supabase Auth
- Verificação de admin pelo email `admin@royalburger.com`
- Row Level Security (RLS) no banco de dados PostgreSQL
- Políticas de acesso configuradas para cada tabela
- Tokens de sessão seguros com expiração automática

**Recursos de Segurança:**
- ✅ Senhas criptografadas pelo Supabase
- ✅ Tokens JWT com expiração
- ✅ HTTPS obrigatório em produção
- ✅ Row Level Security para controle granular de acesso
- ✅ Proteção contra SQL injection
- ✅ Rate limiting (via Supabase)

**Em Produção:**
- Implemente verificação de roles mais robusta (tabela de admins)
- Configure domínios permitidos no CORS
- Use variáveis de ambiente para credenciais
- Ative email de confirmação no Supabase
- Configure políticas de senha forte
- Monitore logs de acesso

## 🚀 Próximos Passos

- [x] ~~Implementar autenticação real com JWT~~ ✅ Feito com Supabase
- [ ] Implementar upload de imagens (Supabase Storage)
- [ ] Adicionar filtros e busca de produtos
- [ ] Adicionar relatórios de vendas
- [ ] Implementar notificações em tempo real para novos pedidos (Supabase Realtime)
- [ ] Adicionar gráficos e analytics
- [ ] Adicionar gerenciamento de categorias
- [ ] Implementar sistema de cupons/promoções
- [ ] Sistema de permissões granulares (roles)
- [ ] Backup e restauração de dados
- [ ] Exportar relatórios (PDF, Excel)

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
