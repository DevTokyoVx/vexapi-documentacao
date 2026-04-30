# 🖼️ Módulo DualLogos: Vex API

O módulo **DualLogos** da Vex API permite a criação de identidades visuais complexas que combinam dois campos de texto em estilos temáticos profissionais (ex: Marca e Slogan).

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Deadpool** | `/api/duallogos/deadpool` | Logo baseada no estilo visual do personagem Deadpool. |
| **Glow Dual** | `/api/duallogos/glow` | Logo com efeito de brilho neon em dois textos. |
| **Black Pink** | `/api/duallogos/blackpink` | Estilo inspirado no grupo BlackPink. |
| **Marvel** | `/api/duallogos/marvel` | Estilo clássico dos quadrinhos Marvel. |

> [!TIP]
> Existem diversos outros estilos disponíveis. O script `unico.js` permite testar todos mudando apenas o parâmetro de rota.

---

## 🟦 Parâmetros Globais (DualLogos)

Todos os endpoints deste módulo seguem o mesmo padrão de parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Primeiro texto da logo |
| text2 | string | 🟢 | Segundo texto da logo |

---

## 📁 Scripts Disponíveis

- [unico.js](./unico.js): Script centralizado para geração de qualquer logo de dois textos via parâmetro de estilo.

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem  
- ✔️ Exemplo funcional pronto para execução  

---
