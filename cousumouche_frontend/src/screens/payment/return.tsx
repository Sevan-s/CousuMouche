import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getStripeStatus, OrderPayload, sendOrderConfirmation } from "../../API/api";
import { Article } from "../../utils/interfaces/articleInterfaces";
import { cleanObject } from "../../utils/cleanObject";
import { Helmet } from "react-helmet-async";

type CustomerInfo = {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
};

type AdresseInfo = any;
const ADMIN_EMAIL = "contact@cousumouche.fr";

export default function ReturnPage({
  setCartItems,
}: {
  parcelShop: any;
  setCartItems: (items: Article[]) => void;
  cartItems: Article[];
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [adresseInfo, setAdresseInfo] = useState<AdresseInfo | null>(null);
  const [localCart, setLocalCart] = useState<Article[]>([]);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    const cartRaw = localStorage.getItem("cm_cart");
    if (cartRaw) {
      try {
        const parsed = JSON.parse(cartRaw);
        setLocalCart(parsed);
        setCartItems(parsed);
      } catch (e) {
        console.warn("Impossible de parser cm_cart", e);
      }
    }

    const customerRaw = localStorage.getItem("cm_customer_info");
    if (customerRaw) {
      try {
        setCustomerInfo(JSON.parse(customerRaw));
      } catch {
        console.warn("Impossible de parser cm_customer_info");
      }
    }

    const adresseRaw = localStorage.getItem("adresse");
    if (adresseRaw) {
      try {
        setAdresseInfo(JSON.parse(adresseRaw));
      } catch {
        console.warn("Impossible de parser adresse");
      }
    }
  }, [setCartItems]);

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const response = await getStripeStatus(sessionId);
        const data = response.data;

        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        if (data.amount_total) {
          setTotalPaid(data.amount_total / 100);
        }
      } catch (error) {
        console.error("Erreur récupération statut Stripe :", error);
        setStatus("error");
      }
    })();
  }, [sessionId]);

  const giftCardCode = localStorage.getItem("cm_giftcard_code") || undefined;
  const giftCardAmount = (() => {
    const raw = localStorage.getItem("cm_giftcard_amount");
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n > 0 ? n : undefined;
  })();

  useEffect(() => {
    const totalRaw = localStorage.getItem("cm_total");
    if (totalRaw) {
      try {
        setTotalPaid(JSON.parse(totalRaw));
      } catch {
        console.warn("Impossible de parser cm_total");
      }
    }
  }, []);

  useEffect(() => {
    if (status !== "complete") return;
    if (emailSent) return;
    if (!customerEmail) return;
    if (!localCart.length) return;

    const send = async () => {
      try {
        const cleanedItems = localCart.map((item) => {
          const cleaned = cleanObject(item);
          return {
            name: cleaned.name ?? "Produit sans nom",
            price: Number(cleaned.price) || 0,
            quantity: Number(cleaned.quantity) || 1,
            subTotal:
              Number(cleaned.subTotal) ||
              (Number(cleaned.price) || 0) * (Number(cleaned.quantity) || 1),
            ...cleaned,
          };
        });

        const payload: OrderPayload = {
          sessionId,
          customerEmail,
          adminEmail: ADMIN_EMAIL,
          customer: cleanObject({
            firstName: customerInfo?.firstName,
            lastName: customerInfo?.lastName,
            address: customerInfo?.address,
            phone: customerInfo?.phone,
          }),
          adresse: adresseInfo ? cleanObject(adresseInfo) : undefined,
          items: cleanedItems,
          total: totalPaid ?? undefined,
          giftCardCode,
          giftCardAmount,
        };

        await sendOrderConfirmation(payload);

        setEmailSent(true);
        localStorage.removeItem("cm_cart");
        localStorage.removeItem("cm_customer_info");
        localStorage.removeItem("adresse");
        localStorage.removeItem("cm_total");
        localStorage.removeItem("cm_giftcard_code");
        localStorage.removeItem("cm_giftcard_amount");
        setCartItems([]);
      } catch (err) {
        console.error("Erreur lors de l'envoi de l'e-mail de confirmation :", err);
        setEmailError(
          "Le paiement est confirmé, mais l'e-mail de confirmation n'a pas pu être envoyé automatiquement."
        );
      }
    };

    send();
  }, [
    status,
    emailSent,
    customerEmail,
    localCart,
    customerInfo,
    adresseInfo,
    sessionId,
    setCartItems,
  ]);

  if (!sessionId) return <p>Aucune session trouvée.</p>;
  if (!status) return <p>Chargement...</p>;

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Paiement réussi | Cousu Mouche</title>
        </Helmet>
        <section id="success">
          <p>
            Paiement réussi ✅ <br />
            Un e-mail de confirmation sera envoyé à :{" "}
            <strong>{customerEmail}</strong> (copie à {ADMIN_EMAIL})
          </p>

          {emailError && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{emailError}</p>
          )}

          {emailSent && (
            <p style={{ color: "green", marginTop: "0.5rem" }}>
              E-mail de confirmation envoyé ✅
            </p>
          )}
        </section>
      </>
    );
  }

  return <p>Statut du paiement : {status}</p>;
}