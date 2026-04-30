/**
 * ============================================
 * 📡 VEX API - CANVAS / WELCOMEGIF
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/welcomegif
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um GIF animado de boas-vindas com avatar,
 *   fundo animado e textos personalizados.
 *
 * ⚙️ PARÂMETROS:
 *   - avatarUrl: string (obrigatório)
 *     URL do avatar do usuário
 *
 *   - gifUrl: string (opcional)
 *     URL de um GIF de fundo personalizado
 *
 *   - welcomeText: string (opcional)
 *     Texto principal (padrão: "Welcome!")
 *
 *   - subText: string (opcional)
 *     Texto secundário (padrão: "Bem-vindo(a)!")
 *
 *   - delay: number (opcional)
 *     Velocidade da animação (padrão: 0)
 *
 *   - textColor: string (opcional)
 *     Cor do texto em HEX (%23007BFF)
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📤 RESPOSTA:
 *   Tipo: GIF (ANIMADO)
 *   A API retorna diretamente o arquivo gerado (não há JSON).
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

function baixarGIF(url, destino) {
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

const params = {
    avatarUrl: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    gifUrl: '',
    welcomeText: 'Welcome!',
    subText: 'Bem-vindo(a)!',
    delay: 0,
    textColor: '#007BFF'
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/welcomegif?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'welcome.gif');

(async () => {
    try {
        console.log('🔹 Gerando GIF de boas-vindas...');
        await baixarGIF(url, caminho);
        console.log('✅ GIF salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O GIF é retornado diretamente pela API
 *   - Não há estrutura JSON de resposta
 *   - Cores HEX devem ser URL encoded (%23 ao invés de #)
 *   - Parâmetros opcionais possuem valores padrão
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */