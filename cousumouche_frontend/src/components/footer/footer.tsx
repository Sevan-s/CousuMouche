import React from "react";
import { IconContext } from "react-icons";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <div style={{ backgroundColor: '#8574A6', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
            <p style={{ color: 'white', margin: 0, width: '33%' }}>Copyright © 2024 CousuMouche</p>
            <div style={{ width: '33%' }}>
                <Link to="/cgv">
                    <button style={{ borderStyle: 'none', backgroundColor: '#8574A6', color: 'white' }}>CGV</button>
                </Link>
                <Link to="/mentionlegal">
                    <button style={{ borderStyle: 'none', backgroundColor: '#8574A6', color: 'white' }}>Mentions légales</button>
                </Link>
                <Link to="/contact">
                    <button style={{ borderStyle: 'none', backgroundColor: '#8574A6', color: 'white' }}>Contact</button>
                </Link>
                <Link to="/livraison">
                <button style={{ borderStyle: 'none', backgroundColor: '#8574A6', color: 'white' }}>Livraison</button>
                </Link>
                <Link to="/confidentialite">
                    <button style={{ borderStyle: 'none', backgroundColor: '#8574A6', color: 'white' }}>Politique de confidentialité</button>
                </Link>
            </div>
            <div style={{ width: '33%' }}>
                <a href="https://www.facebook.com/profile.php?id=100064335360690" target="_blank">
                    <button style={{ marginRight: '2%', backgroundColor: '#8574A6', borderStyle: 'none' }}>
                        <IconContext.Provider value={{ style: { color: "white", fontSize: 26 } }}>
                            <BiLogoFacebookCircle />
                        </IconContext.Provider>;
                    </button>
                </a>
                <a href="https://www.instagram.com/cousu.mouche/" target="_blank">
                    <button style={{ backgroundColor: '#8574A6', borderStyle: 'none' }}>
                        <IconContext.Provider value={{ style: { color: "white", fontSize: 26 } }}>
                            <FaInstagram />
                        </IconContext.Provider>;
                    </button>
                </a>
            </div>
        </div>
    )
} 