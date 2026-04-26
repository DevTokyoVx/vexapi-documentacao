# 🎨 Módulo Edits (Filtros & Efeitos): Vex API

O módulo **Edits** da Vex API fornece ferramentas robustas para manipulação de imagem, aplicação de filtros artísticos e efeitos de cultura pop de forma instantânea.

---

## 🚀 Filtros e Efeitos Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Black & White** | `/api/edit/blackwhite` | Aplica um filtro de tons de cinza de alta fidelidade. |
| **Cinema** | `/api/edit/cinema` | Adiciona barras cinematográficas e correção de cor estilo filme. |
| **Desfoque** | `/api/edit/desfoque` | Aplica efeito Gaussian Blur (Bokeh) na imagem enviada. |
| **Jornal** | `/api/edit/jornal` | Transforma a imagem em uma estética de recorte de jornal antigo (Dithering). |
| **Wojak Reaction**| `/api/edit/wojak` | Sobrepõe a imagem em um template clássico de meme Wojak. |

---

## 🛠️ Exemplo de Uso: Cinema Filter

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `url` (Required): URL da imagem a ser editada.

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/edit/cinema?apikey=SUA_CHAVE&url=LINK_DA_IMAGEM`;
// Consulte o arquivo cinema.js nesta pasta para o script completo.
```

---

## 📁 Estrutura de Arquivos
- [blackwhite.js](./blackwhite.js): Filtro para transformar fotos em P&B.
- [cinema.js](./cinema.js): Efeito de tela panorâmica de cinema.
- [desfoque.js](./desfoque.js): Manipulação de profundidade de campo.
- [wojakreaction.js](./wojakreaction.js): Gerador de memes reativos.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
