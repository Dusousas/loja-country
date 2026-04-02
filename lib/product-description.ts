type GenerateProductDescriptionInput = {
  brand: string;
  name: string;
  primaryGroup: string;
  category: string;
  colorName: string;
  sizes: string[];
  homeSections?: string[];
};

function cleanValue(value: string) {
  return value.trim();
}

function formatSizes(sizes: string[]) {
  if (sizes.length === 0) {
    return "";
  }

  if (sizes.length === 1) {
    return sizes[0];
  }

  if (sizes.length === 2) {
    return `${sizes[0]} e ${sizes[1]}`;
  }

  return `${sizes.slice(0, -1).join(", ")} e ${sizes[sizes.length - 1]}`;
}

function getAudiencePhrase(primaryGroup: string) {
  const normalized = primaryGroup.toLowerCase();

  if (normalized === "masculino") {
    return "para homens que querem estilo country com personalidade";
  }

  if (normalized === "feminino") {
    return "para mulheres que querem um visual country marcante e elegante";
  }

  if (normalized === "infantil") {
    return "para quem procura conforto e estilo country para a linha infantil";
  }

  return "para quem quer completar o look com autenticidade";
}

function getCategoryPhrase(category: string) {
  const normalized = category.toLowerCase();

  if (normalized === "blusas") {
    return "que oferece um caimento bonito, versatilidade no uso e presenca no visual";
  }

  if (normalized === "calcas") {
    return "que valoriza o caimento no corpo e combina conforto com estilo no dia a dia";
  }

  if (normalized === "bones") {
    return "ideal para proteger do sol e finalizar o look com um toque casual";
  }

  if (normalized === "chapeus") {
    return "perfeito para destacar o visual com personalidade e identidade western";
  }

  if (normalized === "casacos") {
    return "excelente para dias mais frios, trazendo protecao e um visual forte";
  }

  if (normalized === "vestidos") {
    return "que une feminilidade, conforto e um estilo country elegante";
  }

  if (normalized === "cintos") {
    return "que valoriza a producao e deixa o look mais completo";
  }

  if (normalized === "shorts") {
    return "ideal para montar looks leves com conforto e uma leitura country atual";
  }

  if (normalized === "pijamas") {
    return "pensado para oferecer conforto sem abrir mao do estilo";
  }

  if (normalized === "acessorios") {
    return "ideal para complementar a producao com mais estilo";
  }

  return "feito para entregar estilo, conforto e versatilidade";
}

export function generateProductDescription({
  brand,
  name,
  primaryGroup,
  category,
  colorName,
  sizes,
  homeSections = [],
}: GenerateProductDescriptionInput) {
  const safeBrand = cleanValue(brand) || "Marca";
  const safeName = cleanValue(name) || "Produto";
  const safePrimaryGroup = cleanValue(primaryGroup) || "catalogo";
  const safeCategory = cleanValue(category) || "produto";
  const safeColorName = cleanValue(colorName);
  const uniqueSizes = Array.from(
    new Set(sizes.map(cleanValue).filter(Boolean))
  );
  const formattedSizes = formatSizes(uniqueSizes.slice(0, 6));

  const parts = [
    `${safeName} da ${safeBrand} e um ${safeCategory.toLowerCase()} ${getCategoryPhrase(
      safeCategory
    )}, ${getAudiencePhrase(safePrimaryGroup)}.`,
    "E uma peca pensada para quem quer se vestir bem, com conforto e autenticidade em diferentes ocasioes.",
  ];

  if (safeColorName) {
    parts.push(
      `A cor ${safeColorName} ajuda a destacar a peca e facilita combinacoes com outros itens do guarda-roupa.`
    );
  }

  if (formattedSizes) {
    parts.push(
      `Disponivel nos tamanhos ${formattedSizes}, oferece mais praticidade na escolha e melhor ajuste para diferentes perfis de cliente.`
    );
  }

  if (homeSections.length > 0) {
    parts.push(
      "E uma excelente escolha para quem busca uma peca de destaque, com apelo visual forte e proposta comercial atrativa."
    );
  }

  return parts.join(" ");
}
