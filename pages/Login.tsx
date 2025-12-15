import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cnpj: '',
    legalName: '',
    tradeName: '',
    sector: 'technology'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Simple mask for CNPJ
    if (name === 'cnpj') {
        const numeric = value.replace(/\D/g, '');
        // Mock mask behavior
        setFormData(prev => ({ ...prev, [name]: numeric }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call validation
    setTimeout(() => {
      login({
        cnpj: formData.cnpj,
        legalName: formData.legalName,
        tradeName: formData.tradeName || formData.legalName,
        sector: formData.sector
      });
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary opacity-10 rounded-br-full"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-2xl font-bold">RH</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao RH Fácil</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              A plataforma completa para transformar a gestão de pessoas da sua empresa. 
              Simples, eficiente e 100% compliant com a legislação brasileira.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-3" />
                <span>Gestão completa de benefícios</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-3" />
                <span>Controle de ponto biométrico</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-secondary mr-3" />
                <span>Compliance e Folha</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Acesso Empresa</h3>
          <p className="text-sm text-gray-500 mb-8">Preencha os dados da sua organização para começar.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0000-00"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social</label>
              <input
                required
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Ex: Minha Empresa LTDA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia (Opcional)</label>
              <input
                type="text"
                name="tradeName"
                value={formData.tradeName}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Ex: Minha Empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ramo de Atuação</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="technology">Tecnologia</option>
                <option value="retail">Varejo</option>
                <option value="finance">Financeiro</option>
                <option value="health">Saúde</option>
                <option value="education">Educação</option>
                <option value="industry">Indústria</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Validando...' : (
                <>
                  Acessar Painel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;