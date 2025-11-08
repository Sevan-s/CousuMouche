import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Article } from "../../utils/interfaces/articleInterfaces";
import styles from './panierStyles.module.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { getDeliveryPrice } from "@frontboi/mondial-relay";
import { CheckoutForm } from "../payment/payment";
import { GetPromotionCodeByCode } from "../../API/api";
import MondialRelayPicker from "../../utils/mondialRelay/mondialRelay";

type AnyObj = Record<string, any>;

export type ParcelShop = {
  ID: string;
  Nom: string;
  Adresse1: string;
  CP: string;
  Ville: string;
  Pays: string;
};

const KEY = "cm_cart";

const adaptCartToPanier = (items: AnyObj[]): Article[] => {
  return items.map((it) => {
    const price = Number(it.price ?? 0);
    const quantity = Number(it.quantity ?? 1);

    const image =
      it.image ??
      it.product?.imageUrls?.[0] ??
      it.product?.imageUrl ??
      "";

    const tissus = Array.isArray(it.fabricSelected)
      ? it.fabricSelected
          .map((f: any) => (typeof f === "string" ? f : f?.name ?? ""))
          .filter(Boolean)
          .join(", ")
      : (it.fabricSelected ?? "");

    const broderieFirstName = it.embroidery ?? "";

    return {
      id: it.id ?? String(Date.now()) + Math.random().toString(16).slice(2),
      name: it.name,
      price,
      quantity,
      subTotal: price * quantity,
      image,
      tissus,
      broderieFirstName,
      ...it,
    } as Article;
  });
};

export function PanierScreen(
) {
  const [panier, setPanier] = useState<Article[]>([]);
  const [parcelShop, setParcelShop] = useState<ParcelShop | undefined>();
  const [code, setCode] = useState<string>("");
  const [reduction, setReduction] = useState<number>(0);
  
  console.log("item ! ", panier)

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      setPanier(adaptCartToPanier(parsed));
    } catch (e) {
      console.error("Panier corrompu :", e);
      setPanier([]);
    }
  }, []);

const { subtotal, deliveryPrice, total } = useMemo(() => {
  const sub = panier.reduce((acc, it) => acc + (Number(it.subTotal) || 0), 0);
  const deliv = parcelShop ? (sub < 120 ? getDeliveryPrice(500, "FR") : 0) : 0;
  const r = Number(reduction) || 0;
  const tot = Math.max(0, (parcelShop ? sub + deliv : sub) - r);

  return { subtotal: sub, deliveryPrice: deliv, total: tot };
}, [panier, parcelShop, reduction]);

  const promotionCode = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value);

  const checkIfCodeExist = async () => {
    try {
      const response = await GetPromotionCodeByCode(code);
      if (response && response.data) {
        setReduction(Number(response.data.price) || 0);
      } else {
        setReduction(0);
      }
    } catch {
      setReduction(0);
    }
  };

  useEffect(() => {
    if (code.length === 19) 
        checkIfCodeExist();
    else setReduction(0);
  }, [code]);

  const savePanierToStorage = (next: Article[]) => {
    const raw = localStorage.getItem(KEY);
    const arr: AnyObj[] = raw ? JSON.parse(raw) : [];

    const map = new Map<string, AnyObj>(arr.map((x) => [x.id, x]));
    next.forEach((it) => {
      const prev = map.get((it as any).id) || {};
      map.set((it as any).id, { ...prev, quantity: it.quantity });
    });

    localStorage.setItem(KEY, JSON.stringify(Array.from(map.values())));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1 || Number.isNaN(newQuantity)) return;

    const next = panier.map((it) =>
      (it as any).id === id
        ? { ...it, quantity: newQuantity, subTotal: it.price * newQuantity }
        : it
    );
    setPanier(next);
    savePanierToStorage(next);
  };

  const deleteShoppingCartElement = (id: string) => {
    const next = panier.filter((it) => (it as any).id !== id);
    setPanier(next);

    const raw = localStorage.getItem(KEY);
    const arr: AnyObj[] = raw ? JSON.parse(raw) : [];
    const updated = arr.filter((it) => it.id !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));

  };

  useEffect(() => {
    if (parcelShop) {
      localStorage.setItem("adresse", JSON.stringify(parcelShop));
    }
  }, [parcelShop]);

  return (
    <div className="mt-5 block lg:flex mb-36 mx-auto w-[90%] justify-center text-center lg:text-left">
      <div className="w-full lg:w-[70%] border-[#EAEAEA] border-solid border-0">
        <div className="grid grid-cols-5 w-full gap-5 bg-[#E8E3F1] mb-5">
          <p>Produits</p>
          <p>Prix</p>
          <p>Quantité</p>
          <div className="flex items-center mx-auto"><p>Sous-total</p></div>
        </div>

        {panier.length > 0 ? (
          panier.map((item, index) => (
            <div key={(item as any).id ?? index}>
              <div className="grid grid-cols-5 w-full gap-5 content-center items-center">
                <div className={styles.product}>
                  <p
                    style={{ textAlign: "left", fontFamily: "Poiret", fontWeight: "bold", marginBottom: 10 }}
                  >
                    {item.name}
                  </p>

                  <img
                    loading="lazy"
                    src={Array.isArray(item.image) ? item.image[0] : (item.image as any)}
                    alt={item.name}
                    style={{ width: "200px", marginRight: "5%", marginBottom: 10 }}
                  />

                  <div style={{ width: "100%", marginBottom: 10 }}>
                  </div>
                </div>

                <p>{item.price} €</p>

                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange((item as any).id, parseInt(e.target.value, 10))
                    }
                    style={{ width: "50px", textAlign: "center", border: "1px solid black" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                  <p>{item.subTotal} €</p>
                </div>

                <button
                  onClick={() => deleteShoppingCartElement((item as any).id)}
                  style={{ fontSize: "20px", color: "#4E1511", backgroundColor: "transparent", border: "none" }}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
              <div style={{ border: "0.5px solid #EAEAEA", width: "100%" }} />
            </div>
          ))
        ) : (
          <p className="text-center font-poiret text-2xl font-bold">Votre panier est vide</p>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <MondialRelayPicker parcelShop={parcelShop} setParcelShop={setParcelShop}/>
        </div>
      </div>

      {total > 0 && (
        <div>
          <div className="ml-5">
            <p className="font-poiret font-bold text-2xl">Code promo</p>
            <input
              placeholder="Votre code"
              className="p-2 w-full m-0 place-items-center rounded transition border-2 mb-5"
              onChange={promotionCode}
              value={code}
            />
          </div>

          <div className="ml-5 mb-4 text-sm">
            <p>Sous-total : <strong>{subtotal.toFixed(2)} €</strong></p>
            {parcelShop && <p>Livraison : <strong>{deliveryPrice.toFixed(2)} €</strong></p>}
            {reduction > 0 && <p>Réduction : <strong>-{reduction.toFixed(2)} €</strong></p>}
            <p className="mt-2 text-lg">Total : <strong>{total.toFixed(2)} €</strong></p>
          </div>

          <CheckoutForm key={total} total={total} />
        </div>
      )}
    </div>
  );
}