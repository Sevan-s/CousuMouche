import React, { useEffect, useState } from "react";
import styles from './productcardstyles.module.css'
import { Product, productData } from "../../../../utils/interfaces/productInterface";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getColors } from "../../../../API/api";
import { IColorData, IColors } from "../../../../utils/interfaces/colorsInterfaces";
import { Article } from "../../../../utils/interfaces/articleInterfaces";

export function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.name}`, { state: { product } });
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
    const location = useLocation();
    const { product } = location.state as {
        product: Product;
    };

    const [colors, setColors] = useState<IColorData[]>([]);
    const [colorsChoiced, setColorsChoiced] = useState<string>()
    const [motifChoiced, setMotifChoiced] = useState<string>()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(product.price)
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
    const [selectedMotifIndex, setSelectedMotifIndex] = useState<number | null>(null);
    const [pictureIndex, setPictureIndex] = useState<number>(0);
    const [firsIsChecked, setfirstIsChecked] = useState(false)
    const [IsChecked, setIsChecked] = useState(false)
    const [conditionIsChecked, setConditionIsChecked] = useState(false)
    const [validationButtonIsClicked, setValidationButtonIsClicked] = useState<boolean>(false)


    const broderiePrice = 5
    const motifs = ['uni', 'motif']

    const articleData: Article = {
        name: product.name,
        price: price,
        color: colorsChoiced || '',
        motif: motifChoiced || '',
        broderieFirstName: name || '',
        image: product.imageUrl || product.imageUrls || '',
        subTotal: 0,
        quantity: 1,
    };

    const checkHandlerOne = () => {
        setfirstIsChecked(!firsIsChecked)
    }
    const checkHandler = () => {
        setIsChecked(!IsChecked)
    }

    const conditionCheckHandler = () => {
        setConditionIsChecked(!conditionIsChecked)
    }
    const addToCart = (articleData: Article) => {
        setValidationButtonIsClicked(true)
        if (conditionIsChecked === true) {
            alert("Article ajouté au panier avec succès")
            setCartItems((prevCartItems: Article[]) => [...prevCartItems, articleData]);
        } else {
            alert("Merci de bien vouloir remplir les champs demandés.")
        }
    };

    const handleColorClick = (index: number, value: string) => {
        if (colorsChoiced === value) {
            setColorsChoiced('')
        } else {
            setColorsChoiced(value)
        }
        setSelectedColorIndex(index === selectedColorIndex ? null : index);
    };

    const handleMotifClick = (index: number, value: string) => {
        if (motifChoiced === value) {
            setMotifChoiced('')
        } else {
            setMotifChoiced(value)
        }
        setSelectedMotifIndex(index === selectedMotifIndex ? null : index);
    };

    const getAllColors = async () => {
        const response = await getColors()
        console.log('response:  ', response)
        setColors(response)
    }

    const DefinedName = (value: string) => {
        setName(value)
    }

    useEffect(() => {
        getAllColors()
    }, [])

    useEffect(() => {
        if (name !== '') {
            setPrice(product.price + broderiePrice)
        } else {
            setPrice(product.price)

        }
    }, [name])
    return (
        <div className="mb-36 md:mb-24">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.productScreenBody}>
                    <div className={styles.productScreencolumn1}>
                        {product.imageUrls !== undefined && product.imageUrls.length > 0 ?
                            <img loading="lazy" className={styles.imageFormat} src={product.imageUrls[pictureIndex]} /> : <img loading="lazy" src={product.imageUrl} className={styles.imageFormat} />
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
                                            style={{ opacity: idx === pictureIndex ? 1 : 0.7, width: '100%', aspectRatio: 1/1 }}
                                        />
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.productScreencolumn2}>
                        <h2 style={{ marginTop: 0, fontFamily: 'Poiret', fontWeight: 'bold' }}>{product.name}</h2>
                        {/* à redéfinir */}
                        {name === '' ?
                            <p style={{ fontFamily: 'poiret', fontSize: "28px", fontWeight: 'bold', color: '#7E649D', margin: 0 }}>{price} €</p>
                            :
                            <p style={{ fontFamily: 'poiret', fontSize: "28px", fontWeight: 'bold', color: '#7E649D', margin: 0 }}>{price} €</p>
                        }
                        <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', marginTop: '5%'}}>{product.shortDescription}</p>
                        {/* <p className="font-poiret text-lg pb-2 font-bold">Choix du tissu extérieur</p>
                        <div className={styles.buttonStyle}>
                            {colors.map((color, index) => (
                                <button
                                    key={index}
                                    className={`${selectedColorIndex === index ? styles.selectedColor : styles.ColorsButton}`}
                                    onClick={() => handleColorClick(index, color.name)}
                                >
                                    <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', margin: 0 }}>
                                        {color.name}
                                    </p>
                                </button>
                            ))}
                        </div> */}
                        <div>
                            <p className="font-poiret font-bold text-lg mt-5 pb-2">Choix du tissu extérieur</p>
                            <div className={styles.buttonStyle}>
                                {motifs.map((motif, motifIndex) => (
                                    <button key={motifIndex}
                                        className={`${selectedMotifIndex === motifIndex ? styles.selectedColor : styles.ColorsButton}`}
                                        onClick={() => handleMotifClick(motifIndex, motif)}
                                    >
                                        <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', margin: 0 }}>
                                            {motif}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="font-poiret text-lg pb-2 mt-5 font-bold">Prénom à broder <span className="font-poiret font bold text-[16px]">(+5€)</span></p>
                            <input
                                type="text"
                                placeholder="Entrez le prénom ici"
                                value={name}
                                onChange={(event) => DefinedName(event.target.value)}
                                className={styles.inputStyle}
                            />
                        </div>
                        <div className="border-4 p-4 border-[#8574A6] mt-5">
                            <div>
                                <input type="checkbox" id="firstCheckbox"
                                    checked={firsIsChecked}
                                    onChange={checkHandlerOne}
                                />
                                <label htmlFor="firstCheckbox" className="font-poiret font-bold"> Je souhaite glisser une jolie carte dans mon paquet (+1€) </label>
                                {firsIsChecked === true &&
                                    <textarea
                                        placeholder="Mon message"
                                        className="mt-2 border-2 w-full"
                                    />
                                }
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox"
                                    checked={IsChecked}
                                    onChange={checkHandler}
                                />
                                <label htmlFor="checkbox" className="font-poiret font-bold"> Je souhaite ajouter un emballage cadeau (+2€) </label>
                            </div>
                            <div>
                                <input type="checkbox" id="conditionCheckBox"
                                    checked={conditionIsChecked}
                                    onChange={conditionCheckHandler}
                                    className="mt-10"
                                />
                                <label htmlFor="conditionCheckBox" className="font-poiret font-bold"> J'ai lu la description complète du produit et les conditions générales de vente</label>
                                {validationButtonIsClicked === true && conditionIsChecked === false &&
                                    <p className="text-red-400">Merci de valider le champ ci-dessus afin d'ajouter l'article à votre panier.</p>
                                }
                            </div>
                        </div>
                        <div>
                            <button onClick={() => addToCart(articleData)} className={styles.validationButton}>Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="w-[80%] text-left lg:w-[50%]">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley', fontSize: 24 }}>Description :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.5, marginBottom: 20 }}>{product.description}</p>
                </div>
                <div className="w-[80%] text-left lg:w-[50%]">
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley', fontSize: 24 }}>Conseils d'entretien :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.5 }}>{product.maintenance}</p>
                </div>
                {/* <div style={{ width: '50%', textAlign: 'left' }}>
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley' }}>Je personnalise mon article :</h2>
                    <p style={{ fontWeight: 'bolder', fontFamily: 'Poiret', lineHeight: 1.5 }}>{product.shortDescription}</p>
                </div> */}
            </div>
        </div>
    );
};