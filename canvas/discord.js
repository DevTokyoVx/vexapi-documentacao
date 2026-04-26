/**
 * ============================================
 * 📡 VEX API - CANVAS / DISCORDPROFILE
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/discordprofile
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um cartão de perfil personalizado do Discord com base
 *   nas informações fornecidas.
 *
 * ⚙️ PARÂMETROS:
 *   - username: string (obrigatório)
 *     Nome do usuário exibido no cartão
 *
 *   - avatar: string (obrigatório)
 *     URL do avatar do usuário
 *
 *   - discriminator: string (opcional)
 *     Tag do Discord (ex: 1234)
 *
 *   - banner: string (opcional)
 *     URL do banner personalizado
 *
 *   - aboutme: string (opcional)
 *     Texto de "Sobre Mim"
 *
 *   - status: string (opcional)
 *     online, idle, dnd, offline (padrão: online)
 *
 *   - membersince: string (opcional)
 *     Data de criação da conta (ex: 25 Mai 2020)
 *
 *   - servermembersince: string (opcional)
 *     Data de entrada no servidor
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📤 RESPOSTA:
 *   Tipo: IMAGEM (PNG)
 *   A API retorna diretamente a imagem gerada (não há JSON).
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// recriando __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function baixarImagem(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Status Code: ${res.statusCode}`));
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

const apikey = 'SUA-API-KEY';

// dados do perfil
const username = 'Vex API';
const discriminator = '1234';
const avatar = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';
const banner = '';
const aboutme = 'Desenvolvedor e entusiasta de APIs';
const status = 'online';
const membersince = '25 Mai 2020';
const servermembersince = '01 Jan 2022';

const url = `https://vexapi.com.br/api/canvas/discordprofile?apikey=${apikey}` +
    `&username=${encodeURIComponent(username)}` +
    `&discriminator=${encodeURIComponent(discriminator)}` +
    `&avatar=${encodeURIComponent(avatar)}` +
    `&banner=${encodeURIComponent(banner)}` +
    `&aboutme=${encodeURIComponent(aboutme)}` +
    `&status=${encodeURIComponent(status)}` +
    `&membersince=${encodeURIComponent(membersince)}` +
    `&servermembersince=${encodeURIComponent(servermembersince)}`;

const caminho = path.join(__dirname, 'discord_profile.png');

(async () => {
    try {
        console.log('🔹 Gerando cartão de perfil do Discord...');

        await baixarImagem(url, caminho);

        console.log('✅ Cartão salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - Parâmetros opcionais possuem valores padrão
 *   - A imagem é retornada diretamente pela API
 *   - Não há estrutura JSON de resposta
 *   - URLs devem ser corretamente codificadas
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */