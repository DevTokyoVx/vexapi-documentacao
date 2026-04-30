/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / PINTEREST MP4
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/pinterestmp4
 *
 * 🧠 DESCRIÇÃO:
 *   Baixa vídeos do Pinterest a partir de um link
 *   e retorna os links diretos dos arquivos MP4.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do pin ou vídeo do Pinterest.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna uma lista de objetos contendo o tipo e a URL de cada vídeo encontrado.
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
const pinterestUrl = 'https://pin.it/7tg9BskmV';

const url = `https://vexapi.com.br/api/downloads/pinterestmp4?apikey=${apikey}&query=${encodeURIComponent(pinterestUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando vídeos do Pinterest...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.medias?.length) {
            console.log('==============================');
            console.log('🎬 RESULTADO');
            console.log('==============================\n');

            dados.medias.forEach((media, i) => {
                console.log(`Vídeo ${i + 1}:`);
                console.log('Tipo:', media.type);
                console.log('URL:', media.url);
                console.log('-------------------------');
            });

        } else {
            console.log('⚠️ Nenhum vídeo encontrado.');

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
 *   - O link retornado aponta diretamente para o arquivo de vídeo.
 *   - Alguns pins podem não conter vídeos, mesmo sendo classificados como tal.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
