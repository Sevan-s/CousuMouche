import React, { useEffect, useState } from "react";
import { relayPoint } from "../../API/api";
import { countries } from "../../utils/countriesList";
import { convertXML, createAST } from "simple-xml-to-json"
import { ParcelShopSelector } from '@frontboi/mondial-relay/browser'
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types'
var XMLParser = require('react-xml-parser');

// export function LivraisonForm() {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [country, setCountry] = useState("");
//     const [city, setCity] = useState("");
//     const [cp, setCP] = useState("");
//     const [countryCode, setCountryCode] = useState('');
//     const [relayPoints, setRelayPoint] = useState<any>();

//     const getRelayPoint = async () => {
//         try {
//             const allRelayPoint = await relayPoint(countryCode, city, cp);
//             setRelayPoint(allRelayPoint);
//             // parseSoapResponse(allRelayPoint)
//         } catch (error) {
//             console.log("Erreur lors de la récupération des points relais :", error);
//         }
//     };


//     const handleInputChange = (e: any) => {
//         setCountry(e.target.value)
//         const foundCountry = countries.find(findCountry => findCountry.name.toLowerCase() === e.target.value.toLowerCase());
//         if (foundCountry) {
//             setCountryCode(foundCountry.code);
//         } else {
//             setCountryCode('');
//         }
//     };

//     // function parseSoapResponse(soapResponse: string) {
//     //     var xml = new XMLParser().parseFromString(soapResponse);
//     //     console.log("test",xml.getElementsByTagName('WSI2_RecherchePointRelaisResponse'));
//     //     const xmlChildren = xml.children[0].children[0].children[0].children;
//     //     const childrenArray = Array.from(xmlChildren);
//     //     console.log("check", childrenArray)
//     //     setRelayPoint(xml)
//     //     return xml
//     // }

//     useEffect(() => {
//         getRelayPoint();
//     }, [countryCode]);

//     console.log("relayPoints: ", relayPoints)

//     return (
//         <div>
//             <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 30, marginBottom: 30 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', marginBottom: 20 }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Nom</label>
//                         <input
//                             value={lastName}
//                             onChange={e => setLastName(e.target.value)}
//                             type="text"
//                             name="lastName"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Prénom</label>
//                         <input
//                             value={firstName}
//                             onChange={e => setFirstName(e.target.value)}
//                             type="text"
//                             name="firstName"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>

//                 </div>
//                 <div style={{ display: 'flex', width: '25%', marginBottom: 20 }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Email</label>
//                         <input
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             type="email"
//                             name="email"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>
//                 </div>

//                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', marginBottom: 20 }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Pays</label>
//                         <input
//                             value={country}
//                             onChange={handleInputChange}
//                             type="text"
//                             name="country"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>

//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Ville</label>
//                         <input
//                             value={city}
//                             onChange={e => setCity(e.target.value)}
//                             type="text"
//                             name="city"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>
//                 </div>

//                 <div style={{ display: 'flex', width: '25%', marginBottom: 20 }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
//                         <label style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>Code Postal</label>
//                         <input
//                             value={cp}
//                             onChange={e => setCP(e.target.value)}
//                             type="text"
//                             name="postal-code"
//                             required
//                             style={{ borderRadius: 5, height: 25, border: 'solid, #d7b5e9, 1px' }}
//                         />
//                     </div>
//                 </div>
//             </form>
//             <div style={{ marginBottom: 15 }}>
//                 <button type="submit" onClick={getRelayPoint} style={{ width: 200, height: 50, borderRadius: 10, border: 'solid, #d7b5e9, 1px', backgroundColor: 'transparent', fontFamily: 'Poiret', fontSize: 20, fontWeight: 'bold' }}>Continuer</button>
//             </div>
//             <div>
//                 {/* {relayPoints !== undefined && relayPoints.map
//                 } */}
//             </div>
//         </div>
//     );
// }



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
