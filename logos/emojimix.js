const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR EMOJIMIX USANDO VEX API
 * ============================================
 *
 * Endpoint: /api/logos/emojimix
 * 
 * FUNCIONAMENTO:
 *  - Combina dois emojis em uma única imagem.
 *  - Parâmetros obrigatórios:
 *      query  -> primeiro emoji
 *      emoji2 -> segundo emoji
 *  - A API **retorna a imagem pronta**, então não há JSON.
 *  - A imagem será salva localmente no diretório atual com o nome 'emojimix.png'.
 * 
 * EXEMPLO DE USO:
 *  - query: 😃  (query=%F0%9F%98%83%EF%B8%8F)
 *  - emoji2: 🔥  (emoji2=%F0%9F%94%A5)
 *  - A URL final da API será algo como:
 *    https://vexapi.com.br/api/logos/emojimix?apikey=API_KEY&query=%F0%9F%98%83%EF%B8%8F&emoji2=%F0%9F%94%A5
 */

/**
 * Função que baixa uma imagem a partir de uma URL e salva no diretório local
 *
 * @param {string} url - URL da imagem gerada pela API
 * @param {string} destino - Caminho local do arquivo (ex: './emojimix.png')
 * @returns {Promise<void>}
 */
function baixarImagem(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar imagem. Status Code: ${res.statusCode}`));
            }

            const file = fs.createWriteStream(destino);
            res.pipe(file);

            file.on('finish', () => file.close(resolve));

            file.on('error', (err) => {
                fs.unlink(destino, () => reject(err));
            });
        }).on('error', (err) => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614'; // Sua chave Vex API

const query = '😃';   // Primeiro emoji
const emoji2 = '🔥';  // Segundo emoji

// URL completa da API Emojimix
const urlAPI = `https://vexapi.com.br/api/logos/emojimix?apikey=${apikey}&query=${encodeURIComponent(query)}&emoji2=${encodeURIComponent(emoji2)}`;

// Caminho para salvar a imagem
const destinoLocal = path.join(__dirname, 'emojimix.png');

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Gerando emojimix de "${query}" + "${emoji2}"...`);

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Emojimix salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar emojimix:', err.message);
    }
})();