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

export function AppRoutes() {
    const [cartItems, setCartItems] = useState<Article[]>([]);
    const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>()

    useEffect(() => {
        const storedCartItems = localStorage.getItem('Panier');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        // localStorage.clear();
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('Panier', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    return (
        <BrowserRouter>
            <Header  />
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
                <Route path="/panier" element={<PanierScreen />} />
                <Route path="/livraisonForm" element={<LivraisonForm parcelShop={parcelShop} setParcelShop={setParcelShop} />} />
                <Route path="/boutique/:productName" element={<ProductInformation />} />
                <Route path="/return" element={<ReturnPage parcelShop={parcelShop} setCartItems={setCartItems} cartItems={cartItems} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}