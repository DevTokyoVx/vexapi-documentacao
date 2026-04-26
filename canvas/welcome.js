/**
 * ============================================
 * 📡 VEX API - CANVAS / WELCOME
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/welcome
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um cartão de boas-vindas personalizado com banner,
 *   avatar, nome do grupo e informações do usuário.
 *
 * ⚙️ PARÂMETROS:
 *   - textobemvindo: string (obrigatório)
 *     Texto principal exibido no topo
 *
 *   - imgbanner: string (opcional)
 *     URL da imagem de banner
 *
 *   - imgperfil: string (opcional)
 *     URL da imagem de perfil do usuário
 *
 *   - nomegrupo: string (opcional)
 *     Nome do grupo ou servidor
 *
 *   - numerouser: string (opcional)
 *     Identificação ou número do usuário
 *
 *   - cortexto: string (opcional)
 *     Cor do texto em HEX (%23ffffff)
 *
 *   - corretangulo: string (opcional)
 *     Cor do fundo do cartão em HEX
 *
 *   - corborda1: string (opcional)
 *     Cor da borda superior em HEX
 *
 *   - corborda2: string (opcional)
 *     Cor da borda inferior em HEX
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

const params = {
    textobemvindo: 'Vex API',
    imgbanner: 'https://i.pinimg.com/1200x/4b/d3/55/4bd355bd2c2fd3d7d04efa2934814d19.jpg',
    imgperfil: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    nomegrupo: 'DevsLand',
    numerouser: '+55 32 985076326',
    cortexto: '#ffffff',
    corretangulo: '#000000',
    corborda1: '#ffffff',
    corborda2: '#ffffff'
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/welcome?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'welcome_card.png');

(async () => {
    try {
        console.log('🔹 Gerando cartão de boas-vindas...');
        await baixarImagem(url, caminho);
        console.log('✅ Cartão salvo em:', caminho);
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - A imagem é retornada diretamente pela API
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