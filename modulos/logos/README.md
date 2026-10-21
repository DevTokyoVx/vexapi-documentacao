# 🖼️ Módulo Logos & Estilização: Vex API

O módulo **Logos** da Vex API fornece ferramentas para a criação de identidades visuais dinâmicas, combinações de emojis e estilização de marcas com um único termo.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **EmojiMix** | `/api/logos/emojimix` | Combina dois emojis para criar um sticker único (PNG). |
| **Unico Logo** | `/api/logos/{estilo}` | Gera logotipos estilizados (techstyle, amongus, neon, etc). |

---

## 🟦 Parâmetros por Endpoint

### 📌 /api/logos/emojimix

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Primeiro emoji |
| emoji2 | string | 🟢 | Segundo emoji |
---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/9f36415a931e79e1.png" alt="Preview do Welcome Card" width="400">
</p>

---

### 📌 /api/logos/{estilo}

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

## Exemplos:


### 📌 /api/logos/amongus

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/16c8fdd2a7eb6d0c16d2.png" alt="Preview do Welcome Card" width="400">
</p>

---

### 📌 /api/logos/blood

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/eece561a43f29538654c.jfif" alt="Preview do Welcome Card" width="400">
</p>

---

### 📌 /api/logos/summerbeach

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/1d2e6e63c028c31d5d34.jfif" alt="Preview do Welcome Card" width="400">
</p>

---


### 📌 /api/logos/firework

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/32bf4bc1e0a0ea874b2f.jfif" alt="Preview do Welcome Card" width="400">
</p>

---


## 📁 Scripts Disponíveis

- [emojimix.js](./emojimix.js): Script para fusão dinâmica de emojis.
- [unico.js](./unico.js): Exemplo de geração de logos temáticos singulares.

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem gerada  
- ✔️ Exemplo funcional pronto para execução  

---

<p align="center">
  <img src="http://uploader.nazuna.com.br/uploads/templates-api/ede41252219cda5586e8.png" alt="Logo" width="450">
</p>

<h3 align="center">Simples, Poderosa e Feita Para Todos</h3>

