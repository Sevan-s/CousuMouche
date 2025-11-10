import { ParcelShopID, ParcelShopSelected } from "@frontboi/mondial-relay/types";
import { Lot, Product } from "./productInterface";

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
    id: string;
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
    blanketDimension?: string;
    bearEar?: string;
    dimension?: string;
    fabricSelected?: FabricSelected[];
    embroidery?: string;
    selectedStrap?: string | null;
    selectedLabel?: string | null;
    label?: string | undefined;
    strap?: string | undefined;
    anneauOption?: string | null;
    product: Product;
    closingSystem?: string | null;
    giftCardSended?: string | null;
    giftCardData?: FormData | null
};

type FabricSelected = {
    id: string
    name: string
}

export type Shopping = {
    name: string;
    price: number;
    quantity?: number;
    blanketDimension?: string;
    bearEar?: string;
    dimension?: string;
    fabricSelected?: FabricSelected[];
    lot?: number;
    embroidery?: string;
    selectedStrap?: string | null;
    selectedLabel?: string | null;
    gift?: boolean;
    who?: string;
    parcelShop?: ParcelShopSelected & ParcelShopID;
    message: string;
    label: string | undefined;
    strap: string | undefined;
    anneauOption: string | null;
    product: Product;
    closingSystem: string | null;
    giftCardSended: string | null;
    giftCardData: FormData | null
};