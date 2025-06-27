import { useEffect, useState } from "react";
import { Article } from "../../utils/interfaces/articleInterfaces";
import styles from './panierStyles.module.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LivraisonForm } from "../livraisonForm/livraisonForm";
import { getDeliveryPrice } from "@frontboi/mondial-relay";
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types'
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../payment/payment";

export function PanierScreen({ cartItems, setCartItems }: { cartItems: Article[], setCartItems: any }) {
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>();
  const [panier, setPanier] = useState<Article[]>();
  const quantity = 1;

  const deliveryPrice = getDeliveryPrice(500, 'FR');


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
    if (panier && deliveryPrice) {

      const newSubtotal = panier.reduce((acc, item) => acc + item.subTotal, 0);
      setSubTotal(newSubtotal);
      const totalValue = parcelShop ? newSubtotal + deliveryPrice : newSubtotal;
      setTotal(totalValue);
    }
  }, [panier, parcelShop]);

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

  const calculateSubTotal = (item: Article, quantities: number) => {
    const subTotal = item.price * quantities

    return subTotal

  }

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedPanier = panier!.map((item, i) =>
      i === index
        ? { ...item, quantity: newQuantity, subTotal: item.price * newQuantity }
        : item
    );
    setPanier(updatedPanier);
    localStorage.setItem("Panier", JSON.stringify(updatedPanier));
  };

  //   display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  // gap: 20px;
  // justify-content: center;
  // width: 100%;
  // align-items: center;
  // background-color: #d7b5e9;
  return (
    <div className="mt-5 block lg:flex mb-36 mx-auto w-[90%] justify-center text-center lg:text-left">
      <div className="w-full lg:w-[70%] border-[#EAEAEA] border-solid border-0">
        <div className="grid grid-cols-5 w-full gap-5 bg-[#d7b5e9] mb-5">
          <p>Produits</p>
          <p>Prix</p>
          <p>Quantité</p>
          <div className="flex items-center mx-auto" >
            <p>Sous-total</p>
          </div>
        </div>

        {panier !== undefined && panier.map((item, index) => (
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
                  <p style={{ textAlign: 'left' }}><strong>Couleur :</strong> {item.color}</p>
                  <p style={{ textAlign: 'left' }}><strong>Motif :</strong> {item.motif}</p>
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
                  style={{ width: '30px', textAlign: 'center', border: '1px solid black' }}
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
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LivraisonForm parcelShop={parcelShop} setParcelShop={setParcelShop} />
        </div>
      </div>
      {total > 0 && <CheckoutForm key={total} total={total} />}
    </div>
  );
}