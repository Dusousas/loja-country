export type CategorySlug =
  | "masculino"
  | "feminino"
  | "infantil"
  | "acessorios"
  | "blusas"
  | "bones"
  | "calcas"
  | "casacos"
  | "chapeus"
  | "cintos"
  | "pijamas"
  | "vestidos";

export type Product = {
  slug: string;
  brand: string;
  name: string;
  cardTitle: string;
  image: string;
  gallery: string[];
  originalPrice: string;
  price: string;
  pixPrice: string;
  pixLabel: string;
  installments: string;
  sizes: string[];
  color: {
    name: string;
    swatch: string;
  };
  categoryTrail: string[];
  description: string;
  navGroups: CategorySlug[];
  category: string;
};

export type CategoryDefinition = {
  slug: CategorySlug;
  label: string;
  title: string;
  description: string;
};

export const categoryDefinitions: CategoryDefinition[] = [
  {
    slug: "masculino",
    label: "Masculino",
    title: "Masculino",
    description:
      "Selecao masculina com modelagens country, pecas de vitrine e produtos pensados para venda rapida.",
  },
  {
    slug: "feminino",
    label: "Feminino",
    title: "Feminino",
    description:
      "Pecas femininas com identidade western, variedade de categorias e leitura comercial para o catalogo.",
  },
  {
    slug: "infantil",
    label: "Infantil",
    title: "Infantil",
    description:
      "Modelos infantis com visual country, conforto e boa rotacao para apresentar no catalogo.",
  },
  {
    slug: "acessorios",
    label: "Acessorios",
    title: "Acessorios",
    description:
      "Acessorios para complementar o look country com estilo, praticidade e identidade visual forte.",
  },
  {
    slug: "blusas",
    label: "Blusas",
    title: "Blusas",
    description:
      "Blusas e camisas com leitura western para publico feminino, masculino e infantil.",
  },
  {
    slug: "bones",
    label: "Bones",
    title: "Bones",
    description:
      "Selecao de bones para compor o mix casual do catalogo com pecas de giro rapido.",
  },
  {
    slug: "calcas",
    label: "Calcas",
    title: "Calcas",
    description:
      "Calcas com modelagem country e visual forte para vitrines femininas e masculinas.",
  },
  {
    slug: "casacos",
    label: "Casacos",
    title: "Casacos",
    description:
      "Casacos e jaquetas para montar uma categoria completa com pecas de meia-estacao e inverno.",
  },
  {
    slug: "chapeus",
    label: "Chapeus",
    title: "Chapeus",
    description:
      "Chapeus com presenca visual e acabamento country para reforcar a categoria de acessorios.",
  },
  {
    slug: "cintos",
    label: "Cintos",
    title: "Cintos",
    description:
      "Cintos e modelos com fivelas de destaque para elevar o ticket medio dos looks.",
  },
  {
    slug: "pijamas",
    label: "Pijamas",
    title: "Pijamas",
    description:
      "Linha de pijamas com conforto e um toque country para ampliar o mix do catalogo.",
  },
  {
    slug: "vestidos",
    label: "Vestidos",
    title: "Vestidos",
    description:
      "Vestidos com leitura country feminina para compor uma categoria mais completa e atrativa.",
  },
];

function productGallery() {
  return ["/img-teste.jpg", "/img-teste.jpg", "/img-teste.jpg", "/img-teste.jpg"];
}

