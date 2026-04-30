/**
 * ============================================
 * 📡 VEX API - CANVAS / WELCOME2
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/welcome2
 *
 * 🧠 DESCRIÇÃO:
 *   Gera um cartão de boas-vindas estilizado com avatar,
 *   nome, mensagem personalizada e efeitos visuais.
 *
 * ⚙️ PARÂMETROS:
 *   - avatar: string (obrigatório)
 *     URL da imagem de perfil
 *
 *   - nome: string (opcional)
 *     Nome exibido no cartão
 *
 *   - texto: string (opcional)
 *     Mensagem abaixo do nome
 *
 *   - fundo: string (opcional)
 *     URL da imagem de fundo
 *
 *   - corMoldura: string (opcional)
 *     Cor da borda do avatar em HEX (%23ffffff)
 *
 *   - corLinhas: string (opcional)
 *     Cor das linhas decorativas em HEX (%2300ffff)
 *
 *   - glow: boolean (opcional)
 *     Ativa efeito glow (true/false)
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
    avatar: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    nome: 'Dev Tokyo',
    texto: 'Nazuna Bot ao seu dispor!',
    fundo: 'https://i.pinimg.com/1200x/03/a0/6f/03a06fc163ae2eab7cee95bd77ff1119.jpg',
    corMoldura: '#ffffff',
    corLinhas: '#00ffff',
    glow: true
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/welcome2?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'welcome2_card.png');

(async () => {
    try {
        console.log('🔹 Gerando welcome2...');
        await baixarImagem(url, caminho);
        console.log('✅ Card salvo em:', caminho);
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