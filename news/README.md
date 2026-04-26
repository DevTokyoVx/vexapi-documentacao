# 📰 Módulo News: Vex API

O módulo **News** da Vex API permite a coleta dinâmica de manchetes, notícias e atualizações de tempo real dos principais portais de comunicação do Brasil.

---

## 🚀 Portais Suportados

| Portal | Endpoint | Descrição |
| :--- | :--- | :--- |
| **G1 (Globo)** | `/api/news/g1` | Notícias de última hora do portal G1. |
| **Estadão** | `/api/news/estadao` | Manchetes e editoriais do jornal O Estado de S. Paulo. |
| **UOL** | `/api/news/uol` | Notícias gerais e entretenimento do portal UOL. |
| **Poder360** | `/api/news/poder360` | Cobertura política e econômica. |
| **Jovem Pan** | `/api/news/jovempan` | Atualizações de notícias e rádio Jovem Pan. |

---

## 🛠️ Exemplo de Uso: G1 News

Este endpoint retorna um JSON contendo as principais notícias com títulos, links e, quando disponível, imagens.

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/news/g1?apikey=SUA_CHAVE`;
// Consulte o arquivo g1.js nesta pasta para o script completo de integração.
```

---

## 📁 Estrutura de Arquivos
- [g1.js](./g1.js): Integração com o portal G1.
- [estadao.js](./estadao.js): Coleta de feeds do Estadão.
- [uol.js](./uol.js): Notícias dinâmicas do UOL.
- [poder360.js](./poder360.js): Jornalismo político e econômico.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
