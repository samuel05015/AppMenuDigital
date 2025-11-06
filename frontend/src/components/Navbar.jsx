import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu as MenuIcon, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="bg-yellow-400 text-red-600 font-bold text-2xl px-3 py-1 rounded-lg">
              RB
            </div>
            <span className="text-xl font-bold hidden sm:inline">Royal Burguer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/menu" className="hover:text-yellow-400 transition-colors font-medium">
              Cardápio
            </Link>
            <Link to="/deals" className="hover:text-yellow-400 transition-colors font-medium">
              Ofertas
            </Link>
            <Link to="/stores" className="hover:text-yellow-400 transition-colors font-medium">
              Localizações
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-yellow-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-yellow-400 hover:bg-red-700">
                    <User className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    Meus Pedidos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-white hover:text-yellow-400 hover:bg-red-700"
              >
                <User className="w-6 h-6" />
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden hover:text-yellow-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-red-700 border-t border-red-800">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/menu"
              className="block hover:text-yellow-400 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link
              to="/deals"
              className="block hover:text-yellow-400 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ofertas
            </Link>
            <Link
              to="/stores"
              className="block hover:text-yellow-400 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Localizações
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
