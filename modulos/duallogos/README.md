# 🖼️ Módulo DualLogos: Vex API

O módulo **DualLogos** da Vex API permite a criação de identidades visuais complexas que combinam dois campos de texto em estilos temáticos profissionais (ex: Marca e Slogan).

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Deadpool** | `/api/duallogos/deadpool` | Logo baseada no estilo visual do personagem Deadpool. |
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

**Exemplo de chamada:**

```
GET /api/duallogos/deadpool?apikey=SUA_KEY&query=Vex&text2=API
```

---

## Exemplos:

### 📌 /api/duallogos/marvel

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Primeiro texto da logo |
| text2 | string | 🟢 | Segundo texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/6d16c01e234333f60200.jfif" alt="Preview do estilo Glow Dual" width="400">
</p>

---

### 📌 /api/duallogos/avengers

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Primeiro texto da logo |
| text2 | string | 🟢 | Segundo texto da logo |

---

### 🖼️ Preview

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/41bcaac4687197e95b88.jfif" alt="Preview do estilo Marvel" width="400">
</p>

---

## 📁 Scripts Disponíveis

- [unico.js](./unico.js): Script centralizado para geração de qualquer logo de dois textos via parâmetro de estilo.

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Download automático da imagem  
- ✔️ Exemplo funcional pronto para execução  

---

<p align="center">
  <img src="https://uploader.nazuna.com.br/uploads/templates-api/ede41252219cda5586e8.png" alt="Logo" width="450">
</p>

<h3 align="center">Simples, Poderosa e Feita Para Todos</h3>