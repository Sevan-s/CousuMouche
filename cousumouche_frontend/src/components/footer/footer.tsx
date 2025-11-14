import React from "react";
import { IconContext } from "react-icons";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";


const FacebookIcon: any = BiLogoFacebookCircle;
const InstagramIcon: any = FaInstagram;

export function Footer() {
    return (
        <footer className="bg-[#8574A6] w-full fixed left-0 bottom-0 z-[99999] flex flex-col md:flex-row items-center md:justify-between h-auto md:h-[50px] px-4 py-2">
            {/* Copyright */}
            <p className="text-white m-0 text-center md:text-left text-sm md:w-1/3">
                Copyright © 2024 CousuMouche
            </p>
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 my-1 md:my-0 md:w-1/3">
                <Link to="/cgv">
                    <button className="border-none bg-[#8574A6] text-white text-sm hover:underline focus:outline-none">CGV</button>
                </Link>
                <Link to="/mentionlegal">
                    <button className="border-none bg-[#8574A6] text-white text-sm hover:underline focus:outline-none">Mentions légales</button>
                </Link>
                <Link to="/contact">
                    <button className="border-none bg-[#8574A6] text-white text-sm hover:underline focus:outline-none">Contact</button>
                </Link>
                <Link to="/livraison">
                    <button className="border-none bg-[#8574A6] text-white text-sm hover:underline focus:outline-none">Livraison</button>
                </Link>
                <Link to="/confidentialite">
                    <button className="border-none bg-[#8574A6] text-white text-sm hover:underline focus:outline-none">Politique de confidentialité</button>
                </Link>
            </div>
            {/* Social icons */}
            <div className="flex justify-center md:justify-end gap-3 md:w-1/3">
                <IconContext.Provider value={{ style: { color: "white", fontSize: 26 } }}>
                    <a
                        href="https://www.facebook.com/profile.php?id=100064335360690"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <button className="bg-[#8574A6] border-none hover:bg-[#6a5984] focus:outline-none transition-colors">
                            <FacebookIcon />
                        </button>
                    </a>
                    <a
                        href="https://www.instagram.com/cousu.mouche/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <button className="bg-[#8574A6] border-none hover:bg-[#6a5984] focus:outline-none transition-colors">
                            <InstagramIcon />
                        </button>
                    </a>
                </IconContext.Provider>
            </div>
        </footer>
    );
}