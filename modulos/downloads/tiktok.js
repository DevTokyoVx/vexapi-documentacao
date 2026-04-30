/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / TIKTOK
 * ============================================
 */

import https from 'https';

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado.
 */
async function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } 
                catch (err) { reject(new Error('Resposta não contém JSON válido')); }
            });
        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const tiktokUrl = 'https://vt.tiktok.com/ZSm9eXAGv/';

const url = `https://vexapi.com.br/api/downloads/tiktok?apikey=${apikey}&query=${encodeURIComponent(tiktokUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na VexAPI...\n');
        const dados = await buscarVexAPI(url);

        if (dados?.result) {
            const video = dados.result;
            console.log('============================================');
            console.log('✅ TIKTOK DOWNLOAD CONCLUÍDO');
            console.log('============================================');
            console.log(`Descrição:  ${video.desc || 'Sem descrição'}`);
            console.log(`Autor:      ${video.author?.nickname || 'N/A'}`);
            console.log(`Username:   @${video.author?.username || 'N/A'}`);
            console.log(`Vídeo (URL): ${video.video?.playAddr?.[0]}`);
            console.log('============================================');
        } else {
            console.log('\n⚠️ Nenhum resultado encontrado para esta URL.');
        }
    } catch (err) {
        console.error('\n❌ ERRO:', err.message);
    }
})();

/**
 * 👨‍💻 CRIADO POR: Vex Tech Solutions
 * 📅 ATUALIZADO EM: 28/04/2026
 * ============================================
 */