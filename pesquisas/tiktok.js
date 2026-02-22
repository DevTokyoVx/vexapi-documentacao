const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API TikTok:
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

            // Captura os chunks de dados da resposta
            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    // JSON puro (raramente usado)
                    if (res.headers['content-type']?.includes('application/json')) {
                        return resolve(JSON.parse(data));
                    }

                    // JSON dentro de HTML (<pre id="json">) — padrão do TikTok
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

                    // Qualquer outro tipo desconhecido
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

// Sua API key da Vex API
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// Termo de pesquisa no TikTok
const query = 'do i wanna know';

// URL completa do endpoint TikTok (resposta HTML com JSON dentro de <pre id="json">)
const url = `https://vexapi.com.br/api/pesquisa/tiktok?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        // Exibe apenas o primeiro resultado do TikTok
        if (dados?.results?.length > 0) {
            const primeiro = dados.results[0];

            console.log('✅ Primeiro resultado do TikTok:');
            console.log('Título: ', primeiro.title);                 // Título do vídeo
            console.log('URL: ', primeiro.link);                     // Link do vídeo
            console.log('Autor da música: ', primeiro.music?.author);// Nome do artista da música
            console.log('Título da música: ', primeiro.music?.title);// Nome da música
            console.log('Duração (segundos): ', primeiro.music?.duration);// Duração em segundos
            console.log('Likes: ', primeiro.like);                  // Quantidade de likes
            console.log('Comentários: ', primeiro.comment);         // Quantidade de comentários
            console.log('Shares: ', primeiro.share);                // Quantidade de compartilhamentos
            console.log('Cover: ', primeiro.cover);                 // Imagem de capa
            console.log('Vídeo sem watermark: ', primeiro.no_watermark); // Link do vídeo sem watermark
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();