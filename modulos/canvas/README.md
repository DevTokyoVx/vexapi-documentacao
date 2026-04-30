# 🎨 Módulo Canvas: Vex API

O módulo **Canvas** da Vex API permite a geração dinâmica de imagens, cartões de boas-vindas, perfis sociais e diversos efeitos visuais editáveis.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Welcome** | `/api/canvas/welcome` | Gera um cartão de boas-vindas completo com banner e perfil. |
| **Welcome2** | `/api/canvas/welcome2` | Versão estilizada de boas-vindas com efeitos visuais. |
| **Welcome GIF** | `/api/canvas/welcomegif` | Gera um GIF animado de boas-vindas. |
| **Brat** | `/api/canvas/brat` | Gera imagem estilo "Brat". |
| **Brat Video** | `/api/canvas/bratvideo` | Gera GIF animado estilo Brat. |
| **Discord Profile** | `/api/canvas/discordprofile` | Gera cartão de perfil estilo Discord. |
| **Friend GIF** | `/api/canvas/friendgif` | Gera GIF de amizade personalizado. |
| **Love GIF** | `/api/canvas/lovegif` | Gera GIF de amor personalizado. |
| **Ping** | `/api/canvas/ping` | Gera painel de status estilo ping. |

---

## 🟦 Parâmetros por Endpoint

### 📌 /api/canvas/welcome

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| textobemvindo | string | 🟢 | Texto principal |
| imgbanner | string | ⚪ | URL do banner |
| imgperfil | string | ⚪ | URL do avatar |
| nomegrupo | string | ⚪ | Nome do grupo |
| numerouser | string | ⚪ | Identificação do usuário |
| cortexto | string | ⚪ | Cor do texto (HEX) |
| corretangulo | string | ⚪ | Cor do fundo |
| corborda1 | string | ⚪ | Borda superior |
| corborda2 | string | ⚪ | Borda inferior |

---

### 📌 /api/canvas/welcome2

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| avatar | string | 🟢 | URL do avatar |
| nome | string | ⚪ | Nome exibido |
| texto | string | ⚪ | Mensagem |
| fundo | string | ⚪ | URL do fundo |
| corMoldura | string | ⚪ | Cor da moldura |
| corLinhas | string | ⚪ | Cor das linhas |
| glow | boolean | ⚪ | Ativar efeito glow |

---

### 📌 /api/canvas/welcomegif

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| avatarUrl | string | 🟢 | URL do avatar |
| gifUrl | string | ⚪ | GIF de fundo |
| welcomeText | string | ⚪ | Texto principal |
| subText | string | ⚪ | Texto secundário |
| delay | number | ⚪ | Velocidade |
| textColor | string | ⚪ | Cor do texto |

---

### 📌 /api/canvas/brat

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto da imagem |
| bg | string | ⚪ | Cor de fundo |
| text_color | string | ⚪ | Cor do texto |
| blur | number | ⚪ | Intensidade do blur |

---

### 📌 /api/canvas/bratvideo

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| query | string | 🟢 | Texto do GIF |

---

### 📌 /api/canvas/discordprofile

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| username | string | 🟢 | Nome do usuário |
| avatar | string | 🟢 | URL do avatar |
| discriminator | string | ⚪ | Tag (#0000) |
| banner | string | ⚪ | Banner |
| aboutme | string | ⚪ | Sobre mim |
| status | string | ⚪ | online, idle, dnd, offline |
| membersince | string | ⚪ | Data de criação |
| servermembersince | string | ⚪ | Entrada no servidor |

---

### 📌 /api/canvas/friendgif

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| avatarLeft | string | 🟢 | Avatar esquerda |
| avatarRight | string | 🟢 | Avatar direita |
| nameLeft | string | ⚪ | Nome esquerda |
| nameRight | string | ⚪ | Nome direita |
| titleText | string | ⚪ | Título |
| percent | number | ⚪ | Percentual |
| textColor | string | ⚪ | Cor texto |
| borderColor | string | ⚪ | Cor borda |
| backgroundColor | string | ⚪ | Cor fundo |

---

### 📌 /api/canvas/lovegif

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| user1 | string | ⚪ | Avatar 1 |
| user2 | string | ⚪ | Avatar 2 |
| bgGif | string | ⚪ | GIF de fundo |
| percent | number | ⚪ | Compatibilidade |
| frames | number | ⚪ | Frames |
| color | string | ⚪ | Cor principal |
| textColor | string | ⚪ | Cor do texto |

---

### 📌 /api/canvas/ping

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso |
| fundo | string | 🟢 | Fundo |
| avatar | string | 🟢 | Avatar |
| data | string | ⚪ | Data |
| dia | string | ⚪ | Dia |
| width | number | ⚪ | Largura |
| height | number | ⚪ | Altura |
| neon | string | ⚪ | Cor destaque |

---

## 📁 Scripts Disponíveis

Cada endpoint possui um script pronto para uso:

- [welcome.js](./welcome.js)  
- [welcome2.js](./welcome2.js)  
- [welcomegif.js](./welcomegif.js)  
- [brat.js](./brat.js)  
- [bratvideo.js](./bratvideo.js)  
- [discordprofile.js](./discordprofile.js)  
- [friendgif.js](./friendgif.js)  
- [lovegif.js](./lovegif.js)  
- [ping.js](./ping.js)  


Todos os arquivos já incluem:
- ✔️ Código completo  
- ✔️ Download automático da mídia  
- ✔️ Exemplo funcional pronto para execução  

---