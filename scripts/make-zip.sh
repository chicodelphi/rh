#!/usr/bin/env bash
set -euo pipefail

# Gera um pacote zipado apenas com os arquivos versionados do repositório.
# Útil para enviar ao GitHub ou compartilhar rapidamente.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

ARCHIVE_NAME="rh.zip"

# Usa git archive para garantir que somente arquivos rastreados entrem no pacote.
git archive --format=zip HEAD > "$ARCHIVE_NAME"

cat <<MSG
Arquivo gerado: $ROOT_DIR/$ARCHIVE_NAME
Envie esse arquivo para o GitHub criando um repositório vazio e usando a
interface web de upload, ou descompacte localmente com:
  unzip $ARCHIVE_NAME
MSG
