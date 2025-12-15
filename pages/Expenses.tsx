import React from 'react';
import { CreditCard, DollarSign, Check, X } from 'lucide-react';
import Card from '../components/ui/Card';
import { MOCK_EXPENSES } from '../constants';

const Expenses: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Virtual Card Simulation */}
        <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start mb-8">
                    <CreditCard className="w-8 h-8 opacity-80" />
                    <span className="text-lg font-mono tracking-widest">VISA</span>
                </div>
                <div className="mb-6">
                    <p className="text-xs text-gray-400 mb-1">Saldo Disponível</p>
                    <h3 className="text-3xl font-bold">R$ 12.450,00</h3>
                </div>
                <div>
                     <p className="font-mono tracking-widest mb-2">**** **** **** 4242</p>
                     <div className="flex justify-between text-xs text-gray-400">
                        <span>RH FÁCIL CORP</span>
                        <span>12/28</span>
                     </div>
                </div>
            </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
             <Card>
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg mr-4">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Aguardando Aprovação</p>
                        <h4 className="text-2xl font-bold text-gray-800">R$ 350,50</h4>
                    </div>
                </div>
             </Card>
             <Card>
                <div className="flex items-center">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                        <Check className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Aprovado este Mês</p>
                        <h4 className="text-2xl font-bold text-gray-800">R$ 4.200,00</h4>
                    </div>
                </div>
             </Card>
        </div>
      </div>

      <Card title="Solicitações de Reembolso Recentes">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solicitante</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {MOCK_EXPENSES.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.requester}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs">{expense.category}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">R$ {expense.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString('pt-BR')}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${expense.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 
                                      expense.status === 'Rejeitado' ? 'bg-red-100 text-red-800' : 
                                      'bg-yellow-100 text-yellow-800'}`}>
                                    {expense.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {expense.status === 'Pendente' && (
                                    <div className="flex justify-end space-x-2">
                                        <button className="text-green-600 hover:text-green-900"><Check className="w-5 h-5" /></button>
                                        <button className="text-red-600 hover:text-red-900"><X className="w-5 h-5" /></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default Expenses;