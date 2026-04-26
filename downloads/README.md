# 📥 Módulo Downloads: Vex API

O módulo **Downloads** da Vex API fornece endpoints otimizados para extração de mídias de diversas plataformas, retornando links diretos e metadados estruturados.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **YouTube MP3** | `/api/downloads/youtubemp3` | Extrai áudio de vídeos do YouTube. |
| **YouTube MP4** | `/api/downloads/youtubemp4` | Baixa vídeos do YouTube. |
| **Spotify** | `/api/downloads/spotify` | Obtém dados e link de download de músicas. |
| **Facebook** | `/api/downloads/facebook` | Baixa vídeos públicos do Facebook. |
| **Kwai** | `/api/downloads/kwai` | Baixa vídeos da plataforma Kwai. |
| **Pinterest IMG** | `/api/downloads/pinterestimg` | Baixa imagens do Pinterest. |
| **Pinterest MP4** | `/api/downloads/pinterestmp4` | Baixa vídeos do Pinterest. |

---

## 🟦 Parâmetros por Endpoint

### 📌 /api/downloads/youtubemp3

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do vídeo do YouTube |

---

### 📌 /api/downloads/youtubemp4

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do vídeo do YouTube |

---

### 📌 /api/downloads/spotify

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link da música no Spotify |

---

### 📌 /api/downloads/facebook

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do vídeo do Facebook |

---

### 📌 /api/downloads/kwai

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do vídeo do Kwai |

---

### 📌 /api/downloads/pinterestimg

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do pin do Pinterest |

---

### 📌 /api/downloads/pinterestmp4

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Link do vídeo do Pinterest |

---

## 📁 Scripts Disponíveis

Cada endpoint possui um script pronto para uso:

- [facebook.js](./facebook.js)  
- [kwai.js](./kwai.js)  
- [spotify.js](./spotify.js)  
- [youtubemp3.js](./youtubemp3.js)  
- [youtubemp4.js](./youtubemp4.js)  
- [pinterestimg.js](./pinterestIMG.js)  
- [pinterestmp4.js](./pinterestVIDEO.js)  

---

Todos os arquivos já incluem:
- ✔️ Código completo  
- ✔️ Integração com a API  
- ✔️ Logs detalhados para debug  
- ✔️ Exemplo funcional pronto para execução  

---