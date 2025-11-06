import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Buscar produtos do Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        // Mapear produtos do Supabase para o formato esperado
        const mappedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image || 'https://via.placeholder.com/400x300',
          popular: false, // Você pode adicionar esse campo no Supabase depois
          customizable: true
        }));
        setMenuItems(mappedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'burger', name: 'Hambúrgueres' },
    { id: 'drink', name: 'Bebidas' },
    { id: 'side', name: 'Acompanhamentos' },
    { id: 'dessert', name: 'Sobremesas' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosso Cardápio</h1>
          <p className="text-xl text-gray-100">Explore nossa deliciosa seleção</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar hambúrgueres, acompanhamentos, bebidas..."
              className="pl-10 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 bg-transparent h-auto">
            {categories.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white bg-white border-2 border-gray-200 hover:border-red-300 py-3 font-semibold"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Carregando produtos...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/menu/${item.id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-red-600 px-3 py-1 rounded-full font-bold text-sm">
                      Popular
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <span className="text-xl font-bold text-red-600">R${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/menu/${item.id}`);
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">Nenhum item encontrado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
