/**
 * ============================================
 * 📥 VEX API - DOWNLOAD / KWAI
 * ============================================
 *
 * 🔗 ENDPOINT:
 *   /api/downloads/kwai
 *
 * 🧠 DESCRIÇÃO:
 *   Faz o download de vídeos do Kwai a partir de uma URL,
 *   retornando informações completas e link direto da mídia.
 *
 * ⚙️ PARÂMETROS:
 *   - query: string (obrigatório)
 *     URL do vídeo do Kwai
 *
 * 🔑 AUTENTICAÇÃO:
 *   - apikey: string (obrigatório)
 *     Chave de acesso da Vex API
 *
 * 📥 FUNCIONAMENTO DO SCRIPT:
 *   - Envia a URL para a API
 *   - Recebe a resposta em JSON
 *   - (Opcional) Loga tudo em modo debug
 *
 * 📤 SAÍDA:
 *   Dados formatados no console
 *
 * 🚀 OBSERVAÇÕES:
 *   - DEBUG pode ser ativado para ver resposta completa
 *
 * 👨‍💻 CRIADO POR:
 *   Vex Tech Solutions
 *
 * 📅 ATUALIZADO EM:
 *   25/04/2026
 * ============================================
 */

import https from 'https';

// 🔥 CONTROLE DE DEBUG (mude pra true quando quiser ver tudo)
const DEBUG = false;

function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    return resolve(JSON.parse(data));
                } catch {
                    return reject(new Error('Resposta não contém JSON válido'));
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const kwaiUrl = 'https://k.kwai.com/p/x794OPCM';

const url = `https://vexapi.com.br/api/downloads/kwai?apikey=${apikey}&query=${encodeURIComponent(kwaiUrl)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log('🚀 Executando busca na Vex API...\n');

        const dados = await buscarVexAPI(url);

        // 🔥 DEBUG MODE
        if (DEBUG) {
            console.log('📦 RESPOSTA COMPLETA DA API:\n');
            console.log(JSON.stringify(dados, null, 2));
            console.log('\n🔹 Chaves do objeto:', Object.keys(dados));
        }

        if (dados?.resposta) {
            const video = dados.resposta;

            console.log('\n==============================');
            console.log('✅ RESULTADO');
            console.log('==============================');

            console.log('Título:', video.titulo);
            console.log('Descrição:', video.descricao);
            console.log('Thumbnail:', video.thumbnail);
            console.log('Publicado em:', video.publicado);
            console.log('Vídeo:', video.video);
            console.log('Duração:', video.duracao);

            if (video.criador) {
                console.log('\n👤 CRIADOR:');
                console.log('Nome:', video.criador.nome);
                console.log('Usuário:', video.criador.usuario);
                console.log('Perfil:', video.criador.perfil);
            }

        } else {
            console.log('\n⚠️ A API não retornou o campo "resposta".');

            if (DEBUG) {
                console.log('📄 Resposta bruta:', dados);
            }
        }

    } catch (err) {
        console.error('\n❌ ERRO:', err.message);
    }
})();