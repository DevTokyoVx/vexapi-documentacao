/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / YOUTUBE MP4
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/youtubemp4
 *
 * 🧠 DESCRIÇÃO:
 *   Faz o download de vídeos do YouTube em formato MP4,
 *   retornando o link direto da mídia.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do vídeo do YouTube.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna o título do vídeo e o link direto para download do MP4.
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';



// 🔥 DEBUG (true = mostra tudo)
const DEBUG = false;

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
const youtubeUrl = 'https://youtu.be/uVV7ArAqCzc';

const url = `https://vexapi.com.br/api/downloads/youtubemp4?apikey=${apikey}&query=${encodeURIComponent(youtubeUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando vídeo do YouTube...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.resposta) {
            const video = dados.resposta;

            console.log('==============================');
            console.log('🎬 RESULTADO');
            console.log('==============================');

            console.log('Título:', video.title);
            console.log('Download:', video.dlurl);

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
 *   - O link de download é gerado sob demanda.
 *   - Suporta diversas resoluções dependendo da disponibilidade da API.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
