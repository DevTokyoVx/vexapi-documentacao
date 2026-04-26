# 🔍 Módulo Pesquisas & Ferramentas: Vex API

O módulo **Pesquisas** da Vex API oferece uma vasta gama de ferramentas para consulta de informações, buscas em plataformas externas e utilitários de dados.

---

## 🚀 Ferramentas de Consulta

| Ferramenta | Endpoint | Descrição |
| :--- | :--- | :--- |
| **YouTube Search** | `/api/search/youtube` | Pesquisa vídeos e canais no YouTube. |
| **Pinterest Search** | `/api/search/pinterest` | Busca imagens e pins no Pinterest. |
| **Letras de Música** | `/api/search/letra` | Encontra letras de músicas completas. |
| **Significado Nomes** | `/api/search/name` | Consulta a origem e significado de nomes próprios. |
| **Horóscopo** | `/api/search/horoscopo` | Retorna o horóscopo diário para os signos. |
| **Flagpedia** | `/api/search/flag` | Informações detalhadas sobre bandeiras e países. |
| **Filmes & Info** | `/api/search/filme` | Consulta dados técnicos sobre filmes e séries. |

---

## 🛠️ Exemplo de Uso: Pinterest Search

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `query` (Required): O termo que deseja pesquisar.

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/search/pinterest?apikey=SUA_CHAVE&query=Caminhões`;
// Consulte o arquivo pinterest.js nesta pasta para o script completo.
```

---

## 📁 Estrutura de Arquivos
- [youtube.js](./youtube.js): Script de pesquisa de vídeos.
- [letra.js](./letra.js): Consulta de letras musicais.
- [flagpedia.js](./flagpedia.js): Informações geográficas e visuais sobre países.
- [horoscopo.js](./horoscopo.js): Previsões diárias por signo.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
