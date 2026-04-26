const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR IMAGEM "BRAT" USANDO VEX API
 * ============================================
 *
 * Endpoint: /api/canvas/brat
 * 
 * FUNCIONAMENTO:
 *  - Coloca o texto fornecido no estilo "brat" em uma imagem de canvas.
 *  - Parâmetro obrigatório:
 *      query -> texto que aparecerá na imagem
 *  - A API **retorna a imagem pronta**, então não há JSON.
 *  - A imagem será salva localmente no diretório atual com o nome 'brat.png'.
 *
 * EXEMPLO DE USO:
 *  - query: "Vex API"
 *  - URL da API:
 *    https://vexapi.com.br/api/canvas/brat?apikey=API_KEY&query=Vex%20API
 */

/**
 * Função que baixa uma imagem a partir de uma URL e salva no diretório local
 *
 * @param {string} url - URL da imagem gerada pela API
 * @param {string} destino - Caminho local do arquivo (ex: './brat.png')
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
const query = 'Vex API'; // Texto que vai aparecer na imagem

// URL completa da API Brat
const urlAPI = `https://vexapi.com.br/api/canvas/brat?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// Caminho para salvar a imagem
const destinoLocal = path.join(__dirname, 'brat.png');

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Gerando imagem "Brat" com o texto: "${query}"...`);

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Imagem "Brat" salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar imagem "Brat":', err.message);
    }
})();