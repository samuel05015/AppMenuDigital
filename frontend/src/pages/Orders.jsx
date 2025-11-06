import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock orders data - will be replaced with Supabase
    const mockOrders = [
      {
        id: 'ORD-1234567890',
        date: new Date().toISOString(),
        status: 'delivered',
        total: 28.97,
        items: [
          { name: 'Royal Classic Burger', quantity: 2, price: 8.99 },
          { name: 'Royal Fries (Medium)', quantity: 2, price: 3.49 }
        ]
      },
      {
        id: 'ORD-1234567891',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'preparing',
        total: 35.96,
        items: [
          { name: 'Double Royal Burger', quantity: 2, price: 11.99 },
          { name: 'Chocolate Milkshake', quantity: 2, price: 4.99 }
        ]
      }
    ];
    setOrders(mockOrders);
  }, [user, navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'bg-green-100 text-green-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      pending: 'bg-blue-100 text-blue-800'
    };
    return (
      <Badge className={`${variants[status]} hover:${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">My Orders</h1>
          </div>
          <p className="text-xl text-gray-100">Track your delicious orders</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start ordering your favorite burgers!</p>
            <Button
              onClick={() => navigate('/menu')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
                    <div>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
                      </div>
                      <p className="text-gray-600 mt-1">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-2xl font-bold text-red-600 mt-2">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Order Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {order.status === 'preparing' && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 font-semibold">
                        Your order is being prepared! Estimated delivery: 30-45 minutes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
