import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { useCart } from '../context/CartContext';
import { menuItems } from '../mockData';
import { toast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const item = menuItems.find(item => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({
    noCheese: false,
    noOnions: false,
    noPickles: false,
    extraCheese: false,
    extraBacon: false,
    noSauce: false
  });

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  const handleCustomizationChange = (key) => {
    setCustomizations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item, customizations);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${item.name} added to your cart`,
    });
    navigate('/cart');
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/menu')}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-96 lg:h-full object-cover rounded-lg shadow-xl"
            />
            {item.popular && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-bold">
                Popular Choice
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.name}</h1>
              <p className="text-gray-600 text-lg">{item.description}</p>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-red-600">${item.price}</span>
              <span className="text-gray-500">per item</span>
            </div>

            {/* Customizations */}
            {item.customizable && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customize Your Order</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noCheese"
                        checked={customizations.noCheese}
                        onCheckedChange={() => handleCustomizationChange('noCheese')}
                      />
                      <Label htmlFor="noCheese" className="cursor-pointer">No Cheese</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noOnions"
                        checked={customizations.noOnions}
                        onCheckedChange={() => handleCustomizationChange('noOnions')}
                      />
                      <Label htmlFor="noOnions" className="cursor-pointer">No Onions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noPickles"
                        checked={customizations.noPickles}
                        onCheckedChange={() => handleCustomizationChange('noPickles')}
                      />
                      <Label htmlFor="noPickles" className="cursor-pointer">No Pickles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extraCheese"
                        checked={customizations.extraCheese}
                        onCheckedChange={() => handleCustomizationChange('extraCheese')}
                      />
                      <Label htmlFor="extraCheese" className="cursor-pointer">Extra Cheese (+$0.50)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extraBacon"
                        checked={customizations.extraBacon}
                        onCheckedChange={() => handleCustomizationChange('extraBacon')}
                      />
                      <Label htmlFor="extraBacon" className="cursor-pointer">Extra Bacon (+$1.00)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noSauce"
                        checked={customizations.noSauce}
                        onCheckedChange={() => handleCustomizationChange('noSauce')}
                      />
                      <Label htmlFor="noSauce" className="cursor-pointer">No Sauce</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity Selector */}
            <div>
              <Label className="text-lg font-semibold mb-2 block">Quantity</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 border-2 border-gray-300 hover:border-red-600 hover:bg-red-50"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 border-2 border-gray-300 hover:border-red-600 hover:bg-red-50"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-red-600">${totalPrice}</span>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
