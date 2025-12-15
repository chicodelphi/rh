import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Benefits from './pages/Benefits';
import Compliance from './pages/Compliance';
import Expenses from './pages/Expenses';
import { Company } from './types';

// Auth Context
interface AuthContextType {
  company: Company | null;
  login: (data: Company) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);

  const login = (data: Company) => {
    setCompany(data);
    localStorage.setItem('rh_facil_company', JSON.stringify(data));
  };

  const logout = () => {
    setCompany(null);
    localStorage.removeItem('rh_facil_company');
  };

  useEffect(() => {
    const stored = localStorage.getItem('rh_facil_company');
    if (stored) {
      setCompany(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ company, login, logout, isAuthenticated: !!company }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={!company ? <Login /> : <Navigate to="/" />} />
          
          <Route path="/" element={company ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="benefits" element={<Benefits />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="expenses" element={<Expenses />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;