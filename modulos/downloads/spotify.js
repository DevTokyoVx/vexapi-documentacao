/**
 * ============================================
 * 📡 VEX API - DOWNLOADS / SPOTIFY
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/spotify
 *
 * 🧠 DESCRIÇÃO:
 *   Obtém informações detalhadas de músicas do Spotify
 *   e link direto para download em MP3.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL da música no Spotify.
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API.
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *   Retorna metadados da música e link direto para download.
 *
 * 💡 EXEMPLO DE USO:
 */

import https from 'https';



// 🔥 DEBUG (true = mostra tudo)
const DEBUG = false;

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado.
 *
 * @param {string} url - URL completa da API.
 * @returns {Promise<Object>} - Retorna o objeto JSON da API.
 */
async function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const spotifyUrl = 'https://open.spotify.com/track/0mscBkMFduxGFsFEhTv7du';

const url = `https://vexapi.com.br/api/downloads/spotify?apikey=${apikey}&query=${encodeURIComponent(spotifyUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando dados do Spotify...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.resposta?.data) {
            const track = dados.resposta.data;
            const download = dados.resposta.download;

            const artista = track.artists?.map(a => a.name).join(', ');
            const thumb = track.album?.images?.[0]?.url;

            console.log('==============================');
            console.log('🎵 INFORMAÇÕES DA MÚSICA');
            console.log('==============================');

            console.log('Nome:', track.name);
            console.log('Artista(s):', artista);
            console.log('Duração (ms):', track.duration_ms);
            console.log('Explícito:', track.explicit);
            console.log('Thumbnail:', thumb);
            console.log('Spotify:', track.external_urls?.spotify);

            console.log('\n📥 DOWNLOAD:');
            console.log(download);

        } else {
            console.log('⚠️ Nenhum resultado encontrado.');

            if (DEBUG) {
                console.log(dados);
            }
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 🚀 OBSERVAÇÕES:
 *   - Suporta links de faixas individuais.
 *   - O download é fornecido em formato MP3.
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   28/04/2026
 * ============================================
 */
