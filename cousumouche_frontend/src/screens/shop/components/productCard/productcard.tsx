import React from "react";
import styles from './productcardstyles.module.css'
import { Product } from "../../../../utils/interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import { Iproduct } from "../../../../utils/interfaces/productInterface";

interface Images {
    name: string;
    url: string;
}


function extractName(path: string): string {
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.replace('.png', '');
}

export function ProductCard({ product, productlist }: { product: Product, productlist: Iproduct | undefined }) {
    const navigate = useNavigate();

    const handleNavigateToProductDetails = () => {
        if (product.slug) {
            navigate(`/produit/${product.slug}`, { state: { product, productlist } });
        } else {
            navigate(`/boutique/${encodeURIComponent(product.name)}`, { state: { product, productlist } });
        }
    };

    return (
        <div className="mt-10 w-full">
            <div>
                {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img loading="lazy" src={product.imageUrls[0]} className={styles.productImage} />
                ) : (
                    <img loading="lazy" src={product.imageUrl} className={styles.productImage} />
                )}
            </div>
            <p className={styles.fontStyle} title={product.name}>{product.name}</p>
            <p className={styles.fontStyle}>{product.price} €</p>
            <button
                className={styles.buttonStyles}
                onClick={handleNavigateToProductDetails}
                type="button"
            >
                <p className={styles.buttonFontStyle}>Je découvre</p>
            </button>
        </div>
    );
}