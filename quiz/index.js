// ==========================
// IMPORTS
// ==========================
const https = require('https');

// ==========================
// CONFIGURAÇÃO
// ==========================

// API key fornecida pela Vex API
const apikey = 'd84e923f-755f-4f6c-abd6-c8f51cd32925';

// Parâmetro obrigatório 'query', mas na prática não faz busca
const query = 'null';

// URL da API do quiz de Animais
// OBS: Cada categoria de quiz da Vex API retorna os mesmos parâmetros,
// apenas os resultados mudam. Basta trocar a categoria para outro quiz:
// Ex: /quiz/filmes, /quiz/geografia, /quiz/musica, etc.
const url = `https://vexapi.com.br/api/quiz/animais?apikey=${apikey}&query=${query}`;

// ==========================
// FUNÇÃO PARA BUSCAR DADOS
// ==========================
function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    const contentType = res.headers['content-type'] || '';

                    if (contentType.includes('application/json')) {
                        // A API retorna JSON direto
                        return resolve(JSON.parse(data));
                    }

                    if (contentType.includes('text/html')) {
                        // Caso venha HTML com JSON dentro <pre id="json">
                        const match = data.match(/<pre[^>]*id=["']json["'][^>]*>([\s\S]*?)<\/pre>/i);
                        if (match) return resolve(JSON.parse(match[1].trim()));

                        // Tenta parsear direto caso HTML puro
                        try {
                            return resolve(JSON.parse(data));
                        } catch {
                            return reject(new Error('HTML sem JSON detectado'));
                        }
                    }

                    reject(new Error('Tipo de resposta desconhecido: ' + contentType));
                } catch (err) {
                    reject(err);
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        // Cada quiz retorna um array "result" com as perguntas
        if (dados?.result?.length > 0) {
            console.log('✅ Perguntas do Quiz Animais:');
            dados.result.forEach((item, i) => {
                console.log(`\n❓ Pergunta ${i + 1}: ${item.pergunta}`);
                console.log('Categoria:', item.categoria, '/', item.subcategoria);
                console.log('Dificuldade:', item.dificuldade);
                console.log('Imagem:', item.imagem || 'Nenhuma');

                console.log('Opções:');
                item.opcoes.forEach(op => console.log(`  ${op.id}: ${op.texto}`));

                console.log('Resposta correta:', item.resposta_correta);
                console.log('Explicação:', item.explicacao);
                console.log('Pontos:', item.pontos);
            });
        } else {
            console.log('⚠️ Nenhuma pergunta encontrada.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar quiz:', err.message);
    }
})();