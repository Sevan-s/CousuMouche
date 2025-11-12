import { useLocation, useParams } from "react-router-dom";
import { Iproduct, Product } from "../../../../utils/interfaces/productInterface";
import { useEffect, useState } from "react";
import { LeftColumn } from "./components/leftColumn";
import { RightColumn } from "./components/rightColumn";

interface ImageInterface {
    name: string
    url: string
}
export type PriceField = {
    active: boolean;
    price: number;
};
export type PriceObjectType = {
    lotPrice: PriceField,
    broderiePrice: PriceField,
    dimensionPrice: PriceField,
    AssociateProductPrice: PriceField,
    giftMessagePrice: PriceField;
    giftWrapPrice: PriceField;
    whoPrice: PriceField;
    anneauDeDentision: PriceField;
    giftCard: PriceField;
    giftCardMail: PriceField
}

export function usePriceHook(initialValue: PriceObjectType) {
    const [priceFields, setPriceFields] = useState<PriceObjectType>(initialValue);

    const setField = (key: keyof PriceObjectType, value: PriceField) => {
        setPriceFields(prev => ({ ...prev, [key]: value }));
    };

    return { priceFields, setPriceFields, setField };
}

const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_BACK_URL
    : process.env.REACT_APP_BACK_URL;

export function ProductInformation() {
    const location = useLocation();
    const { slug, productName } = useParams();

    const navState = (location.state || null) as {
        productlist?: Iproduct;
        product?: Product;
    } | null;

    const [product, setProduct] = useState<Product | null>(navState?.product ?? null);
    const [productlist, setProductlist] = useState<Iproduct | null>(navState?.productlist ?? null);
    const [price, setPrice] = useState<number>(navState?.product?.price ?? 0);

    const [images, setImages] = useState<ImageInterface[]>([]);
    const [imagesSangles, setImagesSangles] = useState<string[]>([]);
    const [imagesEtiquettes, setImagesEtiquettes] = useState<string[]>([]);
    const [productImageIndex, setProductImageIndex] = useState<number>(0);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(!navState?.product);
    const [hasError, setHasError] = useState<boolean>(false);

    const { priceFields, setField } = usePriceHook({
        dimensionPrice: { active: false, price: 0 },
        lotPrice: { active: false, price: 0 },
        broderiePrice: { active: false, price: 0 },
        AssociateProductPrice: { active: false, price: 0 },
        giftMessagePrice: { active: false, price: 0 },
        giftWrapPrice: { active: false, price: 0 },
        whoPrice: { active: false, price: 0 },
        anneauDeDentision: { active: false, price: 0 },
        giftCard: { active: false, price: 0 },
        giftCardMail: { active: false, price: 0 },
    });

    useEffect(() => {
        if (navState?.product) {
            setProduct(navState.product);
            setProductlist(navState.productlist ?? null);
            setPrice(navState.product.price);
            setIsLoading(false);
            setHasError(false);
            return;
        }

        const key = slug ?? productName;
        if (!key) return;

        setIsLoading(true);
        setHasError(false);


        const url = slug
            ? `${apiUrl}/products/slug/${key}`
            : `${apiUrl}/products/${encodeURIComponent(key)}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => {
                const prod = data as Product;
                setProduct(prod);
                setProductlist(null);
                setPrice(prod.price);
            })
            .catch(() => {
                setHasError(true);
                setProduct(null);
                setProductlist(null);
            })
            .finally(() => setIsLoading(false));
    }, [slug, productName, navState]);

    useEffect(() => {
        if (!product) return;

        setPrice(product.price);
        setProductImageIndex(0);
        setSelectedNames([]);
    }, [product]);

    useEffect(() => {
        if (!product) return;

        const hasSangles = !!product.options?.includes("sangles");
        const hasEtiquettes = !!product.options?.includes("etiquettes");

        fetch(`${process.env.REACT_APP_BACK_URL}/upload/images/tissus`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setImages(data);
                else setImages([]);
            })
            .catch(() => setImages([]));

        if (hasSangles) {
            fetch(`${process.env.REACT_APP_BACK_URL}/upload/images/sangles`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) setImagesSangles(data);
                    else setImagesSangles([]);
                })
                .catch(() => setImagesSangles([]));
        } else {
            setImagesSangles([]);
        }

        if (hasEtiquettes) {
            fetch(`${process.env.REACT_APP_BACK_URL}/upload/images/etiquettes`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) setImagesEtiquettes(data);
                    else setImagesEtiquettes([]);
                })
                .catch(() => setImagesEtiquettes([]));
        } else {
            setImagesEtiquettes([]);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-10">
                Chargement du produit...
            </div>
        );
    }

    if (hasError || !product) {
        return (
            <div className="flex justify-center items-center mt-10">
                Produit introuvable. Retournez à la boutique.
            </div>
        );
    }

    return (
        <div className="flex sm:mb-20 mb-40 mt-10 justify-center">
            <div className="flex sm:flex-row sm:w-[80%] xl:w-[60%] min-w-0 sm:mr-4 flex-col w-[100%] justify-center sm:items-start items-center">
                <LeftColumn
                    product={product}
                    productlist={productlist ?? { products: [] }}
                    productImageIndex={productImageIndex}
                    setProductImageIndex={setProductImageIndex}
                    price={price}
                    setPrice={setPrice}
                    selectedNames={selectedNames}
                    setSelectedNames={setSelectedNames}
                    priceFields={priceFields}
                    setField={setField}
                />
                <div className="flex sm:w-1/2 w-full sm:ml-12 justify-center sm:justify-start">
                    <RightColumn
                        product={product}
                        price={price}
                        setPrice={setPrice}
                        selectedNames={selectedNames}
                        priceFields={priceFields}
                        setField={setField}
                    />
                </div>
            </div>
        </div>
    );
}