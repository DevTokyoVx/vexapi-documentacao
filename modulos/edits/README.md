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
| **Wojak Reaction** | `/api/edits/wojakreaction` | Sobrepõe a imagem em um template clássico de meme Wojak. |

---

## 🟦 Parâmetros Globais (Edits)

Todos os endpoints deste módulo seguem o mesmo padrão de parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

**Exemplo de chamada:**

```
GET /api/edits/blackwhite?apikey=SUA_KEY&query=https://exemplo.com/imagem.png
```

---

## Exemplos:

### 📌 /api/edits/blackwhite

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/81f8053a1339b563.png" alt="Preview do filtro Black & White" width="400">
</p>

---

### 📌 /api/edits/cinema

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/ce27e7f53fec527e27e9.webp" alt="Preview do efeito Cinema" width="400">
</p>

---

### 📌 /api/edits/desfoque

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/903fce48ba8d56eb.png" alt="Preview do efeito Desfoque" width="400">
</p>

---

### 📌 /api/edits/jornal

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/298100a872d2de6ddab2.webp" alt="Preview do efeito Jornal" width="400">
</p>

---

### 📌 /api/edits/wojakreaction

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/f15e56f23bf287909d41.webp" alt="Preview do efeito Wojak Reaction" width="400">
</p>

---


### 📌 /api/edits/camera

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | URL da imagem que será processada |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/6a5497dd38b5aaf34c1b.webp" alt="Preview do efeito Wojak Reaction" width="400">
</p>

---



## 📁 Scripts Disponíveis

- [blackwhite.js](./blackwhite.js)
- [cinema.js](./cinema.js)
- [desfoque.js](./desfoque.js)
- [jornal.js](./jornal.js)
- [wojakreaction.js](./wojakreaction.js)
- [camera.js](./camera.js)

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem processada  
- ✔️ Exemplo funcional pronto para execução  

---

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/ede41252219cda5586e8.png" alt="Logo" width="450">
</p>

<h3 align="center">Simples, Poderosa e Feita Para Todos</h3>