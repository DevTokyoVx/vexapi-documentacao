/**
 * Script Node.js para gerar imagem tipo "ping" usando a Vex API
 *
 * Observações importantes:
 *  - A API retorna uma imagem PNG processada diretamente.
 *  - Parâmetros obrigatórios: `fundo`, `avatar`, `apikey`.
 *  - Parâmetros opcionais incluem data, dia, dimensões, cores e textos das caixas.
 *  - O resultado será salvo como 'ping.png' no mesmo diretório do script.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

const params = {
    fundo: 'https://i.pinimg.com/736x/bc/31/a0/bc31a0422bb8182c9bc12c759da22140.jpg', // obrigatório
    avatar: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg', // obrigatório

    // Parâmetros opcionais e seus padrões
    data: '00/00/0000',
    dia: 'Domingo',
    width: 1400,
    height: 750,
    neon: '#00FF32',
    overlay: '#000000',
    caixaBg: '#000000',
    avatarSize: 280,
    avatarBorder: 10,
    avatarY: 240,
    mRaio: 40,
    mEspessura: 12,
    c1titulo: 'LATÊNCIA',
    c1texto: 'Ping: 0.029ms | Latência: 1.70ms',
    c2titulo: 'SISTEMA',
    c2texto: 'CPU: 3.00% | RAM: 8.33 / 19.53 GB',
    c3titulo: 'SERVIDOR',
    c3texto: 'Plataforma: linux | Node: v20.20.0',
    c4titulo: 'STATUS',
    c4texto: 'Comandos: 642 | Uptime: 00d 00h 18m'
};

// ==========================
// MONTANDO A URL
// ==========================
const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const urlAPI = `https://vexapi.com.br/api/canvas/ping?apikey=${apikey}&${queryString}`;

// ==========================
// CAMINHO DE SAÍDA
// ==========================
const destinoLocal = path.join(__dirname, 'ping.png');

// ==========================
// FUNÇÃO PARA BAIXAR A IMAGEM
// ==========================
function baixarImagem(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar a imagem. Status Code: ${res.statusCode}`));
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
        console.log('🔹 Gerando imagem tipo ping...');
        await baixarImagem(urlAPI, destinoLocal);
        console.log('✅ Imagem gerada com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar a imagem tipo ping:', err.message);
    }
})();