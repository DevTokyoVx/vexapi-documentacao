# 🔍 Módulo Pesquisas & Ferramentas: Vex API

O módulo **Pesquisas** da Vex API oferece uma vasta gama de ferramentas para consulta de informações, buscas em plataformas externas e utilitários de dados.

---

## 🚀 Ferramentas de Consulta

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **YouTube Search** | `/api/search/youtube` | Pesquisa vídeos e canais no YouTube. |
| **TikTok Search** | `/api/search/tiktok` | Busca vídeos e metadados do TikTok. |
| **SoundCloud** | `/api/search/soundcloud` | Pesquisa faixas musicais no SoundCloud. |
| **Pinterest Search** | `/api/search/pinterest` | Busca imagens e pins no Pinterest. |
| **Letras de Música** | `/api/search/letra` | Encontra letras de músicas completas. |
| **Significado Nomes** | `/api/search/name` | Consulta a origem e significado de nomes. |
| **Horóscopo** | `/api/search/horoscopo` | Retorna o horóscopo diário para os signos. |
| **Flagpedia** | `/api/search/flag` | Informações sobre bandeiras e países. |
| **Filmes & Info** | `/api/search/filme` | Consulta dados técnicos sobre filmes e séries. |
| **Meme Audios** | `/api/search/audiomeme` | Busca áudios de memes famosos (MP3). |

---

## 🟦 Parâmetros Globais (Pesquisas)

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Termo de pesquisa |

---

## 📁 Scripts Disponíveis

- [youtube.js](./youtube.js)
- [tiktok.js](./tiktok.js)
- [soundcloud.js](./soundcloud.js)
- [pinterest.js](./pinterest.js)
- [letra.js](./letra.js)
- [significatedname.js](./significatedname.js)
- [horoscopo.js](./horoscopo.js)
- [flagpedia.js](./flagpedia.js)
- [filme.js](./filme.js)
- [audiomeme.js](./audiomeme.js)

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Integração direta com a API  
- ✔️ Tratamento de resposta puramente JSON  
- ✔️ Exemplo funcional pronto para execução  

---
