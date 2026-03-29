import type { PoolClient } from "pg";
import { getDbPool } from "@/lib/db";
import {
  calculatePixPrice,
  defaultInstallmentsLabel,
  defaultPixLabel,
} from "@/lib/product-pricing";

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

export type HomeSection = "promocoes" | "chapeus" | "infantil";

export type AdminProduct = Product & {
  id: number;
  homeSections: HomeSection[];
  createdAt: string;
  updatedAt: string;
};

export type AdminDashboardSummary = {
  totalProducts: number;
  showcaseCounts: Record<HomeSection, number>;
};

export type AdminProductCatalogResult = {
  products: AdminProduct[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  query: string;
};

export type CategoryDefinition = {
  slug: CategorySlug;
  label: string;
  title: string;
  description: string;
};

export type ProductFormInput = {
  brand: string;
  name: string;
  cardTitle?: string;
  slug?: string;
  image: string;
  gallery?: string[];
  originalPrice: string;
  price: string;
  pixPrice?: string;
  pixLabel?: string;
  installments?: string;
  sizes: string[];
  colorName: string;
  colorSwatch: string;
  primaryGroup: CategorySlug;
  categorySlug: CategorySlug;
  description: string;
  homeSections?: HomeSection[];
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

export const panelPrimaryCategoryOptions = categoryDefinitions.filter((category) =>
  ["masculino", "feminino", "infantil", "acessorios"].includes(category.slug)
);

export const panelProductCategoryOptions = categoryDefinitions.filter((category) =>
  [
    "acessorios",
    "blusas",
    "bones",
    "calcas",
    "casacos",
    "chapeus",
    "cintos",
    "pijamas",
    "vestidos",
  ].includes(category.slug)
);

function productGallery() {
  return ["/img-teste.jpg", "/img-teste.jpg", "/img-teste.jpg", "/img-teste.jpg"];
}

export const defaultProducts: Product[] = [
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

export const products = defaultProducts;
export const promotionProducts = defaultProducts.slice(0, 4);

const homeSectionColumns = {
  promocoes: {
    flag: "show_in_promocoes",
    date: "featured_promocoes_at",
  },
  chapeus: {
    flag: "show_in_chapeus",
    date: "featured_chapeus_at",
  },
  infantil: {
    flag: "show_in_infantil",
    date: "featured_infantil_at",
  },
} satisfies Record<HomeSection, { flag: string; date: string }>;

let databaseReadyPromise: Promise<void> | null = null;

function normalizeText(value: string) {
  return value.trim();
}

function normalizeSearchTerm(value: string) {
  return normalizeText(value).slice(0, 120);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueValues<T>(values: T[]) {
  return Array.from(new Set(values));
}

function sanitizeSwatch(value: string) {
  const normalized = normalizeText(value);
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : "#171717";
}

function getCategoryLabel(slug: CategorySlug) {
  return (
    categoryDefinitions.find((category) => category.slug === slug)?.label ?? slug
  );
}

function getSeedHomeSections(product: Product, index: number): HomeSection[] {
  const sections = new Set<HomeSection>();

  if (index < 4) {
    sections.add("promocoes");
  }

  if (product.navGroups.includes("chapeus")) {
    sections.add("chapeus");
  }

  if (product.navGroups.includes("infantil")) {
    sections.add("infantil");
  }

  return Array.from(sections);
}

function parseJsonArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    slug: String(row.slug),
    brand: String(row.brand),
    name: String(row.name),
    cardTitle: String(row.card_title),
    image: String(row.image),
    gallery: parseJsonArray(row.gallery),
    originalPrice: String(row.original_price),
    price: String(row.price),
    pixPrice: String(row.pix_price),
    pixLabel: String(row.pix_label),
    installments: String(row.installments),
    sizes: parseJsonArray(row.sizes),
    color: {
      name: String(row.color_name),
      swatch: String(row.color_swatch),
    },
    categoryTrail: parseJsonArray(row.category_trail),
    description: String(row.description),
    navGroups: parseJsonArray(row.nav_groups) as CategorySlug[],
    category: String(row.category),
  };
}

function rowToAdminProduct(row: Record<string, unknown>): AdminProduct {
  const homeSections = (Object.entries(homeSectionColumns) as Array<
    [HomeSection, { flag: string; date: string }]
  >)
    .filter(([, columns]) => Boolean(row[columns.flag]))
    .map(([section]) => section);

  return {
    id: Number(row.id),
    ...rowToProduct(row),
    homeSections,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

async function pruneHomeSection(client: PoolClient, section: HomeSection) {
  const columns = homeSectionColumns[section];

  await client.query(
    `
      WITH ranked AS (
        SELECT id, ROW_NUMBER() OVER (
          ORDER BY ${columns.date} DESC NULLS LAST, updated_at DESC, id DESC
        ) AS row_number
        FROM products
        WHERE ${columns.flag} = true
      )
      UPDATE products
      SET ${columns.flag} = false,
          ${columns.date} = NULL,
          updated_at = NOW()
      FROM ranked
      WHERE products.id = ranked.id
        AND ranked.row_number > 4
    `
  );
}

async function ensureDatabaseReady() {
  if (!databaseReadyPromise) {
    databaseReadyPromise = (async () => {
      const pool = getDbPool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          brand TEXT NOT NULL,
          name TEXT NOT NULL,
          card_title TEXT NOT NULL,
          image TEXT NOT NULL,
          gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
          original_price TEXT NOT NULL,
          price TEXT NOT NULL,
          pix_price TEXT NOT NULL,
          pix_label TEXT NOT NULL,
          installments TEXT NOT NULL,
          sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
          color_name TEXT NOT NULL,
          color_swatch TEXT NOT NULL,
          category_trail JSONB NOT NULL DEFAULT '[]'::jsonb,
          description TEXT NOT NULL,
          nav_groups JSONB NOT NULL DEFAULT '[]'::jsonb,
          category TEXT NOT NULL,
          show_in_promocoes BOOLEAN NOT NULL DEFAULT false,
          featured_promocoes_at TIMESTAMPTZ,
          show_in_chapeus BOOLEAN NOT NULL DEFAULT false,
          featured_chapeus_at TIMESTAMPTZ,
          show_in_infantil BOOLEAN NOT NULL DEFAULT false,
          featured_infantil_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      const countResult = await pool.query<{ total: string }>(
        "SELECT COUNT(*)::text AS total FROM products"
      );

      if (countResult.rows[0]?.total !== "0") {
        return;
      }

      for (const [index, product] of defaultProducts.entries()) {
        const homeSections = getSeedHomeSections(product, index);

        await pool.query(
          `
            INSERT INTO products (
              slug,
              brand,
              name,
              card_title,
              image,
              gallery,
              original_price,
              price,
              pix_price,
              pix_label,
              installments,
              sizes,
              color_name,
              color_swatch,
              category_trail,
              description,
              nav_groups,
              category,
              show_in_promocoes,
              featured_promocoes_at,
              show_in_chapeus,
              featured_chapeus_at,
              show_in_infantil,
              featured_infantil_at
            )
            VALUES (
              $1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10, $11, $12::jsonb,
              $13, $14, $15::jsonb, $16, $17::jsonb, $18, $19, $20, $21, $22, $23, $24
            )
          `,
          [
            product.slug,
            product.brand,
            product.name,
            product.cardTitle,
            product.image,
            JSON.stringify(product.gallery),
            product.originalPrice,
            product.price,
            product.pixPrice,
            product.pixLabel,
            product.installments,
            JSON.stringify(product.sizes),
            product.color.name,
            product.color.swatch,
            JSON.stringify(product.categoryTrail),
            product.description,
            JSON.stringify(product.navGroups),
            product.category,
            homeSections.includes("promocoes"),
            homeSections.includes("promocoes") ? new Date() : null,
            homeSections.includes("chapeus"),
            homeSections.includes("chapeus") ? new Date() : null,
            homeSections.includes("infantil"),
            homeSections.includes("infantil") ? new Date() : null,
          ]
        );
      }
    })();
  }

  return databaseReadyPromise;
}

async function queryProducts<T>(callback: (client: PoolClient) => Promise<T>) {
  await ensureDatabaseReady();
  const client = await getDbPool().connect();

  try {
    return await callback(client);
  } finally {
    client.release();
  }
}

export async function getAdminProducts() {
  return queryProducts(async (client) => {
    const result = await client.query("SELECT * FROM products ORDER BY created_at DESC, id DESC");
    return result.rows.map((row) => rowToAdminProduct(row));
  });
}

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummary> {
  return queryProducts(async (client) => {
    const result = await client.query<{
      total_products: string;
      promocoes_count: string;
      chapeus_count: string;
      infantil_count: string;
    }>(`
      SELECT
        COUNT(*)::text AS total_products,
        COUNT(*) FILTER (WHERE show_in_promocoes = true)::text AS promocoes_count,
        COUNT(*) FILTER (WHERE show_in_chapeus = true)::text AS chapeus_count,
        COUNT(*) FILTER (WHERE show_in_infantil = true)::text AS infantil_count
      FROM products
    `);

    const row = result.rows[0];

    return {
      totalProducts: Number(row?.total_products ?? "0"),
      showcaseCounts: {
        promocoes: Number(row?.promocoes_count ?? "0"),
        chapeus: Number(row?.chapeus_count ?? "0"),
        infantil: Number(row?.infantil_count ?? "0"),
      },
    };
  });
}

export async function getAdminProductCatalog(options?: {
  page?: number;
  pageSize?: number;
  query?: string;
}): Promise<AdminProductCatalogResult> {
  return queryProducts(async (client) => {
    const requestedPageSize = Math.trunc(options?.pageSize ?? 8);
    const pageSize = Math.min(Math.max(requestedPageSize || 8, 1), 24);
    const query = normalizeSearchTerm(options?.query ?? "");
    const searchTerm = query ? `%${query}%` : "";
    const filters: string[] = [];
    const values: string[] = [];

    if (query) {
      values.push(searchTerm);
      const placeholder = `$${values.length}`;
      filters.push(
        `(
          name ILIKE ${placeholder}
          OR brand ILIKE ${placeholder}
          OR slug ILIKE ${placeholder}
          OR category ILIKE ${placeholder}
        )`
      );
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
    const countResult = await client.query<{ total: string }>(
      `SELECT COUNT(*)::text AS total FROM products ${whereClause}`,
      values
    );

    const totalCount = Number(countResult.rows[0]?.total ?? "0");
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const requestedPage = Math.max(Math.trunc(options?.page ?? 1) || 1, 1);
    const page = Math.min(requestedPage, totalPages);
    const offset = (page - 1) * pageSize;

    const dataValues = [...values, String(pageSize), String(offset)];
    const limitPlaceholder = `$${dataValues.length - 1}`;
    const offsetPlaceholder = `$${dataValues.length}`;
    const result = await client.query(
      `
        SELECT *
        FROM products
        ${whereClause}
        ORDER BY created_at DESC, id DESC
        LIMIT ${limitPlaceholder}::int
        OFFSET ${offsetPlaceholder}::int
      `,
      dataValues
    );

    return {
      products: result.rows.map((row) => rowToAdminProduct(row)),
      page,
      pageSize,
      totalCount,
      totalPages,
      query,
    };
  });
}

export async function getAllProducts() {
  return queryProducts(async (client) => {
    const result = await client.query("SELECT * FROM products ORDER BY created_at DESC, id DESC");
    return result.rows.map((row) => rowToProduct(row));
  });
}

export async function getHomeFeaturedProducts(section: HomeSection) {
  return queryProducts(async (client) => {
    const columns = homeSectionColumns[section];
    const result = await client.query(
      `
        SELECT *
        FROM products
        WHERE ${columns.flag} = true
        ORDER BY ${columns.date} DESC NULLS LAST, updated_at DESC, id DESC
        LIMIT 4
      `
    );

    return result.rows.map((row) => rowToProduct(row));
  });
}

export async function getProductBySlug(slug: string) {
  return queryProducts(async (client) => {
    const result = await client.query("SELECT * FROM products WHERE slug = $1 LIMIT 1", [slug]);
    return result.rows[0] ? rowToProduct(result.rows[0]) : undefined;
  });
}

export function getCategoryBySlug(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export async function getProductsForCategory(slug: CategorySlug) {
  return queryProducts(async (client) => {
    const result = await client.query(
      "SELECT * FROM products WHERE nav_groups @> $1::jsonb ORDER BY created_at DESC, id DESC",
      [JSON.stringify([slug])]
    );

    return result.rows.map((row) => rowToProduct(row));
  });
}

export async function createProduct(input: ProductFormInput) {
  const brand = normalizeText(input.brand);
  const name = normalizeText(input.name);
  const slug = slugify(input.slug || name);
  const image = normalizeText(input.image);
  const description = normalizeText(input.description);
  const sizes = input.sizes.map(normalizeText).filter(Boolean);
  const gallery = (input.gallery ?? []).map(normalizeText).filter(Boolean);
  const homeSections = input.homeSections ?? [];

  if (!brand || !name || !slug || !image || !description) {
    throw new Error("Preencha os campos principais do produto.");
  }

  if (sizes.length === 0) {
    throw new Error("Informe pelo menos um tamanho.");
  }

  const primaryGroup = input.primaryGroup;
  const categorySlug = input.categorySlug;

  if (
    !panelPrimaryCategoryOptions.some((category) => category.slug === primaryGroup)
  ) {
    throw new Error("Categoria principal invalida.");
  }

  if (
    !panelProductCategoryOptions.some((category) => category.slug === categorySlug)
  ) {
    throw new Error("Categoria do produto invalida.");
  }

  const productCategoryLabel = getCategoryLabel(categorySlug);
  const primaryCategoryLabel = getCategoryLabel(primaryGroup);

  return queryProducts(async (client) => {
    const existing = await client.query("SELECT id FROM products WHERE slug = $1 LIMIT 1", [slug]);

    if (existing.rowCount) {
      throw new Error("Ja existe um produto com esse slug.");
    }

    const cardTitle = normalizeText(input.cardTitle || name);
    const originalPrice = normalizeText(input.originalPrice);
    const price = normalizeText(input.price);
    const pixPrice = normalizeText(input.pixPrice || calculatePixPrice(price));
    const pixLabel = defaultPixLabel;
    const installments = defaultInstallmentsLabel;
    const colorName = normalizeText(input.colorName);
    const colorSwatch = sanitizeSwatch(input.colorSwatch);
    const navGroups = uniqueValues([primaryGroup, categorySlug]);
    const categoryTrail = ["Inicio", primaryCategoryLabel, productCategoryLabel, brand];
    const finalGallery = gallery.length > 0 ? uniqueValues([image, ...gallery]) : [image, image, image, image];

    if (!originalPrice || !price || !pixPrice) {
      throw new Error("Informe os valores do produto para calcular o Pix.");
    }

    const result = await client.query(
      `
        INSERT INTO products (
          slug,
          brand,
          name,
          card_title,
          image,
          gallery,
          original_price,
          price,
          pix_price,
          pix_label,
          installments,
          sizes,
          color_name,
          color_swatch,
          category_trail,
          description,
          nav_groups,
          category,
          show_in_promocoes,
          featured_promocoes_at,
          show_in_chapeus,
          featured_chapeus_at,
          show_in_infantil,
          featured_infantil_at,
          created_at,
          updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10, $11, $12::jsonb,
          $13, $14, $15::jsonb, $16, $17::jsonb, $18, $19, $20, $21, $22, $23, $24, NOW(), NOW()
        )
        RETURNING *
      `,
      [
        slug,
        brand,
        name,
        cardTitle,
        image,
        JSON.stringify(finalGallery),
        originalPrice,
        price,
        pixPrice,
        pixLabel,
        installments,
        JSON.stringify(sizes),
        colorName,
        colorSwatch,
        JSON.stringify(categoryTrail),
        description,
        JSON.stringify(navGroups),
        productCategoryLabel,
        homeSections.includes("promocoes"),
        homeSections.includes("promocoes") ? new Date() : null,
        homeSections.includes("chapeus"),
        homeSections.includes("chapeus") ? new Date() : null,
        homeSections.includes("infantil"),
        homeSections.includes("infantil") ? new Date() : null,
      ]
    );

    for (const section of homeSections) {
      await pruneHomeSection(client, section);
    }

    return rowToAdminProduct(result.rows[0]);
  });
}

export async function updateProductHomeSection(
  productId: number,
  section: HomeSection,
  enabled: boolean
) {
  return queryProducts(async (client) => {
    const columns = homeSectionColumns[section];

    const result = await client.query(
      `
        UPDATE products
        SET ${columns.flag} = $2,
            ${columns.date} = CASE WHEN $2 THEN NOW() ELSE NULL END,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `,
      [productId, enabled]
    );

    if (!result.rows[0]) {
      throw new Error("Produto nao encontrado.");
    }

    if (enabled) {
      await pruneHomeSection(client, section);
    }

    return rowToAdminProduct(result.rows[0]);
  });
}

export async function deleteProduct(productId: number) {
  return queryProducts(async (client) => {
    const result = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );

    if (!result.rows[0]) {
      throw new Error("Produto nao encontrado.");
    }

    return rowToAdminProduct(result.rows[0]);
  });
}
