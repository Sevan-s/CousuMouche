import Bannière from '../../assets/images/banniere.jpg'
import Bed from '../../assets/images/lit.jpg';
import BathTowel from '../../assets/images/SortieDeBains.jpg';
import Blanket from '../../assets/images/couvertureTresor.jpg';
import Broderie from '../../assets/images/broderie.jpg';
import Fou from '../../assets/images/fou3.jpg';
import Packaging from '../../assets/images/packaging.jpg';
import Serviette from '../../assets/images/serviette_turban.jpg';
import Gigoteuse from '../../assets/images/gigoteuse.jpg';
import MatchyMatchy from '../../assets/images/tablier_matchy_matchy.jpg';
import Mondial from '../../assets/images/mondial.png';
import Hand from '../../assets/images/hand.png';
import Truck from '../../assets/images/truck.png';
import Cb from '../../assets/images/cb.png';
import { useEffect, useState } from 'react';
import { getAllOpinion } from "../../API/api";
import fondLavande from '../../assets/images/fondLavande.jpg';
import styles from './homestyles.module.css';
import { IconContext } from 'react-icons';

type Opinion = {
    text: string
    _id: string
}

export function HomeScreen() {
    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </>
    )
}

function Section1() {
    return (
        <section className="h-[calc(100vh-225px)] min-h-[400px] w-full">
            <div className="h-full w-full relative">
                <img
                    src={Bannière}
                    alt="Bannière CousuMouche"
                    className="h-full w-full object-cover"
                />

                <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D9D1E6]/90 backdrop-blur-sm py-4 md:py-6 px-6 sm:px-12 md:px-16 lg:px-20 w-[90%] max-w-4xl text-center rounded-sm">
                    <h1 className="text-black font-nickainley font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4">
                        Création couture pour enfants et parents
                    </h1>
                    <h2 className="font-poiret text-black font-bold text-xs sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider">
                        AUTHENTIQUE, PERSONNALISÉE ET ÉCO-RESPONSABLE
                    </h2>
                </div>
            </div>
        </section>
    );
}

function Section2() {
    return (
        <section className="min-h-screen pb-12 md:pb-20">
            <h2 className="font-nickainley font-normal pt-8 md:pt-12 text-3xl sm:text-4xl lg:text-5xl px-2 text-center">
                Les engagements Cousu Mouche
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center w-[90%] sm:w-[85%] lg:w-[80%] 2xl:w-[75%] mx-auto mt-8 md:mt-12 bg-[#D9D1E6] p-3 sm:p-4 md:p-6 rounded-md">
                <div className="text-center p-2 sm:p-4 lg:p-1 xl:p-3 order-1 sm:col-span-2 lg:col-span-1 lg:aspect-square flex flex-col justify-center items-center w-full">
                    <h3 className="font-nickainley text-2xl sm:text-3xl lg:text-xl xl:text-2xl 2xl:text-4xl text-[#7E649D] leading-tight">
                        Créations uniques et personnalisées
                    </h3>
                    <p className="font-poiret font-semibold text-sm sm:text-base lg:text-sm xl:text-[md] 2xl:text-base mt-1 sm:mt-4 lg:mt-1.5 xl:mt-3 leading-tight">
                        Cousu Mouche accorde une attention particulière à vos envies et vos goûts. Ici, découvrez les incontournables du moucheron. Des créations personnalisées, uniques et pensées par vous, dans mon petit atelier Sud de France.
                    </p>
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center order-2">
                    <img
                        loading="lazy"
                        src={Bed}
                        alt="lit"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center hidden lg:block lg:order-3">
                    <img
                        loading="lazy"
                        src={BathTowel}
                        alt="Serviette de bain"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center hidden sm:block sm:order-3 lg:order-4">
                    <img
                        loading="lazy"
                        src={Blanket}
                        alt="Couverture"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center hidden sm:block order-3 sm:order-5 lg:order-5">
                    <img
                        loading="lazy"
                        src={Serviette}
                        alt="Balle"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center order-4 sm:order-6">
                    <img
                        loading="lazy"
                        src={Gigoteuse}
                        alt="bavoir"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="w-full max-w-[280px] sm:max-w-none justify-self-center hidden lg:block order-4 lg:order-7">
                    <img
                        loading="lazy"
                        src={MatchyMatchy}
                        alt="sac"
                        className="w-full aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="text-center p-2 sm:p-4 lg:p-1 xl:p-3 order-3 sm:order-4 lg:order-8 sm:col-span-2 lg:col-span-1 lg:aspect-square flex flex-col justify-center items-center w-full">
                    <h3 className="font-nickainley text-2xl sm:text-3xl lg:text-xl xl:text-2xl 2xl:text-4xl text-[#7E649D] leading-tight">
                        Tissus éco-responsables
                    </h3>
                    <p className="font-poiret font-semibold text-sm sm:text-base lg:text-sm xl:text-md 2xl:text-base mt-1 sm:mt-4 lg:mt-1.5 xl:mt-3 leading-tight">
                        Cousu Mouche privilégie l’authenticité et la qualité des finitions. Les tissus sont sélectionnés sur base de leurs procédés de fabrication et de leurs compositions afin qu’ils soient confortables et durables.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] sm:w-[85%] lg:w-[80%] 2xl:w-[75%] mx-auto pt-6 sm:pt-8">
                <BentoCard
                    title="Broderie à la main"
                    image={Broderie}
                    alt="Broderie à la main"
                    description="Cousu Mouche vous offre la possibilité d’ajouter votre touche personnelle et authentique grâce à une broderie réalisée à la main avec soin et précision. Initiales ou prénom, chaque détail est travaillé avec passion."
                />
                <BentoCard
                    title="Packaging soigné"
                    image={Packaging}
                    alt="Packaging soigné"
                    description="Invitez-vous au voyage. Vos commandes sont soigneusement emballées et embaumées aux senteurs du Sud. Si c'est un cadeau, vos doux messages glissés dans le paquet combleront les heureux parents ou vos amies."
                />
                <div className="hidden lg:block">
                    <BentoCard
                        title="Prêt à porter"
                        image={Fou}
                        alt="Foulard"
                        description="De la douceur, rien que de la douceur. Entretenues préalablement avec de la lessive hypoallergénique testée dermatologiquement sans phosphate."
                    />
                </div>
            </div>
        </section>
    );
}

