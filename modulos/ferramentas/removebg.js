/**
 * ============================================
 * 📡 VEX API - REMOVEBG
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/ferramentas/removebg
 *
 * 🧠 DESCRIÇÃO:
 *   Remove automaticamente o fundo de imagens usando IA.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL da imagem.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: IMAGEM (PNG)
 *   A API retorna diretamente a imagem sem fundo.
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
                return reject(
                    new Error(
                        `Falha ao baixar imagem. Status Code: ${res.statusCode}`
                    )
                );
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

const imagem =
    'https://i.pinimg.com/1200x/0f/21/7d/0f217d0189f841ae794500966ab1845a.jpg';

// URL completa da API
const urlAPI =
    `https://vexapi.com.br/api/ferramentas/removebg?apikey=${apikey}&query=${encodeURIComponent(imagem)}`;

// Caminho para salvar a imagem gerada
const destinoLocal = path.join(__dirname, `removebg.png`);

// ==========================
// EXECUÇÃO
// ==========================

(async () => {

    try {

        console.log('🔹 Removendo fundo da imagem...');

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Imagem salva com sucesso em:', destinoLocal);

    } catch (err) {

        console.error('❌ Erro ao remover fundo:', err.message);

    }

})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A imagem é retornada diretamente pela API.
 *   - O resultado será salvo como PNG transparente.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/05/2026
 * ============================================
 */