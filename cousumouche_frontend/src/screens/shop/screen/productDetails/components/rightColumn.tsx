import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Dimensions, IWho, Lot, Product } from "../../../../../utils/interfaces/productInterface";
import { IoIosWarning } from "react-icons/io";
import { ParcelShopID, ParcelShopSelected } from "@frontboi/mondial-relay/types";
import { PriceField, PriceObjectType } from "../productDetails";

interface ImageInterface {
    id: string
    name: string
    url: string
}

export type Article = {
    name: string;
    price: number;
    quantity: number;
    subTotal: number;
    broderieFirstName?: string;
    image: string | string[] | '';
    tissus?: string[];
    message?: string;
    gift?: boolean;
    who?: string;
    parcelShop?: ParcelShopSelected & ParcelShopID;
    lot?: { quantities: number; price: number };
    anneauDeDentision?: boolean;
};

export type Shopping = {
    name: string;
    price: number;
    quantity: number;
    blanketDimension: string;
    bearEar?: string;
    dimension?: string;
    fabricSelected?: FabricSelected[];
    lot?: number;
    embroidery?: string;
    selectedStrap?: string | null;
    selectedLabel?: string | null;
    gift?: boolean;
    who?: string;
    parcelShop?: ParcelShopSelected & ParcelShopID;
    message: string;
    label: string | undefined;
    strap: string | undefined;
    anneauOption: string | null;
    product: Product;
    closingSystem: string | null;
    giftCardSended: string | null;
    giftCardData: FormData | null
};

