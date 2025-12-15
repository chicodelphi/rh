import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Users, UserPlus, FileWarning, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import { DASHBOARD_STATS, MOCK_REPORTS } from '../constants';

const dataAdmissions = [
  { name: 'Jan', admissoes: 4, demissoes: 1 },
  { name: 'Fev', admissoes: 3, demissoes: 0 },
  { name: 'Mar', admissoes: 2, demissoes: 1 },
  { name: 'Abr', admissoes: 6, demissoes: 2 },
  { name: 'Mai', admissoes: 3, demissoes: 0 },
  { name: 'Jun', admissoes: 5, demissoes: 1 },
];

const dataExpenses = [
  { name: 'Sem 1', valor: 4500 },
  { name: 'Sem 2', valor: 3200 },
  { name: 'Sem 3', valor: 6800 },
  { name: 'Sem 4', valor: 5100 },
];

const StatCard: React.FC<{ title: string; value: string | number; icon: any; color: string; subtext?: string }> = ({ 
  title, value, icon: Icon, color, subtext 
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Funcionários" 
          value={DASHBOARD_STATS.totalEmployees} 
          icon={Users} 
          color="bg-blue-600"
          subtext={`${DASHBOARD_STATS.activeEmployees} ativos`}
        />
        <StatCard 
          title="Novas Admissões" 
          value={6} 
          icon={UserPlus} 
          color="bg-emerald-500"
          subtext="Últimos 30 dias"
        />
        <StatCard 
          title="Atestados Pendentes" 
          value={DASHBOARD_STATS.pendingCertificates} 
          icon={FileWarning} 
          color="bg-amber-500"
          subtext="Aguardando validação"
        />
        <StatCard 
          title="Despesas do Mês" 
          value={`R$ ${DASHBOARD_STATS.monthlyExpenses.toLocaleString()}`} 
          icon={TrendingUp} 
          color="bg-purple-600"
          subtext="+12% vs mês anterior"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart: Admissions vs Terminations */}
        <Card title="Admissões x Demissões (Últimos 6 Meses)" className="lg:col-span-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAdmissions} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: '#F3F4F6' }}
                />
                <Bar dataKey="admissoes" name="Admissões" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="demissoes" name="Demissões" fill="#F87171" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* List: Anonymous Reports */}
        <Card title="Reports Anônimos Recentes">
          <div className="space-y-4">
            {MOCK_REPORTS.map((report) => (
              <div key={report.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-white text-gray-600 rounded border border-gray-200">
                    {report.category}
                  </span>
                  <span className="text-xs text-gray-400">{report.date}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">"{report.description}"</p>
                <div className="mt-2 flex items-center justify-end">
                  <span className={`text-xs font-medium ${
                    report.status === 'Novo' ? 'text-secondary' : 'text-accent'
                  }`}>
                    ● {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-primary font-medium hover:text-blue-900">
            Ver todos os reports
          </button>
        </Card>

        {/* Chart: Expenses Trend */}
        <Card title="Tendência de Despesas" className="lg:col-span-3">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataExpenses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;