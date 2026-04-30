/**
 * ============================================
 * 📡 VEX API - LOGOS / UNICO
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/logos/{estilo}
 *
 * 🧠 DESCRIÇÃO:
 *   Gera logotipos estilizados com um único termo, oferecendo mais de 30 temas variados.
 *
 * ⚙️ PARÂMETROS:
 *   - estilo: string (na rota)
 *     O estilo visual desejado (ex: techstyle, amongus, neon).
 *
 *   - query: string (obrigatório)
 *     O texto que aparecerá no logotipo.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: IMAGEM (PNG)
 *   A API retorna diretamente a imagem gerada.
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
const textoLogo = 'Vex api';
const estiloLogo = 'techstyle';

// URL completa da API
const urlAPI = `https://vexapi.com.br/api/logos/${estiloLogo}?apikey=${apikey}&query=${encodeURIComponent(textoLogo)}`;

// Caminho para salvar a imagem gerada
const destinoLocal = path.join(__dirname, `${estiloLogo}.png`);

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🔹 Baixando logo "${textoLogo}" no estilo "${estiloLogo}"...`);

        await baixarImagem(urlAPI, destinoLocal);

        console.log('✅ Logo salva com sucesso em:', destinoLocal);
    } catch (err) {
        console.error('❌ Erro ao baixar a logo:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A imagem é retornada diretamente pela API.
 *   - Altere a variável `estiloLogo` para testar diferentes designs.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
