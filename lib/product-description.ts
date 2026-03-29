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
    return "para o publico masculino";
  }

  if (normalized === "feminino") {
    return "para o publico feminino";
  }

  if (normalized === "infantil") {
    return "para a linha infantil";
  }

  return "para compor o catalogo da loja";
}

function getCategoryPhrase(category: string) {
  const normalized = category.toLowerCase();

  if (normalized === "blusas") {
    return "com leitura country e caimento pensado para o dia a dia";
  }

  if (normalized === "calcas") {
    return "com modelagem marcante e visual forte para vitrines comerciais";
  }

  if (normalized === "bones") {
    return "com estilo casual e giro rapido no ponto de venda";
  }

  if (normalized === "chapeus") {
    return "com presenca visual e identidade western bem definida";
  }

  if (normalized === "casacos") {
    return "com proposta robusta para meia-estacao e dias mais frios";
  }

  if (normalized === "vestidos") {
    return "com visual feminino e proposta country elegante";
  }

  if (normalized === "cintos") {
    return "para complementar os looks com mais personalidade";
  }

  if (normalized === "pijamas") {
    return "com conforto e estilo para ampliar o mix da loja";
  }

  if (normalized === "acessorios") {
    return "para completar a producao com identidade country";
  }

  return "com visual country e boa leitura comercial";
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
    `${safeName} da ${safeBrand}, um ${safeCategory.toLowerCase()} ${getCategoryPhrase(
      safeCategory
    )} ${getAudiencePhrase(safePrimaryGroup)}.`,
  ];

  if (safeColorName) {
    parts.push(
      `A cor ${safeColorName} reforca a proposta da peca e ajuda a destacar o produto na composicao dos looks.`
    );
  }

  if (formattedSizes) {
    parts.push(
      `Disponivel nos tamanhos ${formattedSizes}, e uma opcao versatil para atender diferentes perfis de cliente com mais facilidade.`
    );
  }

  if (homeSections.length > 0) {
    parts.push(
      "Pode ser usado como destaque em vitrines estrategicas da home para aumentar a visibilidade da categoria."
    );
  }

  return parts.join(" ");
}
