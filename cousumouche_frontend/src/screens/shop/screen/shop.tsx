import React, { useEffect, useState } from "react";
import { getAllItemsList } from "../../../API/api";
import { ProductCard } from "../components/productCard/productcard";
import { Iproduct } from "../../../utils/interfaces/productInterface";
import styles from '../shopStyles.module.css'
import { Helmet } from "react-helmet-async";

interface shopCategory {
    category: string[],
    childrenSubCategory: string[],
    mumSubCategory: string[],
    categoryIndex: number,
    setCategoryIndex: React.Dispatch<React.SetStateAction<number>>
    childrenCategoryIndex: number,
    setChildrenCategoryIndex: React.Dispatch<React.SetStateAction<number>>
    MumCategoryIndex: number,
    setMumCategoryIndex: React.Dispatch<React.SetStateAction<number>>
}

const SHOP_BASE_URL = "https://www.cousumouche.fr/boutique";

const CATEGORY_META: Record<
    string,
    { slug: string; title: string; description: string }
> = {
    Tout: {
        slug: "",
        title:
            "Boutique – Créations couture bébé, enfant & maman | CousuMouche",
        description:
            "Découvrez toutes les créations couture artisanales CousuMouche : gigoteuses, capes de bain, couvertures, accessoires et cadeaux de naissance faits main pour bébé, enfant et maman.",
    },
    Enfant: {
        slug: "enfant",
        title: "Couture enfant artisanale – Univers bébé & enfant | CousuMouche",
        description:
            "Créations couture enfant : gigoteuses, couvertures, accessoires Dodo, repas, bain, mode et décoration pour bébé et enfant, faits main en Occitanie.",
    },
    Maman: {
        slug: "maman",
        title: "Couture maman artisanale – Bien-être & accessoires | CousuMouche",
        description:
            "Créations couture pour maman : accessoires de maternité, beauté, mode et décoration faits main. Idées cadeaux pour jeunes et futures mamans.",
    },
    "Matchy Matchy": {
        slug: "matchy-matchy",
        title:
            "Matchy Matchy maman & enfant – Créations assorties | CousuMouche",
        description:
            "Découvrez les créations Matchy Matchy maman & enfant : tabliers, accessoires assortis et pièces uniques confectionnées à la main.",
    },
    "Carte cadeau": {
        slug: "carte-cadeau",
        title:
            "Carte cadeau naissance & maman – Offrez une création CousuMouche",
        description:
            "Offrez une carte cadeau CousuMouche pour laisser les parents choisir leurs créations couture bébé, enfant ou maman faites main.",
    },
};

const CHILD_SUB_META: Record<
    string,
    { slug: string; extra: string }
> = {
    Tout: { slug: "", extra: "" },
    Dodo: {
        slug: "dodo",
        extra:
            " Univers Dodo : gigoteuses, couvertures et linge de lit pour bébé, doux et faits main.",
    },
    Repas: {
        slug: "repas",
        extra:
            " Univers Repas : bavoirs, sets de table et accessoires repas pour bébé.",
    },
    Bain: {
        slug: "bain",
        extra:
            " Univers Bain : capes de bain, serviettes et accessoires pour la sortie de bain.",
    },
    Accessoires: {
        slug: "accessoires",
        extra:
            " Accessoires bébé & enfant personnalisables pour le quotidien et les cadeaux de naissance.",
    },
    Mode: {
        slug: "mode",
        extra:
            " Mode bébé & enfant : foulards, bandeaux et accessoires textiles faits main.",
    },
    Décoration: {
        slug: "decoration",
        extra:
            " Décoration chambre bébé & enfant : pièces textiles artisanales pour un univers chaleureux.",
    },
};

const MUM_SUB_META: Record<
    string,
    { slug: string; extra: string }
> = {
    Tout: { slug: "", extra: "" },
    Maternité: {
        slug: "maternite",
        extra:
            " Univers maternité : accessoires pensés pour accompagner la grossesse et le post-partum.",
    },
    Beauté: {
        slug: "beaute",
        extra:
            " Univers beauté : accessoires textiles pour le soin et le bien-être de maman.",
    },
    Accessoires: {
        slug: "accessoires",
        extra:
            " Accessoires du quotidien pour maman, pratiques et élégants.",
    },
    Mode: {
        slug: "mode",
        extra:
            " Mode et textiles pour maman, confectionnés à la main en petites séries.",
    },
    Décoration: {
        slug: "decoration",
        extra:
            " Décoration textile pour la maison et le cocon familial.",
    },
};

