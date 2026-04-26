const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR GIF "BRAT" USANDO VEX API
 * ============================================
 *
 * Endpoint: /api/canvas/bratvideo
 * 
 * FUNCIONAMENTO:
 *  - Coloca o texto fornecido no estilo "brat" em um vídeo/GIF animado.
 *  - Parâmetro obrigatório:
 *      query -> texto que aparecerá no GIF
 *  - A API retorna o arquivo pronto, que pode ser salvo como GIF.
 *
 * EXEMPLO DE USO:
 *  - query: "Vex API"
 *  - URL da API:
 *    https://vexapi.com.br/api/canvas/bratvideo?apikey=API_KEY&query=Vex%20API
 */

/**
 * Função que baixa o GIF a partir de uma URL e salva no diretório local
 *
 * @param {string} url - URL do GIF gerado pela API
 * @param {string} destino - Caminho local do arquivo (ex: './bratvideo.gif')
 * @returns {Promise<void>}
 */
function baixarGIF(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar GIF. Status Code: ${res.statusCode}`));
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
const query = 'Vex API'; // Texto que vai aparecer no GIF

// URL completa da API BratVideo
const urlAPI = `https://vexapi.com.br/api/canvas/bratvideo?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// Caminho para salvar o GIF
const destinoLocal = path.join(__dirname, 'bratvideo.gif');

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Gerando GIF "Brat" com o texto: "${query}"...`);

        await baixarGIF(urlAPI, destinoLocal);

        console.log('✅ GIF "Brat" salvo com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar GIF "Brat":', err.message);
    }
})();