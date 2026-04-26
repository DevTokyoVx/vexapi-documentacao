const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR LOGOS DE 2 TEXTOS USANDO VEX API
 * ============================================
 *
 * Este script baixa logos estilizadas que aceitam 2 textos usando a API Vex.
 * 
 * ENDPOINT:
 * - /duallogos/{estilo}?apikey=API_KEY&query=TEXTO1&text2=TEXTO2
 *
 * FUNCIONAMENTO:
 * - query define o primeiro texto da logo.
 * - text2 define o segundo texto da logo.
 * - Para mudar o estilo da logo, basta trocar o valor de estiloLogo.
 * - Para mudar os textos da logo, altere texto1 e texto2.
 * - A API retorna a imagem pronta (não JSON), pronta para ser salva.
 * - Todos os estilos de 2 textos seguem o mesmo padrão, apenas mudando o nome da logo na rota.
 *
 * EXEMPLO DE USO:
 * - Gerar logo Deadpool com dois textos:
 *    - estiloLogo = 'deadpool'
 *    - texto1 = 'Tokyo'
 *    - texto2 = 'Bella'
 *    - URL: /duallogos/deadpool?apikey=API_KEY&query=Tokyo&text2=Bella
 *
 * A imagem será salva localmente no diretório atual com o nome {estiloLogo}.png.
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
const apikey = '1a0b5879-bc22-4f4a-8d42-8c032c9fd5a1'; // Nova chave da Vex API

const texto1 = 'Tokyo'; // Primeiro texto da logo
const texto2 = 'Bella'; // Segundo texto da logo
const estiloLogo = 'deadpool'; // Estilo da logo de 2 textos

// URL completa da API de logo de 2 textos
const urlAPI = `https://vexapi.com.br/api/duallogos/${estiloLogo}?apikey=${apikey}&query=${encodeURIComponent(texto1)}&text2=${encodeURIComponent(texto2)}`;

// Caminho para salvar a imagem gerada
const destinoLocal = path.join(__dirname, `${estiloLogo}.png`);

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Baixando logo "${texto1}/${texto2}" no estilo "${estiloLogo}"...`);

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Logo salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao baixar a logo:', err.message);
    }
})();