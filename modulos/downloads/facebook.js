/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / FACEBOOK
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/facebook
 *
 * 🧠 DESCRIÇÃO:
 *   Extrai informações e links de download de vídeos públicos do Facebook.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do vídeo do Facebook que deseja baixar.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna metadados do vídeo e uma lista de URLs de mídia (qualidades variadas).
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';


/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado.
 * Agora simplificada para trabalhar exclusivamente com JSON.
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
                    // Tenta parsear o JSON diretamente
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
const facebookUrl = 'https://www.facebook.com/share/r/1SBpALCUFc/';

// URL completa do endpoint Facebook Download
const url = `https://vexapi.com.br/api/downloads/facebook?apikey=${apikey}&query=${encodeURIComponent(facebookUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na VexAPI...');

        const dados = await buscarVexAPI(url);

        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.resposta) {
            const fb = dados.resposta;

            console.log('\n==============================');
            console.log('✅ Resultado do Facebook Download:');
            console.log('==============================');
            console.log('URL original: ', fb.url);
            console.log('Autor: ', fb.author);
            console.log('Título: ', fb.title);
            console.log('Thumbnail: ', fb.thumbnail);
            console.log('Duração (ms): ', fb.duration);
            console.log('Tipo: ', fb.type);
            console.log('Erro: ', fb.error);
            console.log('Tempo de execução: ', fb.time_end + ' ms');

            if (fb.medias && fb.medias.length > 0) {
                console.log('\n🎥 Vídeos encontrados:\n');
                fb.medias.forEach((m, i) => {
                    console.log(`Vídeo ${i + 1}:`);
                    console.log('Qualidade: ', m.quality);
                    console.log('Extensão: ', m.extension);
                    console.log('URL: ', m.url);
                    console.log('---------');
                });
            }

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O link deve ser de um vídeo público.
 *   - A API retorna múltiplas qualidades quando disponíveis.
 *   - O tempo de execução pode variar conforme a plataforma.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
