import { ParcelShopID, ParcelShopSelected } from "@frontboi/mondial-relay/types";
import { Lot } from "./productInterface";

// export interface Article {
//     name: string;
//     price: number;
//     broderieFirstName: string;
//     image: string | string[] | '';
//     tissus: string | string[] | '';
//     subTotal: number;
//     quantity: number;
//     message: string | '';
//     gift: boolean
//     parcelShop?: ParcelShopSelected & ParcelShopID;
//     who: string | undefined
//     lot: Lot | undefined;
//     anneauDeDentision: boolean
// }

export type Article = {
    name: string;
    price: number;
    quantity: number;
    subTotal: number;
    broderieFirstName?: string;
    image: string | string[] | '';
    tissus?: string[];
    message?: string;
    gift?: boolean;
    who?: string;
    parcelShop?: ParcelShopSelected & ParcelShopID;
    lot?: { quantities: number; price: number };
    anneauDeDentision?: boolean;
};