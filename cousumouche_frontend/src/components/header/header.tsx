import React, { useEffect } from "react";
import Logo from '../../assets/images/CousuMoucheLogo.png';
import { Link, useLocation } from "react-router-dom";
import { Article } from "../../utils/interfaces/articleInterfaces";
import France from '../../assets/images/france.png';

const navItems = [
  { path: "/", label: "Accueil" },
  { path: "/shop", label: "Boutique" },
  { path: "/about", label: "Qui suis-je ?" },
  { path: "/contact", label: "Contact" },
  { path: "/panier", label: "Panier" },
];

export function Header({ cartItems, setCartItems }: { cartItems: Article[], setCartItems: React.Dispatch<React.SetStateAction<Article[]>> }) {
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const panier = localStorage.getItem("Panier");
      setCartItems(panier ? JSON.parse(panier) : []);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setCartItems]);

  return (
    <header className="m-0 w-full">
      <div className="w-full font-poiret font-bold bg-[#7E649D] mt-0 pt-2 pb-2 text-center text-xs sm:text-base">
        <p className="m-0 text-white">
          Commande livrée en France Métropolitaine et en Belgique. Délai de confection et de livraison : 4 semaines
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-3  w-full">
            <img src={France} loading="lazy" className="my-2 ml-2 w-[20vw] max-w-[80px] min-w-[40px] max-h-[80px] min-h-[40px] md:max-w-[100px] md:min-w-[40px] md:max-h-[100px] md:min-h-[40px]"
            />

          <img loading="lazy"
            src={Logo}
            className="my-2 mx-auto w-[40vw] max-w-[180px] min-w-[130px]  md:max-w-[200px] md:min-w-[120px]"
            alt="Logo"
          />
          <div></div>
        </div>
        <nav className="w-full">
          <div className="
            flex flex-wrap justify-center gap-2 md:gap-6
            flex-col xs:flex-row sm:flex-row md:flex-row
            items-center
          ">
            {navItems.map((item, i) => {
              let text = item.label;
              if (item.path === "/panier" && cartItems.length > 0) {
                text += ` (${cartItems.length})`;
              }
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="w-full xs:w-auto sm:w-auto md:w-auto">
                  <button
                    className={`
                      font-poiret font-bold text-sm xs:text-base md:text-lg px-2 py-1 bg-transparent border-none transition-colors
                      ${isActive ? "text-[#BDA9D4]" : "text-[#7E649D]"}
                      hover:underline focus:outline-none w-full xs:w-auto sm:w-auto
                    `}
                    style={{ background: 'none', boxShadow: 'none' }}
                  >
                    {text}
                  </button>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}