/**
 * ============================================
 * 📡 VEX API - CANVAS / WELCOME SOCIAL
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   https://vexapi.com.br/api/canvas/welcomesocial
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um card social moderno com infos do usuário e servidor
 *
 * 📤 RESPOSTA:
 *   Imagem PNG direta
 *
 * ============================================
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const apikey = 'SUA_API_KEY_AQUI';

const params = {
    query: 'Tokyo',
    imgperfil: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    nomegrupo: 'DevsLand',
    numerouser: '123456789',

    invite: 'discord.gg/seulink',
    serverId: '987654321',

    //fundo: '#0b0b0b',
    //grade: '#1f1f1f',
    //lateral: '#ff00ff',

    //gradiente1: '#00ffcc',
    //gradiente2: '#ff00ff',

    //textoTag: '#00ffcc',
    //textoPrincipal: '#ffffff',
    //textoSecundario: '#aaaaaa',

    //fundoInfo: '#111111',
    //bordaInfo: '#00ffcc',

    // glowAvatar: '#00ffcc',
    //anelAvatar2: '#ff00ff'
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/welcomesocial?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'welcome_social.png');

(async () => {
    try {
        console.log('🔹 Gerando card Social...');
        await baixarImagem(url, caminho);
        console.log('✅ Card salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();