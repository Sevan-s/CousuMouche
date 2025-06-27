import React, { useEffect, useState } from "react";
import { getAllItemsList } from "../../API/api";
import { ProductCard } from "./components/productCard/productcard";
import { Iproduct, productData } from "../../utils/interfaces/productInterface";
import styles from './shopStyles.module.css'
import CategoriesNavbar from './components/navbar/categorienavbar'
import { cpSync } from "fs";

export function ShopScreen() {
    const [products, setProduct] = useState<Iproduct>()
    const [selectedSubCat, setSelectedSubCat] = useState<string>(() => {
        return localStorage.getItem('selectedSubCat') || "";
    });
    const [selectedMomSubCat, setSelectedMomSubCat] = useState<string>(() => {
        return localStorage.getItem('selectedMomSubCat') || "";
    });

    const getItems = async () => {
        console.log("test")
        try {
            const response = await getAllItemsList()
            setProduct(response);
            console.log("response: ", response);
            
        } catch (error) {
            console.log("error :", error)
        }
        console.log("why ?")
    }
    useEffect(() => {
        console.log("ici")
        getItems()
    }, [])

    useEffect(() => {
        localStorage.setItem('selectedSubCat', selectedSubCat);
    }, [selectedSubCat]);
    useEffect(() => {
        localStorage.setItem('selectedMomSubCat', selectedMomSubCat);
    }, [selectedMomSubCat]);

    const newList = products?.products.filter((Product) => Product.category === selectedSubCat || Product.category === selectedMomSubCat);
    console.log("newList: ", newList)

    const productsToDisplay =
        newList && newList.length > 0
            ? newList
            : (products?.products || []);

    return (
        <div className="ml-[10%] mr-[10%] mb-16 pb-20 ">
            <CategoriesNavbar
                selectedSubCat={selectedSubCat}
                onSubCatChange={setSelectedSubCat}
                selectedMomSubCat={selectedMomSubCat}
                onMomSubCatChange={setSelectedMomSubCat}
            />
            <div className={styles.productCardPosition}>
                {productsToDisplay.map((item, index) => (
                    <div key={index} className={styles.productCardAlignement}>
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}