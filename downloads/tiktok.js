const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API TikTok Download:
 *  - Sempre retorna JSON dentro de um HTML, dentro da tag <pre id="json">
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e link do TikTok
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
const tiktokUrl = 'https://vt.tiktok.com/ZSm9eXAGv/';

// URL completa do endpoint TikTok Download
const url = `https://vexapi.com.br/api/downloads/tiktok?apikey=${apikey}&query=${encodeURIComponent(tiktokUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.result) {
            const video = dados.result;

            console.log('✅ Resultado do TikTok Download:');
            console.log('ID do vídeo: ', video.id);
            console.log('Descrição: ', video.desc);
            console.log('Tipo: ', video.type);
            console.log('Autor: ', video.author?.nickname);
            console.log('Username: ', video.author?.username);
            console.log('URL do perfil do autor: ', video.author?.url);
            console.log('Avatar do autor: ', video.author?.avatarThumb?.[0]);
            console.log('Estatísticas: ', video.statistics);
            console.log('Vídeo: ', video.video?.playAddr?.[0]);
            console.log('Download direto: ', video.video?.downloadAddr?.[0]);
            console.log('Capa do vídeo: ', video.video?.cover?.[0]);
            if (video.music) console.log('Música do vídeo: ', video.music.title);
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();