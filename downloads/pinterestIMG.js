/**
 * ============================================
 * 📥 VEX API - DOWNLOAD / PINTEREST IMG
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/pinterestimg
 *
 * 🧠 DESCRIÇÃO:
 *   Baixa imagens do Pinterest a partir de um link
 *   e retorna os links diretos das mídias.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do pin do Pinterest
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📤 RESPOSTA:
 *   Tipo: JSON
 *
 * 🚀 OBSERVAÇÕES:
 *   - As mídias vêm em `medias[]`
 *   - Pode retornar múltiplas imagens
 *   - DEBUG pode ser ativado
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */

import https from 'https';

// 🔥 DEBUG (true = mostra tudo)
const DEBUG = false;

function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch {
                    reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', reject);
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const pinterestUrl = 'https://www.pinterest.com/pin/24277285503872262/';

const url = `https://vexapi.com.br/api/downloads/pinterestimg?apikey=${apikey}&query=${encodeURIComponent(pinterestUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Buscando imagens do Pinterest...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA:\n');
            console.log(JSON.stringify(dados, null, 2));
        }

        if (dados?.medias?.length) {
            console.log('==============================');
            console.log('🖼️ RESULTADO');
            console.log('==============================\n');

            dados.medias.forEach((media, i) => {
                console.log(`Imagem ${i + 1}:`);
                console.log('Tipo:', media.type);
                console.log('URL:', media.url);
                console.log('-------------------------');
            });

        } else {
            console.log('⚠️ Nenhuma mídia encontrada.');

            if (DEBUG) {
                console.log(dados);
            }
        }

    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();