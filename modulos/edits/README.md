# 🎨 Módulo Edits (Filtros & Efeitos): Vex API

O módulo **Edits** da Vex API fornece ferramentas robustas para manipulação de imagem, aplicação de filtros artísticos e efeitos de cultura pop de forma instantânea.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Black & White** | `/api/edits/blackwhite` | Aplica um filtro de tons de cinza de alta fidelidade. |
| **Cinema** | `/api/edits/cinema` | Adiciona barras cinematográficas e correção de cor estilo filme. |
| **Desfoque** | `/api/edits/desfoque` | Aplica efeito Gaussian Blur (Bokeh) na imagem enviada. |
| **Jornal** | `/api/edits/jornal` | Transforma a imagem em uma estética de recorte de jornal antigo. |
| **Wojak Reaction**| `/api/edits/wojakreaction` | Sobrepõe a imagem em um template clássico de meme Wojak. |

---

## 🟦 Parâmetros Globais (Edits)

Todos os endpoints deste módulo seguem o mesmo padrão de parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

## 📁 Scripts Disponíveis

- [blackwhite.js](./blackwhite.js)
- [cinema.js](./cinema.js)
- [desfoque.js](./desfoque.js)
- [jornal.js](./jornal.js)
- [wojakreaction.js](./wojakreaction.js)

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem processada  
- ✔️ Exemplo funcional pronto para execução  

---
