/**
 * ============================================
 * 📡 VEX API - PESQUISAS / SIGNIFICATED NAME
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/name
 *
 * 🧠 DESCRIÇÃO:
 *   Consulta o significado, origem, gênero e curiosidades sobre nomes próprios.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     O nome que deseja consultar.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna um objeto detalhado com o significado e origem do nome.
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
const query = 'Lúcifer';

const url = `https://vexapi.com.br/api/search/name?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Consultando nome: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.results) {
            console.log('==============================');
            console.log('📛 SIGNIFICADO DO NOME');
            console.log('==============================\n');

            const info = dados.results;
            console.log(`Origem:      ${info.origem}`);
            console.log(`Gênero:      ${info.genero}`);
            console.log(`\n📖 Significado:\n${info.significado}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Nome não encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `results` contém todas as informações bibliográficas do nome.
 *   - Nomes compostos devem ser enviados com encodeURIComponent.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
