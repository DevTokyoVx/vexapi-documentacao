const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API Kwai Download:
 *  - Pode retornar JSON puro ou vir dentro de um HTML (<pre id="json">)
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e link do Kwai
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

// API KEY atualizada
const apikey = '23521681-cab7-4918-be66-80e1e632f035';

const kwaiUrl = 'https://k.kwai.com/p/x794OPCM';

// URL completa do endpoint Kwai Download
const url = `https://vexapi.com.br/api/downloads/kwai?apikey=${apikey}&query=${encodeURIComponent(kwaiUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na VexAPI...');

        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta) {
            const video = dados.resposta;

            console.log('\n==============================');
            console.log('✅ Resultado do Kwai Download:');
            console.log('==============================');
            console.log('Título: ', video.titulo);
            console.log('Descrição: ', video.descricao);
            console.log('Thumbnail: ', video.thumbnail);
            console.log('Publicado em: ', video.publicado);
            console.log('Vídeo: ', video.video);
            console.log('Duração: ', video.duracao);

            if (video.criador) {
                console.log('\n👤 Criador:');
                console.log('Nome: ', video.criador.nome);
                console.log('Usuário: ', video.criador.usuario);
                console.log('Perfil: ', video.criador.perfil);
            }

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();