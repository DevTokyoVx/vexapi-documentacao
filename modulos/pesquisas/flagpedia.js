/**
 * ============================================
 * 📡 VEX API - PESQUISAS / FLAGPEDIA
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/flag
 *
 * 🧠 DESCRIÇÃO:
 *   Consulta informações detalhadas sobre países e suas bandeiras, 
 *   incluindo capital, população, moeda, PIB e dados geográficos.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Nome do país (ex: Brasil, Japão, França).
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna um objeto completo com dados sociopolíticos e o link da bandeira.
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
const query = 'Brasil';

const url = `https://vexapi.com.br/api/search/flag?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Consultando país: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.results) {
            console.log('==============================');
            console.log('🌍 DADOS DO PAÍS');
            console.log('==============================\n');

            const res = dados.results;
            const info = res.info;

            console.log(`País:      ${res.flag_name}`);
            console.log(`Oficial:   ${info.official_name}`);
            console.log(`Capital:   ${info.capital_city}`);
            console.log(`População: ${info.population}`);
            console.log(`Moeda:     ${info.currency}`);
            console.log(`Bandeira:  ${res.image_url}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ País não encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `results` contém o subobjeto `info` com dados técnicos.
 *   - Ótimo para sistemas educacionais ou de geolocalização.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
