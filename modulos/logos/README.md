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

### 📌 /api/logos/{estilo}

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da logo |

---

## 📁 Scripts Disponíveis

- [emojimix.js](./emojimix.js): Script para fusão dinâmica de emojis.
- [unico.js](./unico.js): Exemplo de geração de logos temáticos singulares.

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem gerada  
- ✔️ Exemplo funcional pronto para execução  

---
