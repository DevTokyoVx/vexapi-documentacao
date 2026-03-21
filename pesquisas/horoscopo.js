const https = require('https');

/**
 * ============================================
 * 🔎 FUNÇÃO: searchHoroscopo
 * ============================================
 *
 * Faz uma requisição GET para a Vex API
 * e retorna os dados do horóscopo em JSON.
 *
 * @param {string} signo - Nome do signo (ex: touro, aries)
 * @param {string} apikey - Sua API KEY da Vex
 * @returns {Promise<Object>} - Retorna os dados do horóscopo
 */
function searchHoroscopo(signo, apikey) {
    return new Promise((resolve, reject) => {

        // Monta a URL da requisição
        const url = `https://vexapi.com.br/api/pesquisa/horoscopo?apikey=${apikey}&query=${encodeURIComponent(signo)}`;

        https.get(url, (res) => {
            let data = '';

            // Recebe os dados da resposta
            res.on('data', chunk => data += chunk);

            // Final da resposta
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);

                    /**
                     * ============================================
                     * ✅ VALIDAÇÃO DA RESPOSTA
                     * ============================================
                     */
                    if (!json?.status || !json?.result) {
                        return reject(new Error('Resposta inválida da API'));
                    }

                    resolve(json.result);

                } catch (err) {
                    reject(new Error('Erro ao converter resposta para JSON'));
                }
            });

        }).on('error', err => reject(err));
    });
}

/**
 * ============================================
 * 🚀 EXECUÇÃO (EXEMPLO)
 * ============================================
 */
(async () => {
    try {
        const apikey = 'SUA_API_KEY';
        const signo = 'touro';

        // Chama a função
        const h = await searchHoroscopo(signo, apikey);

        /**
         * ============================================
         * 📊 DADOS PRINCIPAIS
         * ============================================
         */
        console.log('\n✅ Horóscopo:');
        console.log('Signo: ', signo);
        console.log('Data: ', h.date);
        console.log('Previsão: ', h.forecast);

        /**
         * ============================================
         * 🔎 INFORMAÇÕES EXTRAS DO SIGNO
         * ============================================
         */
        if (h.signo) {
            console.log('\n🔎 Sobre o signo:');
            console.log('Título: ', h.signo.title);
            console.log('Descrição: ', h.signo.description);
            console.log('Link: ', h.signo.url);
        }

    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
})();