# Backend SaaS de RH (Next.js + Vercel Postgres)

Estrutura mínima para APIs RESTful com autenticação por token de empresa, validação com Zod e persistência via Prisma Client para Vercel Postgres. Inclui schema SQL bruto, schema Prisma e rotas de exemplo para operações críticas.

## Pontos-chave
- Autenticação: middleware simples `requireAuth` que espera cabeçalhos `x-empresa-id`, `x-user-id` e `x-role` (substitua por NextAuth.js ou JWT em produção).
- Validação: schemas Zod para CNPJ/CPF, payloads e UUID.
- Segurança: bloqueio de rotas sensíveis a `role` (admin/gestor) e validação de `empresaId` antes de retornar dados.
- Deploy: compatível com Vercel (App Router). Defina `DATABASE_URL` do Vercel Postgres e adicione dependências `@prisma/client`, `prisma`, `zod`, `xmlbuilder2` e `@vercel/postgres` conforme necessário.

## Endpoints de exemplo (App Router)
- `POST /api/empresas` — Cadastro inicial da empresa com validação de CNPJ.
- `GET /api/funcionarios` — Listagem filtrada por empresa autenticada.
- `POST /api/funcionarios` — Criação de funcionário com validação de CPF e controle de acesso.
- `POST /api/ponto` — Registro de ponto com latitude/longitude e método de captura.
- `POST /api/funcionarios/:id/rescisao` — Cálculo simplificado de rescisão e persistência.
- `POST /api/esocial` — Geração de XML compatível S-1200/S-1210 usando `xmlbuilder2`.

## Fluxo sugerido
1. Executar `npx prisma migrate dev --name init` após ajustar `DATABASE_URL`.
2. Configurar middleware de autenticação no `middleware.ts` do Next.js para validar tokens e popular cabeçalhos usados em `requireAuth`.
3. Conectar uploads a Vercel Blob (ou S3) e ajustar campos `arquivoUrl`/`imagemProvaUrl`.
4. Expor métricas de dashboard consultando tabelas `funcionarios`, `reports_anonimos` e `despesas`.
