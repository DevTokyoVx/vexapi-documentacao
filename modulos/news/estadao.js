/**
 * ============================================
 * 📡 VEX API - NEWS / ESTADÃO
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/news/estadao
 *
 * 🧠 DESCRIÇÃO:
 *   Coleta as notícias e manchetes em tempo real do jornal O Estado de S. Paulo (Estadão).
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
 *   Retorna um array de objetos com títulos, descrições, imagens e links.
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

const url = `https://vexapi.com.br/api/news/estadao?apikey=${apikey}&query=${query}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando notícias do Estadão...\n');

        const dados = await buscarVexAPI(url);

        if (dados?.resposta?.length) {
            console.log('==============================');
            console.log('📰 ÚLTIMAS NOTÍCIAS - ESTADÃO');
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
 *   - Inclui editoriais e notícias de última hora.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
