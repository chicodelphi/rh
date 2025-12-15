export interface Company {
  cnpj: string;
  legalName: string; // Razão Social
  tradeName?: string; // Nome Fantasia
  sector: string;
}

export enum EmployeeStatus {
  ACTIVE = 'Ativo',
  ON_LEAVE = 'Afastado',
  VACATION = 'Férias',
  TERMINATED = 'Desligado'
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  admissionDate: string;
  status: EmployeeStatus;
  salary: number;
  email: string;
  avatarUrl?: string;
}

export interface Benefit {
  id: string;
  name: string;
  type: 'Alimentação' | 'Refeição' | 'Transporte' | 'Saúde' | 'Cultura' | 'Outros';
  value: number;
  active: boolean;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  requester: string;
}

export interface Report {
  id: string;
  category: string;
  description: string;
  date: string;
  status: 'Novo' | 'Em Análise' | 'Resolvido';
}