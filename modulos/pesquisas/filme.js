/**
 * ============================================
 * 📡 VEX API - PESQUISAS / FILME
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/filme
 *
 * 🧠 DESCRIÇÃO:
 *   Consulta metadados completos sobre filmes e séries, incluindo 
 *   título original, sinopse, data de lançamento e avaliações.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Título do filme ou série.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna uma lista de objetos com os resultados encontrados.
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
const query = 'minions';

const url = `https://vexapi.com.br/api/search/filme?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Buscando informações do filme: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.resultado?.length) {
            console.log('==============================');
            console.log('🎬 DADOS DO FILME ENCONTRADO');
            console.log('==============================\n');

            const filme = dados.resultado[0];
            console.log(`Título:    ${filme.titulo}`);
            console.log(`Lançado:   ${filme.lancamento}`);
            console.log(`Avaliação: ${filme.avaliacoes}`);
            console.log(`\n📖 Sinopse:\n${filme.sinopse}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Nenhum filme encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O array `resultado` contém todos os filmes correspondentes.
 *   - Ótimo para sistemas de recomendação ou catálogo.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
