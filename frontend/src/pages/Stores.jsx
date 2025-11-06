import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { stores } from '../mockData';

const Stores = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MapPin className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Our Locations</h1>
          </div>
          <p className="text-xl text-gray-100 text-center">Find a Royal Burguer near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{store.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p>{store.address}</p>
                      <p>{store.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p>{store.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p>{store.hours}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-semibold hover:underline flex items-center justify-center"
                  >
                    Get Directions
                    <MapPin className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't find a location?</h2>
          <p className="text-gray-600 text-lg mb-6">
            We're expanding! Contact us to suggest a new location in your area.
          </p>
          <a
            href="mailto:info@royalburguer.com"
            className="text-red-600 hover:text-red-700 font-semibold text-lg hover:underline"
          >
            info@royalburguer.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stores;
