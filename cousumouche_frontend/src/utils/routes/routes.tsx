import React, { useEffect, useState } from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { HomeScreen } from "../../screens/homescreen/homescreen";
import { Aboutscreen } from "../../screens/aboutscreen/aboutscreen";
import { ShopScreen } from "../../screens/shop/shop";
import { ProductDetails } from "../../screens/shop/components/productCard/productcard";
import { Header } from "../../components/header/header";
import { ContactScreen } from "../../screens/contactScreen/contactScreen";
import { Footer } from "../../components/footer/footer";
import { CgvScreen } from "../../screens/cgv/cgv";
import { LegalMention } from "../../screens/legalMention/legalMention";
import { Livraison } from "../../screens/Livraison/livraison";
import { confidentiality } from "../../screens/polituqueConfidentialite/politiqueConfidentialite";
import { PanierScreen } from "../../screens/panier/panierScreen";
import { Article } from "../interfaces/articleInterfaces";

export function AppRoutes() {
    const [cartItems, setCartItems] = useState<Article[]>([]);

    useEffect(() =>{
        console.log("le panier: ", cartItems)
    },[cartItems])
    return (
        <BrowserRouter>
            <Header cartItems={cartItems}/>
            <Routes>
                <Route path="/" Component={HomeScreen} />
                <Route path="/about" Component={Aboutscreen} />
                <Route path="/shop" Component={ShopScreen} />
                <Route path="/contact" Component={ContactScreen} />
                <Route path="/cgv" Component={CgvScreen}/>
                <Route path="/mentionlegal" Component={LegalMention}/>
                <Route path="/livraison" Component={Livraison}/>
                <Route path="/confidentialite" Component={confidentiality}/>
                <Route path="/panier" element={<PanierScreen setCartItems={setCartItems} cartItems={cartItems} />}/>
                <Route path="/product/:productName" element={<ProductDetails setCartItems={setCartItems} cartItems={cartItems} />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}