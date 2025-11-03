export interface Item {
  id: string;
  nome: string;
  descricao: string;
  modelo: string;
  cor: string;
}

export interface Region {
  nome: string;
  fauna: Item[];
  flora: Item[];
  festas: Item[];
  comidas: Item[];
}

export interface RegionsData {
  [key: string]: Region;
}

export const regionsData: RegionsData = {
  'nordeste': {
    nome: 'Nordeste',
    fauna: [
      {
        id: 'arara-azul',
        nome: 'Arara Azul',
        descricao: 'Ave símbolo do Pantanal, também encontrada no Nordeste',
        modelo: 'arara.glb',
        cor: '#0066CC'
      },
      {
        id: 'siri',
        nome: 'Siri',
        descricao: 'Crustáceo comum nas praias nordestinas',
        modelo: 'siri.glb',
        cor: '#FF6B35'
      }
    ],
    flora: [
      {
        id: 'mandacaru',
        nome: 'Mandacaru',
        descricao: 'Cacto típico da caatinga nordestina',
        modelo: 'mandacaru.glb',
        cor: '#2D5016'
      },
      {
        id: 'coqueiro',
        nome: 'Coqueiro',
        descricao: 'Palmeira símbolo das praias do Nordeste',
        modelo: 'coqueiro.glb',
        cor: '#8B4513'
      }
    ],
    festas: [
      {
        id: 'sao-joao',
        nome: 'São João',
        descricao: 'Maior festa junina do Brasil',
        modelo: 'fogueira.glb',
        cor: '#FF4500'
      }
    ],
    comidas: [
      {
        id: 'acaraje',
        nome: 'Acarajé',
        descricao: 'Bolinho de feijão fradinho frito no azeite de dendê',
        modelo: 'acaraje.glb',
        cor: '#DAA520'
      }
    ]
  },
  'sudeste': {
    nome: 'Sudeste',
    fauna: [
      {
        id: 'mico-leao',
        nome: 'Mico-Leão-Dourado',
        descricao: 'Primata endêmico da Mata Atlântica',
        modelo: 'mico.glb',
        cor: '#FFD700'
      }
    ],
    flora: [
      {
        id: 'pau-brasil',
        nome: 'Pau-Brasil',
        descricao: 'Árvore que deu nome ao país',
        modelo: 'pau-brasil.glb',
        cor: '#8B0000'
      }
    ],
    festas: [
      {
        id: 'carnaval-rio',
        nome: 'Carnaval do Rio',
        descricao: 'A maior festa popular do Brasil',
        modelo: 'mascara.glb',
        cor: '#FF1493'
      }
    ],
    comidas: [
      {
        id: 'feijoada',
        nome: 'Feijoada',
        descricao: 'Prato típico brasileiro com feijão preto',
        modelo: 'feijoada.glb',
        cor: '#2F1B13'
      }
    ]
  }
};

export interface Category {
  id: keyof Omit<Region, 'nome'>;
  nome: string;
  icon: string;
  cor: string;
}

export const categories: Category[] = [
  { id: 'fauna', nome: 'Fauna', icon: '🦜', cor: '#4CAF50' },
  { id: 'flora', nome: 'Flora', icon: '🌳', cor: '#8BC34A' },
  { id: 'festas', nome: 'Festas', icon: '🎉', cor: '#FF9800' },
  { id: 'comidas', nome: 'Comidas', icon: '🍽️', cor: '#F44336' }
];