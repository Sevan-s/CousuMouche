import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getStripeStatus } from "../../API/api";

export default function ReturnPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    async function fetchStatus() {
      try {
        if (sessionId) {
          const response = await getStripeStatus(sessionId);
          const data = response.data;
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        }
      } catch (error) {
        console.error("Erreur récupération statut Stripe :", error);
        setStatus("error");
      }
    }

    fetchStatus();
  }, [sessionId]);

  if (!sessionId) return <p>Aucune session trouvée.</p>;
  if (!status) return <p>Chargement...</p>;

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          Paiement réussi ✅ <br />
          Un e-mail de confirmation sera envoyé à : <strong>{customerEmail}</strong><br />
          Pour toute question, contactez : <a href="mailto:perrine.donfut@gmail.com">perrine.donfut@gmail.com</a>
        </p>
      </section>
    );
  }

  return <p>Statut du paiement : {status}</p>
}