export function RightColumn({ product, price, setPrice, selectedNames, priceFields, setField }: { product: Product, price: number, setPrice: Dispatch<SetStateAction<number>>, selectedNames: string[], priceFields: PriceObjectType, setField: (key: keyof PriceObjectType, value: PriceField) => void; }) {

    const hasSangles = !!product?.options?.includes("sangles");
    const hasEmbroidery = !!product?.options?.includes("broderie");
    const hasEtiquettes = !!product?.options?.includes("etiquettes");
    const hasFabrics = !!product?.options?.includes("tissus");
    const hasDimension = product.dimensions.length > 0
    const hasBlanket = !!product?.name?.includes("Couverture - sur mesure");
    const hasbathroom = !!product?.name?.includes("Sortie de bain");
    const hasWho = product?.who.length > 0;
    const hasDoudou = product?.name === 'Doudou';
    const haslaces = product?.name === 'Lacets personnalisés';
    const hasChangingMat = product?.name === 'Tapis à langer nomade';
    const hasGiftCard = product?.name === 'Carte cadeau'


    const dentisionPrice: number = 3
    const [blanketDimension, setBlanketDimension] = useState<string>("")
    const [bearEar, setBearEar] = useState<string>("Non")

    const [fabricsImages, setFabricsImages] = useState<ImageInterface[]>([])
    const [imagesSangles, setImagesSangles] = useState<ImageInterface[]>([])
    const [imagesEtiquettes, setImagesEtiquettes] = useState<ImageInterface[]>([])

    const [dimensionIndex, setDimensionIndex] = useState<number>()

    const [fabricSelected, setFabricsSelected] = useState<FabricSelected[]>([])

    const [lotIndexSelected, setLotIndexSelected] = useState<number | undefined>();

    const [embroidery, setEmbroidery] = useState<string>("")

    const [selectedStrap, setSelectedStrap] = useState<ImageInterface | null>(null)

    const [selectedLabel, setSelectedLabel] = useState<ImageInterface | null>(null)

    const [forWho, setForWho] = useState<string>("")

    const [gift, setGift] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const [anneauOption, setAnneauOption] = useState<"oui" | "non" | null>(null);
    const [closingSystem, setClosingSystem] = useState<string | null>(null)
    const [giftCardSended, setGiftCardSended] = useState<string | null>(null)
    const [form, setForm] = useState<FormData>({
        pour: "",
        deLaPartDe: "",
        montant: 0,
        message: "",
    });

    const setGiftCardField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const basePrice = !hasGiftCard ? product.price : 0;

    const computedPrice = useMemo(() => {
        return basePrice +
            Object.values(priceFields)
                .filter(f => f.active)
                .reduce((sum, f) => sum + f.price, 0);
    }, [basePrice, priceFields]);

    useEffect(() => {
        setPrice(computedPrice);
    }, [computedPrice, setPrice]);

    const handleClick = (value: "oui" | "non") => {
        setAnneauOption(value);
        if (value === "oui") {
            if (priceFields.lotPrice.active) {
                setField("anneauDeDentision", { active: true, price: dentisionPrice * product.lot[0].quantities })
            }
            else
                setField("anneauDeDentision", { active: true, price: dentisionPrice })
        }
        else
            setField("anneauDeDentision", { active: false, price: 0 })
    };
    useEffect(() => {
        console.log("embroidery ->", embroidery);
    }, [embroidery]);


    useEffect(() => {
        fetch('https://cmback-ab08.onrender.com/upload/images/tissus')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFabricsImages(data);
                else setFabricsImages([]);
            })
            .catch(() => setFabricsImages([]));
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

    const productDetails: Shopping = {
        name: !selectedNames ? product.name : product.name + ' / ' + selectedNames,
        price: price,
        quantity: 1,
        dimension: dimensionIndex != null && product.dimensions[dimensionIndex]
            ? product.dimensions[dimensionIndex].label ?? String(product.dimensions[dimensionIndex])
            : undefined,
        blanketDimension,
        bearEar,
        fabricSelected,
        lot: lotIndexSelected !== undefined ? product.lot[lotIndexSelected].quantities : undefined,
        embroidery,
        selectedStrap: selectedStrap?.name,
        selectedLabel: selectedLabel?.name,
        gift,
        who: forWho,
        message,
        label: selectedLabel?.name,
        strap: selectedStrap?.name,
        anneauOption,
        product,
        closingSystem,
        giftCardSended,
        giftCardData: form
    };

    console.log("productDetails : ", productDetails)
    return (
        <div className="text-left">
            <PriceNameAndDescription
                product={product}
                price={price}
            />
            {hasGiftCard &&
                <GiftCard
                    giftCardSended={giftCardSended}
                    setGiftCardSended={setGiftCardSended}
                    setGiftCardField={setGiftCardField}
                    form={form}
                    setForm={setForm}
                    setField={setField}
                />
            }
            {hasbathroom &&
                <Bath
                    setBearEar={setBearEar}
                />
            }
            {hasWho &&
                <ForWho
                    who={product.who}
                    setWho={setForWho}
                    setPrice={setPrice}
                    setField={setField}
                />
            }
            {hasBlanket &&
                <CustomBlanket
                    setBlanketDimension={setBlanketDimension}
                />
            }
            {hasDimension && (!haslaces || (haslaces && forWho === "Matchy Matchy")) ? (
                <Dimension
                    dimensionIndex={dimensionIndex}
                    setDimensionIndex={setDimensionIndex}
                    dimensions={product.dimensions}
                    setPrice={setPrice}
                    setField={setField}
                    priceFields={priceFields}
                />
            ) : null}
            {hasChangingMat && (
                <ChangingMat
                    closingSystem={closingSystem}
                    setClosingSystem={setClosingSystem}
                />
            )}
            {hasDoudou && (
                <div className="mt-5">
                    <p className="font-poiret font-bold text-xl">
                        Je souhaiterais ajouter un anneau de dentision en bois (+3€)
                    </p>
                    <div className="flex gap-2">
                        <button
                            className={`border-2 p-2 ${anneauOption === "oui" ? "border-2 p-2 mt-5 bg-[#8574A6] min-w-10 text-white" : "border-2 p-2 mt-5 min-w-10"
                                }`}
                            onClick={() => handleClick("oui")}
                        >
                            Oui
                        </button>
                        <button
                            className={`border-2 p-2 ${anneauOption === "non" ? "border-2 p-2 mt-5 bg-[#8574A6] min-w-10 text-white" : "border-2 p-2 mt-5 min-w-10"
                                }`}
                            onClick={() => handleClick("non")}
                        >
                            Non
                        </button>
                    </div>
                </div>
            )}
            {product.lot.length > 0 &&
                <ChoiceLotQuantities
                    name={product.name}
                    lotQuantities={product.lot}
                    setPrice={setPrice}
                    basePrice={product.price}
                    lotIndexSelected={lotIndexSelected}
                    setLotIndexSelected={setLotIndexSelected}
                    priceFields={priceFields}
                    setField={setField}
                    setDimensionIndex={setDimensionIndex}
                    dimensions={product.dimensions}

                />
            }
            {hasFabrics &&
                <FabricsOptions
                    fabricsImages={fabricsImages}
                    fabricsType={product.fabrics}
                    fabricsQuantities={product.fabricsQuantities}
                    fabricSelected={fabricSelected}
                    setFabricsSelected={setFabricsSelected}
                    priceFields={priceFields}
                    lot={product.lot}
                    name={product.name}
                />
            }
            {hasEmbroidery &&
                <Embroidery
                    embroidery={embroidery}
                    setEmbroidery={setEmbroidery}
                    priceFields={priceFields}
                    setField={setField}
                    lot={product.lot}

                />
            }
            {hasSangles &&
                <Strap
                    straps={imagesSangles}
                    selectedStrap={selectedStrap}
                    setSelectedStrap={setSelectedStrap}
                />}
            {hasEtiquettes &&
                <Labels
                    labels={imagesEtiquettes}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                />
            }
            {!hasGiftCard &&
                <Gift
                    gift={gift}
                    setGift={setGift}
                    setMessage={setMessage}
                    priceFields={priceFields}
                    setField={setField}
                />
            }
            <ConditionChecker
                productDetails={productDetails}
            />
        </div>
    )
}

