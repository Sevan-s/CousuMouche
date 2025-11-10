import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from "../../screens/homescreen/homescreen";
import { Aboutscreen } from "../../screens/aboutscreen/aboutscreen";
import { ShopScreen } from "../../screens/shop/screen/shop";
// import { ProductDetails } from "../../screens/shop/components/productCard/productcard";
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

export function AppRoutes() {
    const [cartItems, setCartItems] = useState<Article[]>([]);
    const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>();
    const [cartCount, setCartCount] = useState(0);
    const KEY = "cm_cart";

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
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
