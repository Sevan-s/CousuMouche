import axios from "axios";

const apiUrl = process.env.REACT_APP_BACK_URL;
export async function getShopItem() {
    try {
        const response = await axios.get(apiUrl + '/products?populate=*');
        console.log("getShopItem response : ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating shop item:', error);
        throw error;
    }
}

export async function getColors() {
    try {
        const response = await axios.get(apiUrl + '/colors');
        console.log("getColors response : ", response.data)
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
    console.log("apiUrl :", apiUrl);

    console.log("getAllItemsList called");
    try {
        const response = await axios.get(apiUrl + "/products");
        console.log('Réponse : ', response.data);
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
        console.log("paiement stripe", response);
        return response;
    } catch (error) {
        console.log("Erreur lors de la requête : ", error);
        throw error;
    }
}

export async function getStripeStatus(sessionId: string) {
    console.log("inside : ", sessionId)
    try {
        const response = await axios.get(apiUrl + "/checkout/session-status", {
            params: { session_id: sessionId },
        });
        console.log("stripe", response);
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
        console.log("gift : ", response)
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getAllOpinion() {
    try {
        const response = await axios.get(apiUrl + "/opinion")
        console.log("response : ", response)
        return response.data.Opinion;
    } catch (error) {
        console.error('Erreur lors de la requête : ', error);
    }
}