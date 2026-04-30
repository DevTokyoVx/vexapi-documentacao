/**
 * ============================================
 * 📡 VEX API - PESQUISAS / LETRA
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/letra
 *
 * 🧠 DESCRIÇÃO:
 *   Busca a letra completa de músicas, incluindo informações sobre o artista, 
 *   título, álbum e link original.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Nome da música ou trecho da letra.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna um objeto contendo os detalhes e a letra da música.
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

const url = `https://vexapi.com.br/api/search/letra?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Buscando letra da música: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.results?.resultados?.length) {
            console.log('==============================');
            console.log('🎵 LETRA ENCONTRADA');
            console.log('==============================\n');

            const primeiro = dados.results.resultados[0];
            console.log(`Música:  ${primeiro.txt}`);
            console.log(`Artista: ${primeiro.art}`);
            console.log(`\n📝 Letra:\n\n${primeiro.lyrics}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Nenhuma letra encontrada.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `lyrics` contém o texto completo da letra.
 *   - Suporta busca por artista + música para maior precisão.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
