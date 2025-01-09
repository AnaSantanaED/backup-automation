# Backup Automation

Este projeto automatiza a organiza backups.

## Funcionalidades
- Lista todos os arquivos no diretório de origem.
- Remove arquivos mais antigos que 3 dias.
- Move arquivos mais novos para o diretório de destino.
- Gera logs das operações.

## Como usar
1. Instale o [Node.js](https://nodejs.org/).
2. Clone o reposit\u00f3rio:
   ```bash
   git clone <URL_DO_REPOSITORIO>

O código criado atende à demanda do case 1 proposto:

📋 **Problema 1 | Automação de Ambientes Operacionais**

 Um dos principais desafios para um bom gerenciamento de infraestrutura, é implementar
 automação para permitir produtividade aos times de administração de tecnologia, bem
 como, minimizar ações humanas nos ambientes dos clientes.
 O cliente “Acme Co.” possui um servidor centralizado de backup, o qual recebe arquivos
 de todos os demais servidores, move os dados para um volume temporário, para que
 deste volume os dados sejam copiados por uma ferramenta de backup externa.
 De forma a minimizar o nível de intervenção neste ambiente, você foi convocado a
 escrever um script (em Shell Script, Python ou qualquer outra tecnologia que preferir),
 para automatizar as seguintes ações:
 Listar todos arquivos (nome, tamanho, data de criação, data da última modificação)
 localizados no caminho /home/valcann/backupsFrom;
 Salvar o resultado no arquivo backupsFrom.log em /home/valcann/;
 Remover todos os arquivos com data de criação superior a 3 (três) dias;
 Copiar todos os arquivos os arquivos com data de criação menor ou igual a 3 (três) dias
 em homevalcann/backupsTo;
 Salvar o resultado no arquivo backupsTo.log em /home/valcann/.
