/**
 * ============================================
 * 📡 VEX API - QUIZ / GERAL
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
const categoria = 'animais';

const url = `https://vexapi.com.br/api/quiz/${categoria}?apikey=${apikey}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Iniciando Quiz: "${categoria.toUpperCase()}"...\n`);
        const dados = await buscarVexAPI(url);

        if (dados?.result?.length) {
            console.log('==============================');
            console.log('❓ PERGUNTA DO QUIZ');
            console.log('==============================\n');
            const item = dados.result[0];
            console.log(`Pergunta: ${item.pergunta}`);
            console.log('\nOpções:');
            item.opcoes.forEach(op => console.log(`  [${op.id}] ${op.texto}`));
            console.log(`\n✅ Resposta Correta: ${item.resposta_correta}`);
            console.log(`💡 Explicação: ${item.explicacao}`);
            console.log('\n-------------------------');
        } else {
            console.log('⚠️ Nenhuma pergunta encontrada.');
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