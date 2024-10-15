import axios from "axios";
import { Iproduct } from "../utils/interfaces/productInterface";

// export async function createShopItem(data: any) {
//     try {
//         const response = await axios.post('http://localhost:8081/api/products', data);
//         console.log("createShopItem response : ", response)
//         return response.data;
//     } catch (error) {
//         console.error('Error creating shop item:', error);
//         throw error;
//     }
// }

export async function getShopItem() {
    try {
        const response = await axios.get('http://localhost:8081/api/products?populate=*');
        console.log("getShopItem response : ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating shop item:', error);
        throw error;
    }
}

export async function getColors() {
    try {
        const response = await axios.get('http://localhost:8081/api/colors');
        console.log("getColors response : ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating shop item:', error);
        throw error;
    }
}