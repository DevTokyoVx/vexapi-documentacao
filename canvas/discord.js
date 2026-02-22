const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * SCRIPT PARA GERAR CARTÃO DE PERFIL DO DISCORD
 * ============================================
 *
 * Endpoint: /api/canvas/discordprofile
 *
 * FUNCIONAMENTO:
 *  - Gera um cartão de perfil de usuário do Discord.
 *  - Todos os parâmetros enviados são adicionados à URL da API.
 *  - A API já retorna a imagem processada pronta.
 *
 * PARÂMETROS DISPONÍVEIS:
 *  - username (obrigatório)        -> Nome do usuário exibido no cartão
 *  - discriminator (opcional)      -> Tag do Discord (#0000), padrão "1234"
 *  - avatar (obrigatório)          -> URL do avatar do usuário
 *  - banner (opcional)             -> URL do banner personalizado
 *  - aboutme (opcional)            -> Texto de "Sobre Mim" (possui padrão)
 *  - status (opcional)             -> online, idle, dnd, offline (padrão: online)
 *  - membersince (opcional)        -> Data de criação da conta (Ex: 25 Mai 2020)
 *  - servermembersince (opcional)  -> Data em que entrou no servidor
 *  - apikey (obrigatório)          -> Chave pessoal da Vex API
 *
 * OBSERVAÇÃO:
 *  - Se algum parâmetro opcional não for enviado, a API aplica valores padrão.
 *  - Este script baixa a imagem processada e salva localmente.
 */

// ==========================
// CONFIGURAÇÃO
// ==========================
const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614'; // Sua chave Vex API

// Dados do perfil
const username = 'Vex API';
const discriminator = '1234'; // opcional
const avatar = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';
const banner = ''; // opcional
const aboutme = 'Desenvolvedor e entusiasta de APIs'; // opcional
const status = 'online'; // opcional: online, idle, dnd, offline
const membersince = '25 Mai 2020'; // opcional
const servermembersince = '01 Jan 2022'; // opcional

// URL completa da API
const urlAPI = `https://vexapi.com.br/api/canvas/discordprofile?apikey=${apikey}` +
    `&username=${encodeURIComponent(username)}` +
    `&discriminator=${encodeURIComponent(discriminator)}` +
    `&avatar=${encodeURIComponent(avatar)}` +
    `&banner=${encodeURIComponent(banner)}` +
    `&aboutme=${encodeURIComponent(aboutme)}` +
    `&status=${encodeURIComponent(status)}` +
    `&membersince=${encodeURIComponent(membersince)}` +
    `&servermembersince=${encodeURIComponent(servermembersince)}`;

// Caminho para salvar a imagem
const destinoLocal = path.join(__dirname, 'discord_profile.png');

/**
 * Função para baixar a imagem da API e salvar localmente
 *
 * @param {string} url - URL da imagem processada pela API
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
        console.log('🔹 Gerando cartão de perfil do Discord...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Cartão gerado com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao gerar cartão do Discord:', err.message);
    }
})();