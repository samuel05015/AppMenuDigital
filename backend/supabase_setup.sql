-- =====================================================
-- Script SQL para criar tabelas no Supabase
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- Tabela de verificação de status
CREATE TABLE IF NOT EXISTS status_checks (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT DEFAULT '',
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT DEFAULT '',
    customer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Habilitar Row Level Security (RLS)
ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para produtos (todos podem ler, apenas autenticados podem escrever)
CREATE POLICY "Todos podem visualizar produtos"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem criar produtos"
    ON products FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar produtos"
    ON products FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar produtos"
    ON products FOR DELETE
    USING (auth.role() = 'authenticated');

-- Políticas de acesso para pedidos
CREATE POLICY "Todos podem criar pedidos"
    ON orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem visualizar todos os pedidos"
    ON orders FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem visualizar seus próprios pedidos"
    ON orders FOR SELECT
    USING (customer_email = auth.jwt()->>'email' OR auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar pedidos"
    ON orders FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Políticas de acesso para status_checks
CREATE POLICY "Todos podem criar status checks"
    ON status_checks FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Todos podem visualizar status checks"
    ON status_checks FOR SELECT
    USING (true);

-- Função para atualizar o timestamp de updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo (opcional)
INSERT INTO products (id, name, description, price, category, image, available, created_at)
VALUES
    (gen_random_uuid()::text, 'X-Bacon Clássico', 'Pão, hambúrguer 150g, queijo, bacon crocante, alface, tomate e maionese especial', 25.90, 'burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', true, NOW()),
    (gen_random_uuid()::text, 'X-Tudo Especial', 'Pão, hambúrguer 200g, queijo, presunto, bacon, ovo, alface, tomate, milho e batata palha', 32.90, 'burger', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500', true, NOW()),
    (gen_random_uuid()::text, 'Royal Burger', 'Pão brioche, hambúrguer artesanal 180g, queijo cheddar, cebola caramelizada e molho barbecue', 38.90, 'burger', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500', true, NOW()),
    (gen_random_uuid()::text, 'Coca-Cola 350ml', 'Refrigerante Coca-Cola lata 350ml gelada', 5.00, 'drink', 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500', true, NOW()),
    (gen_random_uuid()::text, 'Batata Frita Grande', 'Porção grande de batatas fritas crocantes com sal', 15.90, 'side', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', true, NOW()),
    (gen_random_uuid()::text, 'Onion Rings', 'Porção de anéis de cebola empanados e fritos', 12.90, 'side', 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500', true, NOW())
ON CONFLICT (id) DO NOTHING;

-- Criar usuário admin (você precisará fazer isso manualmente ou via interface do Supabase)
-- Vá para Authentication > Users e crie um usuário com email: admin@royalburger.com

-- Verificar se as tabelas foram criadas
SELECT 
    tablename,
    schemaname
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
