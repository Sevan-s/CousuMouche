import React, { SetStateAction, useEffect, useState } from "react";
import { getAllItemsList } from "../../../API/api";
import { ProductCard } from "../components/productCard/productcard";
import { Iproduct, productData } from "../../../utils/interfaces/productInterface";
import styles from '../shopStyles.module.css'

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

export function ShopScreen() {
    const category = [
        "Tout",
        "Enfant",
        "Maman",
        "Matchy Matchy",
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


    const allProducts = products?.products ?? [];

    let list =
        categoryIndex !== 0
            ? allProducts.filter(
                p =>
                    Array.isArray(p.subCategory) &&
                    p.subCategory.includes(category[categoryIndex])
            )
            : allProducts;

    if (category[categoryIndex] === "Enfant" && childrenCategoryIndex !== 0) {
        const selected = childrenSubCategory[childrenCategoryIndex];
        list = list.filter(p => p.category === selected);
    } else if (category[categoryIndex] === "Maman" && MumCategoryIndex !== 0) {
        const selected = mumSubCategory[MumCategoryIndex];
        list = list.filter(p => p.category === selected);
    }

    const displayedProducts = list.filter(
        p => Array.isArray(p.imageUrls) && p.imageUrls.length > 0
    );

    // const categoryList = categoryIndex !== 0
    //     ? products?.products.filter(product => product.subCategory[0] === category[categoryIndex])
    //     : products?.products;

    // let displayedProducts = categoryList?.filter(product => product.imageUrls && product.imageUrls?.length > 0);

    // const childrenSubCat = childrenCategoryIndex !== 0
    //     ? categoryList?.filter(product => product.category === childrenSubCategory[childrenCategoryIndex])
    //     : categoryList;

    // const mumSubCat = MumCategoryIndex !== 0
    //     ? categoryList?.filter(product => product.category === mumSubCategory[MumCategoryIndex])
    //     : categoryList;

    // if (category[categoryIndex] === "Enfant" && childrenCategoryIndex !== 0) {
    //     displayedProducts = childrenSubCat?.filter(product => product.imageUrls && product.imageUrls?.length > 0);;
    // }

    // if (category[categoryIndex] === "Maman" && MumCategoryIndex !== 0) {
    //     displayedProducts = mumSubCat?.filter(product => product.imageUrls && product.imageUrls?.length > 0);;
    // }

    return (
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
            <div className="ml-[10%] mr-[10%] mb-16 pb-20 ">
                {category[categoryIndex] === 'Matchy Matchy' && 
                    <p className="font-poiret font-bold">« Matchy-Matchy », QUESAKO ? Cela désigne un style assorti, que ce soit par la couleur, le motif ou le modèle.</p>
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
    )
}

function ShopNavbar(props: shopCategory) {
    return (
        <div >
            <div className="flex flex-row gap-10 justify-center mt-6">
                {props.category.map((value, index) => (
                    <button key={index} onClick={() => props.setCategoryIndex(index)} >
                        <p className={props.categoryIndex !== index ? "text-[black] hover:text-[#7E649D] font-poiret font-bold" : "text-[#7E649D] font-poiret font-bold"}>
                            {value}
                        </p>
                    </button>
                ))}
            </div>
            <div className="flex flex-row gap-10 justify-center mt-4">
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


