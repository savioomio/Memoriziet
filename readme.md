# Aplicativo de Vocabulário com Repetição Espaçada

Este é um aplicativo móvel desenvolvido com React Native e Expo que ajuda os usuários a aprender e memorizar palavras em inglês usando o método de repetição espaçada, baseado na curva de esquecimento de Ebbinghaus.

## Funcionalidades

- **Aprendizado de palavras**: Apresenta 10 palavras novas por dia para o usuário aprender.
- **Sistema de repetição espaçada**: Calcula automaticamente quando as palavras devem ser revisadas, com base no desempenho do usuário.
- **Armazenamento local**: Todas as palavras e o progresso são armazenados localmente no dispositivo usando SQLite.
- **Notificações**: Lembretes diários para revisar palavras, configuráveis pelo usuário.
- **Estatísticas de progresso**: Acompanhamento do progresso de aprendizado.
- **Funcionalidade offline**: O aplicativo funciona completamente sem conexão com a internet.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Um dispositivo móvel ou emulador para testar o aplicativo

## Instalação

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/vocabulary-app.git
cd vocabulary-app
```

2. Instale as dependências:
```bash
npm install
```

ou se você usa yarn:
```bash
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

4. Abra o aplicativo Expo Go em seu dispositivo móvel e escaneie o QR code exibido no terminal, ou use um emulador.

## Estrutura do Projeto

```
vocabulary-app/
  ├── assets/              # Imagens, fontes
  ├── src/                 # Código fonte
  │   ├── components/      # Componentes reutilizáveis
  │   ├── constants/       # Constantes do app
  │   ├── hooks/           # Custom hooks
  │   ├── navigation/      # Configuração de navegação
  │   ├── screens/         # Telas do aplicativo
  │   ├── services/        # Serviços (armazenamento, notificações)
  │   ├── types/           # Definições de tipos TypeScript
  │   ├── utils/           # Funções utilitárias
  │   └── App.tsx          # Componente App principal
  ├── app.json            # Configuração do Expo
  ├── babel.config.js     # Configuração do Babel
  ├── package.json        # Dependências do projeto
  ├── tsconfig.json       # Configuração do TypeScript
  └── App.tsx             # Ponto de entrada principal
```

## Como Funciona

O aplicativo implementa o algoritmo de repetição espaçada, uma técnica comprovada para memorização eficiente:

1. Quando uma palavra é aprendida pela primeira vez, ela é agendada para revisão no dia seguinte.
2. Se o usuário lembrar da palavra durante a revisão, o intervalo de revisão aumenta (1 dia → 3 dias → 7 dias → 15 dias → 30 dias → etc.).
3. Se o usuário esquecer a palavra, o intervalo é reduzido, e a palavra é agendada para uma revisão mais próxima.

## Personalização

Você pode facilmente personalizar o aplicativo:

- Adicione novas palavras em `src/utils/wordUtils.ts`.
- Modifique os intervalos de revisão em `src/constants/index.ts`.
- Altere o esquema de cores ajustando os estilos em cada componente.

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- SQLite para armazenamento local
- React Navigation para navegação
- Expo Notifications para notificações

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE para obter detalhes.
