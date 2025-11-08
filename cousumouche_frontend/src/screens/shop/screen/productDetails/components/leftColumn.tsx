import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from "react"
import { Iproduct, Product } from "../../../../../utils/interfaces/productInterface"
import { ProductCard } from "../../../components/productCard/productcard"
import { PriceField, PriceObjectType } from "../productDetails"
import { Description, PriceName } from "./rightColumn"

type leftColumn = {
    product: Product
    productlist: Iproduct
    productImageIndex: number
    setProductImageIndex: Dispatch<SetStateAction<number>>
    price: number
    setPrice: Dispatch<SetStateAction<number>>
    selectedNames: string[],
    setSelectedNames: Dispatch<SetStateAction<string[]>>,
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
    const hasGiftCard = props.product?.name === 'Carte cadeau'

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
        <div className="flex flex-col w-3/4 sm:w-1/2 min-w-0">
            <div className="sm:hidden">
                <PriceName
                    product={props.product}
                    price={props.price}
                />
            </div>
            <ScrollPictureComponent
                product={props.product}
                productlist={props.productlist}
                productImageIndex={props.productImageIndex}
                setProductImageIndex={props.setProductImageIndex}
            />
            <div className="sm:hidden">
                <Description
                    product={props.product}
                    price={props.price}
                />
            </div>
            <AssociateProduct
                associateProducts={props.product.associateProduct}
                productList={props.productlist}
                selectedNames={props.selectedNames}
                setSelectedNames={props.setSelectedNames}
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
                hasGiftCard={hasGiftCard}
            />
        </div>
    );
}

function ScrollPictureComponent(props: PictureComponent) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasGiftCard = props.product?.name === 'Carte cadeau'

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
                    <img className={!hasGiftCard ? " aspect-square object-cover" : ""} alt={props.product.name} src={props.product.imageUrls[props.productImageIndex]} />
                )}
            </div>

            <div ref={scrollRef} className="relative z-10 w-full min-w-0 h-32 pb-3 overflow-x-scroll overflow-y-hidden select-none thumbs 
             [scrollbar-gutter:stable_both-edges]"
            >
                <div className="flex flex-row flex-nowrap gap-2 ">
                    {props.product.imageUrls?.map((image, index) => (
                        <button key={index} onClick={() => props.setProductImageIndex(index)} className={index === props.productImageIndex ? "sm:w-28 sm:h-28 w-20 h-20 shrink-0 rounded mt-2 border-4 border-[#c3a2df] " : "sm:w-28 sm:h-28 w-20 h-20 shrink-0 rounded mt-2 "}>
                            <img src={image} alt={props.product.name} className="w-full h-full object-cover block"/>
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
    selectedNames: string[];
    setSelectedNames: Dispatch<SetStateAction<string[]>>;
    priceFields: PriceObjectType;
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
};

function AssociateProduct({
    associateProducts = [],
    productList,
    selectedNames,
    setSelectedNames,
    priceFields,
    setField,
}: AssociateProductProps) {
    const matchedProducts = useMemo(() => {
        const names = new Set(associateProducts.map(a => a.name));
        return (productList?.products ?? []).filter(p => names.has(p.name));
    }, [associateProducts, productList]);

    const priceFor = useCallback(
        (p: typeof matchedProducts[number]) => {
            const assoc = associateProducts.find(a => a.name === p.name);
            return Number(assoc?.price ?? p.price ?? 0);
        },
        [associateProducts]
    );

    const selectedProducts = useMemo(
        () => matchedProducts.filter(p => selectedNames.includes(p.name)),
        [matchedProducts, selectedNames]
    );

    const totalAddonPrice = useMemo(
        () => selectedProducts.reduce((sum, p) => sum + priceFor(p), 0),
        [selectedProducts, priceFor]
    );

    useEffect(() => {
        const active = selectedNames.length > 0;
        const curr = priceFields.AssociateProductPrice;
        const next = { active, price: active ? totalAddonPrice : 0 };
        if (curr.active !== next.active || curr.price !== next.price) {
            setField("AssociateProductPrice", next);
        }
    }, [selectedNames, totalAddonPrice, priceFields.AssociateProductPrice, setField]);

    if (!matchedProducts.length) {
        return <div className="w-40" />;
    }

    const toggle = (name: string, checked: boolean) => {
        setSelectedNames(prev =>
            checked ? Array.from(new Set([...prev, name])) : prev.filter(n => n !== name)
        );
    };

    return (
        <div>
            <p className="font-nickainley font-bold text-xl text-start mt-5 mb-0">
                Produits associés :
            </p>

            <div className="flex flex-row sm:gap-4 gap-2 flex-wrap sm:justify-start justify-center">
                {matchedProducts.map(p => {
                    const checked = selectedNames.includes(p.name);
                    return (
                        <div key={p.name} className="sm:w-40 w-28">
                            <ProductCard product={p} productlist={productList} />
                            <label className="flex flex-row items-center mt-2 gap-2">
                                <input
                                    type="checkbox"
                                    name={`assoc-${p.name}`}
                                    className="w-5 h-5 accent-[#7E649D] border-2 border-[#7E649D] rounded-md"
                                    checked={checked}
                                    onChange={e => toggle(p.name, e.target.checked)}
                                />
                                <span className="font-poiret text-sm font-bold mt-1 text-left">
                                    J'ajoute ce produit pour
                                    + {priceFor(p)}€
                                </span>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

type maintenanceAndDescription = {
    maintenance: string
    description: string
    dimension: string
    composition: string
    hasGiftCard: boolean
}

function MaintenanceAndDescription(props: maintenanceAndDescription) {
    return (
        <div className="mt-5">
            <p className="font-nickainley font-bold text-xl text-start mb-5">Description :</p>
            <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.description}</p>
            <div className="border border-[#7E649D] mt-5 mb-5">
            </div>
            {!props.hasGiftCard &&
                <div>
                    <p className="font-nickainley font-bold text-xl text-start mb-5">Dimension :</p>
                    <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.dimension}</p>
                    <div className="border border-[#7E649D] mt-5 mb-5">
                    </div>
                    <p className="font-nickainley font-bold text-xl text-start mb-5">Composition :</p>
                    <p className="font-poiret font-bold text-lg text-start whitespace-pre-line">{props.composition}</p>
                    <div className="border border-[#7E649D] mt-5 mb-5">
                    </div>
                    <p className="font-nickainley font-bold text-xl text-start mt-5  mb-5">Entretien :</p>
                    <p className="font-poiret font-bold text-lg text-start mb-5 whitespace-pre-line">{props.maintenance}</p>
                </div>
            }
        </div>
    )
}