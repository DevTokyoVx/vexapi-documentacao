/**
 * ============================================
 * 📡 VEX API - GAMES / CLASH ROYALE
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/games/clashroyale
 *
 * 🧠 DESCRIÇÃO:
 *   Retorna informações de um jogador de Clash Royale
 *   conforme o tipo de consulta solicitado.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Tipo da consulta.
 *     Valores disponíveis:
 *     geral, cartas, badges, conquistas ou banner.
 *
 *   - tag: string (obrigatório)
 *     Tag do jogador do Clash Royale.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna informações do jogador de acordo com
 *   o tipo especificado em "query".
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';

// 🔥 DEBUG (true = mostra tudo)
const DEBUG = true;

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

const apikey = '';

// Tipos disponíveis:
// geral
// cartas
// badges
// conquistas
// banner

const tipo = 'geral';
const tag = '20C9PRCJYC';

const url =
`https://vexapi.com.br/api/games/clashroyale?apikey=${apikey}&query=${encodeURIComponent(tipo)}&tag=${encodeURIComponent(tag)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando informações do jogador...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.resposta) {
            console.log('==============================');
            console.log('🏆 RESULTADO');
            console.log('==============================');

            console.log(JSON.stringify(dados.resposta, null, 2));

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');

            if (DEBUG) {
                console.log(dados);
            }
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A tag do jogador deve ser válida.
 *   - O retorno varia conforme o tipo informado em "query".
 *   - Consultas disponíveis:
 *       geral
 *       cartas
 *       badges
 *       conquistas
 *       banner
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   04/06/2026
 * ============================================
 */