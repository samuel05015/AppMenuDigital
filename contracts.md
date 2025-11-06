# Royal Burguer App - Backend Integration Contracts

## Supabase Configuration
- **URL**: https://hgwfgdphdowsdhtufgil.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnd2ZnZHBoZG93c2RodHVmZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MjY2NzAsImV4cCI6MjA3ODAwMjY3MH0.AoxxxrxYzGY26aDfx0Srtef9bQP7EhSVXns3IAKbboE

## Database Schema

### Tables to Create in Supabase

#### 1. users (handled by Supabase Auth)
- id (uuid, primary key)
- email (text)
- created_at (timestamp)
- Additional profile data stored in `profiles` table

#### 2. profiles
```sql
CREATE TABLE profiles (
  id uuid references auth.users primary key,
  name text,
  phone text,
  address text,
  city text,
  zip_code text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 3. orders
```sql
CREATE TABLE orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  order_number text unique not null,
  status text not null, -- 'pending', 'preparing', 'delivered', 'cancelled'
  subtotal decimal(10,2) not null,
  tax decimal(10,2) not null,
  delivery_fee decimal(10,2) not null,
  total decimal(10,2) not null,
  delivery_type text not null, -- 'delivery', 'pickup'
  payment_method text not null, -- 'card', 'cash'
  delivery_address jsonb, -- {address, city, zipCode}
  customer_info jsonb, -- {name, phone}
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 4. order_items
```sql
CREATE TABLE order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders not null,
  menu_item_id integer not null,
  name text not null,
  price decimal(10,2) not null,
  quantity integer not null,
  customizations jsonb, -- stores customization options
  created_at timestamp with time zone default now()
);
```

#### 5. menu_items
```sql
CREATE TABLE menu_items (
  id serial primary key,
  name text not null,
  category text not null, -- 'burgers', 'chicken', 'sides', 'drinks', 'desserts'
  price decimal(10,2) not null,
  description text,
  image text,
  popular boolean default false,
  customizable boolean default false,
  available boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## API Endpoints Structure (Supabase Client-side)

### Authentication
- **Sign Up**: `supabase.auth.signUp({ email, password })`
- **Sign In**: `supabase.auth.signInWithPassword({ email, password })`
- **Sign Out**: `supabase.auth.signOut()`
- **Get Session**: `supabase.auth.getSession()`
- **On Auth Change**: `supabase.auth.onAuthStateChange(callback)`

### Menu Items
- **Get All**: `supabase.from('menu_items').select('*').eq('available', true)`
- **Get by Category**: `supabase.from('menu_items').select('*').eq('category', category).eq('available', true)`
- **Get by ID**: `supabase.from('menu_items').select('*').eq('id', id).single()`

### Orders
- **Create Order**: 
  ```js
  supabase.from('orders').insert({ ...orderData })
  supabase.from('order_items').insert([...items])
  ```
- **Get User Orders**: `supabase.from('orders').select('*, order_items(*)').eq('user_id', userId).order('created_at', { ascending: false })`
- **Get Order by ID**: `supabase.from('orders').select('*, order_items(*)').eq('id', orderId).single()`

### User Profile
- **Get Profile**: `supabase.from('profiles').select('*').eq('id', userId).single()`
- **Update Profile**: `supabase.from('profiles').upsert({ id: userId, ...profileData })`

## Current Mock Data to Replace

### Mock Auth (AuthContext.js)
- Currently using localStorage for user sessions
- Replace with Supabase Auth methods
- Update user state management to use Supabase session

### Mock Menu Data (mockData.js)
- Menu items currently hardcoded
- Will seed Supabase with menu data
- Frontend will fetch from Supabase

### Mock Orders (Orders.jsx)
- Currently showing hardcoded orders
- Replace with Supabase queries for user orders

## Integration Steps

1. **Install Supabase Client**
   ```bash
   cd /app/frontend && yarn add @supabase/supabase-js
   ```

2. **Create Supabase Client**
   - Create `/app/frontend/src/lib/supabaseClient.js`
   - Initialize with URL and anon key

3. **Update AuthContext**
   - Replace mock authentication with Supabase Auth
   - Handle session management
   - Update login, signup, logout methods

4. **Seed Database**
   - Insert menu items from mockData into Supabase
   - Can use Supabase dashboard or SQL script

5. **Update Components**
   - Menu.jsx: Fetch from Supabase
   - ProductDetail.jsx: Fetch product details
   - Checkout.jsx: Create orders in Supabase
   - Orders.jsx: Fetch user orders

## Row Level Security (RLS) Policies

### profiles
```sql
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### orders
```sql
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### order_items
```sql
-- Users can view items from their orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can create order items for their orders
CREATE POLICY "Users can create own order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );
```

### menu_items
```sql
-- Anyone can view menu items (public access)
CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  USING (available = true);
```

## Notes
- All database tables need RLS enabled
- Supabase handles user authentication and sessions
- Frontend uses Supabase client for all database operations
- No backend FastAPI needed for this app (fully client-side with Supabase)
