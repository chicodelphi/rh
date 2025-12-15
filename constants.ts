import { Employee, Benefit, Expense, Report, EmployeeStatus } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Desenvolvedora Senior',
    department: 'Tecnologia',
    admissionDate: '2022-03-15',
    status: EmployeeStatus.ACTIVE,
    salary: 12000,
    email: 'ana.silva@empresa.com.br',
    avatarUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    role: 'Analista de RH',
    department: 'Recursos Humanos',
    admissionDate: '2023-01-10',
    status: EmployeeStatus.ACTIVE,
    salary: 6500,
    email: 'carlos.o@empresa.com.br',
    avatarUrl: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: '3',
    name: 'Mariana Santos',
    role: 'Gerente de Marketing',
    department: 'Marketing',
    admissionDate: '2021-06-20',
    status: EmployeeStatus.ON_LEAVE,
    salary: 15000,
    email: 'mariana.s@empresa.com.br',
    avatarUrl: 'https://picsum.photos/200/200?random=3'
  },
  {
    id: '4',
    name: 'Roberto Costa',
    role: 'Designer UX',
    department: 'Produto',
    admissionDate: '2023-11-05',
    status: EmployeeStatus.ACTIVE,
    salary: 8000,
    email: 'roberto.c@empresa.com.br',
    avatarUrl: 'https://picsum.photos/200/200?random=4'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    role: 'Assistente Administrativo',
    department: 'Administrativo',
    admissionDate: '2024-02-01',
    status: EmployeeStatus.VACATION,
    salary: 3500,
    email: 'fernanda.l@empresa.com.br',
    avatarUrl: 'https://picsum.photos/200/200?random=5'
  }
];

export const MOCK_BENEFITS: Benefit[] = [
  { id: '1', name: 'Vale Alimentação Flex', type: 'Alimentação', value: 800, active: true },
  { id: '2', name: 'Plano de Saúde Premium', type: 'Saúde', value: 1200, active: true },
  { id: '3', name: 'Auxílio Home Office', type: 'Outros', value: 200, active: true },
  { id: '4', name: 'Gympass', type: 'Saúde', value: 100, active: true },
  { id: '5', name: 'Vale Cultura', type: 'Cultura', value: 50, active: false }
];

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', description: 'Almoço com Cliente', category: 'Representação', amount: 350.50, date: '2024-05-10', status: 'Pendente', requester: 'Ana Silva' },
  { id: '2', description: 'Licença Software Design', category: 'Software', amount: 1200.00, date: '2024-05-12', status: 'Aprovado', requester: 'Roberto Costa' },
  { id: '3', description: 'Uber Reunião Externa', category: 'Transporte', amount: 45.90, date: '2024-05-14', status: 'Aprovado', requester: 'Carlos Oliveira' },
  { id: '4', description: 'Café da Manhã Equipe', category: 'Confraternização', amount: 180.00, date: '2024-05-15', status: 'Rejeitado', requester: 'Mariana Santos' },
];

export const MOCK_REPORTS: Report[] = [
  { id: '1', category: 'Infraestrutura', description: 'Ar condicionado do 3º andar não está gelando.', date: '2024-05-01', status: 'Novo' },
  { id: '2', category: 'Clima Organizacional', description: 'Sugestão de mais momentos de integração entre times.', date: '2024-04-28', status: 'Em Análise' },
];

export const DASHBOARD_STATS = {
  totalEmployees: 48,
  activeEmployees: 42,
  onLeave: 3,
  pendingCertificates: 5,
  monthlyExpenses: 45200.00
};