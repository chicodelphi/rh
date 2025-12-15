import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  FileCheck, 
  CreditCard, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../App';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Colaboradores' },
    { path: '/benefits', icon: Gift, label: 'Benefícios' },
    { path: '/compliance', icon: FileCheck, label: 'Compliance & Ponto' },
    { path: '/expenses', icon: CreditCard, label: 'Despesas' },
  ];

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-blue-950">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">RH</span>
          </div>
          <span className="text-xl font-bold tracking-tight">RH Fácil</span>
        </div>
        <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-800 text-white shadow-sm border-l-4 border-secondary' 
                : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;