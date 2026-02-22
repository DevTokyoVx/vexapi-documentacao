const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR GIF DE BOAS-VINDAS
 * ============================================
 *
 * Endpoint: /api/canvas/welcomegif
 *
 * FUNCIONAMENTO:
 *  - Gera um GIF de boas-vindas com avatar, fundo animado e textos personalizados.
 *  - A API já retorna o GIF processado, então o script apenas baixa o arquivo.
 *
 * PARÂMETROS DISPONÍVEIS:
 *  - avatarUrl (OBRIGATÓRIO)   -> URL do avatar do usuário
 *  - gifUrl (OPCIONAL)         -> GIF de fundo personalizado, padrão se não informado
 *  - welcomeText (OPCIONAL)    -> Texto principal (default: 'Welcome!')
 *  - subText (OPCIONAL)        -> Texto secundário (default: 'Bem-vindo(a)!')
 *  - delay (OPCIONAL)          -> Velocidade da animação, padrão 0 (máxima)
 *  - textColor (OPCIONAL)      -> Cor do texto em HEX, padrão '#007BFF' (azul)
 *  - apikey (OBRIGATÓRIO)      -> Chave da Vex API
 *
 * OBSERVAÇÃO:
 *  - O GIF gerado já contém animação pronta e o avatar do usuário.
 *  - O arquivo será salvo localmente com extensão .gif
 */

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';

// Parâmetros do GIF
const avatarUrl = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';
const gifUrl = ''; // opcional
const welcomeText = 'Welcome!'; // opcional
const subText = 'Bem-vindo(a)!'; // opcional
const delay = 0; // opcional
const textColor = '#007BFF'; // opcional

// URL completa da API
const urlAPI = `https://vexapi.com.br/api/canvas/welcomegif?apikey=${apikey}` +
    `&avatarUrl=${encodeURIComponent(avatarUrl)}` +
    `&gifUrl=${encodeURIComponent(gifUrl)}` +
    `&welcomeText=${encodeURIComponent(welcomeText)}` +
    `&subText=${encodeURIComponent(subText)}` +
    `&delay=${encodeURIComponent(delay)}` +
    `&textColor=${encodeURIComponent(textColor)}`;

// Caminho para salvar o GIF
const destinoLocal = path.join(__dirname, 'welcome.gif');

/**
 * Função para baixar o GIF da API e salvar localmente
 *
 * @param {string} url - URL do GIF processado pela API
 * @param {string} destino - Caminho local do arquivo de saída
 */
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
        console.log('🔹 Gerando GIF de boas-vindas...');

        await baixarGIF(urlAPI, destinoLocal);

        console.log('✅ GIF gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar GIF de boas-vindas:', err.message);
    }
})();