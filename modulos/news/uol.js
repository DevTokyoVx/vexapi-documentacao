/**
 * ============================================
 * 📡 VEX API - NEWS / UOL
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
const query = 'null';

const url = `https://vexapi.com.br/api/news/uol?apikey=${apikey}&query=${query}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando últimas notícias do UOL...\n');
        const dados = await buscarVexAPI(url);

        if (dados?.result?.length) {
            console.log('==============================');
            console.log('📰 NOTÍCIAS UOL');
            console.log('==============================\n');
            const item = dados.result[0];
            console.log(`Título:    ${item.titulo}`);
            console.log(`Descrição: ${item.desc}`);
            console.log(`Link:      ${item.link}`);
            console.log('\n-------------------------');
        } else {
            console.log('⚠️ Nenhuma notícia encontrada.');
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