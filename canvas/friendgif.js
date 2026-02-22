/**
 * Script Node.js para gerar GIF de amizade usando a Vex API
 *
 * Observações importantes:
 *  - A API retorna um GIF processado diretamente.
 *  - Parâmetros obrigatórios: `avatarLeft`, `avatarRight`.
 *  - Parâmetros opcionais:
 *      - nameLeft: Nome do usuário da esquerda. Padrão: "Tokyo".
 *      - nameRight: Nome do usuário da direita. Padrão: "Vex".
 *      - titleText: Título exibido no GIF. Padrão: "Melhores Amigos".
 *      - percent: Percentual de amizade (0-100). Padrão: 87.
 *      - textColor: Cor do texto em HEX. Padrão: #FFFFFF.
 *      - borderColor: Cor das bordas do card em HEX. Padrão: #FFFFFF.
 *      - backgroundColor: Cor de fundo em HEX. Padrão: #000000.
 *      - snow: Ativa/desativa efeito de neve. Padrão: true.
 *      - delay: Delay entre frames em ms. Padrão: 50.
 *      - frames: Quantidade de frames da animação. Padrão: 100.
 *      - pause: Tempo (s) que o GIF fica parado no final. Padrão: 2.
 *  - Chave obrigatória: `apikey`.
 *
 * Exemplo de uso:
 *   - avatarLeft: URL da imagem do usuário da esquerda
 *   - avatarRight: URL da imagem do usuário da direita
 * O GIF será salvo localmente como 'friend.gif'.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// Parâmetros da rota friendgif
const params = {
    avatarLeft: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',  // obrigatório
    avatarRight: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg', // obrigatório
    nameLeft: 'Tokyo',        // opcional
    nameRight: 'Vex',         // opcional
    titleText: 'Melhores Amigos', // opcional
    percent: 87,              // opcional
    textColor: '#FFFFFF',     // opcional
    borderColor: '#FFFFFF',   // opcional
    backgroundColor: '#000000', // opcional
    snow: true,               // opcional
    delay: 50,                // opcional
    frames: 100,              // opcional
    pause: 2                  // opcional
};

// ==========================
// MONTANDO A URL
// ==========================
const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const urlAPI = `https://vexapi.com.br/api/canvas/friendgif?apikey=${apikey}&${queryString}`;

// ==========================
// CAMINHO DE SAÍDA DO GIF
// ==========================
const destinoLocal = path.join(__dirname, 'friend.gif');

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
        console.log('🔹 Gerando GIF de amizade...');
        await baixarGIF(urlAPI, destinoLocal);
        console.log('✅ GIF gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar GIF de amizade:', err.message);
    }
})();