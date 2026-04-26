# 🎨 Módulo Canvas: Vex API

O módulo **Canvas** da Vex API permite a geração dinâmica de imagens, cartões de boas-vindas, perfis sociais e diversos efeitos visuais editáveis.

---

## 🚀 Endpoints Disponíveis

| Nome | Rota | Descrição |
| :--- | :--- | :--- |
| **Welcome** | `/api/canvas/welcome` | Gera um cartão de boas-vindas completo com banner e perfil. |
| **Discord** | `/api/canvas/discord` | Simula uma mensagem ou perfil no estilo Discord. |
| **Brat** | `/api/canvas/brat` | Gera imagens no estilo da capa do álbum "Brat" (Charli XCX). |
| **Welcome GIF** | `/api/canvas/welcomegif` | Gera uma versão animada de boas-vindas. |
| **Love/Friend GIF** | `/api/canvas/lovegif` | Cria GIFs personalizados de amizade ou amor. |

---

## 🛠️ Exemplo de Uso: Welcome Card

O endpoint `welcome` é ideal para bots de WhatsApp e Discord que desejam saudar novos membros com elegância.

### Parâmetros (QueryParams)
- `apikey` (Required): Sua chave de acesso.
- `textobemvindo`: Texto principal (Ex: "Bem-vindo").
- `imgbanner`: URL da imagem de fundo (1200x).
- `imgperfil`: URL da imagem de avatar do usuário.
- `nomegrupo`: Nome do servidor ou grupo.
- `numerouser`: ID ou número do participante.
- `cortexto`: Cor do texto em Hexadecimal (Ex: `#ffffff`).

### Código em Node.js (Exemplo)
```javascript
const url = `https://vexapi.com.br/api/canvas/welcome?apikey=SUA_CHAVE&textobemvindo=Olá&nomegrupo=Devs`;
// Consulte o arquivo welcome.js nesta pasta para o script completo de download.
```

---

## 📁 Estrutura de Arquivos
- [welcome.js](./welcome.js): Script completo para gerar e salvar o cartão de boas-vindas.
- [brat.js](./brat.js): Exemplo de geração de texto estilizado (Brat).
- [discord.js](./discord.js): Simulação de interface Discord.

---
_Documentação gerada por Vex API Zenith — Precisão e Design._
