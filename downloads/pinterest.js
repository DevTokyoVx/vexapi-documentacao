const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API Pinterest:
 *  - Sempre retorna JSON dentro de um HTML, dentro da tag <pre id="json">
 *  - Funciona tanto com **imagens** quanto **vídeos** do Pinterest
 *
 * Exemplo de uso com imagem:
 *  URL: 'https://br.pinterest.com/pin/211176670126565624/'
 *
 * Exemplo de uso com vídeo:
 *  URL: 'https://br.pinterest.com/pin/516717757265556775/'
 *
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e link do Pinterest
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

// Exemplos de URLs
const pinterestImagem = 'https://br.pinterest.com/pin/211176670126565624/';
const pinterestVideo = 'https://br.pinterest.com/pin/516717757265556775/';

// Escolha qual quer testar
const pinterestUrl = pinterestVideo; // <-- troque para pinterestImagem se quiser testar imagem

const url = `https://vexapi.com.br/api/downloads/pinterest?apikey=${apikey}&query=${encodeURIComponent(pinterestUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta) {
            const item = dados.resposta;

            console.log('✅ Resultado do Pinterest Download:');
            console.log('Título: ', item.title);
            console.log('Autor: ', item.author);
            console.log('URL Original: ', item.url);
            console.log('Thumbnail: ', item.thumbnail);
            console.log('Duração: ', item.duration);
            console.log('Tipo: ', item.type);

            if (item.medias?.length > 0) {
                item.medias.forEach((media, i) => {
                    console.log(`\n🔹 Media ${i + 1}:`);
                    console.log('URL: ', media.url);
                    console.log('Thumbnail: ', media.thumbnail);
                    console.log('Largura: ', media.width);
                    console.log('Altura: ', media.height);
                    console.log('Duração: ', media.duration);
                    console.log('Qualidade: ', media.quality);
                    console.log('Resolução: ', media.resolution);
                    console.log('Extensão: ', media.extension);
                    console.log('Tipo: ', media.type);
                });
            }
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();