import { Helmet } from "react-helmet-async";
import { Product } from "./interfaces/productInterface";

const CATEGORY_SEO: Record<
  string,
  { label: string; slug: string; seoLabel: string }
> = {
  Tout: {
    label: "Toutes les créations",
    slug: "tout",
    seoLabel: "bébé, enfant & maman",
  },
  Enfant: {
    label: "Enfant",
    slug: "enfant",
    seoLabel: "enfant",
  },
  Maman: {
    label: "Maman",
    slug: "maman",
    seoLabel: "maman",
  },
  "Matchy Matchy": {
    label: "Matchy Matchy",
    slug: "matchy-matchy",
    seoLabel: "matchy matchy maman & enfant",
  },
  "Carte cadeau": {
    label: "Carte cadeau",
    slug: "carte-cadeau",
    seoLabel: "carte cadeau",
  },
};

const SUBCATEGORY_SEO: Record<
  string,
  { label: string; slug: string; seoLabel: string }
> = {
  Tout: {
    label: "Tous les univers",
    slug: "tout",
    seoLabel: "",
  },
  Dodo: {
    label: "Dodo",
    slug: "dodo",
    seoLabel: "univers Dodo : gigoteuses, couvertures et linges de lit",
  },
  Repas: {
    label: "Repas",
    slug: "repas",
    seoLabel: "univers Repas : bavoirs, sets de table et accessoires repas",
  },
  Bain: {
    label: "Bain",
    slug: "bain",
    seoLabel: "univers Bain : capes de bain et serviettes",
  },
  Accessoires: {
    label: "Accessoires",
    slug: "accessoires",
    seoLabel: "accessoires bébé & enfant",
  },
  Mode: {
    label: "Mode",
    slug: "mode",
    seoLabel: "mode bébé & enfant",
  },
  Décoration: {
    label: "Décoration",
    slug: "decoration",
    seoLabel: "décoration chambre bébé & enfant",
  },
};

type Props = {
  product: Product;
};

export function ProductSeo({ product }: Props) {
  const url = `https://www.cousumouche.fr/produit/${product.slug}`;
  const mainImage = product.imageUrl || product.imageUrls?.[0] || "";

  const catInfo =
    CATEGORY_SEO[product.category] || CATEGORY_SEO["Tout"];
  const mainSubCat =
    product.subCategory && product.subCategory.length > 0
      ? product.subCategory[0]
      : "Tout";
  const subCatInfo =
    SUBCATEGORY_SEO[mainSubCat] || SUBCATEGORY_SEO["Tout"];

  const titleParts: string[] = [product.name];

  if (mainSubCat !== "Tout" && subCatInfo.seoLabel) {
    titleParts.push(`– ${subCatInfo.label} bébé`);
  } else if (catInfo.seoLabel) {
    titleParts.push(`– ${catInfo.seoLabel}`);
  }

  const title = `${titleParts.join(" ")} | CousuMouche`;

  const baseDescription =
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `Création artisanale pour bébé : ${product.name}, confectionnée à la main par CousuMouche en Occitanie.`;

  const extraContext =
    mainSubCat !== "Tout" && subCatInfo.seoLabel
      ? ` Cet article fait partie de l’${subCatInfo.seoLabel}.`
      : catInfo.seoLabel
      ? ` Une création pensée pour ${catInfo.seoLabel}.`
      : "";

  const seoDescription = `${baseDescription}${extraContext}`.trim();

  const inStock = product.stock > 0;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seoDescription,
    image: mainImage,
    category: `${product.category}${
      mainSubCat && mainSubCat !== "Tout" ? ` > ${mainSubCat}` : ""
    }`,
    sku: product._id,
    url,
    brand: {
      "@type": "Brand",
      name: "CousuMouche",
      alternateName: "Cousu Mouche",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };


  const breadcrumbItems: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.cousumouche.fr/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Boutique",
      item: "https://www.cousumouche.fr/boutique",
    },
  ];

  if (product.category && product.category !== "Tout") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: catInfo.label,
      item: `https://www.cousumouche.fr/boutique/${catInfo.slug}`,
    });
  }

  if (mainSubCat && mainSubCat !== "Tout") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: subCatInfo.label,
      item: `https://www.cousumouche.fr/boutique/${catInfo.slug}/${subCatInfo.slug}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: product.name,
    item: url,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={seoDescription} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={mainImage} />

      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}