function ChoiceLotQuantities({
    name,
    lotQuantities,
    setPrice,
    basePrice,
    lotIndexSelected,
    setLotIndexSelected,
    priceFields,
    setField,
    setDimensionIndex,
    dimensions
}: {
    name: string,
    lotQuantities: Lot[];
    setPrice: Dispatch<SetStateAction<number>>;
    basePrice: number;
    lotIndexSelected: number | undefined;
    setLotIndexSelected: Dispatch<SetStateAction<number | undefined>>;
    priceFields: PriceObjectType;
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
    setDimensionIndex: Dispatch<SetStateAction<number | undefined>>;
    dimensions: Dimensions[]
}) {
    const DefineQuantities = (idx: number) => {
        const lot = lotQuantities?.[idx];
        if (!lot) {
            console.warn("Invalid lot index or lotQuantities not ready:", idx, lotQuantities);
            return;
        }
        if (priceFields.anneauDeDentision.active) {
            setField("anneauDeDentision", { active: true, price: 3 * lot.quantities })
        }
        if (priceFields.broderiePrice.active) {
            setField("broderiePrice", { active: true, price: 5 * lot.quantities })
        }
        if (lotIndexSelected === idx) {
            setLotIndexSelected(undefined);
            setField("lotPrice", { active: false, price: 0 });
            if (priceFields.broderiePrice.active) {
                setField("broderiePrice", { active: true, price: 5 })
            }
            if (priceFields.anneauDeDentision.active) {
                setField("anneauDeDentision", { active: true, price: 3 })
            }
            if (dimensions?.length) {
                setDimensionIndex(undefined as unknown as number);
                setField("dimensionPrice", { active: false, price: 0 });
            }
            return;
        }
        setLotIndexSelected(idx);
        if (dimensions?.length) {
            setDimensionIndex(0);
            setField("dimensionPrice", { active: true, price: dimensions[0].price ?? 0 });
        }

        setField("lotPrice", { active: true, price: lot.price ?? 0 });
    };

    return (
        <div className="flex mt-5 flex-col">
            <p className="font-poiret font-bold text-xl">{name === "Housse matelas à langer" ? `Je souhaiterais ajouter un lot de serviette bambou à ${lotQuantities[0].price} €` : "Cet article est disponible en lot de :"}</p>
            <div className="flex flex-row flex-wrap justify-start gap-2 text-center mt-5">
                {lotQuantities.map((lot, index) => (
                    <div>
                        {name === "Housse matelas à langer" ?
                            <button
                                key={index}
                                onClick={() => DefineQuantities(index)}
                                className={index === lotIndexSelected ? "border-[#7E649D] bg-[#7E649D] text-white border-2 p-1" : "border-2 p-1 border-[#7E649D] font-poiret font-bold "}
                            >
                                Lot de {lot.quantities}
                            </button> :
                            <button
                                key={index}
                                onClick={() => DefineQuantities(index)}
                                className={index === lotIndexSelected ? "border-[#7E649D] bg-[#7E649D] text-white border-2 w-10" : "border-2 w-10 border-[#7E649D] text-lg"}
                            >
                                {lot.quantities}
                            </button>

                        }
                    </div>

                ))}
            </div>
        </div>
    );
}

