/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / KWAI
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
const kwaiUrl = 'https://k.kwai.com/p/x794OPCM';

const url = `https://vexapi.com.br/api/downloads/kwai?apikey=${apikey}&query=${encodeURIComponent(kwaiUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na VexAPI...\n');
        const dados = await buscarVexAPI(url);

        if (dados?.resposta) {
            const video = dados.resposta;
            console.log('============================================');
            console.log('✅ DOWNLOAD CONCLUÍDO');
            console.log('============================================');
            console.log(`Título:    ${video.titulo}`);
            console.log(`Duração:   ${video.duracao}`);
            console.log(`Link:      ${video.video}`);
            if (video.criador) console.log(`\n👤 Autor:   ${video.criador.nome} (@${video.criador.usuario})`);
            console.log('============================================');
        } else {
            console.log('\n⚠️ A API não retornou dados válidos.');
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