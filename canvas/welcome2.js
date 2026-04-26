const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ===========================================
 * SCRIPT PARA GERAR CARTÃO "WELCOME2"
 * ===========================================
 *
 * Endpoint: /canvas/welcome2
 *
 * Parâmetros:
 *  avatar      -> URL da imagem de perfil (obrigatório)
 *  nome        -> Nome exibido
 *  texto       -> Mensagem abaixo
 *  fundo       -> URL do fundo
 *  corMoldura  -> Cor da borda do avatar
 *  corLinhas   -> Cor das linhas
 *  glow        -> true/false para efeito glow
 *  apikey      -> chave da API
 */

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = 'SUA_CHAVE_AQUI'; // Substitua pela sua chave da API

// Dados do card
const avatar = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';
const nome = 'Dev Tokyo';
const texto = 'Nazuna Bot ao seu dispor!';
const fundo = 'https://i.pinimg.com/1200x/03/a0/6f/03a06fc163ae2eab7cee95bd77ff1119.jpg';

// 🎨 CORES (IMPORTANTE: usar encodeURIComponent)
const corMoldura = '#ffffff';
const corLinhas = '#00ffff';

// Glow opcional
const glow = true;

// ==========================
// URL DA API
// ==========================
const urlAPI =
    `https://vexapi.com.br/api/canvas/welcome2?apikey=${apikey}` +
    `&avatar=${encodeURIComponent(avatar)}` +
    `&nome=${encodeURIComponent(nome)}` +
    `&texto=${encodeURIComponent(texto)}` +
    `&fundo=${encodeURIComponent(fundo)}` +
    `&corMoldura=${encodeURIComponent(corMoldura)}` +
    `&corLinhas=${encodeURIComponent(corLinhas)}` +
    `&glow=${glow}`;

// Caminho do arquivo
const destinoLocal = path.join(__dirname, 'welcome2_card.png');

// ==========================
// FUNÇÃO DOWNLOAD
// ==========================
function baixarImagem(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar imagem. Status: ${res.statusCode}`));
            }

            const file = fs.createWriteStream(destino);
            res.pipe(file);

            file.on('finish', () => file.close(resolve));

            file.on('error', (err) => {
                fs.unlink(destino, () => reject(err));
            });
        }).on('error', reject);
    });
}

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🔹 Gerando welcome2...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Card gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();