import React from "react";
import Styles from './contactStyles.module.css'

export function ContactScreen() {
    return (
        <div style={{ marginBottom: 50 }}>
            <div style={{ marginTop: '2%'}}>
                <h1 style={{ fontFamily: 'Nickainley', fontWeight: 'normal', color: "#7E649D" }}>Contact</h1>
            </div>
            <div style={{ width: '100%', backgroundColor: '#7E649D', color: 'white', paddingTop: '0.5%', paddingBottom: '0.5%', fontFamily: 'Poiret', fontWeight: 'bold' }}>
                <p>Besoin d’un renseignement sur une création, les délais de livraison ou une commande en cours ?<br /><br />
                    Laissez-moi un message via ce formulaire de contact ou par message privé via les réseaux sociaux.<br /><br />
                    Je réponds à vos demandes dans un délai de 72h.<br /><br />
                    Merci de votre compréhension !</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '1%', textAlign: 'right', width: '20%' }}>Sujet</p>
                <input
                    type="text"
                    placeholder="Entrez votre texte ici"
                    // value={valeur}
                    // onChange={handleChange}
                    className={Styles.inputStyle}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '1%', textAlign: 'right', width: '20%' }}>Adresse e-mail</p>
                <input
                    type="text"
                    placeholder="Entrez votre adresse e-mail ici"
                    // value={valeur}
                    // onChange={handleChange}
                    className={Styles.inputStyle}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ marginRight: '1%', textAlign: 'right', width: '20%' }}>Message</p>
                <textarea
                    placeholder="Entrez votre message ici"
                    // value={valeur}
                    // onChange={handleChange}
                    className={Styles.inputStyle}
                    style={{ height: '150px', resize: 'vertical' }}
                />
            </div>
            <button className={Styles.validateButton}>Envoyer</button>
        </div>
    )
}