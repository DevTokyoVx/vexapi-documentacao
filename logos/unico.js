const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR LOGOS USANDO VEX API
 * ============================================
 *
 * Este script baixa logos estilizadas usando a API Vex.
 * 
 * Endpoint usado: /api/logos/{estilo}?apikey=API_KEY&query=TEXTO
 *
 * FUNCIONAMENTO:
 *  - O parâmetro `query` define o texto que aparecerá na logo.
 *  - Existem mais de 30 estilos de logos diferentes, cada um em um endpoint:
 *      Ex: techstyle, amongus, neon, etc.
 *  - Para mudar o estilo da logo, basta trocar o valor de `estiloLogo`.
 *  - Para mudar o texto da logo, altere o valor de `textoLogo`.
 *  - A API **retorna a imagem pronta**, então não há JSON.
 *  - Não foi adicionado exemplo de todas as logos na documentação, pois a diferença entre elas é apenas o **estilo** e o **texto**.
 * 
 * EXEMPLOS DE USO:
 * 1️⃣ Gerar uma logo techstyle com o texto "Vex api":
 *    - estiloLogo = 'techstyle'
 *    - textoLogo = 'Vex api'
 * 2️⃣ Gerar uma logo amongus com o texto "Among Us":
 *    - estiloLogo = 'amongus'
 *    - textoLogo = 'Among Us'
 *
 * A imagem será salva localmente no diretório atual com o nome `{estiloLogo}.png`.
 */

/**
 * Função que baixa uma imagem a partir de uma URL e salva no diretório local
 *
 * @param {string} url - URL da imagem gerada pela API
 * @param {string} destino - Caminho local do arquivo (ex: './logo.png')
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
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614'; // Sua chave da Vex API

const textoLogo = 'Vex api'; // Texto que vai aparecer na logo
const estiloLogo = 'techstyle'; // Estilo da logo (techstyle, amongus, neon, etc.)

// URL completa da API de logo da Vex
const urlAPI = `https://vexapi.com.br/api/logos/${estiloLogo}?apikey=${apikey}&query=${encodeURIComponent(textoLogo)}`;

// Caminho para salvar a imagem gerada
const destinoLocal = path.join(__dirname, `${estiloLogo}.png`);

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Baixando logo "${textoLogo}" no estilo "${estiloLogo}"...`);

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Logo salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao baixar a logo:', err.message);
    }
})();