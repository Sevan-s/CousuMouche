import React from "react";
import { Link } from "react-router-dom";
import styles from './homestyles.module.css';
import Bed from '../../assets/images/lit.jpg';
import BathTowel from '../../assets/images/SortieDeBains.jpg';
import Blanket from '../../assets/images/couvertureTresor.jpg';
import Broderie from '../../assets/images/broderie.jpg';
import Fou from '../../assets/images/fou3.jpg';
import Packaging from '../../assets/images/packaging.jpg';
import Balle from '../../assets/images/balle_de_prehension.jpg';
import Bag from '../../assets/images/sac_a_dos.jpg';
import Bavoir from '../../assets/images/bavoirBandana.jpg';
import Coli from '../../assets/images/coli.png';
import Mondial from '../../assets/images/mondial.png';
import { FaTruck } from "react-icons/fa";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaHands } from "react-icons/fa";
import { IconContext } from "react-icons";

export function HomeScreen() {
    return (
        <div style={{ marginBottom: 50 }}>
            <div>
                <h1 style={{ fontFamily: 'Nickainley', color: "black", fontWeight: 'normal', marginTop: '2%', fontSize: 38, marginBottom: '1%' }}>Création couture pour enfants et parents</h1>
                <h2 style={{ fontFamily: 'Poiret', color: "black", fontWeight: 'bold', margin: 0, fontSize: 20 }}>AUTHENTIQUE, PERSONNALISÉ ET ÉCO-RESPONSABLE</h2>
            </div>
            <div style={{ backgroundColor: '#BDA9D4' }}>
                <p style={{ fontFamily: 'Poiret', fontWeight: 'bold', color: 'white', fontSize: 18, lineHeight: 1.8, paddingTop: '1%', paddingBottom: '1%' }}>Vous préparez votre séjour à la maternité ?<br />
                    Vous accueillez la naissance ?<br />
                    Vous souhaitez féliciter les heureux parents ?<br />
                    Vous êtes au bon endroit, Bienvenue  !</p>
            </div>
            <div>
                <h1 style={{ fontFamily: 'Nickainley', fontWeight: 'normal', marginTop: '3%', marginBottom: '3%', fontSize: 36 }}>Les engagements Cousu Mouche</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.EngagementBody}>
                    <div style={{ width: 250 }}>
                        <p style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: '#7E649D', fontSize: 24, margin: 0 }}>Créations uniques et<br /> personnalisées</p>
                        <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.5 }}>Cousu Mouche accorde une attention particulière à vos envies et vos goûts. Vous découvrirez ici les incontournables du moucheron. Des créations personnalisées, uniques ou fabriquées en petites séries dans un atelier du sud de France.</p>
                    </div>
                    <img src={Bed} style={{ width: 250 }} />
                    <img src={BathTowel} style={{ width: 250 }} />
                    <img src={Blanket} style={{ width: 250 }} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.EngagementBody}>
                    <img src={Balle} style={{ width: 250 }} />
                    <img src={Bag} style={{ width: 250 }} />
                    <img src={Bavoir} style={{ width: 250 }} />
                    <div style={{ width: 250 }}>
                        <p style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: '#7E649D', fontSize: 24, margin: 0 }}>Tissus éco-responsables</p>
                        <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.5 }}>Cousu Mouche privilégie l’authenticité et la qualité des finitions. Les tissus sont sélectionnés sur base de leurs procédés de fabrication et de leurs compositions afin qu’ils soient confortables et durables.</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.EngagementBigBody}>
                    <div style={{ width: 350 }}>
                        <p style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: '#7E649D', fontSize: 24 }}>Broderie à la main</p>
                        <img src={Broderie} style={{ width: 350 }} />
                        <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.5 }}>Envie de mettre votre touche personnel à votre commande ? Demandez moi de vous broder le nom ou le petit surnom du petit coeur</p>
                    </div>
                    <div style={{ width: 350 }}>
                        <p style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: '#7E649D', fontSize: 24 }}>Packaging soigné</p>
                        <img src={Packaging} style={{ width: 350 }} />
                        <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.5 }}>Invitez-vous au voyage ! Vos commandes sont soigneusement emballées et embaumées aux senteurs du sud. Et si c’est à offrir, comblez les heureux parents en y glissant un doux message. Il vous suffit de communiquer votre texte à la créatrice, elle se chargera du reste</p>
                    </div>
                    <div style={{ width: 350 }}>
                        <p style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: '#7E649D', fontSize: 24 }}>Prêt à porter</p>
                        <img src={Fou} style={{ width: 350 }} />
                        <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.5 }}>Entretenues préalablement avec de la lessive hypoallergénique testée dèrmatologiquement sans phosphates, ne craignez pas de soucis de décoloration et de rétrécissement des textiles ni d’effets néfastes pour votre peau. Soyez tranquille !</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles.EngagementBigBody}>
                    <div>
                        <IconContext.Provider value={{ style:{color: "#7E649D", fontSize:60}}}>
                            <FaHands  />
                        </IconContext.Provider>;
                        <p style={{fontFamily: 'Poiret', fontWeight: 'bold'}}>Fait main<br/>Atelier occitan</p>
                    </div>
                    <div>
                        <IconContext.Provider value={{ style:{color: "#7E649D", fontSize:60}}}>
                            <FaTruck />
                        </IconContext.Provider>;
                        <p style={{fontFamily: 'Poiret', fontWeight: 'bold'}}>Livraison<br/>3 à 5 semaines</p>
                    </div>
                    <div>
                        <IconContext.Provider value={{ style:{color: "#7E649D", fontSize:60}}}>
                            <BsCreditCard2FrontFill />
                        </IconContext.Provider>;
                        <p style={{fontFamily: 'Poiret', fontWeight: 'bold'}}>Paiement sécurisé</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ maxWidth: '7%', height: '7%' }} src={Coli} />
                <img style={{ maxWidth: '5%', height: '5%' }} src={Mondial} />
            </div>
        </div>
    )
}