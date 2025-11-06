import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { deals } from '../mockData';

const Deals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Tag className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Special Deals</h1>
          </div>
          <p className="text-xl text-gray-100 text-center">Save big on your favorite meals!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="relative h-64">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-400 text-red-600 hover:bg-yellow-500 font-bold px-3 py-1">
                    Featured Deal
                  </Badge>
                )}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  Save ${(deal.originalPrice - deal.price).toFixed(2)}
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-gray-600">{deal.description}</p>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-red-600">${deal.price}</span>
                  <span className="text-xl text-gray-400 line-through">${deal.originalPrice}</span>
                  <span className="text-sm text-green-600 font-semibold">
                    ({Math.round((1 - deal.price / deal.originalPrice) * 100)}% off)
                  </span>
                </div>

                <Button
                  onClick={() => navigate('/menu')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6"
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Offers Banner */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Join Royal Rewards!</h2>
          <p className="text-gray-800 text-lg mb-6">
            Get exclusive deals, earn points on every order, and enjoy special birthday treats!
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg"
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
