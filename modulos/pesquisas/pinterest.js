/**
 * ============================================
 * 📡 VEX API - PESQUISAS / PINTEREST
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/pinterest
 *
 * 🧠 DESCRIÇÃO:
 *   Realiza pesquisas de imagens e pins no Pinterest, 
 *   retornando links diretos das mídias.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Termo de pesquisa.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna uma lista de objetos contendo os links das imagens encontradas.
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
const query = 'zulema zahir';

const url = `https://vexapi.com.br/api/search/pinterest?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Pesquisando no Pinterest: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.results?.length) {
            console.log('==============================');
            console.log('📌 RESULTADOS DO PINTEREST');
            console.log('==============================\n');

            dados.results.slice(0, 5).forEach((item, i) => {
                console.log(`${i + 1}. Direct Link: ${item.directLink}`);
                console.log('-------------------------');
            });

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O array `results` contém os links diretos para as imagens.
 *   - Perfeito para coleta de referências visuais.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
