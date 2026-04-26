const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * A Vex API sempre retorna JSON dentro de um HTML, então esta função trata:
 *  - JSON dentro de <pre id="json"> (HTML)
 *  - JSON puro (application/json) caso algum endpoint retorne diretamente
 *  - Resposta de mídia (image/* ou video/*)
 *
 * @param {string} url - URL completa da API, incluindo sua API key e query
 * @returns {Promise<Object>} - Retorna o objeto JSON da API
 */
function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    // JSON puro (em casos raros)
                    if (res.headers['content-type']?.includes('application/json')) {
                        return resolve(JSON.parse(data));
                    }

                    // JSON dentro de <pre id="json"> (HTML)
                    if (res.headers['content-type']?.includes('text/html')) {
                        const match = data.match(/<pre[^>]*id=["']json["'][^>]*>([\s\S]*?)<\/pre>/i);
                        if (match) {
                            return resolve(JSON.parse(match[1].trim()));
                        }
                        return reject(new Error('HTML sem JSON detectado'));
                    }

                    // Resposta de mídia (imagem ou vídeo)
                    if (res.headers['content-type']?.startsWith('image/') || res.headers['content-type']?.startsWith('video/')) {
                        return resolve({
                            isMedia: true,
                            mediaType: res.headers['content-type'],
                            mediaBuffer: Buffer.from(data, 'binary')
                        });
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

// Sua API key válida (substitua pela sua própria key)
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// Termo de pesquisa no YouTube
const query = 'do i wanna know';

// URL completa da API
const url = `https://vexapi.com.br/api/pesquisa/youtube?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        // Exibe apenas o primeiro resultado do YouTube
        if (dados?.results?.length > 0) {
            const primeiro = dados.results[0];
            console.log('✅ Primeiro resultado do YouTube:');
            console.log('Título: ', primeiro.title);
            console.log('URL: ', primeiro.url);
            console.log('Autor: ', primeiro.author?.name);
            console.log('Views: ', primeiro.views);
            console.log('Duração: ', primeiro.duration?.timestamp);
            console.log('Publicado: ', primeiro.ago);
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();