function PriceNameAndDescription({ product, price }: { product: Product, price: number }) {
    return (
        <div className="text-start">
            <div>
                <h1 className="font-nickainley text-3xl text-start">{product.name}</h1>
                <p className="font-poiret font-bold text-lg mt-2">{price} €</p>
            </div>
            <div>
                <p className="font-poiret font-bold text-lg mt-5 whitespace-pre-line">{product.shortDescription}</p>
            </div>
            <div className="border border-[#7E649D] mt-2">
            </div>

        </div>
    )
}

function Dimension({
    dimensionIndex,
    setDimensionIndex,
    dimensions,
    setPrice,
    setField,
    priceFields
}: {
    dimensionIndex: number | undefined;
    setDimensionIndex: Dispatch<SetStateAction<number | undefined>>;
    dimensions: Dimensions[];
    setPrice: Dispatch<SetStateAction<number>>;
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
    priceFields: PriceObjectType;
}) {
    const handleClick = (index: number) => {
        if (priceFields.lotPrice.active && dimensions !== undefined) {
            setDimensionIndex(0)
            setField("dimensionPrice", { active: true, price: dimensions[0].price });
        } else {
            setDimensionIndex(index);
            setField("dimensionPrice", { active: true, price: dimensions[index].price });
        }
    };

    return (
        <div>
            <p className="font-poiret font-bold text-xl mt-5">Choisissez la taille :</p>
            <div className="flex flex-row gap-2">
                {dimensions.map((dim, index) => (
                    <button
                        key={dim.label}
                        onClick={() => handleClick(index)}
                        className={
                            index === dimensionIndex
                                ? "border-2 p-1 mt-5 bg-[#8574A6] border-[#8574A6] min-w-10 text-white text-lg"
                                : "border-2 p-1 mt-5 min-w-10 border-[#8574A6] text-lg"
                        }
                    >
                        <p>{dim.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

const fabricsName = (type: string) => {
    switch (type) {
        case 'uni/coton':
            return 'Coton'
        case 'uni/doubleGaze':
            return 'Double Gaze'
        case 'uni/NidDAbeille':
            return "Nid d'abeille"
        case 'uni/epongeBambou':
            return "Eponge Bambou"
        case 'uni/Polaire':
            return "Polaire"
        case 'uni/velour':
            return "Velour"
        case 'uni/satin':
            return "Satin"
        case 'motif/Coton':
            return "Coton"
        case 'motif/doubleGaz':
            return "Double Gaze"
        case 'motif/jersey':
            return "Jersey"
        case 'motif/Noel':
            return "Noël"
        case 'motif/cuisine':
            return "Cuisine"
        default:
            return type;
    }
}

type FabricSelected = {
    id: string
    name: string
}

function FabricsOptions({ fabricsImages, fabricsType, fabricsQuantities, fabricSelected, setFabricsSelected, priceFields, lot, name }: { fabricsImages: ImageInterface[], fabricsType: string[] | undefined, fabricsQuantities: number, fabricSelected: FabricSelected[], setFabricsSelected: Dispatch<SetStateAction<FabricSelected[]>>, priceFields: PriceObjectType, lot: Lot[], name: string }) {

    let filteredFabrics
    let simpleFabrics: ImageInterface[]
    let motifFabrics: ImageInterface[]
    const typeSelected = ["Uni", "Motif"]
    const [choiceFabricsType, setChoiceFabricsType] = useState<string>('Uni')
    const [FabricTypeIndex, setFabricTypeIndex] = useState<number>(0)
    const [quantities, setQuantities] = useState<number>(0)
    let uniFabric = fabricsType?.filter((type) => type.startsWith('uni'))
    let motifabric = fabricsType?.filter((type) => type.startsWith('motif'))

    if (fabricsType !== undefined) {
        simpleFabrics = fabricsImages.filter((type) => type.name.startsWith("uni"))
        motifFabrics = fabricsImages.filter((type) => type.name.startsWith("motif"))
        filteredFabrics = fabricsImages.filter((type) => type.name.startsWith(fabricsType[4]))
    }

    const fabricsQuantitiesSelected = priceFields.lotPrice.active && name !== "Housse matelas à langer" ? lot[0].quantities : fabricsQuantities

    const handleClick = (model: string, index: number) => {
        setChoiceFabricsType(model)
        setFabricTypeIndex(index)
    }

    const choiceFabrics = (fabric: { id: string; name: string }) => {
        const isSelected = fabricSelected.some((item) => item.id === fabric.id)

        if (isSelected) {
            setFabricsSelected(fabricSelected.filter((item) => item.id !== fabric.id))
            setQuantities((q) => q - 1)
        } else {
            if (quantities < fabricsQuantitiesSelected) {
                setFabricsSelected([...fabricSelected, fabric])
                setQuantities((q) => q + 1)
            }
        }
    }

    return (
        <div className="flex flex-col flex-wrap mt-5 gap-2 text-start">
            <p className="font-poiret font-bold text-xl">Choisissez le(s) tissu(s)</p>
            <p className="font-poiret font-bold text-gray-500 mb-2" >Nombre de tissus séléctionnés : {quantities} / {fabricsQuantitiesSelected}</p>
            <div className="flex flex-row gap-2 mb-2">
                {typeSelected.map((model, index) => (
                    <button key={index} onClick={() => handleClick(model, index)} className={FabricTypeIndex === index ? "border-2 bg-[#7E649D] border-[#7E649D] text-white w-1/2" : "border-2 w-1/2 border-[#7E649D] text-lg"}>
                        <p>{model}</p>
                    </button>
                ))}
            </div>
            <div className="flex flex-col">
                {choiceFabricsType === "Uni"
                    ? uniFabric?.map((type, index) => (
                        <div key={index} className="flex flex-col mt-2">
                            <p className="font-poiret font-bold text-lg text-start">
                                {fabricsName(type)}
                            </p>

                            <div className="flex flex-row flex-wrap mt-2 gap-2">
                                {simpleFabrics
                                    .filter((img) => img.name.startsWith(type))
                                    .map((image) => {
                                        const isSelected = fabricSelected.some(
                                            (item) => item.id === image.id
                                        );

                                        return (
                                            <div key={image.id} className="relative group">
                                                <button
                                                    onClick={() =>
                                                        choiceFabrics({ id: image.id, name: image.name })
                                                    }
                                                    className={`w-20 aspect-square overflow-hidden rounded transition ${isSelected
                                                        ? "ring-2 ring-[#7E649D]"
                                                        : "border border-transparent"
                                                        }`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>

                                                <div className="pointer-events-none hidden group-hover:block absolute left-24 top-0 w-72 aspect-square rounded-xl shadow-2xl z-50 overflow-hidden">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))
                    : motifabric?.map((type, index) => (
                        <div key={index} className="flex flex-col mt-2">
                            <p className="font-poiret font-bold text-lg text-start">
                                {fabricsName(type)}
                            </p>

                            <div className="flex flex-row flex-wrap mt-2 gap-2">
                                {motifFabrics
                                    .filter((img) => img.name.startsWith(type))
                                    .map((image) => {
                                        const isSelected = fabricSelected.some(
                                            (item) => item.id === image.id
                                        );

                                        return (
                                            <div key={image.id} className="relative group">
                                                <button
                                                    onClick={() =>
                                                        choiceFabrics({ id: image.id, name: image.name })
                                                    }
                                                    className={`w-20 aspect-square overflow-hidden rounded transition ${isSelected
                                                        ? "ring-2 ring-[#7E649D]"
                                                        : "border border-transparent"
                                                        }`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>

                                                <div className="pointer-events-none hidden group-hover:block absolute left-24 top-0 w-72 aspect-square rounded-xl shadow-2xl z-50 overflow-hidden">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

function Strap({ straps, selectedStrap, setSelectedStrap }: { straps: ImageInterface[], selectedStrap: ImageInterface | null, setSelectedStrap: Dispatch<SetStateAction<ImageInterface | null>> }) {

    const handleSelectStrap = (strap: ImageInterface) => {
        setSelectedStrap((prev) => (prev?.id === strap.id ? null : strap))
    }

    return (
        <div>
            <p className="font-poiret font-bold text-lg mt-5">Je sélectionne une sangle</p>
            <div className="flex flex-row flex-wrap gap-2">
                {straps.map((strap) => {
                    const isSelected = selectedStrap?.id === strap.id
                    return (
                        <button key={strap.id} onClick={() => handleSelectStrap(strap)}
                            className={`w-20 border rounded transition ${isSelected ? "border-[#7E649D] border-2" : "border-transparent"}`}>
                            <img src={strap.url} alt={strap.name} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function Labels({ labels, selectedLabel, setSelectedLabel }: { labels: ImageInterface[], selectedLabel: ImageInterface | null, setSelectedLabel: Dispatch<SetStateAction<ImageInterface | null>> }) {


    const handleSelectStrap = (strap: ImageInterface) => {
        setSelectedLabel((prev) => (prev?.id === strap.id ? null : strap))
    }

    return (
        <div>
            <p className="font-poiret font-bold text-lg mt-5">Je sélectionne une étiquette</p>
            <div className="flex flex-row flex-wrap gap-2">
                {labels.map((label) => {
                    const isSelected = selectedLabel?.id === label.id
                    return (
                        <button key={label.id} onClick={() => handleSelectStrap(label)}
                            className={`w-20 border rounded transition ${isSelected ? "border-[#7E649D] border-2" : "border-transparent"}`}>
                            <img src={label.url} alt={label.name} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function Embroidery({
    embroidery,
    setEmbroidery,
    priceFields,
    setField,
    lot
}: {
    embroidery: string;
    setEmbroidery: Dispatch<SetStateAction<string>>;
    priceFields: PriceObjectType;
    setField: (key: keyof PriceObjectType, value: PriceField) => void;
    lot: Lot[];
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmbroidery(value);

        if (value.trim() !== "") {
            if (priceFields.lotPrice.active)
                setField("broderiePrice", { active: true, price: 5 * lot[0].quantities });
            else
                setField("broderiePrice", { active: true, price: 5 });

        } else {
            setField("broderiePrice", { active: false, price: 0 });
        }
    };

    return (
        <div>
            <div className="border border-[#7E649D] mt-5">
            </div>
            <p className="font-poiret font-bold text-lg text-left mt-5">Broder le prénom (+5€)</p>
            <div className="flex flex-row items-center">
                <IoIosWarning
                    color="red"
                    size={24}
                />
                <p className="pl-1 font-poiret font-bold text-red-500 text-sm">Je brode uniquement sur un tissu uni !</p>
            </div>
            <div className="flex mt-2">
                <input
                    placeholder="Prénom / Surnom"
                    value={embroidery}
                    onChange={handleChange}
                    className="border-2 border-[#7E649D] px-2"
                />
            </div>
        </div>
    )
}

function Gift({ gift, setGift, setMessage, priceFields, setField }: {
    gift: boolean, setGift: Dispatch<SetStateAction<boolean>>, setMessage: Dispatch<SetStateAction<string>>, priceFields: PriceObjectType, setField: (key: keyof PriceObjectType, value: PriceField) => void;
}) {

    const isGiftMsg = priceFields.giftMessagePrice.active;
    // const isGiftWrap = priceFields.giftWrapPrice;

    const onToggleGiftMessage = () => {
        setField("giftMessagePrice", {
            active: !isGiftMsg,
            price: !isGiftMsg ? 1 : 0,
        });
    };    //   const onToggleGiftWrap = () => {
    //     setGift(!gift);
    //     setField("giftWrapPrice", !isGiftWrap);
    //   };

    return (
        <div className="border-4 p-4 border-[#8574A6] mt-5">
            <div>
                <input
                    type="checkbox"
                    id="giftMsg"
                    checked={isGiftMsg}
                    onChange={onToggleGiftMessage}
                />
                <label htmlFor="giftMsg" className="font-poiret font-bold">
                    {" "}Je souhaite glisser un joli message (+1€)
                </label>

                {isGiftMsg && (
                    <textarea
                        placeholder="Mon message"
                        className="mt-2 border-2 w-full"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                )}
            </div>

            {/* <div className="mt-4">
              <input
                  type="checkbox"
                  id="giftWrap"
                  checked={isGiftWrap}
                  onChange={onToggleGiftWrap}
              />
              <label htmlFor="giftWrap" className="font-poiret font-bold">
                  {" "}Je souhaite un emballage cadeau (+2€)
              </label>
          </div> */}
        </div>
    );
}
function ConditionChecker({ productDetails }: { productDetails: Shopping }) {
    const [conditionIsChecked, setConditionIsChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const conditionCheckHandler = () => setConditionIsChecked((v) => !v);


    console.log("productDetails : ", productDetails)
    const handleAddToCart = () => {
        setError(null);
        if (!conditionIsChecked) {
            setError("Veuillez cocher la case avant d'ajouter au panier.");
            return;
        }
        try {
            const item = {
                id: crypto?.randomUUID?.() ?? String(Date.now()),
                addedAt: new Date().toISOString(),
                ...productDetails,
            };

            const key = "cm_cart";
            const raw = localStorage.getItem(key);
            const cart: any[] = raw ? JSON.parse(raw) : [];
            cart.push(item);
            localStorage.setItem(key, JSON.stringify(cart));

            alert("Article ajouté au panier:");
        } catch (e) {
            console.error(e);
            setError("Impossible d'ajouter au panier (stockage local).");
        }
    };

    return (
        <div>
            <div className="flex items-start gap-2 mt-6">
                <input
                    type="checkbox"
                    id="conditionCheckBox"
                    checked={conditionIsChecked}
                    onChange={conditionCheckHandler}
                    className="mt-1 border-[#8574A6]"
                />
                <label htmlFor="conditionCheckBox" className="font-poiret font-bold leading-5">
                    J'ai lu la description complète du produit et les conditions générales de vente.
                </label>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="border-2 border-[#8574A6] p-2 mt-5 font-poiret font-bold hover:bg-[#8574A6] hover:text-white"
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
}

function CustomBlanket({ setBlanketDimension }: { setBlanketDimension: Dispatch<SetStateAction<string>> }) {

    const [length, setLength] = useState<string>("")
    const [width, setWidth] = useState<string>("")

    setBlanketDimension(length + "/" + width)

    return (
        <div className="mt-5">
            <p className="mb-5 font-poiret font-bold text-2xl">Je défini la dimension de ma couverture</p>
            <div className="flex flex-row items-center">
                <IoIosWarning
                    color="red"
                    size={24}
                />
                <p className="pl-1 font-poiret font-bold text-red-500 text-sm">La dimension maximum est de : 70 cm x 140 cm</p>
            </div>
            <div className="flex mt-2 gap-5 items-center">
                <input
                    maxLength={3}
                    placeholder="Largeur en cm"
                    value={width}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,3}$/.test(value)) {
                            if (value === "" || parseInt(value) <= 70) {
                                setWidth(value);
                            }
                        }
                    }} className="border-2 border-[#7E649D] px-2"
                    type="text"
                    pattern="(?:0|[1-9]\d*)"
                    inputMode="numeric"
                />
                <p> X </p>
                <input
                    maxLength={3}
                    placeholder="Longueur en cm"
                    value={length}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,3}$/.test(value)) {
                            if (value === "" || parseInt(value) <= 140) {
                                setLength(value);
                            }
                        }
                    }} className="border-2 border-[#7E649D] px-2"
                    type="text"
                    pattern="(?:0|[1-9]\d*)"
                    inputMode="numeric"
                />
            </div>
        </div>
    )
}

function Bath({ setBearEar }: { setBearEar: Dispatch<SetStateAction<string>> }) {

    const response = ["Oui", "Non"]
    const [buttonIndex, setButtonIndex] = useState<number>(1)

    const handleClick = (index: number) => {
        setButtonIndex(index)
        setBearEar(response[index])
    }

    return (
        <div>
            <p className="font-poiret font-bold text-xl mt-5 mb-2">Je veux les oreilles d'ours</p>
            <div className="flex gap-5 ">
                {response.map((value, index) => (
                    <button key={index} onClick={() => handleClick(index)} className={buttonIndex === index ? "font-poiret font-bold text-lg text-white bg-[#7E649D] border-[#7E649D] border-2 p-1" : "font-poiret font-bold text-lg border-[#7E649D] border-2 p-1"}>{value}</button>
                ))}
            </div>
        </div>
    )
}

function ForWho({ who, setWho, setPrice, setField }: {
    who: IWho[], setWho: Dispatch<SetStateAction<string>>, setPrice: Dispatch<SetStateAction<number>>, setField: (key: keyof PriceObjectType, value: PriceField) => void;
}) {

    const [buttonIndex, setButtonIndex] = useState<number>(1)

    const handleClick = (index: number) => {
        setButtonIndex(index)
        setWho(who[index].name)
        setField("whoPrice", { active: true, price: who[index].price });
    }
    return (
        <div className="mt-5">
            <p className="mb-5 font-poiret font-bold text-xl">Choisissez le modèle :</p>
            <div className="flex gap-5">
                {who.map((w, index) => (
                    <button key={index} onClick={() => handleClick(index)} className={buttonIndex === index ? "font-poiret font-bold text-lg text-white bg-[#7E649D] border-[#7E649D] border-2 p-1" : "font-poiret font-bold text-lg border-[#7E649D] border-2 p-1"}>
                        {w.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

function ChangingMat({ closingSystem, setClosingSystem }: { closingSystem: string | null, setClosingSystem: Dispatch<SetStateAction<string | null>> }) {
    const response = ["Élastique", "Liens à nouer"]
    const [buttonIndex, setButtonIndex] = useState<number>(1)

    const handleClick = (index: number) => {
        setButtonIndex(index)
        setClosingSystem(response[index])
    }

    return (
        <div>
            <p className="font-poiret font-bold text-xl mt-5 mb-2">Type de fermeture :</p>
            <div className="flex gap-5 ">
                {response.map((value, index) => (
                    <button key={index} onClick={() => handleClick(index)} className={buttonIndex === index ? "font-poiret font-bold text-lg text-white bg-[#7E649D] border-[#7E649D] border-2 p-1" : "font-poiret font-bold text-lg border-[#7E649D] border-2 p-1"}>{value}</button>
                ))}
            </div>
        </div>
    )
}
type FormData = {
    pour: string;
    deLaPartDe: string;
    montant: number | "";
    message: string;
};

function GiftCard({ giftCardSended, setGiftCardSended, setGiftCardField, form, setForm, setField }: { giftCardSended: string | null, setGiftCardSended: Dispatch<SetStateAction<string | null>>, setGiftCardField: any, form: FormData, setForm: Dispatch<SetStateAction<FormData>>, setField: (key: keyof PriceObjectType, value: PriceField) => void; }) {
    const price = [1, 20, 50, 70, 80, 100, 120, 150, 200]
    const response = ["Voie éléctronique", "Lettre suivie"]
    const [buttonIndex, setButtonIndex] = useState<number>(0)
    const [priceButtonIndex, setPriceButtonIndex] = useState<number>(0)
    const MailCardPrice = 3;

    const handleClick = (index: number) => {
        setButtonIndex(index)
        setGiftCardSended(response[index])
        const selected = response[index];
        if (selected === "Lettre suivie") {
            setField("giftCardMail", { active: true, price: MailCardPrice });
        } else {
            setField("giftCardMail", { active: false, price: 0 });
        }
    }

    const handlePriceButtonClick = (index: number) => {
        setPriceButtonIndex(index)
        setGiftCardField("montant", price[index]);
        setField("giftCard", { active: true, price: price[index] });
    }

    useEffect(() => {
        setField("giftCard", { active: true, price: price[priceButtonIndex] });
    }, [])

    return (
        <div>
            <div className="flex flex-col mt-4 gap-4 ">
                <label className="font-poiret font-bold text-lg">
                    Pour :
                </label>
                <input
                    name="pour"
                    value={form.pour}
                    onChange={e => setGiftCardField("pour", e.target.value)}
                    placeholder="Nom du destinataire"
                    className="font-poiret font-bold text-md border-2 border-[#7E649D] w-1/2 p-2 italic"
                />

                <label className="font-poiret font-bold text-lg">
                    De la part de :
                </label>
                <input
                    name="deLaPartDe"
                    value={form.deLaPartDe}
                    onChange={e => setGiftCardField("deLaPartDe", e.target.value)}
                    placeholder="Ton nom"
                    className="font-poiret font-bold text-md border-2 border-[#7E649D] w-1/2 p-2 italic"
                />

                <label className="font-poiret font-bold text-lg">
                    Montant :
                </label>
                <div className="flex flex-row gap-2 flex-wrap">
                    {price.map((p, index) => (
                        <button onClick={() => handlePriceButtonClick(index)} className={priceButtonIndex === index ? "font-poiret font-bold text-md text-white bg-[#7E649D] border-[#7E649D] border-2 px-2" : "font-poiret font-bold text-md border-[#7E649D] border-2 px-2"} key={index}>{p}€</button>
                    ))}
                </div>
                <label className="font-poiret font-bold text-lg">
                    Message :
                </label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={e => setGiftCardField("message", e.target.value)}
                    rows={4}
                    placeholder="Ton petit mot…"
                    className="font-poiret font-bold text-md border-2 border-[#7E649D] italic "
                />

            </div>
            <p className="font-poiret font-bold text-xl mt-5 mb-2">Type d'envoi : </p>
            <div className="flex gap-5 ">
                {response.map((value, index) => (
                    <button key={index} onClick={() => handleClick(index)} className={buttonIndex === index ? "font-poiret font-bold text-lg text-white bg-[#7E649D] border-[#7E649D] border-2 p-1" : "font-poiret font-bold text-lg border-[#7E649D] border-2 p-1"}>{value}</button>
                ))}
            </div>
        </div>
    )
}