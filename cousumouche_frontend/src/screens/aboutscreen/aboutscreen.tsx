import React from "react";
import Mouche from '../../assets/images//mouche.jpg';
export function Aboutscreen() {
    return (
        <div className="mb-36">
            <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                <h1 style={{ fontFamily: 'Nickainley', color: '#7E649D', fontWeight: 'normal', fontSize: '24px' }}>Qui suis-je ?</h1>
            </div>
            <div className="mb-5">
                <h1 style={{ fontFamily: 'Nickainley', fontWeight: 'normal', fontSize: '24px', marginLeft: 10, marginRight: 10 }}>« Mes envies de liberté, de créativité et la maternité m’ont amené à me créer une vie sur mesure . »</h1>
                <p style={{ fontFamily: 'poiret', textAlign: 'right', marginRight: '15%' }}>Perrine, créatrice de « Cousu Mouche »</p>
            </div>
            <div className=" block lg:flex lg:flex-wrap w-full lg:justify-center gap-10 lg:content-center mb-20">
                <div className="flex justify-center items-center w-full mx-auto lg:mx-0 aspect-[2/3] mb-6 lg:mb-0 lg:max-w-[350px] min-w-[200px] max-w-[40%]">

                    <img
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        src={Mouche}
                        alt="Perrine, créatrice de Cousu Mouche"
                    />
                </div>
                <div className="flex justify-center items-center w-full mx-auto lg:mx-0 mb-6 lg:mb-0 lg:max-w-[600px] min-w-[200px] max-w-[80%]">
                    <p style={{ textAlign: 'justify', fontFamily: 'Poiret', fontWeight: 'bold', lineHeight: 1.78 }}>
                        Avant même de découvrir Cousu Mouche, vous vous demandez peut-être pourquoi avoir mêlé une mouche à tout ça ? Ici, je prends la parole et lève le voile ...<br /><br />
                        Né d’une anecdote familiale, je réponds depuis ma tendre enfance au doux surnom de « Mouche ».<br />
                        C’est au sein du foyer familial aux valeurs simples et humanistes que j’ai développé ma créativité, mon goût pour le « fait main » et mon plaisir d’offrir.<br /><br />
                        Fille d’une infirmière et d’un entrepreneur, je me suis à mon tour formée pour devenir une blouse blanche. Depuis, je trouve mes inspirations auprès des petits loups de la crèche où j’exerce. Depuis, je trouve mes inspirations auprès des petits loups de la crèche où j’exerce.<br /><br />
                        Native d’un pays où le sens de la fête et la chaleur humaine sont ancrés, j’aborde la vie avec joie (même sous la pluie). Aujourd’hui expatriée au sud de la France, en occitanie plus exactement, j’évolue dans un environnement naturel où les champs de tournesols, les lavandes et les vignes ont remplacés les barraques à frites. Vous l’aurez compris, mes créations sont le reflet de mon univers champêtre.<br /><br />
                        Inspirée par le chamboulement d’Amour que m’offre la maternité, je crée et confectionne des articles de puériculture avec délicatesse où le souci du détail, la qualité des matières et la passion sont mes Maîtres Mots. J’accorde également beaucoup d’attention pour faire vivre une tendre expérience à celles qui ont mis au monde un petit moucheron, et de manière générale à toutes les femmes, ce pour quoi j’ai voulu leur dédier une partie de mes créations.<br /><br />
                        Et voilà, comment tout naturellement, j’ai souhaité que mes créations soient imprégnées par la mouche que je suis.
                    </p>
                </div>
            </div>
        </div>
    )
}