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
  'norte': {
    nome: 'Norte',
    fauna: [
      {
        id: 'boto-cor-de-rosa',
        nome: 'Boto-Cor-de-Rosa',
        descricao: 'Golfinho de água doce símbolo da Amazônia',
        modelo: 'boto.glb',
        cor: '#FFB6C1'
      },
      {
        id: 'preguica',
        nome: 'Preguiça',
        descricao: 'Mamífero lento que vive nas árvores da Amazônia',
        modelo: 'preguica.glb',
        cor: '#8B7355'
      }
    ],
    flora: [
      {
        id: 'vitoria-regia',
        nome: 'Vitória-Régia',
        descricao: 'Planta aquática gigante símbolo da Amazônia',
        modelo: 'vitoria-regia.glb',
        cor: '#228B22'
      }
    ],
    festas: [
      {
        id: 'festival-parintins',
        nome: 'Festival de Parintins',
        descricao: 'Maior festa folclórica do Norte',
        modelo: 'boi-bumba.glb',
        cor: '#FF0000'
      }
    ],
    comidas: [
      {
        id: 'tacaca',
        nome: 'Tacacá',
        descricao: 'Sopa quente feita com tucupi e jambu',
        modelo: 'tacaca.glb',
        cor: '#FFA500'
      },
      {
        id: 'acai',
        nome: 'Açaí',
        descricao: 'Fruto típico amazônico energético',
        modelo: 'acai.glb',
        cor: '#4B0082'
      }
    ]
  },
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
  },
  'centro-oeste': {
    nome: 'Centro-Oeste',
    fauna: [
      {
        id: 'onca-pintada',
        nome: 'Onça-Pintada',
        descricao: 'Maior felino das Américas, símbolo do Pantanal',
        modelo: 'onca.glb',
        cor: '#DAA520'
      },
      {
        id: 'capivara',
        nome: 'Capivara',
        descricao: 'Maior roedor do mundo, comum no Pantanal',
        modelo: 'capivara.glb',
        cor: '#8B6914'
      }
    ],
    flora: [
      {
        id: 'ipê-amarelo',
        nome: 'Ipê-Amarelo',
        descricao: 'Árvore símbolo do Cerrado com flores amarelas',
        modelo: 'ipe.glb',
        cor: '#FFD700'
      },
      {
        id: 'pequi',
        nome: 'Pequizeiro',
        descricao: 'Árvore típica do Cerrado que produz pequi',
        modelo: 'pequi.glb',
        cor: '#FFA500'
      }
    ],
    festas: [
      {
        id: 'rodeio',
        nome: 'Rodeio',
        descricao: 'Festa tradicional da cultura sertaneja',
        modelo: 'rodeio.glb',
        cor: '#8B4513'
      }
    ],
    comidas: [
      {
        id: 'arroz-pequi',
        nome: 'Arroz com Pequi',
        descricao: 'Prato típico goiano com fruto do Cerrado',
        modelo: 'arroz-pequi.glb',
        cor: '#FFD700'
      },
      {
        id: 'pamonha',
        nome: 'Pamonha',
        descricao: 'Iguaria de milho verde típica do Centro-Oeste',
        modelo: 'pamonha.glb',
        cor: '#F0E68C'
      }
    ]
  },
  'sul': {
    nome: 'Sul',
    fauna: [
      {
        id: 'pinguim-magalhanico',
        nome: 'Pinguim-de-Magalhães',
        descricao: 'Pinguim que visita o litoral sul do Brasil',
        modelo: 'pinguim.glb',
        cor: '#000000'
      },
      {
        id: 'gralha-azul',
        nome: 'Gralha-Azul',
        descricao: 'Ave símbolo do Paraná',
        modelo: 'gralha.glb',
        cor: '#4169E1'
      }
    ],
    flora: [
      {
        id: 'araucaria',
        nome: 'Araucária',
        descricao: 'Pinheiro-do-paraná, árvore símbolo do Sul',
        modelo: 'araucaria.glb',
        cor: '#2F4F4F'
      }
    ],
    festas: [
      {
        id: 'oktoberfest',
        nome: 'Oktoberfest',
        descricao: 'Maior festa alemã da América Latina',
        modelo: 'chopp.glb',
        cor: '#FFD700'
      }
    ],
    comidas: [
      {
        id: 'churrasco',
        nome: 'Churrasco Gaúcho',
        descricao: 'Tradicional carne assada do Rio Grande do Sul',
        modelo: 'churrasco.glb',
        cor: '#8B4513'
      },
      {
        id: 'pinhao',
        nome: 'Pinhão',
        descricao: 'Semente da araucária, típica do Sul',
        modelo: 'pinhao.glb',
        cor: '#8B7355'
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