function Section3() {
    const [allOpinion, setAllOpinion] = useState<Opinion[]>([])

    const getOpinion = async () => {
        const result = await getAllOpinion()
        setAllOpinion(result)
    }

    useEffect(() => {
        getOpinion();
    }, [])
    return (
        <section className='pb-12'>
            <h2 className="font-nickainley font-normal p text-5xl">
                Vos avis
            </h2>
            <div className="flex justify-center mt-12">
                {allOpinion !== undefined &&
                    <ul className="flex flex-row gap-5 flex-wrap bg-cover bg-center w-full justify-center py-10"
                        style={{ backgroundImage: `url(${fondLavande})` }}
                    >
                        {allOpinion.map((op) => (
                            <li
                                key={op._id}
                                className="whitespace-pre-line leading-[1.5] bg-[#D9D1E6] rounded-full w-80 h-80 flex flex-col items-center justify-center relative text-center p-6"
                            >
                                <p className="absolute top-3 left-1/2 -translate-x-1/2 text-[50px]  m-0">
                                    "
                                </p>
                                <p className="font-poiret font-bold text-center break-words text-lg">
                                    {op.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </section>
    )
}

interface BentoCardProps {
    title: string;
    description: string;
    image: string;
    alt: string;
    aspectClass?: string;
}

function BentoCard({ title, description, image, alt, aspectClass = "aspect-[4/3]" }: BentoCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative w-full ${aspectClass} ${styles.perspective1000} cursor-pointer rounded-md overflow-hidden shadow-sm`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped((prev) => !prev)}
        >
            <div className={`relative w-full h-full duration-500 transition-transform ${styles.transformStyle3d} ${isFlipped ? styles.rotateY180 : ''}`}>
                <div className={`absolute inset-0 w-full h-full ${styles.backfaceHidden} rounded-md`}>
                    <img loading="lazy" src={image} alt={alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-4 lg:p-6">
                        <h3 className="font-nickainley text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-white drop-shadow-md leading-tight">
                            {title}
                        </h3>
                    </div>
                </div>
                <div className={`absolute inset-0 w-full h-full ${styles.backfaceHidden} ${styles.rotateY180} bg-[#D9D1E6] rounded-md p-3 sm:p-4 lg:p-3 xl:p-6 flex flex-col justify-center items-center text-center`}>
                    <p className="font-poiret font-semibold text-md  md:text-sm lg:text-md xl:text-sm 2xl:text-base leading-tight xl:leading-relaxed text-gray-800">
                        {description}
                    </p>
                </div>

            </div>
        </div>
    );
}

export function Section4() {
    return (
        <section className="pb-28 sm:pb-20">
            <div className="flex justify-center w-full py-10">
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center w-full gap-10 sm:gap-12">
                    <div className="flex flex-col items-center w-48 text-center">
                        <div className="w-32 h-32 flex items-center justify-center mb-2">
                            <img src={Hand} alt="Fait main" className="w-full h-full object-contain" />
                        </div>
                        <p className="font-poiret font-bold text-xl">
                            Fait main<br />Atelier occitan
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-48 text-center">
                        <div className="w-32 h-32 flex items-center justify-center mb-2">
                            <img src={Truck} alt="Livraison" className="w-full h-full object-contain" />
                        </div>
                        <p className="font-poiret font-bold text-xl">
                            Livraison<br />3 à 5 semaines
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-48 text-center">
                        <div className="w-32 h-32 flex items-center justify-center mb-2">
                            <img src={Cb} alt="Paiement sécurisé" className="w-full h-full object-contain" />
                        </div>
                        <p className="font-poiret font-bold text-xl">
                            Paiement sécurisé
                        </p>
                    </div>

                </div>
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
                <img loading="lazy" alt="MondialRelay" className="max-w-md h-24 object-contain" src={Mondial} />
            </div>
        </section>
    );
}