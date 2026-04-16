# 🧵 CousuMouche — Frontend Client

> Interface e-commerce développée pour une micro-entreprise de couture artisanale française. Projet en production sur [cousumouche.fr](https://www.cousumouche.fr).

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)

---

## 🌐 Démo

🔗 [cousumouche.fr](https://www.cousumouche.fr)

---

## 📖 Présentation

CousuMouche est la vitrine e-commerce d'une vraie micro-entreprise spécialisée dans les créations couture artisanales pour enfants et parents. Ce repo contient le frontend client : catalogue, panier et tunnel d'achat complet avec paiement Stripe.

---

## ✨ Fonctionnalités

- 🛍️ Catalogue produits avec navigation par catégorie
- 🛒 Panier dynamique (ajout, suppression, quantités)
- 💳 Tunnel d'achat avec paiement sécurisé **Stripe**
- 📸 Galerie d'images produits (AWS S3)
- 📱 Design responsive mobile-first
- 🔗 Consommation de l'API REST ([cmback](https://github.com/Sevan-s/cmback))

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| **React 18** | UI et gestion des composants |
| **Tailwind CSS** | Styling responsive |
| **React Router** | Navigation SPA |
| **Stripe.js** | Intégration paiement front |
| **Axios** | Appels API REST |
| **Vercel** | Déploiement et hosting |

---

## 🏗️ Repos liés

| Repo | Description |
|------|-------------|
| [cmback](https://github.com/Sevan-s/cmback) | API REST Express — backend |
| [cmadmindashboard](https://github.com/Sevan-s/cmadmindashboard) | Back-office admin |

---

## 🚀 Lancer en local

```bash
git clone https://github.com/Sevan-s/CousuMouche.git
cd CousuMouche
npm install
npm start
```

### Variables d'environnement

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 💡 Ce que j'ai appris

- Intégration de **Stripe.js** côté client (Stripe Elements, gestion des erreurs de paiement)
- Architecture **SPA** avec React Router et gestion d'état global
- Communication avec une **API REST** sécurisée
- Déploiement continu sur **Vercel**

---

## 👨‍💻 Auteur

**Sevan Sarikaya** — Développeur Front-End React  
[GitHub](https://github.com/Sevan-s) · [LinkedIn](#) · [cousumouche.fr](https://www.cousumouche.fr)

---

*Projet en production depuis 2025*

-----------------------------------------------------------------------------------------------------------------------------

# 🧵 CousuMouche — Client Frontend

> E-commerce interface developed for a French handmade sewing micro-business. Project live in production at [cousumouche.fr](https://www.cousumouche.fr).

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)

---

## 🌐 Demo

🔗 [cousumouche.fr](https://www.cousumouche.fr)

---

## 📖 Overview

CousuMouche is the e-commerce showcase of a real micro-business specializing in handmade sewing creations for children and parents. This repository contains the client frontend: product catalog, shopping cart, and complete checkout flow with Stripe payments.

---

## ✨ Features

- 🛍️ Product catalog with category navigation
- 🛒 Dynamic cart (add, remove, update quantities)
- 💳 Checkout flow with secure **Stripe** payment
- 📸 Product image gallery (AWS S3)
- 📱 Mobile-first responsive design
- 🔗 REST API integration ([cmback](https://github.com/Sevan-s/cmback))

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **React 18** | UI and component management |
| **Tailwind CSS** | Responsive styling |
| **React Router** | SPA navigation |
| **Stripe.js** | Frontend payment integration |
| **Axios** | REST API requests |
| **Vercel** | Deployment and hosting |

---

## 🏗️ Related Repositories

| Repo | Description |
|------|-------------|
| [cmback](https://github.com/Sevan-s/cmback) | Express REST API — backend |
| [cmadmindashboard](https://github.com/Sevan-s/cmadmindashboard) | Admin back-office dashboard |

---

## 🚀 Run Locally

```bash
git clone https://github.com/Sevan-s/CousuMouche.git
cd CousuMouche
npm install
npm start
```

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 💡 What I Learned

- Integrating Stripe.js on the client side (Stripe Elements, payment error handling)
- Building an SPA architecture with React Router and global state management
- Communicating with a secure REST API
- Continuous deployment with Vercel

---

## 👨‍💻 Author

**Sevan Sarikaya** — Front-End React Developer 
[GitHub](https://github.com/Sevan-s) · [LinkedIn](https://www.linkedin.com/in/sevan-sarikaya/) · [cousumouche.fr](https://www.cousumouche.fr)

---

*Project live in production since 2025*