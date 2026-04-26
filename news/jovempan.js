const https = require('https');

/**
 * Função que faz a requisição para a Vex API de notícias Jovem Pan
 *
 * Observações importantes:
 *  - O parâmetro `query` é obrigatório, mas **não faz busca**, apenas retorna as últimas notícias.
 *  - Alguns itens podem não ter `imagem`, `link` ou `categoria`.
 *
 * Exemplo de URL:
 *  https://vexapi.com.br/api/noticias/jovempan?apikey=SEU_APIKEY&query=null
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
                    if (res.headers['content-type']?.includes('application/json')) {
                        return resolve(JSON.parse(data));
                    }

                    if (res.headers['content-type']?.includes('text/html')) {
                        const match = data.match(/<pre[^>]*id=["']json["'][^>]*>([\s\S]*?)<\/pre>/i);
                        if (match) return resolve(JSON.parse(match[1].trim()));
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
const query = 'null'; // obrigatório, mas não faz busca

const url = `https://vexapi.com.br/api/noticias/jovempan?apikey=${apikey}&query=${query}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta?.length > 0) {
            console.log('✅ Últimas notícias da Jovem Pan:');
            dados.resposta.forEach((noticia, i) => {
                console.log(`\n📰 Notícia ${i + 1}:`);
                console.log('Título: ', noticia.noticia || 'Nenhum');
                console.log('Imagem: ', noticia.imagem || 'Nenhuma');
                console.log('Categoria: ', noticia.categoria || 'Nenhuma');
                console.log('Link: ', noticia.link || 'Nenhum');
            });
        } else {
            console.log('⚠️ Nenhuma notícia encontrada.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar notícias da Jovem Pan:', err.message);
    }
})();