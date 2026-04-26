/**
 * Script Node.js para gerar GIF de amor usando a nova Vex API
 *
 * Parâmetros oficiais da nova rota:
 *  - user1: URL da imagem do primeiro usuário (opcional)
 *  - user2: URL da imagem do segundo usuário (opcional)
 *  - bgGif: URL de GIF de fundo (opcional)
 *  - percent: Valor entre 0–100 (opcional, padrão 100)
 *  - frames: Quantidade de frames (opcional, padrão 40)
 *  - color: Cor HEX (opcional)
 *  - textColor: Cor do texto HEX (opcional)
 *  - apikey: obrigatório
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '23521681-cab7-4918-be66-80e1e632f035';

// Parâmetros da rota lovegif (API nova)
const params = {
    user1: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg', // opcional
    user2: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg', // opcional
    bgGif: '',        // opcional
    percent: 100,     // opcional
    frames: 40,       // opcional
    color: '#ff0059', // opcional
    textColor: '#ffffff' // opcional
};

// ==========================
// MONTANDO A URL
// ==========================
const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const urlAPI = `https://vexapi.com.br/api/canvas/lovegif?apikey=${apikey}&${queryString}`;

// ==========================
// CAMINHO DE SAÍDA DO GIF
// ==========================
const destinoLocal = path.join(__dirname, 'love.gif');

// ==========================
// FUNÇÃO PARA BAIXAR O GIF
// ==========================
function baixarGIF(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar o GIF. Status Code: ${res.statusCode}`));
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
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🔹 Gerando GIF de amor...');
        await baixarGIF(urlAPI, destinoLocal);
        console.log('✅ GIF gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar GIF de amor:', err.message);
    }
})();