export function ShopScreen() {
    const category = [
        "Tout",
        "Enfant",
        "Maman",
        "Matchy Matchy",
        "Stock",
        "Carte cadeau"
    ]
    const childrenSubCategory = [
        "Tout",
        "Dodo",
        "Repas",
        "Bain",
        "Accessoires",
        "Mode",
        "Décoration"
    ]

    const mumSubCategory = [
        "Tout",
        "Maternité",
        "Beauté",
        "Accessoires",
        "Mode",
        "Décoration"
    ]

    const [categoryIndex, setCategoryIndex] = useState<number>(0)
    const [childrenCategoryIndex, setChildrenCategoryIndex] = useState<number>(0)
    const [MumCategoryIndex, setMumCategoryIndex] = useState<number>(0)


    const [products, setProduct] = useState<Iproduct>()

    const getItems = async () => {
        try {
            const response = await getAllItemsList()
            setProduct(response);

        } catch (error) {
            console.log("error :", error)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    console.log("product : ", products)


    const allProducts = products?.products ?? [];

    const currentCategory = category[categoryIndex];

    let list = allProducts;

    if (currentCategory === "Stock") {
        list = allProducts.filter(p => {
            const stock = p.stock ?? 0;
            return p.category === "Stock" && stock > 0;
        });
    } else {
        list = allProducts.filter(p => p.category !== "Stock");

        if (currentCategory !== "Tout") {
            list = list.filter(
                p =>
                    Array.isArray(p.subCategory) &&
                    p.subCategory.includes(currentCategory)
            );
        }

        if (currentCategory === "Enfant" && childrenCategoryIndex !== 0) {
            const selected = childrenSubCategory[childrenCategoryIndex];
            list = list.filter(p => p.category === selected);
        }

        if (currentCategory === "Maman" && MumCategoryIndex !== 0) {
            const selected = mumSubCategory[MumCategoryIndex];
            list = list.filter(p => p.category === selected);
        }
    }
    const displayedProducts = list.filter(
        p => Array.isArray(p.imageUrls) && p.imageUrls.length > 0
    );

    const currentChildrenSub = childrenSubCategory[childrenCategoryIndex];
    const currentMumSub = mumSubCategory[MumCategoryIndex];

    const catMeta = CATEGORY_META[currentCategory] || CATEGORY_META["Tout"];

    let pageUrl = SHOP_BASE_URL;
    if (catMeta.slug) {
        pageUrl += `/${catMeta.slug}`;
    }

    let title = catMeta.title;
    let description = catMeta.description;

    if (currentCategory === "Enfant" && currentChildrenSub !== "Tout") {
        const subMeta = CHILD_SUB_META[currentChildrenSub];
        if (subMeta) {
            if (subMeta.slug) {
                pageUrl += `/${subMeta.slug}`;
            }
            title = `${currentChildrenSub} – ${catMeta.title}`;
            description = `${catMeta.description}${subMeta.extra}`;
        }
    } else if (currentCategory === "Maman" && currentMumSub !== "Tout") {
        const subMeta = MUM_SUB_META[currentMumSub];
        if (subMeta) {
            if (subMeta.slug) {
                pageUrl += `/${subMeta.slug}`;
            }
            title = `${currentMumSub} – ${catMeta.title}`;
            description = `${catMeta.description}${subMeta.extra}`;
        }
    }

    const itemListSchema =
        displayedProducts.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "ItemList",
                itemListElement: displayedProducts.map((p, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: p.name,
                    url: `https://www.cousumouche.fr/produit/${p.slug}`,
                })),
            }
            : null;
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={pageUrl} />
                {itemListSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(itemListSchema)}
                    </script>
                )}
            </Helmet>

            <div>
                <ShopNavbar
                    category={category}
                    childrenSubCategory={childrenSubCategory}
                    mumSubCategory={mumSubCategory}
                    categoryIndex={categoryIndex}
                    setCategoryIndex={setCategoryIndex}
                    childrenCategoryIndex={childrenCategoryIndex}
                    setChildrenCategoryIndex={setChildrenCategoryIndex}
                    MumCategoryIndex={MumCategoryIndex}
                    setMumCategoryIndex={setMumCategoryIndex}
                />
                <div className=" ml-[10%] mr-[10%] mb-16 pb-20">
                    {category[categoryIndex] === 'Matchy Matchy' &&
                        <div className="flex items-center justify-center">
                            <p className="font-poiret font-bold bg-[#7E649D] py-2 text-white rounded-lg w-[800px]">« Matchy-Matchy », QUESAKO ? Cela désigne un style assorti, que ce soit par la couleur, le motif ou le modèle.</p>
                        </div>

                    }
                    <div className={styles.productCardPosition}>
                        {displayedProducts?.map((item, index) => (
                            <div key={index} className={styles.productCardAlignement}>
                                <ProductCard
                                    product={item}
                                    productlist={products}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

function ShopNavbar(props: shopCategory) {
    return (
        <div >
            <div className="flex flex-row text-sm sm:text-lg gap-4 sm:gap-10 justify-center mt-6">
                {props.category.map((value, index) => (
                    <button key={index} onClick={() => props.setCategoryIndex(index)} >
                        <p className={props.categoryIndex !== index ? "text-[black] hover:text-[#7E649D] font-poiret font-bold" : "text-[#7E649D] font-poiret font-bold"}>
                            {value}
                        </p>
                    </button>
                ))}
            </div>
            <div className="flex flex-row flex-wrap justify-center mt-4 gap-4 sm:gap-10 text-sm sm:text-lg mx-4">
                {props.category[props.categoryIndex] === "Enfant" ? props.childrenSubCategory.map((childrenCat, index) => (
                    <button key={index} onClick={() => props.setChildrenCategoryIndex(index)}>
                        <p className={props.childrenCategoryIndex !== index ? "text-[black] hover:text-[#7E649D]  font-poiret font-bold" : "text-[#7E649D] font-poiret font-bold"}>
                            {childrenCat}
                        </p>
                    </button>
                )) : props.category[props.categoryIndex] === "Maman" ? props.mumSubCategory.map((mumCat, index) => (
                    <button key={index} onClick={() => props.setMumCategoryIndex(index)}>
                        <p className={props.MumCategoryIndex !== index ? "text-[black] hover:text-[#7E649D]  font-poiret font-bold" : "text-[#7E649D] font-poiret font-bold"}>
                            {mumCat}
                        </p>
                    </button>
                ))
                    : null}
            </div>
        </div>
    )
}


