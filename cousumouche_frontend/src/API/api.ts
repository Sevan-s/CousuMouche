import axios from "axios";

const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_BACK_URL
    : process.env.REACT_APP_BACK_URL;

export type OrderItemPayload = {
    name: string;
    quantity: number;
    price: number;
    subTotal: number;
};

export type OrderPayload = {
    sessionId: string | null;
    customerEmail: string;
    adminEmail: string;
    customer: {
        firstName?: string;
        lastName?: string;
        address?: string;
        phone?: string;
    };
    adresse?: any;
    items: OrderItemPayload[];
    total?: number;
    giftCardCode: string | undefined;
    giftCardAmount: number | undefined
};

export async function getShopItem() {
    try {
        const response = await axios.get(apiUrl + '/products?populate=*');
        return response.data;
    } catch (error) {
        console.error('Error creating shop item:', error);
        throw error;
    }
}

export async function getColors() {
    try {
        const response = await axios.get(apiUrl + '/colors');
        return response.data;
    } catch (error) {
        console.error('Error creating shop item:', error);
        throw error;
    }
}

export async function relayPoint(country: string, city: string, cp: string) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI2_RecherchePointRelais xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${process.env.REACT_APP_ENSEIGNE_MONDIAL_RELAY}</Enseigne>
      <Pays>${country}</Pays>
      <Ville>${city}</Ville>
      <CP>${cp}</CP>
      <Poids>2000</Poids>
      <Action>SMA</Action>
      <Security>${process.env.REACT_APP_SECRET_MONDIAL_RELAY}</Security>
    </WSI2_RecherchePointRelais>
  </soap:Body>
</soap:Envelope>`;

    try {
        const res = await axios.post('/mr/WebService.asmx', xml, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI2_RecherchePointRelais',
            },
            maxBodyLength: Infinity,
        });

        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export async function getAllItemsList() {
    try {
        const response = await axios.get(apiUrl + "/products");
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la requête : ', error);
        return undefined;
    }
}

export async function createStripeSession(amount: number) {
    try {
        const response = await axios.post(apiUrl + "/checkout/create-checkout-session", {
            amount,
        });
        return response;
    } catch (error) {
        console.log("Erreur lors de la requête : ", error);
        throw error;
    }
}

export async function getStripeStatus(sessionId: string) {
    try {
        const response = await axios.get(apiUrl + "/checkout/session-status", {
            params: { session_id: sessionId },
        });
        window.dispatchEvent(new Event("storage"));
        return response;
    } catch (error) {
        console.log("Erreur lors de la requête : ", error);
        throw error;
    }
}

export async function GetPromotionCodeByCode(code: string) {
    try {
        const response = await axios.get(apiUrl + `/giftcards/${code}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getAllOpinion() {
    try {
        const response = await axios.get(apiUrl + "/opinion")
        return response.data.Opinion;
    } catch (error) {
        console.error('Erreur lors de la requête : ', error);
    }
}

export const sendOrderConfirmation = async (payload: OrderPayload) => {
  try {
    const res = await axios.post(
      apiUrl + "/api/orders/confirm",
    // "http://localhost:8000/api/orders/confirm",
      payload
    );
    return res.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la requête :",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
};