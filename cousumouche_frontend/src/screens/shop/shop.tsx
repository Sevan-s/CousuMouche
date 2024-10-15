import React, { useEffect, useState } from "react";
import { getShopItem } from "../../API/api";
import { ProductCard } from "./components/productCard/productcard";
import { Iproduct, productData } from "../../utils/interfaces/productInterface";
import styles from './shopStyles.module.css'

export function ShopScreen() {
    const [products, setProduct] = useState<Iproduct>()

    const getItems = async () => {
        const response = await getShopItem()
        setProduct(response);
    }
    useEffect(() => {
        getItems()
    }, [])

    if (products !== undefined)
        console.log("products : ", products.data)
    return( 
        <div style={{marginLeft: '10%', marginRight:'10%', marginBottom:50}}>
            <div className={styles.productCardPosition}>
            {products !== undefined && products.data.map((product, index) => (
                <div className={styles.productCardAlignement}>
                <ProductCard
                key={index}
                product={product}
            />
            </div>
            ))}
            </div>
        </div>
    )
}