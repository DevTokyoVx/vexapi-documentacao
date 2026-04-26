# 🖼️ Módulo Logos & Estilização: Vex API

O módulo **Logos** da Vex API fornece ferramentas para a criação de identidades visuais dinâmicas, combinações de emojis e estilização de marcas.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **EmojiMix** | `/api/logos/emojimix` | Combina dois emojis para criar um sticker único (SVG/PNG). |
| **Unico Logo** | `/api/logos/unico` | Gera logotipos estilizados com um único termo e temas variados. |
| **Dual Logo** | `/api/logos/duallogo` | Combina duas marcas ou textos em um design unificado. |

---

## 🛠️ Exemplo de Uso: EmojiMix

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `emoji1` (Required): Primeiro emoji da combinação.
- `emoji2` (Required): Segundo emoji da combinação.

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/logos/emojimix?apikey=SUA_CHAVE&emoji1=😎&emoji2=🔥`;
// Consulte o arquivo emojimix.js nesta pasta para o script completo.
```

---

## 📁 Estrutura de Arquivos
- [emojimix.js](./emojimix.js): Script para fusão dinâmica de emojis.
- [unico.js](./unico.js): Exemplo de geração de logos temáticos singulares.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
