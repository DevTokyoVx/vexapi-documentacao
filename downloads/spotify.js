const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API Spotify:
 *  - Sempre retorna JSON dentro de um HTML, dentro da tag <pre id="json">
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e link do Spotify
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
const spotifyUrl = 'https://open.spotify.com/intl-pt/track/0mscBkMFduxGFsFEhTv7du?si=8a2032e26f5e4a05';

// URL completa do endpoint Spotify
const url = `https://vexapi.com.br/api/downloads/spotify?apikey=${apikey}&query=${encodeURIComponent(spotifyUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta) {
            const musica = dados.resposta;

            console.log('✅ Resultado do Spotify Download:');
            console.log('Título: ', musica.title);
            console.log('Artista: ', musica.author);
            console.log('URL Original: ', musica.url);
            console.log('Thumbnail: ', musica.thumbnail);
            console.log('Duração: ', musica.duration);

            if (musica.medias?.length > 0) {
                console.log('🔗 Link de download HQ: ', musica.medias[0].url);
                console.log('Tipo: ', musica.medias[0].type);
                console.log('Extensão: ', musica.medias[0].extension);
                console.log('Qualidade: ', musica.medias[0].quality);
            }
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();