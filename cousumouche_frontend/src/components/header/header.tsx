import React, { useState } from "react";
import styles from "./headerStyles.module.css";
import Logo from '../../assets/images/CousuMoucheLogo.png';
import { Link } from "react-router-dom";
import { Article } from "../../utils/interfaces/articleInterfaces";

export function Header({cartItems} : {cartItems: Article[]}) {
    const [buttonStates, setButtonStates] = useState([false, false, false, false, false]);

    const handleButtonClick = (buttonIndex: number) => {
        const updatedButtonStates = buttonStates.map((state, index) => index === buttonIndex);
        setButtonStates(updatedButtonStates);
    };

    return (
        <div style={{ margin: 0 }}>
            <div style={{ width: '100%', fontFamily: 'Poiret', fontWeight: 'bold', backgroundColor: '#7E649D', marginTop: 0, paddingTop: '0.5%', paddingBottom: '0.5%' }}>
                <p style={{ margin: 0, color: 'white', paddingTop: '0.2%', paddingBottom: '0.2%' }}>Commande livrée en France Métropolitaine et en Belgique. Délai de confection et de livraison : 4 semaines</p>
            </div>
            <img src={Logo} style={{ width: '12%' }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.headerBody}>
                    <Link to="/">
                        <button
                            className={buttonStates[0] ? `${styles.buttonStyles} ${styles.buttonActive}` : styles.buttonStyles}
                            onClick={() => handleButtonClick(0)}
                        >
                            Accueil
                        </button>
                    </Link>
                    <Link to="/shop">
                        <button
                            className={buttonStates[1] ? `${styles.buttonStyles} ${styles.buttonActive}` : styles.buttonStyles}
                            onClick={() => handleButtonClick(1)}
                        >
                            Boutique
                        </button>
                    </Link>
                    <Link to="/about">
                        <button
                            className={buttonStates[2] ? `${styles.buttonStyles} ${styles.buttonActive}` : styles.buttonStyles}
                            onClick={() => handleButtonClick(2)}
                        >
                            Qui suis-je ?
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button
                            className={buttonStates[3] ? `${styles.buttonStyles} ${styles.buttonActive}` : styles.buttonStyles}
                            onClick={() => handleButtonClick(3)}
                        >
                            Contact
                        </button>
                    </Link>
                    <Link to="/panier">
                        <button
                            className={buttonStates[4] ? `${styles.buttonStyles} ${styles.buttonActive}` : styles.buttonStyles}
                            onClick={() => handleButtonClick(4)}
                        >
                            Panier {cartItems.length > 0 && `(${cartItems.length})`}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}