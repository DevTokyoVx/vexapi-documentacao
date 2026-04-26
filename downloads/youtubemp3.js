/**
 * ============================================
 * 📥 VEX API - DOWNLOAD / YOUTUBE MP3
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/youtubemp3
 *
 * 🧠 DESCRIÇÃO:
 *   Converte vídeos do YouTube para MP3 e retorna
 *   o link direto para download do áudio.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do vídeo do YouTube
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *
 * 🚀 OBSERVAÇÕES:
 *   - A API retorna JSON puro
 *   - Link direto vem em `dlurl`
 *   - DEBUG pode ser ativado
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */

import https from 'https';

// 🔥 DEBUG (true = mostra tudo)
const DEBUG = false;

function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch {
                    reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', reject);
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const youtubeUrl = 'https://youtu.be/uVV7ArAqCzc';

const url = `https://vexapi.com.br/api/downloads/youtubemp3?apikey=${apikey}&query=${encodeURIComponent(youtubeUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando áudio do YouTube...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.resposta) {
            const video = dados.resposta;

            console.log('==============================');
            console.log('🎵 RESULTADO');
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