import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-red-600 font-bold text-2xl px-3 py-1 rounded-lg">
                RB
              </div>
              <span className="text-xl font-bold">Royal Burguer</span>
            </div>
            <p className="text-gray-400 text-sm">
              Serving the best burgers in town since 2024. Quality ingredients, royal taste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/menu" className="hover:text-yellow-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-yellow-400 transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-yellow-400 transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-yellow-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="space-y-3 text-gray-400">
              <p>Email: info@royalburguer.com</p>
              <p>Phone: (555) 123-4567</p>
              <div className="flex space-x-4 pt-3">
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Royal Burguer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
