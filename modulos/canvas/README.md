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
| **welcome4** | `/api/canvas/welcome4` | Gera card de bem-vindo (modelo 04). |
| **welcomecyber** | `/api/canvas/welcomecyber` | Gera um card de boas-vindas no estilo Cyber/Futurista totalmente personalizável. |
| **welcomesocial** | `/api/canvas/welcomesocial` | Gera um card social moderno com informações do usuário e servidor. |

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

### 📌 /api/canvas/welcome4

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso da API |
| query | string | 🟢 | Nome do usuário exibido no card |
| imgperfil | string | ⚪ | URL da foto de perfil |
| nomegrupo | string | ⚪ | Nome do grupo/servidor |
| numerouser | string | ⚪ | Número do usuário |
| darkMode | boolean | ⚪ | `true` = tema escuro, `false` = claro |
| fundoPrincipal | string | ⚪ | Cor do fundo principal |
| faixaEsquerda | string | ⚪ | Cor da faixa lateral esquerda |
| textoPrincipal | string | ⚪ | Cor do nome do grupo |
| textoBoasVindas | string | ⚪ | Cor do texto de boas-vindas |
| linhasDecorativas | string | ⚪ | Cor das linhas decorativas |
| fundoPilula | string | ⚪ | Fundo da caixa do membro |
| textoPilula | string | ⚪ | Cor do texto do membro |
| bordaPilula | string | ⚪ | Cor da borda da caixa do membro |
| fundoCirculoAvatar | string | ⚪ | Cor do círculo do avatar |
| texturaLinhas | string | ⚪ | Cor da textura de linhas |
| corDourada | string | ⚪ | Cor dos detalhes/destaques dourados |
---

### 📌 /api/canvas/welcomecyber

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso da API |
| query | string | 🟢 | Nome do usuário exibido no card cyber |
| imgperfil | string | ⚪ | URL da foto de perfil |
| nomegrupo | string | ⚪ | Nome do grupo/servidor |
| numerouser | string | ⚪ | Número ou ID do usuário |
| fundo | string | ⚪ | Cor do fundo principal |
| grade | string | ⚪ | Cor da grade tecnológica do fundo |
| lateral | string | ⚪ | Cor da lateral geométrica esquerda |
| gradiente1 | string | ⚪ | Primeira cor do gradiente (avatar/detalhes) |
| gradiente2 | string | ⚪ | Segunda cor do gradiente (avatar/detalhes) |
| textoTag | string | ⚪ | Cor do texto superior de identificação |
| textoPrincipal | string | ⚪ | Cor do texto principal de boas-vindas |
| textoSecundario | string | ⚪ | Cor do subtítulo do grupo |
| fundoInfo | string | ⚪ | Fundo da caixa de informações |
| bordaInfo | string | ⚪ | Borda da caixa de informações |
| glowAvatar | string | ⚪ | Cor do efeito glow do avatar |
| anelAvatar2 | string | ⚪ | Segunda cor do anel do avatar |

---

### 📌 /api/canvas/welcomesocial

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| apikey | string | 🟢 | Chave de acesso da API |
| query | string | 🟢 | Nome do usuário exibido no card social |
| imgperfil | string | ⚪ | URL da foto de perfil |
| nomegrupo | string | ⚪ | Nome do grupo/servidor |
| numerouser | string | ⚪ | ID ou número do membro |
| invite | string | ⚪ | Link de convite do servidor (ex: discord.gg/xxxx) |
| serverId | string | ⚪ | ID ou código do servidor |
| fundo | string | ⚪ | Cor do fundo principal |
| grade | string | ⚪ | Cor da grade do fundo |
| lateral | string | ⚪ | Cor da faixa lateral esquerda |
| gradiente1 | string | ⚪ | Primeira cor do gradiente (avatar/detalhes) |
| gradiente2 | string | ⚪ | Segunda cor do gradiente (avatar/detalhes) |
| textoTag | string | ⚪ | Cor do texto superior de identificação |
| textoPrincipal | string | ⚪ | Cor do nome principal do grupo |
| textoSecundario | string | ⚪ | Cor do subtítulo do grupo |
| fundoInfo | string | ⚪ | Cor da caixa de informações |
| bordaInfo | string | ⚪ | Cor da borda da caixa de informações |
| glowAvatar | string | ⚪ | Cor do efeito glow do avatar |
| anelAvatar2 | string | ⚪ | Segunda cor do anel do avatar |

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