
/**
 * ============================================
 * 📡 VEX API - PESQUISAS / TIKTOK
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/tiktok
 *
 * 🧠 DESCRIÇÃO:
 *   Pesquisa vídeos no TikTok e retorna informações detalhadas como likes, 
 *   comentários, trilha sonora e o link do vídeo sem marca d'água.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Termo de pesquisa ou link do vídeo.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna uma lista de objetos com metadados e links de download.
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';



/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado.
 *
 * @param {string} url - URL completa da API.
 * @returns {Promise<Object>} - Retorna o objeto JSON da API.
 */
async function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-APIKEY"
const query = 'do i wanna know';

const url = `https://vexapi.com.br/api/pesquisa/tiktok?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Pesquisando no TikTok: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (!dados.status || dados.codigo !== 200) {
            throw new Error(dados.message || 'Erro ao consultar a API');
        }

        const resultados = dados.resposta?.results;

        if (resultados?.length) {
            console.log('==============================');
            console.log('📱 RESULTADOS DO TIKTOK');
            console.log('==============================\n');

            const primeiro = resultados[0];

            console.log(`Título:  ${primeiro.desc}`);
            console.log(`Likes:   ${primeiro.stats?.digg}`);
            console.log(`Shares:  ${primeiro.stats?.share}`);
            console.log(`Comentários: ${primeiro.stats?.comment}`);
            console.log(`Visualizações: ${primeiro.stats?.play}`);
            console.log(`Música:  ${primeiro.music?.title} - ${primeiro.music?.author}`);
            console.log(`Download (No Watermark): ${primeiro.videoUrl}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O array `results` contém os vídeos encontrados.
 *   - O campo `videoUrl` permite baixar o vídeo sem marca d'água.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   29/10/2026
 * ============================================
 */
