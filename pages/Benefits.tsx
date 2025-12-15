import React, { useState } from 'react';
import { Gift, Plus, FileSpreadsheet } from 'lucide-react';
import Card from '../components/ui/Card';
import { MOCK_BENEFITS } from '../constants';
import { Benefit } from '../types';

const Benefits: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>(MOCK_BENEFITS);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Benefícios Corporativos</h2>
          <p className="text-sm text-gray-500">Gerencie o pacote de benefícios oferecido aos colaboradores.</p>
        </div>
        <div className="flex space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar CSV
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Criar Benefício
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
            <Card key={benefit.id} className={`border-l-4 ${benefit.active ? 'border-l-secondary' : 'border-l-gray-300'}`}>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Gift className="w-6 h-6 text-primary" />
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={benefit.active} readOnly />
                            <div className={`block w-10 h-6 rounded-full ${benefit.active ? 'bg-secondary' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${benefit.active ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                    </label>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{benefit.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{benefit.type}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-800">R$ {benefit.value}</span>
                    <span className="text-xs text-gray-400">mensal / colab.</span>
                </div>
            </Card>
        ))}
        
        {/* Add New Card Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white mb-3">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Novo Benefício Personalizado</h3>
            <p className="text-xs text-gray-500 mt-1">Crie opções como "Premiação de Assiduidade"</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;