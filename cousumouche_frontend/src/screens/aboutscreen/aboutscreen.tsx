import React from "react";
import styles from './aboutstyles.module.css';
import Mouche from '../../assets/images//mouche.jpg';
export function Aboutscreen() {
    return (
        <div style={{marginBottom:50}}>
            <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                <h1 style={{ fontFamily: 'Nickainley', color: '#7E649D', fontWeight: 'normal' }}>Qui suis-je ?</h1>
            </div>
            <div>
                <h1 style={{ fontFamily: 'Nickainley', fontWeight: 'normal' }}>« Mes envies de liberté, de créativité et la maternité m’ont amené à me créer une vie sur mesure ! »</h1>
                <p style={{ fontFamily: 'poiret', textAlign: 'right', marginRight: '15%' }}>Perrine, créatrice de la marque « Cousu Mouche »</p>
            </div>
            <div style={{ marginTop: '2%' }}>
                <p style={{ fontFamily: 'poiret', fontWeight: 'bold' }}>Avant même de découvrir la créatrice, vous vous demandez peut-être pourquoi avoir mêlé une mouche à tout ça !? Ici, Elle prend la parole et lève le voile ...</p>
            </div>
            <div className={styles.aboutColumnPosition}>
                <div className={styles.columnStyle}>
                    <img style={{width:'100%'}} src={Mouche}/>
                </div>
                <div className={styles.columnStyle}>
                    <p style={{textAlign:'justify', marginLeft:'5%', fontFamily:'Poiret', fontWeight:'bold', lineHeight: 1.78}}>
                    Né d’une anecdote familiale, je réponds depuis ma tendre enfance au doux surnom de « Mouche ».<br/>
C’est au sein du foyer familial aux valeurs simples et humanistes que j’ai développé ma créativité, mon goût pour le « fait main » et mon plaisir d’offrir.<br/><br/>
Fille d’une infirmière et d’un entrepreneur, je me suis à mon tour formée pour devenir une blouse blanche. Guidée par la passion et l’envie de liberté, je me suis alors lancée dans l’entreprenariat en 2021 en créant « Cousu Mouche ». Et oui, comme le dicton le dit si bien : « des chiens ne font pas des chats ! », mieux encore « des mouches ne font pas des moustiques! ».<br/><br/>
Native d’un pays où le sens de la fête et la chaleur humaine sont ancrés, j’aborde la vie avec joie (même sous la pluie !). Aujourd’hui expatriée au sud de la France, en occitanie plus exactement, j’évolue dans un environnement naturel où les champs de tournesols, les lavandes et les vignes ont remplacés les barraques à frites. Vous l’aurez compris, mes créations sont le reflet de mon univers champêtre.<br/><br/>
Inspirée par le chamboulement d’Amour que m’offre la maternité, je crée et confectionne des articles de puériculture avec délicatesse où le souci du détail, la qualité des matières et la passion sont mes Maîtres Mots ! J’accorde également beaucoup d’attention pour faire vivre une tendre expérience à celles qui ont mis au monde, et de manière générale à toutes les femmes, ce pour quoi j’ai voulu leur dédier une partie de mes créations.<br/><br/>
Et voilà, comment tout naturellement, j’ai souhaité que mes créations soient imprégnées par la mouche que je suis.
                    </p>
                </div>
            </div>
        </div>
    )
}