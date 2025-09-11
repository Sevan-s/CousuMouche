import React, { SetStateAction, useEffect, useState } from "react";
import styles from './productcardstyles.module.css'
import { Product } from "../../../../utils/interfaces/productInterface";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Article } from "../../../../utils/interfaces/articleInterfaces";
import { Iproduct } from "../../../../utils/interfaces/productInterface";
import { IoIosWarning } from "react-icons/io";

interface Images {
    name: string;
    url: string;
}

interface FilterFabricsPicturesProps {
    images: Images[];
    tissusIndexByType: { [type: string]: number[] };
    setTissusIndexByType: React.Dispatch<React.SetStateAction<{ [type: string]: number[] }>>;
    fabricsType: string[];
    fabricsQuantities: number;
    totalSelected: number;
}

function extractName(path: string): string {
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.replace('.png', '');
}

export function ProductCard({ product, productlist }: { product: Product, productlist: Iproduct | undefined }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.name}`, { state: { product, productlist } });
    };

    return (
        <div className={styles.cardBody}>
            <div>
                {product.imageUrls && product.imageUrls?.length !== 0 ?
                    <img loading="lazy" src={product.imageUrls[0]} className={styles.productImage} /> : <img loading="lazy" src={product.imageUrl} className={styles.productImage} />
                }
            </div>
            <p className={styles.fontStyle} title={product.name}>{product.name}</p>
            <p className={styles.fontStyle}>{product.price} €</p>
            <button className={styles.buttonStyles} onClick={handleNavigate}>
                <p className={styles.buttonFontStyle}>Je découvre</p>
            </button>
        </div>
    );
}

export function ProductDetails({ setCartItems, cartItems }: { setCartItems: any, cartItems: Article[] }) {
    const { productName } = useParams();
    const location = useLocation();
    const { productlist } = location.state as { productlist: Iproduct };

    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [associateProduct, setAssociateProduct] = useState<Product | undefined>(undefined);

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [pictureIndex, setPictureIndex] = useState<number>(0);
    const [firsIsChecked, setfirstIsChecked] = useState(false);
    const [conditionIsChecked, setConditionIsChecked] = useState(false);
    const [validationButtonIsClicked, setValidationButtonIsClicked] = useState<boolean>(false);
    const [images, setImages] = useState<Images[]>([]);
    const [tissusIndexByType, setTissusIndexByType] = useState<{ [type: string]: number[] }>({});
    const [message, setMessage] = useState<string>('');
    const [gift, setGift] = useState<boolean>(false);
    const [filter, setFilter] = useState<Product>();
    const [selectedDimensionIndex, setSelectedDimensionIndex] = useState<number>(0);
    const [fabricsQuantities, setFabricsQuantities] = useState<number>(1);
    const giftCardPrice = [25, 50, 75, 100, 150, 200, 250, 300];
    const [giftCardPriceSelected, setGiftCardPriceSelected] = useState(0);
    const [selectedWho, setSelectedWho] = useState<string | undefined>(undefined);
    const [nameMaman, setNameMaman] = useState("");
    const [nameEnfant, setNameEnfant] = useState("");
    const [lotQuantitiesIndex, setLotQuantitiesIndex] = useState<number>();
    const [addAnneauDeDentision, setAddAnneauDeDentision] = useState<boolean>(false)
    const fullName = [nameMaman, nameEnfant].filter(Boolean).join(" / ");
    const navigate = useNavigate();

    const langeSize = [{dimension:'50 cm', price: 21}, {dimension:'80 cm', price: 26}, {dimension:'110 cm', price: 33}];
    const broderiePrice = 5;
    const messagePrice = 1;
    const giftPrice = 2;
    const motifs = ['uni', 'motif'];

    const defineDimension = (index: number) => {
        setSelectedDimensionIndex(index)
    }

    const defineLotQuantities = (index: number) => {
        if (lotQuantitiesIndex === undefined)
            setLotQuantitiesIndex(index)
        else
            setLotQuantitiesIndex(undefined)
    }

    if (lotQuantitiesIndex !== undefined)
        console.log("lot : ", product?.lot[lotQuantitiesIndex].price)
    useEffect(() => {
        if (productlist && productName) {
            const found = productlist.products.find(
                (p) => p.name.trim() === productName.trim()
            );
            setProduct(found);
        }
    }, [productlist, productName]);

    let associateProductname = product?.associateProduct;
    const findProductByName = () => {
        const associateProduct = productlist.products.find(product => product.name === associateProductname)

        return associateProduct
    }

    useEffect(() => {
        setAssociateProduct(findProductByName())
    }, [product])

    useEffect(() => {
        if (product?.fabricsQuantities && typeof product.fabricsQuantities === 'number') {
            setFabricsQuantities(product.fabricsQuantities);
        } else {
            setFabricsQuantities(1);
        }
    }, [product]);

    useEffect(() => {
        if (!product) return;
        let newPrice = product.price;
        if (selectedDimensionIndex) newPrice = langeSize[selectedDimensionIndex].price
        if (selectedWho === "Matchy Matchy") newPrice = product.price + product.price
        if (lotQuantitiesIndex !== undefined) newPrice = product.lot[lotQuantitiesIndex].price
        if (addAnneauDeDentision === true) newPrice = newPrice + 3
        if (name !== '') newPrice += broderiePrice;
        if (nameMaman !== '') newPrice += broderiePrice;
        if (nameEnfant !== '') newPrice += broderiePrice;
        if (gift) newPrice += giftPrice;
        if (message !== '') newPrice += messagePrice;
        setPrice(newPrice);
    }, [name, gift, message, product, selectedWho, nameEnfant, nameMaman, lotQuantitiesIndex, addAnneauDeDentision, selectedDimensionIndex]);

    useEffect(() => {
        fetch('https://cmback-ab08.onrender.com/upload/images/tissus')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setImages(data);
                else setImages([]);
            })
            .catch(() => setImages([]));
    }, []);

    useEffect(() => {
        if (product?.associateProduct && productlist) {
            const found = productlist.products.find(p => p.name === product.associateProduct);
            setFilter(found);
        }
    }, [product, productlist]);

    const totalSelectedFabrics = Object.values(tissusIndexByType)
        .reduce((acc, arr) => acc + ((arr && Array.isArray(arr)) ? arr.length : 0), 0);

    const selectedTissusNames: string[] = Object.entries(tissusIndexByType).flatMap(([type, indexes]) => {
        const filteredImages = images.filter(img => img.name.startsWith(type));
        return (indexes || []).map(idx => filteredImages[idx]?.name).filter(Boolean) as string[];
    });

    const tissusName = selectedTissusNames.map(name => {
        const parts = name.split('/');
        const lastPart = parts[parts.length - 1];
        return lastPart.replace('.png', '');
    });

    console.log("full : ", fullName, "name: ", name)

    const articleData: Article = {
        name: fullName ?? name,
        price: price ?? 0,
        broderieFirstName: name || '',
        image: product?.imageUrl || product?.imageUrls || '',
        subTotal: 0,
        quantity: 1,
        ...(tissusName.length && { tissus: tissusName }),
        ...(message && { message }),
        ...(gift && { gift }),
        ...(selectedWho && { who: selectedWho }),
        lot: product?.lot[0],
        ...(addAnneauDeDentision && { anneauDeDentision: true }),
    };

    const DefinedName = (value: string) => {
        setName(value)
        if (nameEnfant !== '' && nameMaman !== '') {
            setNameEnfant('')
            setNameMaman('')
        }
    };

    console.log("articleData: ", articleData)
    const addGiftMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

    const checkHandlerOne = () => setfirstIsChecked(!firsIsChecked);
    const checkHandler = () => setGift(!gift);
    const checkADHandler = () => setAddAnneauDeDentision(!addAnneauDeDentision);

    const conditionCheckHandler = () => setConditionIsChecked(!conditionIsChecked);

    const addToCart = (articleData: Article) => {
        setValidationButtonIsClicked(true);
        if (conditionIsChecked) {
            alert("Article ajouté au panier avec succès");
            setCartItems((prevCartItems: Article[]) => [...prevCartItems, articleData]);
        } else {
            alert("Merci de bien vouloir remplir les champs demandés.");
        }
    };

    const handleNavigate = () => {
        if (filter && filter.name) {
            navigate(`/product/${encodeURIComponent(filter.name)}`, { state: { productlist } });
        }
    };

    useEffect(() => {
        console.log('Selected price changed to:', giftCardPriceSelected)
    }, [giftCardPriceSelected])
    if (!product) return <div>Chargement...</div>;


    const handleClickForWho = (who: string) => setSelectedWho(who);


    return (
        <div className="mb-36 md:mb-24">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.productScreenBody}>
                    <div className={styles.productScreencolumn1}>
                        {product.imageUrls && product.imageUrls.length > 0 && product.name !== "Carte cadeau" &&
                            <img loading="lazy" className={styles.imageFormat} src={product.imageUrls[pictureIndex]} />
                        }
                        {product.imageUrls && product.imageUrls.length > 0 && product.name === "Carte cadeau" &&
                            <img loading="lazy" className={styles.imageFormatGiftCard} src={product.imageUrls[pictureIndex]} />
                        }
                        <div className={styles.secondaryPicturesContainer}>
                            {product.imageUrls && product.imageUrls.length > 0 &&
                                product.imageUrls.map((url, idx) => (
                                    <button
                                        key={idx}
                                        className={styles.secondaryPicturePosition}
                                        style={{
                                            background: 'none',
                                            padding: 0,
                                            marginRight: 8,
                                            minWidth: 100,
                                        }}
                                        onClick={() => setPictureIndex(idx)}
                                    >
                                        <img
                                            loading="lazy"
                                            src={url}
                                            className={styles.secondaryPictureStyle}
                                            style={{ opacity: idx === pictureIndex ? 1 : 0.7, width: '100%', aspectRatio: 1 / 1 }}
                                        />
                                    </button>
                                ))
                            }
                        </div>
                        <div>

                            {associateProduct !== undefined && associateProduct.imageUrls &&
                                <div>
                                    <p className="font-poiret font-bold text-lg mt-5 pb-2">Produit(s) associé(s)</p>
                                    <div className="w-[60%] lg:w-[40%]  flex flex-wrap gap-2 mb-5">
                                        <img src={associateProduct?.imageUrls[0]} />
                                        <p className="text-center">{associateProduct.name}</p>
                                        <button className={styles.associateProductButton} onClick={handleNavigate}>
                                            <p className={styles.buttonFontStyle}>Je découvre</p>
                                        </button>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                    <div className={styles.productScreencolumn2}>
                        <h2 style={{ marginTop: 0, fontWeight: 'bold' }} className="font-nickainley text-2xl pb-3">{product.name}</h2>
                        <p style={{ fontFamily: 'poiret', fontSize: "28px", fontWeight: 'bold', color: '#7E649D', margin: 0 }}>{price} €</p>
                        <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', marginTop: '5%', fontSize: 18, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{product.shortDescription}</p>
                        <div className="w-full border-[#7E649D] border-b-2 mt-5"></div>
                        {product.who.length > 0 &&
                            <p className="font-poiret font-bold mt-6 text-lg">Pour qui ?</p>
                        }
                        <div className="flex flex-row gap-2 mt-2">
                            {product.who && product.who.map((who, index) => (
                                <button key={index} onClick={() => handleClickForWho(who)}
                                    className={who === selectedWho ? "border-2 p-2 font-poiret font-bold border-[#7E649D] bg-[#7E649D] text-white hover:text-white text-sm" : "border-2 p-2 font-poiret font-bold border-[#7E649D] hover:bg-[#7E649D] hover:text-white text-sm"}>
                                    <p>{who}</p>
                                </button>
                            ))}
                        </div>
                        <div>
                            { product.name === "Housse matelas à langer" ?
                            <p className="font-poiret font-bold mt-6 text-lg">Je souhaite avoir le nombre de serviette suivante</p>
                            :
                            <p className="font-poiret font-bold mt-6 text-lg">Je souhaite acheter cet article par lot de</p>

                            }
                            {product.lot.length > 0 &&
                                product.lot.map((item, index) => (
                                    <button onClick={() => defineLotQuantities(index)}
                                        className={index !== lotQuantitiesIndex ? "border-2 w-20 p-2 font-poiret font-bold border-[#7E649D] text-sm" : "border-2 w-20 p-2 font-poiret font-bold bg-[#7E649D] text-white text-sm"}>
                                        <p>{item.quantities}</p>
                                    </button>

                                ))
                            }
                            {product.options?.map((option, index) => (
                                <div key={index}>
                                    {option === 'tissus' &&
                                        <div>
                                            <p className="font-poiret font-bold text-lg mt-5 pb-2">Choix du tissus</p>

                                            <p className="font-poiret text-sm italic mb-2">
                                                Sélection : {totalSelectedFabrics} / {fabricsQuantities}
                                            </p>

                                            <div className="flex flex-row gap-2">
                                                {(product.fabrics && product.fabrics?.length > 0 &&
                                                    <FilterFabricsPictures
                                                        images={images}
                                                        tissusIndexByType={tissusIndexByType}
                                                        setTissusIndexByType={setTissusIndexByType}
                                                        fabricsType={product.fabrics}
                                                        fabricsQuantities={fabricsQuantities}
                                                        totalSelected={totalSelectedFabrics}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    }
                                    {option === "broderie" &&
                                        <div>
                                            <p className="font-poiret text-lg mt-5 font-bold">Prénom à broder <span className="font-poiret font bold text-[16px]">(+5€)</span></p>
                                            <div className="flex flex-row items-center">
                                                <IoIosWarning
                                                    color="red"
                                                    size={24}
                                                />
                                                <p className="pl-1 font-poiret font-bold text-red-500 text-sm">Je brode uniquement sur un tissu uni !</p>
                                            </div>
                                            {selectedWho === "Matchy Matchy" ?
                                                <div>
                                                    <p>Adulte</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Entrez le prénom / surnom ici"
                                                        value={nameMaman}
                                                        onChange={(e) => setNameMaman(e.target.value)}
                                                        className={styles.inputStyle}
                                                    />
                                                    <p>Enfant</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Entrez le prénom / surnom ici"
                                                        value={nameEnfant}
                                                        onChange={(e) => setNameEnfant(e.target.value)}
                                                        className={styles.inputStyle}
                                                    />
                                                </div> :
                                                <input
                                                    type="text"
                                                    placeholder="Entrez le prénom / surnom ici"
                                                    value={name}
                                                    onChange={(event) => DefinedName(event.target.value)}
                                                    className={styles.inputStyle}
                                                />
                                            }
                                        </div>
                                    }

                                    {option === "dimension" &&
                                        <div>
                                            <p className="font-poiret text-lg pb-2 mt-5 font-bold">Dimension</p>
                                            <div className="flex flex-row gap-4">
                                                {langeSize.map((item, index) => (
                                                    <div key={index} >
                                                        <button onClick={() => defineDimension(index)}
                                                            className={index !== selectedDimensionIndex ? "border-2 w-20 p-2 font-poiret font-bold border-[#7E649D] text-sm" : "border-2 w-20 p-2 font-poiret font-bold bg-[#7E649D] text-white text-sm"}>
                                                            {item.dimension}
                                                        </button>
                                                    </div>

                                                ))}
                                            </div>

                                        </div>
                                    }
                                </div>
                            ))}
                            {product.name === "Doudou" &&
                                <div className="mt-5">
                                    <input type="checkbox" id="adcheckbox"
                                        checked={addAnneauDeDentision}
                                        onChange={checkADHandler}
                                    />
                                    <label htmlFor="adcheckbox" className="font-poiret font-bold"> Je souhaite avoir un anneau de dentition (+3€)</label>
                                </div>
                            }
                        </div>
                        <div className="flex w-full pt-2">
                            {product.name === "Carte cadeau" &&
                                <div className="w-full">
                                    <p className="font-poiret font-bold text-2xl mt-5">Prix</p>
                                    <div className="flex flex-row gap-5 w-full mb-5">
                                        {giftCardPrice.map((price: number, index: number) => (
                                            <PriceButton
                                                key={index}
                                                price={price}
                                                giftCardPriceSelected={giftCardPriceSelected}
                                                setGiftCardPriceSelected={setGiftCardPriceSelected}
                                            />
                                        ))
                                        }
                                    </div>
                                    <div>
                                        <p className="font-poiret font-bold text-2xl">Destinataire</p>
                                        <input
                                            placeholder="Nom du destinataire"
                                            className="p-2 w-full m-0 place-items-center rounded transition border-2 mb-5"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-poiret font-bold text-2xl">Expéditeur</p>
                                        <input
                                            placeholder="Nom de l'expéditeur"
                                            className="p-2 w-full m-0 place-items-center rounded transition border-2 mb-5"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-poiret font-bold text-2xl">Message</p>
                                        <textarea
                                            placeholder="Votre message"
                                            className="p-2 w-full m-0 place-items-center rounded transition border-[#E5E7EB] border-2 mb-5 h-40"
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        {product.name !== "Carte cadeau" &&
                            <div className="border-4 p-4 border-[#8574A6] mt-5">
                                <div>
                                    <input type="checkbox" id="firstCheckbox"
                                        checked={firsIsChecked}
                                        onChange={checkHandlerOne}
                                    />
                                    <label htmlFor="firstCheckbox" className="font-poiret font-bold"> Je souhaite glisser un joli message (+1€) </label>
                                    {firsIsChecked === true &&
                                        <textarea
                                            placeholder="Mon message"
                                            className="mt-2 border-2 w-full"
                                            onChange={addGiftMessage}
                                        />
                                    }
                                </div>
                                <div>
                                    <input type="checkbox" id="checkbox"
                                        checked={gift}
                                        onChange={checkHandler}
                                    />
                                    <label htmlFor="checkbox" className="font-poiret font-bold"> Je souhaite avoir un emballage cadeau (+2€) </label>
                                </div>
                            </div>
                        }
                        <div className="flex items-start gap-2 mt-4 pl-5">
                            <input
                                type="checkbox"
                                id="conditionCheckBox"
                                checked={conditionIsChecked}
                                onChange={conditionCheckHandler}
                                className="mt-1"
                            />
                            <label
                                htmlFor="conditionCheckBox"
                                className="font-poiret font-bold leading-5"
                            >
                                J'ai lu la description complète du produit et les conditions générales de vente.
                            </label>
                        </div>
                        <div>
                            <button onClick={() => addToCart(articleData)} className={styles.validationButton}>Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="w-[80%] text-left lg:w-[50%]">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley', fontSize: 24, marginBottom: 20 }}>Description :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.2, marginBottom: 20, fontSize: 18, whiteSpace: 'pre-line' }}>{product.description}</p>
                </div>
                <div className="w-[80%] text-left lg:w-[50%]">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley', fontSize: 24, marginBottom: 20, marginTop: 20 }}>Conseils d'entretien :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.2, fontSize: 18, whiteSpace: 'pre-line' }}>{product.maintenance}</p>
                </div>
            </div>
        </div>
    );
}

export function FilterFabricsPictures(props: FilterFabricsPicturesProps) {
    const [motifSelected, setMotifSelected] = useState<'uni' | 'motif'>('uni');

    const handleTissusClick = (type: string, idx: number) => {
        const current = props.tissusIndexByType[type] || [];
        const alreadySelected = current.includes(idx);

        if (alreadySelected) {
            props.setTissusIndexByType(prev => ({
                ...prev,
                [type]: current.filter(i => i !== idx),
            }));
            return;
        }

        const totalNow = Object.values(props.tissusIndexByType)
            .reduce((acc, arr) => acc + ((arr && Array.isArray(arr)) ? arr.length : 0), 0);

        const prospectiveTotal = totalNow + 1;

        if (prospectiveTotal > props.fabricsQuantities) {
            alert(`Vous ne pouvez sélectionner que ${props.fabricsQuantities} tissu(s).`);
            return;
        }

        props.setTissusIndexByType(prev => ({
            ...prev,
            [type]: [...current, idx],
        }));
    };

    const fabricsName = (type: string) => {
        switch (type) {
            case 'uni/coton':
                return 'Coton'
            case 'uni/doubleGaze':
                return 'Double gaze'
            case 'uni/NidDAbeille':
                return "Nid d'abeille"
            case 'uni/Polaire':
                return "Polaire"
            case 'uni/velour':
                return "Velour"
            case 'motif/Coton':
                return "Coton"
            case 'motif/doubleGaz':
                return "Double Gaze"
            default:
                return type;
        }
    }

    return (
        <div>
            <div className="flex gap-4 mb-4">
                {props.fabricsType.some(fabric => fabric.includes('uni')) && (
                    <button
                        className={motifSelected === 'uni'
                            ? 'bg-[#7E649D] text-white px-4 py-2  font-poiret font-bold'
                            : 'px-4 py-2 font-poiret font-bold border-[#7E649D] border-2'}
                        onClick={() => setMotifSelected('uni')}
                    >
                        Uni
                    </button>
                )}
                {props.fabricsType.some(fabric => fabric.includes('motif')) && (

                    <button
                        className={motifSelected === 'motif'
                            ? 'bg-[#7E649D] text-white px-4 py-2  font-poiret font-bold'
                            : ' px-4 py-2  font-poiret font-bold border-[#7E649D] border-2'}
                        onClick={() => setMotifSelected('motif')}
                    >
                        Motif
                    </button>
                )}
            </div>
            {props.fabricsType && props.fabricsType.length > 0 &&
                props.fabricsType
                    .filter(type => type.startsWith(motifSelected))
                    .map((type: string) => (
                        <div key={type}>
                            <p className="font-poiret font-bold mb-2 text-xl">{fabricsName(type)}</p>
                            <div className="flex flex-row gap-2 mb-4 flex-wrap">
                                {props.images
                                    .filter((image: any) => image.name.startsWith(type))
                                    .map((image: any, idx: number) => {
                                        const isSelected = Array.isArray(props.tissusIndexByType[type])
                                            ? props.tissusIndexByType[type].includes(idx)
                                            : false;

                                        return (
                                            <div key={idx} className="relative group">
                                                <button
                                                    onClick={() => handleTissusClick(type, idx)}
                                                    className={"w-24 aspect-square overflow-hidden rounded " + (isSelected ? "ring-4 ring-[#7E649D]" : "")}
                                                    aria-label={`Choisir tissu ${image.name}`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>

                                                <div className="pointer-events-none hidden group-hover:block absolute left-28 top-0 w-72 aspect-square rounded-xl shadow-2xl z-50 overflow-hidden">
                                                    <img
                                                        src={image.url}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

function PriceButton({ price, giftCardPriceSelected, setGiftCardPriceSelected }: { price: number, giftCardPriceSelected: number, setGiftCardPriceSelected: React.Dispatch<SetStateAction<number>> }) {
    const handleClick = () => {
        setGiftCardPriceSelected(price)
    }
    const isSelected = price === giftCardPriceSelected

    return (
        <button
            onClick={handleClick}
            aria-pressed={isSelected}
            className={`p-2 w-full m-0 place-items-center rounded transition
        ${isSelected
                    ? "border-2 border-[#7E649D] bg-[#7E649D] text-white"
                    : "border-2 border-[#7E649D] bg-transparent text-[#7E649D]"
                }`}
        >
            <p>{price} €</p>
        </button>
    )
}