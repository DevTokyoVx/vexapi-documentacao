/**
 * ============================================
 * 📡 VEX API - CANVAS / WELCOME4
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/welcome4
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um card de boas-vindas personalizado (template Welcome4)
 *   com suporte a tema escuro, cores customizadas e avatar.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Nome do usuário exibido no card
 *
 *   - imgperfil: string (opcional)
 *     URL da foto de perfil do usuário
 *
 *   - nomegrupo: string (opcional)
 *     Nome do grupo ou servidor
 *
 *   - numerouser: string (opcional)
 *     Número do membro
 *
 *   - darkMode: boolean (opcional)
 *     true = tema escuro | false = tema claro
 *
 *   - fundoPrincipal: string (opcional)
 *   - faixaEsquerda: string (opcional)
 *   - textoPrincipal: string (opcional)
 *   - textoBoasVindas: string (opcional)
 *   - linhasDecorativas: string (opcional)
 *   - fundoPilula: string (opcional)
 *   - textoPilula: string (opcional)
 *   - bordaPilula: string (opcional)
 *   - fundoCirculoAvatar: string (opcional)
 *   - texturaLinhas: string (opcional)
 *   - corDourada: string (opcional)
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *
 * 📤 RESPOSTA:
 *   - Imagem PNG direta
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
    query: 'DevTokyo',
    imgperfil: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    nomegrupo: 'DevsLand',
    numerouser: '+55 32 985076326',

    darkMode: true,

    // fundoPrincipal: '#000000',
    // faixaEsquerda: '#111111',
    // textoPrincipal: '#ffffff',
    //textoBoasVindas: '#ffffff',
    //linhasDecorativas: '#ffffff',
    // fundoPilula: '#1a1a1a',
    //textoPilula: '#ffffff',
    // bordaPilula: '#ffffff',
    // fundoCirculoAvatar: '#000000',
    // texturaLinhas: '#222222',
    // corDourada: '#ffd700'
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/welcome4?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'welcome4_card.png');

(async () => {
    try {
        console.log('🔹 Gerando cartão Welcome4...');
        await baixarImagem(url, caminho);
        console.log('✅ Cartão salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();