const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API de Filmes:
 *  - Sempre retorna JSON dentro de um HTML, dentro da tag <pre id="json">
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e query
 * @returns {Promise<Object>} - Retorna o objeto JSON da API
 */
function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    // JSON puro
                    if (res.headers['content-type']?.includes('application/json')) {
                        return resolve(JSON.parse(data));
                    }

                    // JSON dentro de HTML (<pre id="json">)
                    if (res.headers['content-type']?.includes('text/html')) {
                        const match = data.match(/<pre[^>]*id=["']json["'][^>]*>([\s\S]*?)<\/pre>/i);
                        if (match) return resolve(JSON.parse(match[1].trim()));

                        // Tenta parsear direto
                        try {
                            return resolve(JSON.parse(data));
                        } catch {
                            return reject(new Error('HTML sem JSON detectado'));
                        }
                    }

                    reject(new Error('Tipo de resposta desconhecido: ' + res.headers['content-type']));
                } catch (err) {
                    reject(err);
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';
const query = 'minions';

// URL completa do endpoint de filmes
const url = `https://vexapi.com.br/api/pesquisa/filme?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        // Exibe apenas o primeiro resultado de filme
        if (dados?.resultado?.length > 0) {
            const filme = dados.resultado[0];

            console.log('✅ Primeiro resultado de filme:');
            console.log('Título: ', filme.titulo);                        // Título em português
            console.log('Título original: ', filme.titulo_original);      // Título original
            console.log('Lançamento: ', filme.lancamento);                // Data de lançamento
            console.log('Avaliações: ', filme.avaliacoes);                // Número de votos e média
            console.log('Popularidade: ', filme.popularidade);            // Popularidade %
            console.log('Adulto: ', filme.adulto);                        // Sim/Não
            console.log('Idioma: ', filme.idioma);                        // Código do idioma
            console.log('Sinopse: ', filme.sinopse);                      // Sinopse do filme
            console.log('Imagem: ', filme.imagem);                        // URL da imagem/poster
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();