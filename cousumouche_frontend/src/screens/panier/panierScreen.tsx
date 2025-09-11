import { ChangeEvent, useEffect, useState } from "react";
import { Article } from "../../utils/interfaces/articleInterfaces";
import styles from './panierStyles.module.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LivraisonForm } from "../livraisonForm/livraisonForm";
import { getDeliveryPrice } from "@frontboi/mondial-relay";
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types'
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../payment/payment";
import { GetPromotionCodeByCode } from "../../API/api";


export function PanierScreen({ cartItems, setCartItems }: { cartItems: Article[], setCartItems: any }) {
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>();
  const [panier, setPanier] = useState<Article[]>();
  const [code, setCode] = useState<string>("");
  const [codeExist, setCodeExist] = useState<boolean>(false)
  const [reduction, setReduction] = useState<number>(0)
  const quantity = 1;

  const deliveryPrice = getDeliveryPrice(500, 'FR');

  const promotionCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const checkIfCodeExist = async() => {
    const response = await GetPromotionCodeByCode(code);
    console.log("test : ", response)
    if (response !== undefined) {
      setCodeExist(true)
      setReduction(response.data.price)
    }
  }
  console.log("reduc :", reduction)
  
  useEffect(() => {
    if (code.length === 19)
      checkIfCodeExist();
    else
      setReduction(0)
  },[code])

  console.log(panier, parcelShop)
  useEffect(() => {
    const getPanier = localStorage.getItem("Panier");

    if (getPanier !== null) {
      const parsedPanier: Article[] = JSON.parse(getPanier).map((item: Article) => ({
        ...item,
        quantity: item.quantity || 1,
        subTotal: item.price * (item.quantity || 1)
      }));
      setPanier(parsedPanier);
    }
  }, [cartItems]);


useEffect(() => {
  if (!panier) return;

  const newSubtotal = panier.reduce((acc, item) => acc + item.subTotal, 0);
  setSubTotal(newSubtotal);

  const r = Number(reduction) || 0;
  const base = parcelShop ? newSubtotal + deliveryPrice : newSubtotal;

  setTotal(Math.max(0, base - r));
}, [panier, parcelShop, deliveryPrice, reduction]);

  useEffect(() => {
    if (!panier) return;

    const shouldUpdate = panier.some(item => item.subTotal === undefined);

    if (shouldUpdate) {
      const updatedPanier = panier.map((item) => {
        const itemQuantity = item.quantity ?? 1;
        return {
          ...item,
          quantity: itemQuantity,
          subTotal: item.price * itemQuantity
        };
      });
      setPanier(updatedPanier);
    }
  }, [panier]);

  const deleteShoppingCartElement = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('Panier', JSON.stringify(updatedCartItems));
  };


  useEffect(() => {
    if (parcelShop) {
      localStorage.setItem("adresse", JSON.stringify(parcelShop));
    }
  }, [parcelShop]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedPanier = panier!.map((item, i) =>
      i === index
        ? { ...item, quantity: newQuantity, subTotal: item.price * newQuantity }
        : item
    );
    setPanier(updatedPanier);
    localStorage.setItem("Panier", JSON.stringify(updatedPanier));
  };

  return (
    <div className="mt-5 block lg:flex mb-36 mx-auto w-[90%] justify-center text-center lg:text-left">
      <div className="w-full lg:w-[70%] border-[#EAEAEA] border-solid border-0">
        <div className="grid grid-cols-5 w-full gap-5 bg-[#E8E3F1] mb-5">
          <p>Produits</p>
          <p>Prix</p>
          <p>Quantité</p>
          <div className="flex items-center mx-auto" >
            <p>Sous-total</p>
          </div>
        </div>

        {panier !== undefined ? panier.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-5 w-full gap-5 content-center items-center">
              <div className={styles.product}>
                <p style={{ textAlign: 'left', fontFamily: 'Poiret', fontWeight: 'bold', marginBottom: 10 }}>{item.name}</p>
                <img
                  loading="lazy"
                  src={Array.isArray(item.image)
                    ? item.image[0]
                    : item.image
                  }
                  style={{ width: '200px', marginRight: '5%', marginBottom: 10 }}
                />
                <div style={{ width: '100%', marginBottom: 10 }}>
                  <p style={{ textAlign: 'left' }}><strong>tissus :</strong> {item.tissus}</p>
                  {item.broderieFirstName &&
                    <p style={{ textAlign: 'left' }}><strong>Broderie :</strong> {item.broderieFirstName}</p>
                  }
                </div>
              </div>
              <p>{item.price} €</p>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  style={{ width: '50px', textAlign: 'center', border: '1px solid black' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <p>{item.subTotal} €</p>
              </div>
              <button onClick={() => deleteShoppingCartElement(index)} style={{ fontSize: '20px', color: '#4E1511', backgroundColor: 'transparent', border: 'none' }}>
                <RiDeleteBin6Line />
              </button>
            </div>
            <div style={{ border: '0.5px solid #EAEAEA', width: '100%' }} />
          </div>
        )) :
          <p className="text-center font-poiret text-2xl font-bold">Votre panier est vide</p>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LivraisonForm parcelShop={parcelShop} setParcelShop={setParcelShop} />
        </div>
      </div>
      {total > 0 &&
        <div>
          <div className="ml-5">
            <p className="font-poiret font-bold text-2xl">Code promo</p>
            <input
              placeholder="Votre code"
              className="p-2 w-full m-0 place-items-center rounded transition border-2 mb-5"
              onChange={(e) => promotionCode(e)}
              value={code}
            />
          </div>
          <CheckoutForm key={total} total={total} />
        </div>
      }
    </div>
  );
}