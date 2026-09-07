import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Logo from '../../assets/images/cousumouchelogo.png';
import { Link, useLocation } from "react-router-dom";
import styles from "./headerStyles.module.css";

const navItems = [
  { path: "/", label: "Accueil" },
  {
    path: "/boutique",
    label: "Boutique",
    children: [
      { path: "/boutique?cat=Enfant", label: "Enfant" },
      { path: "/boutique?cat=Maman", label: "Maman" },
      { path: "/boutique?cat=Matchy%20Matchy", label: "Matchy Matchy" },
      { path: "/boutique?cat=Stock", label: "Stock" },
      { path: "/boutique?cat=Carte%20cadeau", label: "Carte cadeau" },
    ]
  },
  { path: "/apropos", label: "Qui suis-je ?" },
  { path: "/contact", label: "Contact" },
  { path: "/panier", label: "Panier" },
];

export function Header({ cartCount, setCartCount }: { cartCount: number, setCartCount: Dispatch<SetStateAction<number>> }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const updateCartSize = () => {
      const raw = localStorage.getItem("cm_cart");
      const parsed = raw ? JSON.parse(raw) : [];
      setCartCount(parsed.length);
    };

    updateCartSize();

    window.addEventListener("storage", updateCartSize);
    window.addEventListener("focus", updateCartSize);

    return () => {
      window.removeEventListener("storage", updateCartSize);
      window.removeEventListener("focus", updateCartSize);
    };
  }, [setCartCount]);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  return (
    <header className="relative z-30 m-0 w-full">
      <div className={`w-full font-poiret font-bold bg-[#8574A6] py-3 md:py-6 text-center text-xs sm:text-base text-white px-4 ${styles.sliderContainer}`}>
        <p className={styles.fadeText}>
          Vos commandes sont confectionnées à la main sous 4 semaines. Merci de soutenir mon atelier artisanal
        </p>
        <p className={styles.fadeText}>
          Livraison en France, Belgique, Espagne, Portugal, Luxembourg, Italie, Pologne et Pays-Bas
        </p>
        <p className={styles.fadeText}>
          Livraison offerte en Belgique et en France à partir de 120€ d'achat
        </p>
      </div>

      <nav className="bg-white border-b border-gray-100">
        <div className="bg-[#ffffff] m-0 p-0 flex justify-between items-center px-4 md:px-0">
          <div className="flex w-auto md:w-[25%] justify-center items-center py-2">
            <Link to="/" className="relative flex flex-col items-center pb-3">
              <img src={Logo} alt="CousuMouche Logo" className="w-24 md:w-36 object-contain" />
              <div className="flex items-center gap-1 absolute bottom-5 md:bottom-7">
                <p className="font-poiret font-medium text-[10px] md:text-xs whitespace-nowrap">Fait main avec</p>
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5 fill-white stroke-black stroke-2 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </Link>
          </div>

          <ul className="hidden md:flex items-center justify-center space-x-1 lg:space-x-4 flex-1">
            {navItems.map((item) => {
              let text = item.label;
              if (item.path === "/panier" && cartCount > 0) text += ` (${cartCount})`;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="relative group py-4">
                  <Link
                    to={item.path}
                    className={`font-poiret font-bold text-sm lg:text-xl px-2 transition-colors whitespace-nowrap ${isActive ? "text-[#BDA9D4]" : "text-[#000] hover:text-[#BDA9D4]"}`}
                  >
                    {text}
                  </Link>

                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-[#D9D1E6] shadow-lg rounded-md py-2 min-w-[180px] z-50 border border-gray-100">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="px-4 py-2 text-sm font-poiret font-bold text-[#7E649D] hover:bg-[#BDA9D4]/10 hover:text-[#BDA9D4] transition-colors text-center whitespace-nowrap"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="hidden md:block md:w-[25%]"></div>
          <div className="flex md:hidden items-center gap-4">
            <Link to="/panier" className="font-poiret font-bold text-sm text-black">
              Panier {cartCount > 0 && <span className="ml-1 bg-[#8574A6] text-white rounded-full px-2 py-0.5 text-xs">{cartCount}</span>}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
            {navItems.map((item) => {
              let text = item.label;
              if (item.path === "/panier" && cartCount > 0) text += ` (${cartCount})`;
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path} className="flex flex-col">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <Link
                      to={item.path}
                      className={`font-poiret font-bold text-lg ${isActive ? "text-[#BDA9D4]" : "text-black"}`}
                    >
                      {text}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.path ? null : item.path)}
                        className="px-3 py-1 text-sm font-poiret font-bold text-[#8574A6]"
                      >
                        {openSubmenu === item.path ? "▲" : "▼"}
                      </button>
                    )}
                  </div>
                  {item.children && openSubmenu === item.path && (
                    <div className="pl-4 py-2 bg-[#D9D1E6]/20 rounded-md my-1 space-y-2">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block text-sm font-poiret font-bold text-[#7E649D] py-1"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}