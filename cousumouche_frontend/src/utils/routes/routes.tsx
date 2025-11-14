import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HomeScreen } from "../../screens/homescreen/homescreen";
import { Aboutscreen } from "../../screens/aboutscreen/aboutscreen";
import { ShopScreen } from "../../screens/shop/screen/shop";
import { Header } from "../../components/header/header";
import { ContactScreen } from "../../screens/contactScreen/contactScreen";
import { Footer } from "../../components/footer/footer";
import { CgvScreen } from "../../screens/cgv/cgv";
import { LegalMention } from "../../screens/legalMention/legalMention";
import { Livraison } from "../../screens/Livraison/livraison";
import { confidentiality } from "../../screens/polituqueConfidentialite/politiqueConfidentialite";
import { PanierScreen } from "../../screens/panier/panierScreen";
import { Article } from "../interfaces/articleInterfaces";
import { LivraisonForm } from "../../screens/livraisonForm/livraisonForm";
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types'
import ReturnPage from "../../screens/payment/return";
import ScrollToTop from "../../components/scrollToTop";
import { ProductInformation } from "../../screens/shop/screen/productDetails/productDetails";
import { cleanObject } from "../cleanObject";
import { Helmet } from "react-helmet-async";

export function AppRoutes() {
    const [cartItems, setCartItems] = useState<Article[]>([]);
    const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>();
    const [cartCount, setCartCount] = useState(0);
    const KEY = "cm_cart";

    const isMaintenanceMode = process.env.REACT_APP_MAINTENANCE === "true";

    useEffect(() => {
        const storedCartItems = localStorage.getItem(KEY);
        if (storedCartItems) {
            try {
                const parsed = JSON.parse(storedCartItems);
                setCartItems(parsed);
            } catch (e) {
                console.error("Panier invalide en localStorage:", e);
            }
        }
    }, []);

    useEffect(() => {
        setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0));
        if (cartItems.length > 0) {
            const cleanedCart = cartItems.map((item) => cleanObject(item));
            localStorage.setItem("cm_cart", JSON.stringify(cleanedCart));
        }
    }, [cartItems]);

    if (isMaintenanceMode) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#fafafa",
            }}>
                <h1 className="text-3xl">🚧 Site en maintenance</h1>

                <img
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGJocGJrZTh4cWY2YnlxMGo5YTk4bHo0NHhnM2hjMnB0dXl3aDhmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ukMiDlCmdv2og/giphy.gif"
                    alt="Maintenance en cours"
                    style={{ width: "500px", marginTop: "20px" }}
                />
                <p className="text-xl mt-12">Nous effectuons actuellement une mise à jour. Merci de revenir un peu plus tard 💫</p>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Header cartCount={cartCount} setCartCount={setCartCount} />
            <ScrollToTop />
            <Routes>
                <Route path="/" Component={HomeScreen} />
                <Route path="/apropos" Component={Aboutscreen} />
                <Route path="/boutique" Component={ShopScreen} />
                <Route path="/contact" Component={ContactScreen} />
                <Route path="/cgv" Component={CgvScreen} />
                <Route path="/mentionlegal" Component={LegalMention} />
                <Route path="/livraison" Component={Livraison} />
                <Route path="/confidentialite" Component={confidentiality} />
                <Route
                    path="/panier"
                    element={
                        <PanierScreen
                            cartCount={cartCount}
                            setCartCount={setCartCount}
                        />
                    }
                />
                <Route
                    path="/livraisonForm"
                    element={
                        <LivraisonForm
                            parcelShop={parcelShop}
                            setParcelShop={setParcelShop}
                        />
                    }
                />
                <Route path="/produit/:slug" element={<ProductInformation />} />
                <Route path="/boutique/:productName" element={<ProductInformation />} />
                <Route
                    path="/return"
                    element={
                        <ReturnPage
                            parcelShop={parcelShop}
                            setCartItems={setCartItems}
                            cartItems={cartItems}
                        />
                    }
                />
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export function NotFoundScreen() {
    return (
        <>
            <Helmet>
                <title>Page introuvable – CousuMouche</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center mb-20 sm:mb-0">
                <h1 className="text-5xl font-bold text-[#7E649D] mb-6 font-poiret">
                    Oups !
                </h1>

                <p className="text-xl text-gray-700 font-poiret max-w-[600px] leading-relaxed">
                    La page que vous recherchez semble s’être envolée…
                    <br />
                    Pas de panique, revenez à la boutique ou explorez l’univers CousuMouche ✨
                </p>

                <div className="flex gap-4 mt-10">
                    <Link
                        to="/"
                        className="bg-[#7E649D] text-white px-6 py-3 rounded-xl font-poiret font-bold hover:bg-[#6b5387] transition"
                    >
                        Retour à l’accueil
                    </Link>

                    <Link
                        to="/boutique"
                        className="border border-[#7E649D] text-[#7E649D] px-6 py-3 rounded-xl font-poiret font-bold hover:bg-[#7E649D] hover:text-white transition"
                    >
                        Voir la boutique
                    </Link>
                </div>
            </div>
        </>
    );
}