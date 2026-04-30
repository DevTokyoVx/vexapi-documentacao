/**
 * ============================================
 * 📡 VEX API - PESQUISAS / HORÓSCOPO
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/search/horoscopo
 *
 * 🧠 DESCRIÇÃO:
 *   Retorna a previsão diária para o signo especificado, 
 *   além de características gerais sobre a personalidade do signo.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Nome do signo (ex: aries, touro, gemeos).
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna um objeto com a previsão, data e descrição do signo.
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
const signo = 'touro';

const url = `https://vexapi.com.br/api/search/horoscopo?apikey=${apikey}&query=${encodeURIComponent(signo)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Buscando horóscopo para: "${signo}"...\n`);

        const dados = await buscarVexAPI(url);

        if (dados?.result) {
            console.log('==============================');
            console.log('✨ PREVISÃO DO DIA');
            console.log('==============================\n');

            const h = dados.result;
            console.log(`Data:      ${h.date}`);
            console.log(`Previsão:  ${h.forecast}`);
            
            if (h.signo) {
                console.log(`\n🔎 Sobre ${signo.toUpperCase()}:`);
                console.log(`${h.signo.description}`);
            }
            console.log('\n-------------------------');

        } else {
            console.log('⚠️ Previsão não encontrada.');
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O campo `result` contém a previsão (`forecast`) e dados do signo.
 *   - Ideal para automações de mensagens diárias.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
