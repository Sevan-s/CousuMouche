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
import { Carousel } from "flowbite-react";
import CustomCarousel from "../../components/carroussel"
import WelcomeBanner from "../../components/welcomeBanner";

export function HomeScreen() {
    const NAVBAR_PX = 310;
    return (
        <div style={{ marginBottom: 50 }}>
            <section
                className="2xl:h-[calc(100svh-310px)] lg:h-[calc(100svh-500px)] md:h-[calc(100svh-600px)] sm:h-[calc(100svh-700px)] h-[calc(100svh-750px)]"
            >
                <div className="mx-auto flex h-full w-full flex-col items-center">
                    <div className="shrink-0 pt-10 pb-2 text-center">
                        <h1 className="text-black font-nickainley font-normal text-4xl mb-2">
                            Création couture pour enfants et parents
                        </h1>
                        <h2 className="font-poiret text-black font-bold text-xl">
                            AUTHENTIQUE, PERSONNALISÉ ET ÉCO-RESPONSABLE
                        </h2>
                    </div>
                    <div className="flex-1 w-11/12 2xl:w-9/12 3xl:w-8/12 xl:w-9/12h-full">
                        <WelcomeBanner />
                    </div>

                    {/* <CustomCarousel
                        images={[BathTowel, Bag, Bavoir, Packaging, Broderie]}
                        className="flex-1 min-h-0 h-full w-full md:w-3/4"
                        interval={5000}
                    /> */}
                </div>
            </section>
            {/* <div
                className="relative mx-auto max-w-5xl rounded-xl overflow-hidden mt-10"
                style={{
                    backgroundImage: `url(${BathTowel})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/70"></div>

                <div className="relative p-8 text-center">
                    <p className="font-poiret text-violet-900 font-semibold text-xl leading-relaxed">
                        Vous préparez votre séjour à la maternité ? <br />
                        Vous accueillez la naissance ? <br />
                        Vous souhaitez féliciter les heureux parents ? <br />
                        Vous êtes au bon endroit, Bienvenue !
                    </p>
                </div>
            </div> */}
            <div className=" mb-10">
            </div>
            <div>
                <h1
                    className="font-nickainley font-normal mt-12 text-4xl">
                    Les engagements Cousu Mouche</h1>
            </div>
            <div className="flex flex-col items-center mt-10 mx-5">
                <div className="mt-5 gap-5 flex flex-col custom:flex-row flex-wrap justify-start w-full max-w-[1100px]">
                    <div className="w-full custom:max-w-[250px] px-1 ">
                        <p className="font-nickainley font-normal text-[#7E649D] text-2xl m-0">
                            Créations uniques et personnalisées
                        </p>
                        <p className="text-left font-poiret font-bold ">
                            Cousu Mouche accorde une attention particulière à vos envies et vos goûts. Vous découvrirez ici les incontournables du moucheron. Des créations personnalisées, uniques ou fabriquées en petites séries dans un atelier du sud de France.
                        </p>
                    </div>
                    <div className="flex flex-row gap-5 w-full custom:w-auto justify-center">
                        <img loading="lazy" src={Bed} alt="lit" className="w-full max-w-[300px] sm:block custom:max-w-[250px]" />
                        <img loading="lazy" src={BathTowel} alt="Serviette de bain" className="w-full max-w-[300px] hidden sm:block custom:max-w-[250px]" />
                        <img loading="lazy" src={Blanket} alt="Couverture" className="w-full max-w-[300px] custom:max-w-[250px] hidden mediumcustom:block" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mx-5">
                <div className="mt-5 gap-5 flex flex-col custom:flex-row flex-wrap justify-start w-full max-w-[1100px]">
                    <div className="flex flex-row gap-5 w-full custom:w-auto justify-center order-2 custom:order-1">
                        <img loading="lazy" src={Balle} alt="Balle" className="w-full max-w-[300px] custom:max-w-[250px]" />
                        <img loading="lazy" src={Bag} alt="sac" className="w-full max-w-[300px] hidden sm:block custom:max-w-[250px]" />
                        <img loading="lazy" src={Bavoir} alt="bavoir" className="w-full max-w-[300px] custom:max-w-[250px] hidden mediumcustom:block" />
                    </div>
                    <div className="w-full custom:w-[250px] order-1 custom:order-2 px-5">
                        <p className="font-nickainley font-normal text-[#7E649D] text-2xl m-0">
                            Tissus éco-responsables
                        </p>
                        <p className="text-left font-poiret font-bold">
                            Cousu Mouche privilégie l’authenticité et la qualité des finitions. Les tissus sont sélectionnés sur base de leurs procédés de fabrication et de leurs compositions afin qu’ils soient confortables et durables.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center w-full gap-10 mt-10 mx-5">
                    <div className="max-w-[300px] mediumcustom:mx-w-[350px]">
                        <p
                            className="font-nickainley font-normal text-[#7E649D] text-2xl"
                        >
                            Broderie à la main</p>
                        <img loading="lazy" src={Broderie} className="w-full max-w-[300px] mediumcustom:mx-w-[350px]" />
                        <p className="text-left font-poiret font-bold">Envie de mettre votre touche personnelle à votre commande ? Demandez moi de vous broder le nom ou le surnom du petit coeur</p>
                    </div>
                    <div className="max-w-[300px] mediumcustom:mx-w-[350px]">
                        <p className="font-nickainley font-normal text-[#7E649D] text-2xl">Packaging soigné</p>
                        <img loading="lazy" src={Packaging} className="w-full max-w-[300px] mediumcustom:mx-w-[350px]" />
                        <p className="text-left font-poiret font-bold">Invitez-vous au voyage ! Vos commandes sont soigneusement emballées et embaumées aux senteurs du sud. Et si c’est à offrir, comblez les heureux parents en y glissant un doux message. Il vous suffit de me communiquer votre texte, je me chargerai du reste</p>
                    </div>
                    <div className="max-w-[300px] mediumcustom:mx-w-[350px]">
                        <p className="font-nickainley font-normal text-[#7E649D] text-2xl">Prêt à porter</p>
                        <img loading="lazy" src={Fou} className="w-full max-w-[300px] mediumcustom:mx-w-[350px]" />
                        <p className="text-left font-poiret font-bold">Entretenues préalablement avec de la lessive hypoallergénique testée dèrmatologiquement sans phosphates, ne craignez pas de soucis de décoloration et de rétrécissement des textiles ni d’effets néfastes pour votre peau. Soyez tranquille !</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col">
                <div className="flex-wrap justify-center w-full gap-10 mt-10 block sm:flex">
                    <div className="flex items-center flex-col">
                        <IconContext.Provider value={{ style: { color: "#7E649D", fontSize: 60 } }}>
                            <FaHands />
                        </IconContext.Provider>
                        <p className="font-poiret font-bold">Fait main<br />Atelier occitan</p>
                    </div>
                    <div className="flex items-center flex-col">
                        <IconContext.Provider value={{ style: { color: "#7E649D", fontSize: 60 } }}>
                            <FaTruck />
                        </IconContext.Provider>
                        <p className="font-poiret font-bold">Livraison<br />3 à 5 semaines<br /> Offert à partir de 120€</p>
                    </div>
                    <div className="flex items-center flex-col">
                        <IconContext.Provider value={{ style: { color: "#7E649D", fontSize: 60 } }}>
                            <BsCreditCard2FrontFill />
                        </IconContext.Provider>
                        <p className="font-poiret font-bold">Paiement sécurisé</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center">
                {/* <img className="max-w-md h-16" src={Coli} /> */}
                <img loading="lazy" className="max-w-md h-24" src={Mondial} />
            </div>
        </div>
    )
}