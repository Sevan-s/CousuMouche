import React, { useEffect, useState } from "react";
import styles from './productcardstyles.module.css'
import { productData } from "../../../../utils/interfaces/productInterface";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getColors } from "../../../../API/api";
import { IColorData, IColors } from "../../../../utils/interfaces/colorsInterfaces";
import { Article } from "../../../../utils/interfaces/articleInterfaces";

export function ProductCard({ product }: { product: productData}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.attributes.ProductName}`, { state: { product } });
    };

    return (
        <div className={styles.cardBody}>
            <div>
                <img src={"http://localhost:8081" + product.attributes.ProductPicture.data.attributes.url} className={styles.imageFormat} />
            </div>
            <p className={styles.fontStyle}>{product.attributes.ProductName}</p>
            <p className={styles.fontStyle}>{product.attributes.Price} €</p>
            <button className={styles.buttonStyles} onClick={handleNavigate}>
                <p className={styles.buttonFontStyle}>Choix des options</p>
            </button>
        </div>
    );
}

export function ProductDetails({setCartItems, cartItems} :{setCartItems: any, cartItems: Article[]}) {
    const location = useLocation();
    const { product } = location.state as {
        product: productData;
    };

    const [colors, setColors] = useState<IColors>();
    const [colorsChoiced, setColorsChoiced] = useState<string>()
    const [motifChoiced, setMotifChoiced] = useState<string>()
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(product.attributes.Price)
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
    const [selectedMotifIndex, setSelectedMotifIndex] = useState<number | null>(null);
    const [pictureIndex, setPictureIndex] = useState<number>(0);

    const broderiePrice = 5
    const motifs = ['uni', 'fleuri', 'animaux']

    const articleData: Article = {
        name: product.attributes.ProductName,
        price: price,
        color: colorsChoiced || '',
        motif: motifChoiced || '',
        broderieFirstName: name || '',
        image: "http://localhost:8081" + product.attributes.ProductPicture.data.attributes.url || ''
    };

    const addToCart = (articleData: Article) => {
        setCartItems((prevCartItems: Article[]) => [...prevCartItems, articleData]);
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
            setPrice(product.attributes.Price + broderiePrice)
        } else {
            setPrice(product.attributes.Price)

        }
    }, [name])
    return (
        <div style={{ marginBottom: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.productScreenBody}>
                    <div className={styles.productScreencolumn}>
                        <img src={"http://localhost:8081" + product.attributes.secondaryPicturesProduct.data[pictureIndex].attributes.url} />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {product.attributes.secondaryPicturesProduct.data.map((picture, index) => (
                                <button key={index} className={styles.secondaryPicturePosition} onClick={() => { setPictureIndex(index) }}>
                                    <img key={index} src={"http://localhost:8081" + picture.attributes.url} className={styles.secondaryPictureStyle} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.productScreencolumn}>
                        <h2 style={{ marginTop: 0, fontFamily: 'Poiret', fontWeight: 'bold' }}>{product.attributes.ProductName}</h2>
                        {/* à redéfinir */}
                        {name === '' ?
                            <p style={{ fontFamily: 'poiret', fontSize: "28px", fontWeight: 'bold', color: '#7E649D', margin: 0 }}>{price} €</p>
                            :
                            <p style={{ fontFamily: 'poiret', fontSize: "28px", fontWeight: 'bold', color: '#7E649D', margin: 0 }}>{price} €</p>
                        }
                        <p style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>{product.attributes.Presentation}</p>
                        <p style={{ fontWeight: 'bold', fontFamily: 'Poiret' }}>Couleurs</p>
                        <div className={styles.buttonStyle}>
                            {colors !== undefined && colors.data.map((color, index) => (
                                <button
                                    key={index}
                                    className={`${selectedColorIndex === index ? styles.selectedColor : styles.ColorsButton}`}
                                    onClick={() => handleColorClick(index, color.attributes.Colors)}
                                >
                                    <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', margin:0  }}>
                                        {color.attributes.Colors}
                                    </p>

                                </button>
                            ))}
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', fontFamily: 'Poiret' }}>Motif</p>
                            <div className={styles.buttonStyle}>
                                {motifs.map((motif, motifIndex) => (
                                    <button key={motifIndex}
                                        className={`${selectedMotifIndex === motifIndex ? styles.selectedColor : styles.ColorsButton}`}
                                        onClick={() => handleMotifClick(motifIndex, motif)}
                                    >
                                        <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', margin:0 }}>
                                            {motif}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', fontFamily: 'Poiret' }}>Prénom à broder (+5€)</p>
                            <input
                                type="text"
                                placeholder="Entrez le prénom ici"
                                value={name}
                                onChange={(event) => DefinedName(event.target.value)}
                                className={styles.inputStyle}
                            />
                        </div>
                        <div>
                            <button onClick={() => addToCart(articleData)} className={styles.validationButton}>Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley' }}>Description :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.5 }}>{product.attributes.Description}</p>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley' }}>Entretien :</h2>
                    <p style={{ fontWeight: 'bold', fontFamily: 'Poiret', lineHeight: 1.5 }}>{product.attributes.Entretien}</p>
                </div>
                <div style={{ width: '50%', textAlign: 'left' }}>
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Nickainley' }}>Je personnalise mon article :</h2>
                    <p style={{ fontWeight: 'bolder', fontFamily: 'Poiret', lineHeight: 1.5 }}>{product.attributes.Personnalisation}</p>
                </div>
            </div>
        </div>
    );
};