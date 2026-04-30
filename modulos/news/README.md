# 📰 Módulo News: Vex API

O módulo **News** da Vex API permite a coleta dinâmica de manchetes, notícias e atualizações em tempo real dos principais portais de comunicação do Brasil.

---

## 🚀 Portais Suportados

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **G1 (Globo)** | `/api/news/g1` | Notícias de última hora do portal G1. |
| **Estadão** | `/api/news/estadao` | Manchetes e editoriais do jornal O Estado de S. Paulo. |
| **UOL** | `/api/news/uol` | Notícias gerais e entretenimento do portal UOL. |
| **Poder360** | `/api/news/poder360` | Cobertura política e econômica. |
| **Jovem Pan** | `/api/news/jovempan` | Atualizações de notícias e rádio Jovem Pan. |

---

## 🟦 Parâmetros Globais (News)

Todos os endpoints deste módulo seguem o mesmo padrão de parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Valor 'null' (feed padrão) |

---

## 📁 Scripts Disponíveis

- [g1.js](./g1.js)
- [estadao.js](./estadao.js)
- [uol.js](./uol.js)
- [poder360.js](./poder360.js)
- [jovempan.js](./jovempan.js)

Todos os arquivos já incluem:
- ✔️ Código completo em formato ESM  
- ✔️ Integração direta com a API  
- ✔️ Tratamento de resposta puramente JSON  
- ✔️ Exemplo funcional pronto para execução  

---
