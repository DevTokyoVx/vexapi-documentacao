# 📥 Módulo Downloads: Vex API

O módulo **Downloads** da Vex API fornece endpoints otimizados para a coleta de mídias de diversas redes sociais e plataformas de streaming.

---

## 🚀 Plataformas Suportadas

| Serviço | Endpoint | Descrição |
| :--- | :--- | :--- |
| **TikTok** | `/api/download/tiktok` | Baixa vídeos do TikTok sem marca d'água. |
| **YouTube MP3** | `/api/download/youtubemp3` | Extrai o áudio de vídeos do YouTube. |
| **YouTube MP4** | `/api/download/youtubemp4` | Baixa vídeos do YouTube em alta qualidade. |
| **Spotify** | `/api/download/spotify` | Coleta faixas e metadados do Spotify. |
| **Instagram** | `/api/download/instagram` | Baixa Reels, Fotos e Carrosséis (Consulte pesquisas/instagram.js). |
| **Kwai** | `/api/download/kwai` | Baixa vídeos da plataforma Kwai. |
| **Facebook** | `/api/download/facebook` | Faz download de vídeos públicos do Facebook. |

---

## 🛠️ Exemplo de Uso: TikTok Downloader

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `url` (Required): Link do vídeo que deseja baixar.

### Código em Node.js (Exemplo)
```javascript
const urlAPI = `https://vexapi.com.br/api/download/tiktok?apikey=SUA_CHAVE&url=LINK_DO_VIDEO`;
// Consulte o arquivo tiktok.js nesta pasta para o script completo de integração.
```

---

## 📁 Estrutura de Arquivos
- [tiktok.js](./tiktok.js): Script para download de vídeos sem marca d'água.
- [youtubemp3.js](./youtubemp3.js): Exemplo de conversão de vídeo para áudio.
- [spotify.js](./spotify.js): Coleta de metadados e download de faixas.
- [kwai.js](./kwai.js): Integração com a plataforma Kwai.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
