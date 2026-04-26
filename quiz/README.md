# 🎮 Módulo Quiz & Entretenimento: Vex API

O módulo **Quiz** da Vex API fornece ferramentas para a criação de jogos interativos, desafios de conhecimento e dinâmicas sociais para bots e plataformas comunitárias.

---

## 🚀 Funcionalidades Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Questions (Trivia)** | `/api/quiz/questions` | Retorna perguntas de múltipla escolha com categorias e níveis de dificuldade. |
| **Quiz Dinâmico** | `/api/quiz/index` | Motor principal para sorteio de perguntas para jogos em tempo real. |

---

## 🛠️ Exemplo de Uso: Trivia Bot

Este endpoint é ideal para criar sistemas de rankings e competições de conhecimento em grupos.

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `category`: (Optional) Categoria específica (Ex: `geografia`, `ciência`).

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/quiz/questions?apikey=SUA_CHAVE`;
// Consulte o arquivo index.js nesta pasta para o script de base.
```

---

## 📁 Estrutura de Arquivos
- [index.js](./index.js): Exemplo de consumo da API de Quiz para bots.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
