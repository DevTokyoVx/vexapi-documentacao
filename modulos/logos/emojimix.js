/**
 * ============================================
 * 📡 VEX API - LOGOS / EMOJIMIX
 * ============================================
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado.
 */
async function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } 
                catch (err) { reject(new Error('Resposta não contém JSON válido')); }
            });
        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = 'SUA-API-KEY';
const query = '😃';
const emoji2 = '🔥';

const url = `https://vexapi.com.br/api/logos/emojimix?apikey=${apikey}&emoji=${encodeURIComponent(query)}&emoji2=${encodeURIComponent(emoji2)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        console.log(`🚀 Criando Emojimix: ${query} + ${emoji2}...\n`);
        const dados = await buscarVexAPI(url);

        if (dados?.result?.url) {
            console.log('✅ Emojimix gerado com sucesso!');
            console.log(`Link da imagem: ${dados.result.url}`);
        } else {
            console.log('⚠️ Erro ao gerar o emoji combinado.');
        }
    } catch (err) {
        console.error('❌ ERRO:', err.message);
    }
})();

/**
 * 👨‍💻 CRIADO POR: Vex Tech Solutions
 * 📅 ATUALIZADO EM: 28/04/2026
 * ============================================
 */