# 🖼️ Módulo DualLogos: Vex API

O módulo **DualLogos** da Vex API permite a criação de identidades visuais complexas que combinam dois campos de texto em estilos temáticos profissionais.

---

## 🚀 Endpoints e Estilos

Diferente do módulo de logos simples, o **DualLogos** exige dois parâmetros de busca para compor o design.

| Nome/Estilo | Rota | Descrição |
| :--- | :--- | :--- |
| **Deadpool** | `/api/duallogos/deadpool` | Logo baseada no estilo visual do personagem Deadpool. |
| **Custom Dual** | `/api/duallogos/{estilo}`| Diversos outros estilos que suportam dois textos simultâneos. |

---

## 🛠️ Exemplo de Uso: Dual Text Logo

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `query` (Required): O primeiro texto (Ex: Marca).
- `text2` (Required): O segundo texto (Ex: Slogan ou Subtítulo).

### Código em Node.js (Exemplo)
```javascript
const estilo = 'deadpool';
const urlAPI = `https://vexapi.com.br/api/duallogos/${estilo}?apikey=SUA_CHAVE&query=Vex&text2=Solutions`;
// Consulte o arquivo unico.js nesta pasta para o script completo.
```

---

## 📁 Estrutura de Arquivos
- [unico.js](./unico.js): Script centralizado para geração de qualquer logo de dois textos via parâmetro de estilo.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
