/**
 * ============================================
 * 📡 VEX API - NEWS / JOVEM PAN
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/news/jovempan
 *
 * 🧠 DESCRIÇÃO:
 *   Coleta as notícias e destaques de última hora do portal Jovem Pan.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Valor 'null' (endpoint retorna o feed padrão).
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna um array de objetos com títulos, imagens, categorias e links.
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
const query = 'null';

const url = `https://vexapi.com.br/api/news/jovempan?apikey=${apikey}&query=${query}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando notícias da Jovem Pan...\n');

        const dados = await buscarVexAPI(url);

        if (dados?.resposta?.length) {
            console.log('==============================');
            console.log('📰 ÚLTIMAS NOTÍCIAS - JOVEM PAN');
            console.log('==============================\n');

            dados.resposta.forEach((noticia, i) => {
                console.log(`${i + 1}. ${noticia.noticia || 'Sem título'}`);
                console.log(`   🔗 Link: ${noticia.link || 'Sem link'}`);
                console.log('-------------------------');
            });

        } else {
            console.log('⚠️ Nenhuma notícia encontrada.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `resposta` contém a lista de notícias.
 *   - Cobre política, esportes, entretenimento e notícias gerais.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
