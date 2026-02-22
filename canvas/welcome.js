const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * =================================================
 * SCRIPT PARA GERAR CARTÃO DE BOAS-VINDAS "WELCOME"
 * =================================================
 *
 * Endpoint: /api/canvas/welcome
 *
 * FUNCIONAMENTO:
 *  - Gera um cartão de boas-vindas com texto personalizado, banner, perfil e grupo.
 *  - Parâmetros que a API recebe:
 *      textobemvindo -> Texto do topo do cartão (ex: "Bem-vindo(a)")
 *      imgbanner     -> URL da imagem de banner (opcional)
 *      imgperfil     -> URL da imagem de perfil do usuário (opcional)
 *      nomegrupo     -> Nome do grupo ou servidor (opcional)
 *      numerouser    -> Número ou identificação do usuário (opcional)
 *      cortexto      -> Cor do texto (hex) (opcional)
 *      corretangulo  -> Cor do retângulo do cartão (hex) (opcional)
 *      corborda1     -> Cor da borda superior (hex) (opcional)
 *      corborda2     -> Cor da borda inferior (hex) (opcional)
 *
 * OBSERVAÇÃO:
 *  - Caso não envie algum parâmetro opcional, a API aplicará valores padrão.
 *  - Este script baixa diretamente a imagem processada e salva no diretório.
 */

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614'; // Sua chave Vex API

// Dados do cartão
const textobemvindo = 'Vex API';
const imgbanner = 'https://i.pinimg.com/1200x/4b/d3/55/4bd355bd2c2fd3d7d04efa2934814d19.jpg';
const imgperfil = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';
const nomegrupo = 'DevsLand';
const numerouser = '+55 32 985076326';
const cortexto = '#ffffff';
const corretangulo = '#000000';
const corborda1 = '#ffffff';
const corborda2 = '#ffffff';

// URL completa da API
const urlAPI = `https://vexapi.com.br/api/canvas/welcome?apikey=${apikey}` +
    `&textobemvindo=${encodeURIComponent(textobemvindo)}` +
    `&imgbanner=${encodeURIComponent(imgbanner)}` +
    `&imgperfil=${encodeURIComponent(imgperfil)}` +
    `&nomegrupo=${encodeURIComponent(nomegrupo)}` +
    `&numerouser=${encodeURIComponent(numerouser)}` +
    `&cortexto=${encodeURIComponent(cortexto)}` +
    `&corretangulo=${encodeURIComponent(corretangulo)}` +
    `&corborda1=${encodeURIComponent(corborda1)}` +
    `&corborda2=${encodeURIComponent(corborda2)}`;

// Caminho para salvar a imagem
const destinoLocal = path.join(__dirname, 'welcome_card.png');

/**
 * Função para baixar a imagem da API e salvar localmente
 *
 * @param {string} url - URL da imagem gerada pela API
 * @param {string} destino - Caminho local do arquivo de saída
 */
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
        console.log('🔹 Gerando cartão de boas-vindas...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Cartão gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar cartão de boas-vindas:', err.message);
    }
})();