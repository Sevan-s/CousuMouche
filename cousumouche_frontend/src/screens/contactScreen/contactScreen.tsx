import React, { useState } from "react";
import Styles from './contactStyles.module.css';

export function ContactScreen() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, email, message }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Message envoyé !");
      setSubject("");
      setEmail("");
      setMessage("");
    } else {
      alert("Erreur lors de l'envoi : " + data.error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 mb-32 lg:mb-12">
      <div className="w-full max-w-[70%] bg-[#e8e3f1] text-[#4a3964] rounded-2xl px-6 mb-8 py-4 text-center shadow font-poiret font-bold text-lg">
        Besoin d’un renseignement sur une création, une commande en cours ou l'envie de personnaliser votre commande?<br />
        Laissez-moi un message via ce formulaire de contact ou par message privé via les réseaux sociaux.<br /><br />
        Je réponds à vos demandes dans un délai de 72h.<br />
        Merci de votre compréhension !
      </div>

      <div className="relative w-full max-w-xl mx-auto bg-[#ede6f7] rounded-[36px] px-6 py-10 shadow-lg border border-[#c3a2df]">

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 relative z-10">
          <label className="font-poiret text-[#4a3964] text-xl text-center font-bold ">Sujet</label>
          <input
            type="text"
            placeholder="Entrez votre texte ici"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="bg-white border border-[#c3a2df] rounded-xl px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#c3a2df] font-poiret text-lg"
          />

          <label className="font-poiret text-[#4a3964] text-xl text-center font-bold ">Adresse e-mail</label>
          <input
            type="email"
            placeholder="Entrez votre adresse e-mail ici"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white border border-[#c3a2df] rounded-xl px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#c3a2df] font-poiret text-lg"
          />

          <label className="font-poiret text-[#4a3964] text-xl text-center font-bold ">Message</label>
          <textarea
            placeholder="Entrez votre message ici"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="bg-white border border-[#c3a2df] rounded-xl px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#c3a2df] font-poiret text-lg resize-vertical min-h-[100px]"
          />

          <button
            type="submit"
            className="bg-[#b9b4ca] hover:bg-[#7E649D] text-white text-lg font-poiret font-bold px-12 py-3 mt-4 rounded-full shadow transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}