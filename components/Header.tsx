import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../App';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  const { company } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-gray-500 focus:outline-none lg:hidden mr-4">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">{company?.tradeName || company?.legalName}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <img 
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
            src="https://picsum.photos/200/200?random=user" 
            alt="User avatar" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;