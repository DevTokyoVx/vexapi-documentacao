/**
 * Script Node.js para gerar GIF de amor usando a Vex API
 *
 * Observações importantes:
 *  - A API retorna um GIF processado diretamente.
 *  - Parâmetros obrigatórios: `avatarUrl` (URL do avatar do usuário).
 *  - Parâmetros opcionais:
 *      - subText: Texto secundário exibido no GIF. Padrão: 'Love!'.
 *      - gifUrl: GIF de fundo personalizado. Se não informado, será usado padrão.
 *      - percent: Percentual de amor (0-100). Padrão: 100.
 *      - frames: Quantidade de frames do GIF. Padrão: 40.
 *      - color: Cor do preenchimento HEX. Padrão: rosa/vermelho (#ff0059).
 *      - textColor: Cor do texto HEX. Padrão: #ffffff.
 *  - Chave obrigatória: `apikey`.
 *
 * Exemplo de uso:
 *   - avatarUrl: URL do avatar
 *   - subText: 'Oi'
 * O GIF será salvo localmente como 'love.gif'.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// Parâmetros corretos da rota lovegif
const params = {
    avatarUrl: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg', // obrigatório
    subText: 'Oi',        // opcional
    gifUrl: '',            // opcional
    percent: 100,          // opcional
    frames: 40,            // opcional
    color: '#ff0059',      // opcional
    textColor: '#ffffff'   // opcional
};

// ==========================
// MONTANDO A URL
// ==========================
const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined) // ignora valores vazios
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