const https = require('https');

/**
 * Função que faz a requisição para a Vex API e extrai o JSON retornado
 *
 * Observações importantes sobre a Vex API Flagpedia:
 *  - Sempre retorna JSON dentro de um HTML, dentro da tag <pre id="json">
 * Esta função tenta extrair o JSON corretamente e retorna sempre um objeto JS.
 *
 * @param {string} url - URL completa da API, incluindo API key e query
 * @returns {Promise<Object>} - Retorna o objeto JSON da API
 */
function buscarVexAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    // JSON puro
                    if (res.headers['content-type']?.includes('application/json')) {
                        return resolve(JSON.parse(data));
                    }

                    // JSON dentro de HTML (<pre id="json">)
                    if (res.headers['content-type']?.includes('text/html')) {
                        const match = data.match(/<pre[^>]*id=["']json["'][^>]*>([\s\S]*?)<\/pre>/i);
                        if (match) return resolve(JSON.parse(match[1].trim()));

                        // Tenta parsear direto
                        try {
                            return resolve(JSON.parse(data));
                        } catch {
                            return reject(new Error('HTML sem JSON detectado'));
                        }
                    }

                    reject(new Error('Tipo de resposta desconhecido: ' + res.headers['content-type']));
                } catch (err) {
                    reject(err);
                }
            });

        }).on('error', err => reject(err));
    });
}

// ==========================
// CONFIGURAÇÃO
// ==========================

const apikey = '5c9c1d4b-900e-4892-8f2c-24e31a51a614';
const query = 'Brasil';

// URL completa do endpoint Flagpedia
const url = `https://vexapi.com.br/api/pesquisa/flagpedia?apikey=${apikey}&query=${encodeURIComponent(query)}`;

// ==========================
// EXECUÇÃO
// ==========================
(async () => {
    try {
        // Faz a requisição e extrai o JSON da API
        const dados = await buscarVexAPI(url);

        // Log das chaves do objeto retornado
        console.log('🔹 Chaves do objeto JSON retornado:', Object.keys(dados));

        if (dados?.results) {
            const resultado = dados.results;
            const info = resultado.info;

            console.log('✅ Resultado da Flagpedia:');
            console.log('Bandeira: ', resultado.flag_name);                 // Nome da bandeira
            console.log('Imagem da bandeira: ', resultado.image_url);       // URL da imagem da bandeira
            console.log('Descrição: ', resultado.description);              // Descrição histórica
            console.log('Estado soberano: ', info.sovereign_state);         // Sim / Não
            console.log('Códigos do país: ', info.country_codes);           // Códigos ISO
            console.log('Nome oficial: ', info.official_name);              // Nome oficial do país
            console.log('Capital: ', info.capital_city);                    // Capital
            console.log('Continente: ', info.continent);                    // Continente
            console.log('Organizações: ', info.member_of);                  // Membro de quais organizações
            console.log('População: ', info.population);                    // População
            console.log('Área total: ', info.total_area);                   // Área
            console.log('Ponto mais alto: ', info.highest_point);           // Ponto mais alto
            console.log('Ponto mais baixo: ', info.lowest_point);           // Ponto mais baixo
            console.log('PIB per capita: ', info.gdp_per_capita);           // PIB per capita
            console.log('Moeda: ', info.currency);                          // Moeda oficial
            console.log('Código de discagem: ', info.calling_code);         // Código de telefone
            console.log('TLD da internet: ', info.internet_tld);            // Domínio de internet
        } else {
            console.log('⚠️ Nenhum resultado encontrado.');
        }

    } catch (err) {
        console.error('❌ Erro ao buscar na API:', err.message);
    }
})();