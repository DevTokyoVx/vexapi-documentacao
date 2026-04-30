/**
 * ============================================
 * 📡 VEX API - PESQUISAS / AUDIO MEME
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/audiomeme
 *
 * 🧠 DESCRIÇÃO:
 *   Busca áudios de memes famosos da internet pelo título ou frase marcante.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Título do meme (ex: "boa noite bruno").
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna o link direto para o arquivo de áudio (MP3).
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
const query = 'boa noite bruno';

const url = `https://vexapi.com.br/api/search/audiomeme?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Buscando áudio do meme: "${query}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.resultado) {
            console.log('==============================');
            console.log('🔊 ÁUDIO ENCONTRADO');
            console.log('==============================\n');

            console.log(`Link: ${dados.resultado}`);
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Meme não encontrado.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `resultado` traz a URL direta do MP3.
 *   - Ideal para bots de WhatsApp ou Discord.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
