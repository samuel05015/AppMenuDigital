import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { menuItems, deals } from '../mockData';

const Home = () => {
  const popularItems = menuItems.filter(item => item.popular).slice(0, 3);
  const featuredDeals = deals.filter(deal => deal.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              Bem-vindo ao <span className="text-yellow-400">Royal Burguer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto">
              Experimente o sabor real com nossos hambúrgueres grelhados feitos com ingredientes premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold text-lg px-8 py-6 transition-all transform hover:scale-105"
              >
                <Link to="/menu">
                  Peça Agora <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold text-lg px-8 py-6 transition-all"
              >
                <Link to="/deals">Ver Ofertas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ofertas Quentes</h2>
            <p className="text-gray-600 text-lg">Não perca nossas ofertas incríveis!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDeals.map(deal => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-yellow-400">
                <div className="relative h-64">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                    Economize R${(deal.originalPrice - deal.price).toFixed(2)}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-red-600">R${deal.price}</span>
                      <span className="text-gray-400 line-through ml-2">R${deal.originalPrice}</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Peça Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Favoritos dos Fãs</h2>
            <p className="text-gray-600 text-lg">Nossos hambúrgueres mais amados</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-red-600 px-3 py-1 rounded-full font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Popular
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">R${item.price}</span>
                    <Button
                      asChild
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Link to={`/menu/${item.id}`}>Pedir</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              <Link to="/menu">
                Ver Cardápio Completo <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por Que Royal Burguer?</h2>
            <p className="text-gray-600 text-lg">Qualidade e serviço dignos de realeza</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Hambúrgueres quentes e frescos entregues na sua porta em 30 minutos ou menos
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">
                100% carne bovina, vegetais frescos e nossos molhos exclusivos
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Múltiplas Localizações</h3>
              <p className="text-gray-600">
                Encontre-nos em locais convenientes por toda a cidade
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
