🎮 Módulo Games: Vex API

O módulo Games da Vex API oferece acesso a informações detalhadas de jogadores, estatísticas, conquistas, coleções, badges e diversos outros dados relacionados a jogos populares.

---

🚀 APIs Disponíveis

Nome| Rota| Descrição
Clash Royale| "/api/games/clashroyale"| Consulta informações de jogadores, cartas, badges, conquistas e banners do Clash Royale.

---

🏆 Clash Royale

Retorna informações de um jogador de Clash Royale conforme o tipo de consulta solicitado.

Parâmetros

Parâmetro| Obrigatório| Descrição
"query"| ✅| Tipo da consulta. Valores disponíveis: "geral", "cartas", "badges", "conquistas" ou "banner".
"tag"| ✅| Tag do jogador do Clash Royale.
"apikey"| ✅| Sua chave de autenticação individual para validar o acesso à API.

Tipos de Consulta

Query| Descrição
"geral"| Informações gerais do jogador.
"cartas"| Coleção de cartas do jogador.
"badges"| Badges conquistados pelo jogador.
"conquistas"| Conquistas e marcos alcançados.
"banner"| Informações do banner utilizado pelo jogador.

---

📁 Scripts Disponíveis

- "clashroyale.js" (./clashroyale.js)

Todos os arquivos já incluem:

- ✔️ Código completo em formato ESM
- ✔️ Integração direta com a API
- ✔️ Tratamento de resposta puramente JSON
- ✔️ Exemplo funcional pronto para execução
- ✔️ Sistema de debug opcional
- ✔️ Documentação integrada ao código

---

📚 Documentação

Cada API possui sua própria documentação contendo:

- Parâmetros necessários
- Exemplos de requisição
- Estrutura de resposta
- Observações e limitações
- Exemplo completo em JavaScript (ESM)

---

Desenvolvido por Vex Tech Solutions.