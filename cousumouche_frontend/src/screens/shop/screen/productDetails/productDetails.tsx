import { useLocation, useParams } from "react-router-dom";
import { Article } from "../../../../utils/interfaces/articleInterfaces"
import { Iproduct, Product } from "../../../../utils/interfaces/productInterface";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
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

export function ProductInformation() {
    const location = useLocation();
    const { productlist } = location.state as { productlist: Iproduct };
    const { product } = location.state as { product: Product };
    const hasSangles = !!product?.options?.includes("sangles");
    const hasEtiquettes = !!product?.options?.includes("etiquettes");

    const [price, setPrice] = useState<number>(product.price)
    const [images, setImages] = useState<ImageInterface[]>([])
    const [imageIndex, setImageIndex] = useState<number[]>([])
    const [imagesSangles, setImagesSangles] = useState<string[]>([])
    const [imagesEtiquettes, setImagesEtiquettes] = useState<string[]>([])
    const [productImageIndex, setProductImageIndex] = useState<number>(0)
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const { priceFields, setPriceFields, setField } = usePriceHook({
        dimensionPrice: { active: false, price: 0 },
        lotPrice: { active: false, price: 0 },
        broderiePrice: { active: false, price: 0 },
        AssociateProductPrice: { active: false, price: 0 },
        giftMessagePrice: { active: false, price: 0 },
        giftWrapPrice: { active: false, price: 0 },
        whoPrice: { active: false, price: 0 },
        anneauDeDentision: { active: false, price: 0 },
        giftCard: {active: false, price: 0},
        giftCardMail:{active: false, price:0},
    })

    console.log("this field : ", priceFields)
    useEffect(() => {
        fetch('https://cmback-ab08.onrender.com/upload/images/tissus')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setImages(data);
                else setImages([]);
            })
            .catch(() => setImages([]));
        if (hasSangles) {
            fetch('https://cmback-ab08.onrender.com/upload/images/sangles')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setImagesSangles(data);
                    else setImagesSangles([]);
                })
                .catch(() => setImagesSangles([]));
        }
        if (hasEtiquettes) {
            fetch('https://cmback-ab08.onrender.com/upload/images/etiquettes')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setImagesEtiquettes(data);
                    else setImagesEtiquettes([]);
                })
                .catch(() => setImagesEtiquettes([]));
        }
    }, []);

    return (
        <div className="flex sm:mb-20 mb-40 mt-10 justify-center">
            <div className="flex sm:flex-row sm:w-[80%] xl:w-[60%] min-w-0 sm:mr-4 flex-col w-[100%] justify-center sm:items-start items-center">
                <LeftColumn
                    product={product}
                    productlist={productlist}
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
    )
}