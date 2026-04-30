/**
 * ============================================
 * 📡 VEX API - EDITS / BLACKWHITE
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/edits/blackwhite
 *
 * 🧠 DESCRIÇÃO:
 *   Aplica um filtro de tons de cinza de alta fidelidade em uma imagem fornecida.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL da imagem que deseja converter para preto e branco.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: IMAGEM (JPG)
 *   A API retorna diretamente a imagem processada.
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recriando __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Função que baixa uma imagem a partir de uma URL e salva no diretório local.
 *
 * @param {string} url - URL da imagem gerada pela API.
 * @param {string} destino - Caminho local do arquivo.
 * @returns {Promise<void>}
 */
function baixarImagem(url, destino) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Falha ao baixar imagem. Status Code: ${res.statusCode}`));
            }

            const file = fs.createWriteStream(destino);
            res.pipe(file);

            file.on('finish', () => {
                file.close(resolve);
            });

            file.on('error', (err) => {
                fs.unlink(destino, () => reject(err));
            });
        }).on('error', (err) => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const urlImagemOriginal = 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg';

// URL completa da API
const urlAPI = `https://vexapi.com.br/api/edits/blackwhite?apikey=${apikey}&query=${encodeURIComponent(urlImagemOriginal)}`;

// Caminho para salvar a imagem processada
const destinoLocal = path.join(__dirname, 'blackwhite.jpg');

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🔹 Baixando imagem preto e branco da Vex API...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Imagem salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao baixar a imagem:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A imagem é retornada diretamente pela API.
 *   - O tempo de processamento depende do tamanho da imagem original.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */