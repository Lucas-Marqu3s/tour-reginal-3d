# Brasil Tour

Uma aplicação mobile interativa que permite explorar a cultura brasileira através de QR Codes e Realidade Aumentada (AR).

## Objetivo da Aplicação

O **Brasil Tour** tem como objetivo proporcionar uma experiência educativa e imersiva sobre a diversidade cultural e natural das cinco regiões do Brasil (Norte, Nordeste, Sudeste, Sul e Centro-Oeste). Através da leitura de QR Codes, os usuários podem explorar elementos característicos de cada região em quatro categorias:

- **Fauna**: Animais típicos de cada região
- **Flora**: Plantas e vegetação características
- **Festas**: Manifestações culturais e festividades tradicionais
- **Comidas**: Pratos típicos da culinária regional

A aplicação utiliza tecnologia de Realidade Aumentada para exibir modelos 3D interativos, permitindo que os usuários visualizem os elementos culturais de forma imersiva e educativa.

## Tecnologias e Bibliotecas Utilizadas

### Framework Base
- **React Native** (0.81.5): Framework para desenvolvimento mobile multiplataforma
- **React** (19.1.0): Biblioteca JavaScript para interfaces de usuário
- **Expo** (~54.0.20): Plataforma para desenvolvimento React Native

### Navegação e Roteamento
- **Expo Router** (~6.0.13): Sistema de roteamento baseado em arquivos
- **React Navigation** (^7.1.8): Navegação entre telas
- **@react-navigation/bottom-tabs** (^7.4.0): Navegação por abas
- **@react-navigation/elements** (^2.6.3): Elementos de UI da navegação

### Câmera e QR Code
- **expo-camera** (^17.0.8): Acesso à câmera do dispositivo para escanear QR Codes e AR

### Realidade Aumentada e 3D
- **Three.js** (^0.166.1): Biblioteca JavaScript para gráficos 3D
- **expo-three** (^8.0.0): Integração entre Expo e Three.js
- **expo-gl** (^16.0.7): Renderização gráfica com WebGL
- **three-stdlib** (^2.36.1): Utilitários padrão para Three.js

### UI/UX
- **expo-image** (~3.0.10): Componente otimizado de imagens
- **@expo/vector-icons** (^15.0.3): Biblioteca de ícones
- **expo-symbols** (~1.0.7): Símbolos SF para iOS
- **expo-splash-screen** (~31.0.10): Tela de splash personalizada
- **expo-status-bar** (~3.0.8): Controle da barra de status
- **expo-system-ui** (~6.0.8): Controle da UI do sistema
- **expo-haptics** (~15.0.7): Feedback tátil

### Animações
- **react-native-reanimated** (~4.1.1): Biblioteca de animações de alta performance
- **react-native-gesture-handler** (~2.28.0): Gestos nativos
- **react-native-worklets** (0.5.1): Runtime JavaScript paralelo

### Outras Funcionalidades
- **expo-asset** (^12.0.9): Gerenciamento de assets
- **expo-constants** (~18.0.10): Constantes da aplicação
- **expo-file-system** (~19.0.17): Acesso ao sistema de arquivos
- **expo-font** (~14.0.9): Carregamento de fontes customizadas
- **expo-linking** (~8.0.8): Deep linking
- **expo-web-browser** (~15.0.8): Abertura de navegador web
- **react-native-safe-area-context** (~5.6.0): Áreas seguras da tela
- **react-native-screens** (~4.16.0): Otimização de navegação
- **react-native-web** (~0.21.0): Suporte web

### Desenvolvimento
- **TypeScript** (~5.9.2): Tipagem estática
- **@types/react** (~19.1.0): Tipos para React
- **@types/three** (^0.181.0): Tipos para Three.js
- **ESLint** (^9.25.0): Linter de código
- **eslint-config-expo** (~10.0.0): Configuração ESLint para Expo

## Estrutura do Projeto

