import { useEffect, useState } from "react";
import { Article } from "../../utils/interfaces/articleInterfaces";
import styles from './panierStyles.module.css'

export function PanierScreen({ cartItems, setCartItems }: { cartItems: Article[], setCartItems: any }) {
    const [total, setTotal] = useState<number>(0);
    const quantity = 1;


    useEffect(() => {
        const totalValue = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalValue);
    }, [cartItems]);

    return (
        <div style={{ marginTop: '2%', display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
            <div className={styles.productListBody}>
                <div className={styles.panierBody}>
                    <p>Produits</p>
                    <p> Prix</p>
                    <p>Quantité</p>
                    <p>Sous-total</p>
                </div>
                {cartItems.map((item, index) => (
                    <div key={index}>
                        <div className={styles.productBody}>
                            <div className={styles.product}>
                                <img src={item.image} style={{ maxWidth: '80%', marginRight: '5%' }} />
                                <div style={{ width: '100%' }}>
                                    <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', padding: 0 }}>{item.name}</p>
                                    <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', margin: 0 }}>Couleur :</p>
                                    <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', marginTop: 0 }}>{item.color}</p>
                                    <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', margin: 0 }}>Motif :</p>
                                    <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', marginTop: 0 }}>{item.motif}</p>
                                    {item.broderieFirstName !== '' &&
                                        <div>
                                            <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', margin: 0 }}>Broderie :</p>
                                            <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', marginTop: 0 }}>{item.broderieFirstName}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <p>{item.price} €</p>
                            <p>{quantity}</p>
                            <p>{item.price} €</p>
                        </div>
                        <div style={{ borderStyle: 'solid', borderWidth: 0.5, borderColor: '#EAEAEA', width: '100%' }} />
                    </div>
                ))}
                <div style={{display:'flex', justifyContent:'right'}}>

                    <div style={{ width: '50%', marginTop: '2%' }}>
                        <h2 style={{ textAlign: 'center', backgroundColor: '#D3BCE3', margin: 0, padding: '10px' }}>Total Panier</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid grey' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '40%', borderRight: '1px solid grey', borderBottom: '1px solid grey', padding: '5%' }}>Sous-total</td>
                                    <td style={{ borderBottom: '1px solid grey', padding: '5%', textAlign: 'right' }}>{total} €</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '40%', borderRight: '1px solid grey', borderBottom: '1px solid grey', padding: '5%' }}>Expédition</td>
                                    <td style={{ borderBottom: '1px solid grey', padding: '5%', textAlign: 'right' }}> options
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '40%', borderRight: '1px solid grey', padding: '5%' }}>Total</td>
                                    <td style={{ padding: '5%', textAlign: 'right', fontWeight: 'bold' }}>{total.toFixed(2)} €</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'right', marginTop: '2%' }}>
                    <button className={styles.validationButton}>Valider la commande</button>
                </div>
            </div>
        </div>
    )
}

