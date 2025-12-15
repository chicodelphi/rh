<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1YOTFUY32xV71sQVlmxtd7P5INbtWjFyu

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Exportar um .zip pronto para subir no GitHub
Use o script `scripts/make-zip.sh` para gerar um pacote apenas com os arquivos versionados (não inclui `node_modules`).

```
npm install  # se ainda não instalou
chmod +x scripts/make-zip.sh  # já vem marcado, mas mantenha executável
./scripts/make-zip.sh
```

O arquivo resultante ficará em `./rh.zip`. Faça o upload direto na interface web do GitHub ou compartilhe por e-mail. Para conferir o conteúdo antes de subir:

```
unzip -l rh.zip
```

## Onde salvar cada página/rota
- **Frontend (Vite/React atual):**
  - `App.tsx` e `components/` contêm a SPA principal. Páginas adicionais podem ser criadas em `pages/` (rotas estáticas do Vite/React Router) ou como novos componentes importados em `App.tsx`.
- **Backend Next.js (App Router) de exemplo:**
  - Rotas de API ficam em `backend/app/api/...` (ex.: `backend/app/api/empresas/route.ts`).
  - Bibliotecas e validações compartilhadas ficam em `backend/app/api/_lib/`.
  - Esquemas de dados (Prisma + SQL) estão em `backend/prisma/schema.prisma` e `backend/sql/schema.sql`.

Crie novas rotas seguindo o padrão `backend/app/api/<recurso>/route.ts`. Para páginas React adicionais, coloque os arquivos na pasta `pages/` ou componha novos elementos dentro de `App.tsx` conforme a navegação desejada.
