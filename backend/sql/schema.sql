-- Schema completo para SaaS de gestão de RH focado em compliance trabalhista e integração com eSocial
-- Compatível com PostgreSQL (Vercel Postgres). Inclui chaves estrangeiras, índices exclusivos e campos de auditoria.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- Empresas cadastradas na plataforma
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  nome_fantasia VARCHAR(255),
  ramo_atividade VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Funcionários vinculados a uma empresa
CREATE TABLE funcionarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  data_admissao DATE NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  salario_base NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','afastado','demitido')),
  jornada_semanal NUMERIC(4,2) DEFAULT 44,
  email_corporativo VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_funcionarios_empresa ON funcionarios(empresa_id);

-- Benefícios oferecidos pela empresa
CREATE TABLE beneficios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('alimentacao','refeicao','mobilidade','saude','educacao','cultura','home_office','premiacao','custom')),
  nome_custom VARCHAR(255),
  valor NUMERIC(12,2) NOT NULL DEFAULT 0,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_beneficios_empresa ON beneficios(empresa_id);

-- Tabela pivô para vincular funcionários a benefícios
CREATE TABLE funcionarios_beneficios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  beneficio_id UUID NOT NULL REFERENCES beneficios(id) ON DELETE CASCADE,
  concedido_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(funcionario_id, beneficio_id)
);

-- Folha de pagamento mensal
CREATE TABLE folha_pagamento (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  mes_ano DATE NOT NULL,
  salario NUMERIC(12,2) NOT NULL,
  fgts NUMERIC(12,2) NOT NULL DEFAULT 0,
  inss NUMERIC(12,2) NOT NULL DEFAULT 0,
  decimo_terceiro NUMERIC(12,2) DEFAULT 0,
  ferias NUMERIC(12,2) DEFAULT 0,
  adiantamento NUMERIC(12,2) DEFAULT 0,
  insalubridade NUMERIC(12,2) DEFAULT 0,
  periculosidade NUMERIC(12,2) DEFAULT 0,
  outros_creditos NUMERIC(12,2) DEFAULT 0,
  outros_descontos NUMERIC(12,2) DEFAULT 0,
  total_pago NUMERIC(12,2) NOT NULL,
  json_esocial JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(funcionario_id, mes_ano)
);

CREATE INDEX idx_folha_funcionario ON folha_pagamento(funcionario_id);

-- Registro de rescisões
CREATE TABLE rescisoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  data_demissao DATE NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('com_justa_causa','sem_justa_causa')),
  valor_total NUMERIC(12,2) NOT NULL,
  detalhes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Registro de ponto com geolocalização
CREATE TABLE ponto (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  data_hora TIMESTAMPTZ NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada','saida')),
  localizacao GEOGRAPHY(POINT, 4326),
  metodo VARCHAR(20) NOT NULL CHECK (metodo IN ('facial','manual')),
  imagem_prova_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reports anônimos de compliance e segurança
CREATE TABLE reports_anonimos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  conteudo TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','resolvido')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Atestados e afastamentos
CREATE TABLE atestados_afastamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('atestado','afastamento')),
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  motivo TEXT,
  arquivo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Despesas corporativas
CREATE TABLE despesas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  valor NUMERIC(12,2) NOT NULL,
  data DATE NOT NULL,
  categoria VARCHAR(100),
  status_aprovacao VARCHAR(30) NOT NULL DEFAULT 'pendente' CHECK (status_aprovacao IN ('pendente','aprovado','rejeitado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_despesas_empresa ON despesas(empresa_id);
