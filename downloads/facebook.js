const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API Facebook Download:
 *  - Pode retornar JSON puro ou vir dentro de um HTML (<pre id="json">)
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e link do Facebook
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
                        if (match) {
                            return resolve(JSON.parse(match[1].trim()));
                        }

                        // fallback
                        return resolve(JSON.parse(data));
                    }

                    // tentativa final
                    return resolve(JSON.parse(data));

                } catch {
                    return reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = '23521681-cab7-4918-be66-80e1e632f035';
const facebookUrl = 'https://www.facebook.com/share/r/1SBpALCUFc/';

// URL completa do endpoint Facebook Download
const url = `https://vexapi.com.br/api/downloads/facebook?apikey=${apikey}&query=${encodeURIComponent(facebookUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na VexAPI...');

        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta) {
            const fb = dados.resposta;

            console.log('\n==============================');
            console.log('✅ Resultado do Facebook Download:');
            console.log('==============================');
            console.log('URL original: ', fb.url);
            console.log('Autor: ', fb.author);
            console.log('Título: ', fb.title);
            console.log('Thumbnail: ', fb.thumbnail);
            console.log('Duração (ms): ', fb.duration);
            console.log('Tipo: ', fb.type);
            console.log('Erro: ', fb.error);
            console.log('Tempo de execução: ', fb.time_end + ' ms');

            if (fb.medias && fb.medias.length > 0) {
                console.log('\n🎥 Vídeos encontrados:\n');
                fb.medias.forEach((m, i) => {
                    console.log(`Vídeo ${i + 1}:`);
                    console.log('Qualidade: ', m.quality);
                    console.log('Extensão: ', m.extension);
                    console.log('URL: ', m.url);
                    console.log('---------');
                });
            }

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();