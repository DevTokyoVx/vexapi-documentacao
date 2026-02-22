const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Função que baixa uma imagem a partir de uma URL e salva no diretório local
 *
 * @param {string} url - URL da imagem gerada pela API
 * @param {string} destino - Caminho local do arquivo (ex: './cinema.jpg')
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

            file.on('finish', () => {
                file.close(resolve);
            });

            file.on('error', (err) => {
                fs.unlink(destino, () => reject(err));
            });
        }).on('error', (err) => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// URL da imagem que será inserida na tela do cinema
const urlImagemOriginal = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';

// URL completa da API Cinema da Vex
const urlAPI = `https://vexapi.com.br/api/edits/cinema?apikey=${apikey}&query=${encodeURIComponent(urlImagemOriginal)}`;

// Caminho para salvar a imagem processada
const destinoLocal = path.join(__dirname, 'cinema.jpg');

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🔹 Baixando imagem com efeito Cinema da Vex API...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Imagem salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao baixar a imagem:', err.message);
    }
})();