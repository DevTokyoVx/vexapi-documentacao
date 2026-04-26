/**
 * ============================================
 * 📡 VEX API - CANVAS / BRAT
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/brat
 *
 * 🧠 DESCRIÇÃO:
 *   Gera uma imagem estilo "Brat", semelhante ao site bratgenerator,
 *   utilizando o texto fornecido e opções de personalização.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     Texto que será exibido na imagem
 *
 *   - bg: string (opcional)
 *     Cor de fundo em HEX (%238ACE00) ou nome (ex: purple)
 *
 *   - text_color: string (opcional)
 *     Cor do texto (ex: black, white, %23000000)
 *
 *   - blur: number (opcional)
 *     Intensidade do desfoque no texto (padrão: 2)
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
const query = 'Vex API';

const url = `https://vexapi.com.br/api/canvas/brat?apikey=${apikey}&query=${encodeURIComponent(query)}`;
const caminho = path.join(__dirname, 'brat.png');

(async () => {
    try {
        await baixarImagem(url, caminho);
        console.log('✅ Imagem salva em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A imagem é retornada diretamente pela API
 *   - Não há estrutura JSON de resposta
 *   - Parâmetros de cor devem ser URL encoded (%23 para #)
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */