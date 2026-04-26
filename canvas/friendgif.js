/**
 * ============================================
 * 📡 VEX API - CANVAS / FRIENDGIF
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/friendgif
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um GIF animado de amizade entre dois usuários,
 *   com personalização de nomes, cores, efeitos e animação.
 *
 * ⚙️ PARÂMETROS:
 *   - avatarLeft: string (obrigatório)
 *     URL do avatar do usuário da esquerda
 *
 *   - avatarRight: string (obrigatório)
 *     URL do avatar do usuário da direita
 *
 *   - nameLeft: string (opcional)
 *     Nome do usuário da esquerda (padrão: Tokyo)
 *
 *   - nameRight: string (opcional)
 *     Nome do usuário da direita (padrão: Vex)
 *
 *   - titleText: string (opcional)
 *     Título exibido no GIF (padrão: Melhores Amigos)
 *
 *   - percent: number (opcional)
 *     Percentual de amizade (0-100) (padrão: 87)
 *
 *   - textColor: string (opcional)
 *     Cor do texto em HEX (%23FFFFFF)
 *
 *   - borderColor: string (opcional)
 *     Cor da borda em HEX (%23FFFFFF)
 *
 *   - backgroundColor: string (opcional)
 *     Cor de fundo em HEX (%23000000)
 *
 *   - snow: boolean (opcional)
 *     Ativa efeito de neve (padrão: true)
 *
 *   - delay: number (opcional)
 *     Delay entre frames em ms (padrão: 50)
 *
 *   - frames: number (opcional)
 *     Quantidade de frames (padrão: 100)
 *
 *   - pause: number (opcional)
 *     Tempo parado no final em segundos (padrão: 2)
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
    avatarLeft: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    avatarRight: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    nameLeft: 'Tokyo',
    nameRight: 'Vex',
    titleText: 'Melhores Amigos',
    percent: 87,
    textColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    backgroundColor: '#000000',
    snow: true,
    delay: 50,
    frames: 100,
    pause: 2
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/friendgif?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'friend.gif');

(async () => {
    try {
        console.log('🔹 Gerando GIF de amizade...');
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