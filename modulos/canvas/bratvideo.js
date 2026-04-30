/**
 * ============================================
 * 📡 VEX API - CANVAS / BRATSTICKER
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/bratsticker
 *
 * 🧠 DESCRIÇÃO:
 *   Gera stickers animados (WebP) no estilo "Brat", com revelação
 *   progressiva de texto sincronizada com BPM.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Texto que será revelado palavra por palavra no sticker
 *
 *   - bg: string (opcional)
 *     Cor de fundo em HEX (%238ACE00) ou nome (ex: purple)
 *
 *   - text_color: string (opcional)
 *     Cor do texto (ex: black, white, %23000000)
 *
 *   - bpm: number (opcional)
 *     Velocidade da animação em batidas por minuto (padrão: 120)
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📤 RESPOSTA:
 *   Tipo: WEBP (ANIMADO)
 *   A API retorna diretamente o sticker gerado (não há JSON).
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

function baixarSticker(url, destino) {
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
const query = 'Vex API para desenvolvedores';

const url = `https://vexapi.com.br/api/canvas/bratvideo?apikey=${apikey}&query=${encodeURIComponent(query)}`;
const caminho = path.join(__dirname, 'bratsticker.webp');

(async () => {
    try {
        await baixarSticker(url, caminho);
        console.log('✅ Sticker salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - O arquivo é retornado diretamente pela API
 *   - Não há estrutura JSON de resposta
 *   - Pode ser usado como sticker em apps compatíveis com WebP animado
 *   - Parâmetros de cor devem ser URL encoded (%23 para #)
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */