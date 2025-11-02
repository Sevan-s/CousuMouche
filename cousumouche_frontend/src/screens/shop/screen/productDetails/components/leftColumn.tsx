import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { Iproduct, Product } from "../../../../../utils/interfaces/productInterface"
import { ProductCard } from "../../../components/productCard/productcard"
import { PriceField, PriceObjectType } from "../productDetails"

type leftColumn = {
    product: Product
    productlist: Iproduct
    productImageIndex: number
    setProductImageIndex: Dispatch<SetStateAction<number>>
    price: number
    setPrice: Dispatch<SetStateAction<number>>
    selectedName: string,
    setSelectedName: Dispatch<SetStateAction<string>>,
    priceFields: PriceObjectType,
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
}

type PictureComponent = {
    product: Product
    productlist: Iproduct
    productImageIndex: number
    setProductImageIndex: Dispatch<SetStateAction<number>>
}

type AssocItem = { name: string; price: number };

export function LeftColumn(props: leftColumn) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handler = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        el.addEventListener("wheel", handler, { passive: false });
        return () => el.removeEventListener("wheel", handler);
    }, []);

    return (
        <div className="flex flex-col w-1/2 min-w-0">
            <ScrollPictureComponent
                product={props.product}
                productlist={props.productlist}
                productImageIndex={props.productImageIndex}
                setProductImageIndex={props.setProductImageIndex}
            />
            <AssociateProduct
                associateProducts={props.product.associateProduct}
                productList={props.productlist}
                selectedName={props.selectedName}
                setSelectedName={props.setSelectedName}
                priceFields={props.priceFields}
                setField={props.setField}
            />
            <div className="border border-[#7E649D] mt-5">
            </div>
            <MaintenanceAndDescription
                maintenance={props.product.maintenance}
                dimension={props.product.dimension}
                composition={props.product.composition}
                description={props.product.description}
            />
        </div>
    );
}

function ScrollPictureComponent(props: PictureComponent) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handler = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        el.addEventListener("wheel", handler, { passive: false });
        return () => el.removeEventListener("wheel", handler);
    }, []);

    return (
        <div className="flex flex-col min-w-0">
            <div className="flex justify-center">
                {props.product.imageUrls && (
                    <img className=" aspect-square object-cover" src={props.product.imageUrls[props.productImageIndex]} />
                )}
            </div>

            <div ref={scrollRef} className="relative z-10 w-full min-w-0 h-32 pb-3 overflow-x-scroll overflow-y-hidden select-none thumbs 
             [scrollbar-gutter:stable_both-edges]"
            >
                <div className="flex flex-row flex-nowrap gap-2 ">
                    {props.product.imageUrls?.map((image, index) => (
                        <button key={index} onClick={() => props.setProductImageIndex(index)} className={index === props.productImageIndex ? "w-28 h-28 shrink-0 object-cover rounded mt-2 border-4 border-[#c3a2df] " : "w-28 h-28 shrink-0 object-cover rounded mt-2 "}>
                            <img src={image} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

type AssociateProductProps = {
    associateProducts?: AssocItem[];
    productList: Iproduct;
    selectedName: string;
    setSelectedName: Dispatch<SetStateAction<string>>;
    priceFields: PriceObjectType;
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
};

function AssociateProduct({
    associateProducts = [],
    productList,
    selectedName,
    setSelectedName,
    priceFields,
    setField,
}: AssociateProductProps) {
    const matchedProducts = useMemo(() => {
        const names = new Set(associateProducts.map(a => a.name));
        return (productList?.products ?? []).filter(p => names.has(p.name));
    }, [associateProducts, productList]);

    const selectedProduct = useMemo(
        () => matchedProducts.find(p => p.name === selectedName) ?? matchedProducts[0],
        [matchedProducts, selectedName]
    );

    const addonPrice = useMemo(() => {
        if (!selectedProduct) return 0;
        const assoc = associateProducts.find(a => a.name === selectedProduct.name);
        return Number(assoc?.price ?? selectedProduct.price ?? 0);
    }, [associateProducts, selectedProduct]);

    const isChecked = priceFields.AssociateProductPrice.active;

    const onToggle = (checked: boolean, name?: string) => {
        if (checked) {
            if (name) setSelectedName(name);
            setField("AssociateProductPrice", { active: true, price: addonPrice });
        } else {
            setField("AssociateProductPrice", { active: false, price: 0 });
            setSelectedName("");
        }
    };

    useEffect(() => {
        if (!isChecked || !selectedProduct) return;
        const curr = priceFields.AssociateProductPrice;
        if (!curr.active || curr.price !== addonPrice) {
            setField("AssociateProductPrice", { active: true, price: addonPrice });
        }
    }, [
        isChecked,
        selectedProduct,
        addonPrice,
        priceFields.AssociateProductPrice,
        setField,
    ]);

    if (!matchedProducts.length || !selectedProduct) {
        return <div className="w-40" />;
    }

    const priceFor = (p: typeof matchedProducts[number]) => {
        const assoc = associateProducts.find(a => a.name === p.name);
        return Number(assoc?.price ?? p.price ?? 0);
    };

    return (
        <div className="w-40">
            <p className="font-poiret font-bold text-xl text-start mt-5 mb-0">
                Produit associé :
            </p>

            <ProductCard product={selectedProduct} productlist={productList} />

            {matchedProducts.map(p => {
                const checked = isChecked && selectedName === p.name;
                return (
                    <label key={p.name} className="flex flex-row items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-[#7E649D] border-2 border-[#7E649D] rounded-md"
                            checked={checked}
                            onChange={e => onToggle(e.target.checked, p.name)}
                        />
                        <span className="font-poiret text-sm font-bold">
                            J'ajoute ce produit à ma commande pour {priceFor(p)}€
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

type maintenanceAndDescription = {
    maintenance: string
    description: string
    dimension: string
    composition: string
}

function MaintenanceAndDescription(props: maintenanceAndDescription) {
    return (
        <div className="mt-5">
            <p className="font-poiret font-bold text-xl text-start mb-5">Description :</p>
            <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.description}</p>
            <div className="border border-[#7E649D] mt-5 mb-5">
            </div>
            <p className="font-poiret font-bold text-xl text-start mb-5">Dimension :</p>
            <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.dimension}</p>
            <div className="border border-[#7E649D] mt-5 mb-5">
            </div>
            <p className="font-poiret font-bold text-xl text-start mb-5">Composition :</p>
            <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.composition}</p>
            <div className="border border-[#7E649D] mt-5 mb-5">
            </div>
            <p className="font-poiret font-bold text-xl text-start mt-5  mb-5">Entretien :</p>
            <p className="font-poiret font-bold text-lg text-start mb-5 whitespace-pre-line">{props.maintenance}</p>
        </div>
    )
}