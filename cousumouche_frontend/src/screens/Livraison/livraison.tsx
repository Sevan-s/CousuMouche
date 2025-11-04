
export function Livraison() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 150, marginTop:'2%' }}>
            <h1 style={{ fontFamily: 'Nickainley', color: '#7E649D', fontWeight: 'normal', fontSize: '24px' }}>Livraison</h1>
            <div style={{ width: '50%', textAlign: 'left', marginLeft: '25%', marginTop: '2%' }}>
                <h2 style={{ fontFamily: 'Nickainley', fontWeight: 'bold' }}>Délais de livraison :</h2>
                <p style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>
                    Sur le site Cousu Mouche, les commandes concernent:
                    <br /><br />
                    • des articles en stock, déjà confectionnés et livrés dans un délai habituellement compris entre 3 et 5 jours et à compter de la réception du paiement.
                    <br /><br />
                    • des articles sur commande, confectionnés et  livrés dans un délai compris entre 15 et 40 jours suivant la quantité et le type d’articles commandés et à compter de la réception du paiement.
                    <br /><br />
                    Sur la fiche produits de chaque article présent sur le site, l’indication « en stock » ou « sur commande » figure. Même si le site est régulièrement maintenu à jour, en cas de commande d’articles devenus indisponibles, le client en sera informé par e-mail.
                    <br /><br />
                    Les délais de livraison sont donnés à titre indicatif et n’est aucunement garanti. Ils ne peuvent en aucun cas donner lieu à une annulation de la commande.
                </p><br />
                <h2 style={{ fontFamily: 'Nickainley', fontWeight: 'bold' }}>Modes d’expédition :</h2>
                <p style={{ fontFamily: 'Poiret', fontWeight: 'bold' }}>
                    Cousu Mouche livre la France métropolitaine, la Belgique, l'Espagne, le Portugal, le Luxembourg, l'Italie, la Pologne et les Pays-Bas
                    <br /><br />
                    La livraison est effectuée:
                    {/* <br /><br /> */}
                    {/* • soit par la remise directe en main propre de la commande à l’acheteur sur Limoux (11), sans conditions d’achats. Via le formulaire de contact ou l’adresse mail contact@cousumouche.fr, il convient de contacter la créatrice afin de convenir d’un rendez-vous.
                    <br /><br />
                    • soit par la Poste sous forme de colissimo à votre domicile dans votre boîte aux lettres si celle-ci respecte les dimensions des boîtes aux lettres normalisées. Le cas échéant, le facteur déposera un avis de passage dans votre boîte aux lettres vous invitant à récupérer votre colis dans un bureau de poste.
                    <br /><br />
                    • soit par la Poste sous forme de lettre suivie pour les petits articles. Ce mode de livraison ne s’offre que pour les colis de moins de 100 grammes, en France uniquement. */}
                    <br /><br />
                    Par Mondial relay. Vous choisirez au moment de la validation de votre commande votre point relais parmi les points relais proposés dans un rayon proche de votre domicile.
                    <br /><br />
                    {/* Les colis sont également envoyés vers l’UE, la Suisse et le Royaume-uni par Mondial Relay. */}
                    {/* <br /><br /> */}
                    {/* <br /><br />
                    Pour les commandes en Belgique, notez que Cousu Mouche communique par l’intermédiaire des réseaux sociaux plusieurs dates annuelles auxquelles vous pouvez retirer vos commandes à titre gracieux sur les communes de Braine-l’Alleud et Waterloo uniquement.
                        <br /><br />
                        Il est possible de contacter la créatrice via le formulaire de contact ou par mail à l’adresse contact@cousumouche.fr pour connaître ces dates et les modalités de livraison. Il est impératif de contacter la créatrice pour qu’elle vous communique la date, le lieu et l’heure de retrait de votre commande. Il revient au client de s’assurer de la bonne logistique de cette offre de livraison.
                        <br /><br /> */}
                        Cousu Mouche décline toute responsabilité en cas de retard ou d’absence de livraison due à une adresse erronée ainsi qu’en cas de perte et de vol. Cousu Mouche ne sera pas tenu responsable des conséquences dues au dépassement des délais de livraison si ceux-ci ne sont pas de son fait : grèves, restrictions gouvernementales, blocages des transports, etc.
                        <br /><br />
                        Le risque du transport est supporté en totalité par l’acheteur et ne fera pas l’objet d’un remboursement des frais engagés. Néanmoins, Cousu Mouche s’engage à restituer l’intégralité des dédommagements reçues à l’acheteur si un colis vient à se perdre et que le livreur se reconnaît être en tord.
                        <br /><br />
                        Si pour une raison quelconque, le colis est retourné chez l’expéditeur (Cousu Mouche), les frais de port pour un nouvel envoi, seront à la charge exclusive et intégrale de l’acheteur et ce quelqu’en soit le montant.
                        <br /><br />
                        L’acheteur s’engage à contrôler l’état de sa commande devant le transporteur. En cas de marchandises manquantes ou détériorées, l’acheteur s’engage à poser une réclamation auprès du transporteur et du vendeur par lettre recommandée AR dans un délai de 3 jours suivant la livraison. En cas d’anomalies avec les articles (qualité, quantité, référence) l’acheteur est tenu d’en informer expressément la créatrice via le formulaire de contact dans un délai de 3 jours. Aucune réclamation ne sera traitée au-delà de ce délai.
                        <br /><br />
                        Toutes commandes passées à Cousu Mouche sont destinées à l’usage personnel des clients. Toute revente partielle ou totale des produits est interdite.
                </p>
            </div>
        </div>
    )
}