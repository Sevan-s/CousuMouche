import axios from "axios";
import { Iproduct } from "../utils/interfaces/productInterface";

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

    let data = `<?xml version="1.0" encoding="utf-8"?>\r\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n  <soap:Body>\r\n    <WSI2_RecherchePointRelais xmlns="http://www.mondialrelay.fr/webservice/">\r\n      <Enseigne>${process.env.REACT_APP_ENSEIGNE_MONDIAL_RELAY}</Enseigne>\r\n      <Pays>${country}</Pays>\r\n      <Ville>${city}</Ville>\r\n      <CP>${cp}</CP>\r\n      <Poids>2000</Poids>\r\n      <Action>SMA</Action>\r\n      <Security>${process.env.REACT_APP_SECRET_MONDIAL_RELAY}</Security>\r\n    </WSI2_RecherchePointRelais>\r\n  </soap:Body>\r\n</soap:Envelope>`;

    const varenv = process.env.SECRET_MONDIAL_RELAY;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/WebService.asmx',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI2_RecherchePointRelais',
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllItemsList() {
    console.log("apiUrl :", apiUrl);

    console.log("getAllItemsList called");
    try {
        const response = await axios.get('http://localhost:8000' + "/products");
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
        localStorage.clear();
        window.dispatchEvent(new Event("storage")); 
        return response;
    } catch (error) {
        console.log("Erreur lors de la requête : ", error);
        throw error;
    }
}