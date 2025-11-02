import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ParcelShop } from "../../screens/panier/panierScreen";

declare global {
  interface Window {
    $: any;
    jQuery: any;
    L: any;
    MR_ParcelShopPicker: any;
  }
}

function loadScript(src: string, manual = false): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    if (manual) s.setAttribute("data-manual", "true");
    s.onload = () => resolve(s);
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function loadCSS(href: string) {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

export default function MondialRelayPicker({ parcelShop, setParcelShop }: { parcelShop: ParcelShop | undefined, setParcelShop: Dispatch<SetStateAction<ParcelShop | undefined>> }) {
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");

      await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
      window.$ = window.jQuery = window.jQuery || window.$;

      await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
      await new Promise((r) => setTimeout(r, 300));

      await loadScript(
        "https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js",
        true
      );

      if (cancelled || !zoneRef.current) return;

      const $ = window.jQuery;

      await new Promise((r) => setTimeout(r, 500));

      if ($ && $.fn && $.fn.MR_ParcelShopPicker) {
        $(zoneRef.current).MR_ParcelShopPicker({
          Target: "#mr-hidden",
          Brand: process.env.REACT_APP_ENSEIGNE_MONDIAL_RELAY,
          Country: "FR",
          Responsive: true,
          ShowResultsOnMap: true,
          EnableGeolocalisation: false,
          OnParcelShopSelected: function (data: ParcelShop) {
            setParcelShop(data);
          },
        });
      } else {
        console.error("Le plugin Mondial Relay n'est pas disponible sur $.fn");
      }
    }

    setup();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full">
      <div id="Zone_Widget" ref={zoneRef}></div>
      <input id="mr-hidden" name="mr_point_id" type="hidden" value={parcelShop?.ID || ""} />

      {parcelShop && (
        <div style={{ marginTop: 12 }}>
          <strong>Point Relais sélectionné :</strong><br />
          {parcelShop.Nom}<br />
          {parcelShop.Adresse1}<br />
          {parcelShop.CP} {parcelShop.Ville} – {parcelShop.Pays}
        </div>
      )}
    </div>
  );
}
