/**
 * ============================================
 * 📡 VEX API - CANVAS / PING
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/canvas/ping
 *
 * 🧠 DESCRIÇÃO:
 *   Gera uma imagem estilo "ping/status", com informações de sistema,
 *   avatar, fundo personalizado e caixas de dados configuráveis.
 *
 * ⚙️ PARÂMETROS:
 *   - fundo: string (obrigatório)
 *     URL da imagem de fundo
 *
 *   - avatar: string (obrigatório)
 *     URL do avatar exibido
 *
 *   - data: string (opcional)
 *     Data exibida (ex: 25/04/2026)
 *
 *   - dia: string (opcional)
 *     Dia da semana (ex: Domingo)
 *
 *   - width: number (opcional)
 *     Largura da imagem (padrão: 1400)
 *
 *   - height: number (opcional)
 *     Altura da imagem (padrão: 750)
 *
 *   - neon: string (opcional)
 *     Cor de destaque em HEX (%2300FF32)
 *
 *   - overlay: string (opcional)
 *     Cor de sobreposição em HEX (%23000000)
 *
 *   - caixaBg: string (opcional)
 *     Cor de fundo das caixas (%23000000)
 *
 *   - avatarSize: number (opcional)
 *     Tamanho do avatar (padrão: 280)
 *
 *   - avatarBorder: number (opcional)
 *     Espessura da borda do avatar (padrão: 10)
 *
 *   - avatarY: number (opcional)
 *     Posição vertical do avatar
 *
 *   - mRaio: number (opcional)
 *     Raio das caixas
 *
 *   - mEspessura: number (opcional)
 *     Espessura das bordas
 *
 *   - c1titulo, c2titulo, c3titulo, c4titulo: string (opcional)
 *     Títulos das caixas
 *
 *   - c1texto, c2texto, c3texto, c4texto: string (opcional)
 *     Conteúdo das caixas
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
    fundo: 'https://i.pinimg.com/736x/bc/31/a0/bc31a0422bb8182c9bc12c759da22140.jpg',
    avatar: 'https://i.pinimg.com/736x/cc/f6/89/ccf689f0c8dd0d85dc9ce74bfc7a86c7.jpg',
    data: '25/04/2026',
    dia: 'Domingo',
    width: 1400,
    height: 750,
    neon: '#00FF32',
    overlay: '#000000',
    caixaBg: '#000000',
    avatarSize: 280,
    avatarBorder: 10,
    avatarY: 240,
    mRaio: 40,
    mEspessura: 12,
    c1titulo: 'LATÊNCIA',
    c1texto: 'Ping: 0.029ms | Latência: 1.70ms',
    c2titulo: 'SISTEMA',
    c2texto: 'CPU: 3.00% | RAM: 8.33 / 19.53 GB',
    c3titulo: 'SERVIDOR',
    c3texto: 'Plataforma: linux | Node: v20.20.0',
    c4titulo: 'STATUS',
    c4texto: 'Comandos: 642 | Uptime: 00d 00h 18m'
};

const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const url = `https://vexapi.com.br/api/canvas/ping?apikey=${apikey}&${queryString}`;

const caminho = path.join(__dirname, 'ping.png');

(async () => {
    try {
        console.log('🔹 Gerando imagem tipo ping...');
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