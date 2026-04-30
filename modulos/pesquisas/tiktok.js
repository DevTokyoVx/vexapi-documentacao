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

const apikey = 'SUA-API-KEY';
const query = 'do i wanna know';

const url = `https://vexapi.com.br/api/search/tiktok?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Pesquisando no TikTok: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.results?.length) {
            console.log('==============================');
            console.log('📱 RESULTADOS DO TIKTOK');
            console.log('==============================\n');

            const primeiro = dados.results[0];
            console.log(`Título:  ${primeiro.title}`);
            console.log(`Likes:   ${primeiro.like}`);
            console.log(`Shares:  ${primeiro.share}`);
            console.log(`Música:  ${primeiro.music?.title} - ${primeiro.music?.author}`);
            console.log(`Download (No Watermark): ${primeiro.no_watermark}`);
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
 *   - O campo `no_watermark` permite baixar o vídeo limpo.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
