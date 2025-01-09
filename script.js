const fs = require("fs");
const path = require("path");

// Configurações
const diretorioOrigem = "/home/valcann/backupsFrom";
const diretorioDestino = "/home/valcann/backupsTo";
const logOrigem = "/home/valcann/backupsFrom.log";
const logDestino = "/home/valcann/backupsTo.log";

// Função para obter detalhes do arquivo
function obterDetalhesArquivo(caminhoArquivo) {
    const stats = fs.statSync(caminhoArquivo);
    return {
        nome: path.basename(caminhoArquivo),
        tamanho: stats.size,
        criadoEm: stats.birthtime,
        modificadoEm: stats.mtime,
    };
}

// Função para listar e registrar os arquivos no diretório
function listarERegistrarArquivos(diretorio, arquivoLog) {
    const arquivos = fs.readdirSync(diretorio);
    const detalhesArquivos = arquivos.map(arquivo => {
        const caminhoArquivo = path.join(diretorio, arquivo);
        return obterDetalhesArquivo(caminhoArquivo);
    });

    // Salvar informações no log
    const dadosLog = detalhesArquivos
        .map(arquivo => `Nome: ${arquivo.nome}, Tamanho: ${arquivo.tamanho} bytes, Criado em: ${arquivo.criadoEm}, Modificado em: ${arquivo.modificadoEm}`)
        .join("\n");

    fs.writeFileSync(arquivoLog, dadosLog, "utf8");
    console.log(`Log salvo em ${arquivoLog}`);

    return detalhesArquivos;
}

// Função para filtrar arquivos com base na data de criação
function filtrarArquivosPorIdade(arquivos, dias) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    return {
        maisNovos: arquivos.filter(arquivo => new Date(arquivo.criadoEm) > dataLimite),
        maisAntigos: arquivos.filter(arquivo => new Date(arquivo.criadoEm) <= dataLimite),
    };
}

// Função para remover arquivos
function removerArquivos(arquivos) {
    arquivos.forEach(arquivo => {
        const caminhoArquivo = path.join(diretorioOrigem, arquivo.nome);
        fs.unlinkSync(caminhoArquivo);
        console.log(`Arquivo removido: ${arquivo.nome}`);
    });
}

// Função para mover arquivos
function moverArquivos(arquivos, destino, arquivoLog) {
    const arquivosMovidos = [];

    arquivos.forEach(arquivo => {
        const caminhoOrigem = path.join(diretorioOrigem, arquivo.nome);
        const caminhoDestino = path.join(destino, arquivo.nome);

        fs.copyFileSync(caminhoOrigem, caminhoDestino); // Copiar o arquivo
        arquivosMovidos.push(arquivo);
    });

    // Registrar os arquivos movidos no log
    const dadosLog = arquivosMovidos
        .map(arquivo => `Nome: ${arquivo.nome}, Tamanho: ${arquivo.tamanho} bytes, Criado em: ${arquivo.criadoEm}`)
        .join("\n");

    fs.writeFileSync(arquivoLog, dadosLog, "utf8");
    console.log(`Log de arquivos movidos salvo em ${arquivoLog}`);
}

// Executar as ações
function principal() {
    // Listar arquivos no diretório de origem
    const todosArquivos = listarERegistrarArquivos(diretorioOrigem, logOrigem);

    // Filtrar arquivos por data de criação
    const { maisNovos, maisAntigos } = filtrarArquivosPorIdade(todosArquivos, 3);

    // Remover arquivos mais novos que 3 dias
    removerArquivos(maisNovos);

    // Copiar arquivos com 3 dias ou menos para o diretório destino
    if (!fs.existsSync(diretorioDestino)) {
        fs.mkdirSync(diretorioDestino);
    }
    moverArquivos(maisAntigos, diretorioDestino, logDestino);
}

principal();

