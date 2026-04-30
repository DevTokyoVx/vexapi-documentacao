/**
 * ============================================
 * 📡 VEX API - PESQUISAS / YOUTUBE
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
const query = 'do i wanna know';

const url = `https://vexapi.com.br/api/search/youtube?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Pesquisando no YouTube: "${query}"...\n`);
        const dados = await buscarVexAPI(url);

        if (dados?.results?.length) {
            console.log('==============================');
            console.log('🎥 RESULTADOS DO YOUTUBE');
            console.log('==============================\n');
            const primeiro = dados.results[0];
            console.log(`Título:    ${primeiro.title}`);
            console.log(`Canal:     ${primeiro.channelTitle}`);
            console.log(`Duração:   ${primeiro.duration_raw}`);
            console.log(`Link:      ${primeiro.url}`);
            console.log('\n-------------------------');
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }
    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 👨‍💻 CRIADO POR: Vex Tech Solutions
 * 📅 ATUALIZADO EM: 28/04/2026
 * ============================================
 */