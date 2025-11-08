import React from "react";

import { ParcelShopSelector } from '@frontboi/mondial-relay/browser'
var XMLParser = require('react-xml-parser');

export function LivraisonForm({ parcelShop, setParcelShop }: { parcelShop: any, setParcelShop: any }) {

    return (
        <div style={{ marginTop: 15, width: '100%' }}>
            <ParcelShopSelector
                weight={3000} // (in grams) optional, filters parcel shops by package weight
                nbResults={7} // optional (default: 7)
                deliveryMode="24R" // optional (default: "24R)
                brandIdAPI="BDTEST" // optional (default: "BDTEST", replace with your Brand Id API value for production usage)
                defaultCountry="FR" // optional (default: "FR")
                defaultPostcode="59000" // optional (default: "59000")
                allowedCountries="FR,BE" // optional (default: "FR")
                onParcelShopSelected={setParcelShop} // setter function when a parcel shop is clicked
            />
        </div>
    )
}