```
tour-regional-3d/
├── app/                          # Telas da aplicação (File-based routing)
│   ├── (tabs)/                   # Navegação por abas
│   │   ├── explore.tsx           # Tela de exploração
│   │   └── _layout.tsx           # Layout das abas
│   ├── category/                 # Categoria de região
│   │   └── [regionId]/[categoryId].tsx
│   ├── region/                   # Detalhes de região
│   │   └── [id].tsx              # Tela dinâmica de região
│   ├── category.tsx              # Lista de categorias
│   ├── index.tsx                 # Tela inicial (Home)
│   ├── region.tsx                # Tela de região
│   ├── scan.tsx                  # Scanner de QR Code
│   ├── viewer.tsx                # Visualizador AR 3D
│   ├── modal.tsx                 # Modal genérico
│   └── _layout.tsx               # Layout raiz
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # Componentes de UI
│   │   ├── collapsible.tsx       # Componente colapsável
│   │   └── icon-symbol.tsx       # Ícones do sistema
│   ├── ar-viewer.tsx             # Visualizador de Realidade Aumentada
│   ├── qr-scanner.tsx            # Scanner de QR Code
│   ├── three-viewer.tsx          # Renderizador Three.js
│   ├── themed-text.tsx           # Texto com tema
│   ├── themed-view.tsx           # View com tema
│   ├── parallax-scroll-view.tsx  # ScrollView com parallax
│   ├── hello-wave.tsx            # Animação de aceno
│   ├── haptic-tab.tsx            # Tab com feedback háptico
│   └── external-link.tsx         # Link externo
├── constants/                    # Constantes e dados
│   ├── regions.ts                # Dados das regiões do Brasil
│   └── theme.ts                  # Configurações de tema
├── hooks/                        # Hooks customizados
│   ├── use-theme-color.ts        # Hook de cores do tema
│   ├── use-color-scheme.ts       # Hook de esquema de cores
│   └── use-color-scheme.web.ts   # Hook específico web
├── assets/                       # Imagens e recursos
│   └── images/                   # Imagens da aplicação
├── app.json                      # Configuração Expo
├── package.json                  # Dependências do projeto
└── tsconfig.json                 # Configuração TypeScript
```

## Principais Funcionalidades

### 1. Escaneamento de QR Code (`scan.tsx`)
- Utiliza a câmera para escanear QR Codes
- Valida se o código corresponde a uma região cadastrada
- Redireciona para a tela da região correspondente

### 2. Navegação por Regiões (`region.tsx`)
- Exibe as 5 regiões do Brasil (Norte, Nordeste, Sudeste, Sul, Centro-Oeste)
- Cada região possui 4 categorias: Fauna, Flora, Festas e Comidas
- Mostra a quantidade de itens disponíveis em cada categoria

### 3. Visualização de Categorias (`category.tsx`)
- Lista os itens específicos de cada categoria por região
- Exibe nome, descrição e permite acesso ao visualizador AR

### 4. Realidade Aumentada (`viewer.tsx` + `ar-viewer.tsx`)
- Renderiza modelos 3D sobre a câmera em tempo real
- Utiliza Three.js para renderização WebGL
- Suporta modelos no formato GLB
- Exibe informações detalhadas sobre cada elemento

### 5. Gerenciamento de Dados (`constants/regions.ts`)
- Banco de dados estruturado com informações de todas as regiões
- Interface TypeScript para tipagem segura
- Contém aproximadamente 30+ itens culturais catalogados

## Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo físico ou emulador Android/iOS

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na Web
npm run web
```

### Build para Produção

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios
```

## Permissões Necessárias

### Android
- `CAMERA`: Acesso à câmera para QR Code e AR
- `RECORD_AUDIO`: Gravação de áudio (se necessário)

### iOS
- `NSCameraUsageDescription`: Acesso à câmera para realidade aumentada

## Arquitetura de Dados

### Interface de Item
```typescript
interface Item {
  id: string;          // Identificador único
  nome: string;        // Nome do item
  descricao: string;   // Descrição detalhada
  modelo: string;      // Caminho do modelo 3D (.glb)
  cor: string;         // Cor em hexadecimal
}
```

### Interface de Região
```typescript
interface Region {
  nome: string;        // Nome da região
  fauna: Item[];       // Animais típicos
  flora: Item[];       // Plantas típicas
  festas: Item[];      // Festas tradicionais
  comidas: Item[];     // Comidas típicas
}
```

## Temas e Personalização

A aplicação suporta temas claro e escuro automaticamente, adaptando-se às preferências do sistema operacional do usuário através dos hooks:
- `useColorScheme()`: Detecta o tema do sistema
- `useThemeColor()`: Retorna cores baseadas no tema atual

## Configurações do Expo

- **Nova Arquitetura**: Habilitada (`newArchEnabled: true`)
- **React Compiler**: Habilitado para melhor performance
- **Typed Routes**: Rotas tipadas para TypeScript
- **Edge-to-Edge**: Interface imersiva no Android

## Plataformas Suportadas

- ✅ Android
- ✅ iOS
- ✅ Web (com limitações de AR)

## Experiências Futuras

O projeto está configurado com:
- Typed Routes para navegação tipada
- React Compiler para otimização automática
- Nova Arquitetura React Native para melhor performance

## Autor

Desenvolvido por Lucas Marques (@lucasmarqu3s)

## Licença

Este é um projeto educacional desenvolvido para a Facens.

---

**Versão**: 1.0.0
**Última Atualização**: Novembro 2025