export const products: Product[] = [
  {
    slug: "calca-feminina-carpinteira-amaciada",
    brand: "Tex Team",
    name: "Calca Feminina Carpinteira Amaciada",
    cardTitle: "Calca Feminina Carpinteira Amaciada",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$189,90",
    price: "R$170,43",
    pixPrice: "R$161,91",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["34", "36", "38", "40"],
    color: { name: "Jeans Azul", swatch: "#4f73a6" },
    categoryTrail: ["Inicio", "Feminino", "Calcas", "Tex Team"],
    description:
      "Calca country com caimento marcante e leitura comercial para compor vitrines femininas com mais presenca.",
    navGroups: ["feminino", "calcas"],
    category: "Calcas",
  },
  {
    slug: "calca-feminina-preta-bordada",
    brand: "Tex Team",
    name: "Calca Feminina Preta Bordada",
    cardTitle: "Calca Feminina Preta Bordada",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$189,90",
    price: "R$170,43",
    pixPrice: "R$161,91",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["34", "36", "38", "40"],
    color: { name: "Preta", swatch: "#262626" },
    categoryTrail: ["Inicio", "Feminino", "Calcas", "Tex Team"],
    description:
      "Modelo com leitura mais intensa e acabamento bordado para uma apresentacao premium do catalogo.",
    navGroups: ["feminino", "calcas"],
    category: "Calcas",
  },
  {
    slug: "camisa-masculina-country-petroleo",
    brand: "Os Vaqueiros",
    name: "Camisa Masculina Country Petroleo",
    cardTitle: "Camisa Masculina Country Petroleo",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$239,90",
    price: "R$215,91",
    pixPrice: "R$205,11",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["P", "M", "G", "GG"],
    color: { name: "Petroleo", swatch: "#163d52" },
    categoryTrail: ["Inicio", "Masculino", "Blusas", "Os Vaqueiros"],
    description:
      "Camisa de visual western para reforcar a categoria masculina com uma peca de forte apelo comercial.",
    navGroups: ["masculino", "blusas"],
    category: "Blusas",
  },
  {
    slug: "camisa-feminina-bordada-vinho",
    brand: "Radade",
    name: "Camisa Feminina Bordada Vinho",
    cardTitle: "Camisa Feminina Bordada Vinho",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$219,90",
    price: "R$197,91",
    pixPrice: "R$188,01",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["P", "M", "G", "GG"],
    color: { name: "Vinho", swatch: "#7b2333" },
    categoryTrail: ["Inicio", "Feminino", "Blusas", "Radade"],
    description:
      "Camisa feminina com bordado e leitura elegante para uma vitrine mais rica e coerente com o estilo da loja.",
    navGroups: ["feminino", "blusas"],
    category: "Blusas",
  },
  {
    slug: "bone-western-marinho",
    brand: "Country City",
    name: "Bone Western Marinho",
    cardTitle: "Bone Western Marinho",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$89,90",
    price: "R$80,91",
    pixPrice: "R$76,86",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["Unico"],
    color: { name: "Marinho", swatch: "#16365f" },
    categoryTrail: ["Inicio", "Acessorios", "Bones", "Country City"],
    description:
      "Bone com visual casual country para ampliar o mix de acessorios com um item de giro rapido.",
    navGroups: ["acessorios", "bones", "masculino"],
    category: "Bones",
  },
  {
    slug: "chapeu-classico-caqui",
    brand: "8 Segundos",
    name: "Chapeu Classico Caqui",
    cardTitle: "Chapeu Classico Caqui",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$179,90",
    price: "R$161,91",
    pixPrice: "R$153,81",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["56", "58", "60"],
    color: { name: "Caqui", swatch: "#b7976a" },
    categoryTrail: ["Inicio", "Acessorios", "Chapeus", "8 Segundos"],
    description:
      "Chapeu de presenca forte para enriquecer a categoria de acessorios com uma linguagem country bem clara.",
    navGroups: ["acessorios", "chapeus", "masculino"],
    category: "Chapeus",
  },
  {
    slug: "bota-feminina-caramelo",
    brand: "Goyazes",
    name: "Bota Feminina Caramelo",
    cardTitle: "Bota Feminina Caramelo",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$799,90",
    price: "R$719,91",
    pixPrice: "R$683,91",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["34", "35", "36", "37", "38"],
    color: { name: "Caramelo", swatch: "#8b5a34" },
    categoryTrail: ["Inicio", "Feminino", "Acessorios", "Goyazes"],
    description:
      "Modelo de forte impacto visual para o mix feminino, com linguagem western e valor percebido mais alto.",
    navGroups: ["feminino", "acessorios"],
    category: "Acessorios",
  },
  {
    slug: "casaco-masculino-western-tabaco",
    brand: "Power Country",
    name: "Casaco Masculino Western Tabaco",
    cardTitle: "Casaco Masculino Western Tabaco",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$359,90",
    price: "R$323,91",
    pixPrice: "R$307,71",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["P", "M", "G", "GG"],
    color: { name: "Tabaco", swatch: "#6b4428" },
    categoryTrail: ["Inicio", "Masculino", "Casacos", "Power Country"],
    description:
      "Casaco com visual robusto para reforcar o mix masculino e ampliar as opcoes de meia-estacao da loja.",
    navGroups: ["masculino", "casacos"],
    category: "Casacos",
  },
  {
    slug: "cinto-western-cafe",
    brand: "Power Country",
    name: "Cinto Western Cafe",
    cardTitle: "Cinto Western Cafe",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$149,90",
    price: "R$134,91",
    pixPrice: "R$128,16",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["90", "95", "100", "105"],
    color: { name: "Cafe", swatch: "#6a4628" },
    categoryTrail: ["Inicio", "Acessorios", "Cintos", "Power Country"],
    description:
      "Cinto com fivela de destaque para elevar o ticket medio dos looks e completar a categoria de acessorios.",
    navGroups: ["acessorios", "cintos", "masculino"],
    category: "Cintos",
  },
  {
    slug: "pijama-feminino-country-rosa",
    brand: "Just",
    name: "Pijama Feminino Country Rosa",
    cardTitle: "Pijama Feminino Country Rosa",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$129,90",
    price: "R$116,91",
    pixPrice: "R$111,06",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["P", "M", "G"],
    color: { name: "Rosa", swatch: "#e981ab" },
    categoryTrail: ["Inicio", "Feminino", "Pijamas", "Just"],
    description:
      "Pijama com visual leve para completar o mix da loja com uma categoria complementar e comercial.",
    navGroups: ["feminino", "pijamas"],
    category: "Pijamas",
  },
  {
    slug: "vestido-country-floral-terracota",
    brand: "Radade",
    name: "Vestido Country Floral Terracota",
    cardTitle: "Vestido Country Floral Terracota",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$249,90",
    price: "R$224,91",
    pixPrice: "R$213,66",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["P", "M", "G"],
    color: { name: "Terracota", swatch: "#b65e4c" },
    categoryTrail: ["Inicio", "Feminino", "Vestidos", "Radade"],
    description:
      "Vestido com leitura feminina e country para deixar a categoria mais completa e visualmente equilibrada.",
    navGroups: ["feminino", "vestidos"],
    category: "Vestidos",
  },
  {
    slug: "camiseta-infantil-classic-rosa",
    brand: "Just",
    name: "Camiseta Infantil Classic Rosa",
    cardTitle: "Camiseta Infantil Classic Rosa",
    image: "/img-teste.jpg",
    gallery: productGallery(),
    originalPrice: "R$89,90",
    price: "R$80,91",
    pixPrice: "R$76,86",
    pixLabel: "5% OFF a vista no Pix",
    installments: "Parcelamento em ate 12x com juros",
    sizes: ["4", "6", "8", "10"],
    color: { name: "Rosa", swatch: "#ef7aa8" },
    categoryTrail: ["Inicio", "Infantil", "Blusas", "Just"],
    description:
      "Peca infantil com visual country e boa leitura comercial para fortalecer a categoria infantil.",
    navGroups: ["infantil", "blusas"],
    category: "Blusas",
  },
];

export const promotionProducts = products.slice(0, 4);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function getProductsForCategory(slug: CategorySlug) {
  return products.filter((product) => product.navGroups.includes(slug));
}
