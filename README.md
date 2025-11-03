# HM-Shop Admin Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

## Overview

**HM-Shop Admin Dashboard** is a full-featured administrative panel designed to manage the e-commerce platform **HM-Shop**. It enables authorized users to efficiently handle products, categories, customers, banners, and orders. The system also includes integration with the **LiqPay** payment gateway for order tracking and automated payment status updates. The dashboard provides real-time insights into sales, profits, and customer statistics through an intuitive and responsive UI.

**Live Demo:** [https://hm-shop-admin.vercel.app](https://hm-shop-admin.vercel.app)

![HM-Shop Admin Dashboard Preview](https://github.com/AntoninaZz/hm-shop-admin/blob/c192aa957b444e0703bf9078d19d7c2a3584ab0c/public/demo.jpg)

## Features

- **Authentication & Authorization:** Secure user authentication via **Clerk**.
- **Dashboard Analytics:** Displays total revenue, profit, orders, customers, and monthly sales charts.
- **Product Management:** Add, edit, and delete products with detailed information including media, variants, pricing, and discounts.
- **Category Management:** Create and edit product categories with image upload and description.
- **Banner Management:** Manage marketing banners with title, description, and target URL.
- **Order Management:** Track customer orders, update shipping statuses, and view detailed order contents.
- **Customer Management:** Access registered customer information.
- **API Functionality:** Provide dynamic API endpoints for e-commerce platform.
- **Payment Integration:** Integrated **LiqPay API** for secure payment verification and callback handling.
- **Real-Time Updates:** Dynamic rendering and data refresh using server and client components.
- **Responsive Interface:** Optimized for different devices with TailwindCSS styling and modern UX patterns.

---

## Technologies Used

### Frontend

- **Next.js 14 (App Router architecture)** – for server-side rendering and routing.
- **React 18** – for building dynamic client components.
- **TypeScript** – for static typing and better maintainability.
- **Tailwind CSS** – for modern responsive design and theming.
- **Lucide React** – for vector icons.
- **ShadCN/UI components** – for form inputs, dialogs, tables, cards, and modals.
- **React Hook Form + Zod** – for form validation and schema-based input control.
- **React Hot Toast** – for notifications.
- **date-fns** – for date formatting and manipulation.

### Backend

- **Next.js API Routes** – handle CRUD operations for banners, categories, products, and orders.
- **MongoDB + Mongoose** – for database management and schema modeling.
- **Clerk Authentication** – secure identity and access management.
- **LiqPay API** – for payment generation and callback validation.
- **Crypto (Node.js)** – for signature verification and data encryption.

### Infrastructure & Deployment

- **Vercel** – for hosting and continuous deployment.
- **Environment Variables (.env)** – for managing API keys and sensitive data.

---

## Architecture

The application follows a **modular monorepo structure** with clear separation between UI components, API endpoints, and database models. Each domain (banners, categories, products, orders, customers) has its own route, component, and model logic. It uses **Next.js App Router**, mixing **Server Components** (for data fetching and rendering) with **Client Components** (for interactivity).

---

## Key Highlights

- Seamless **Clerk-based** admin authentication and authorization.
- Secure backend with strict validation and error handling.
- **RESTful API** design, extendable for integration with the main e-commerce frontend.
- Dynamic visual analytics dashboard powered by chart components.
- Clean UI with reusable and consistent design system.

---

## Developer Skills Demonstrated

This project demonstrates proficiency in:

- Full-stack development with **Next.js** and **TypeScript**.
- **REST API** creation and **MongoDB data modeling**.
- Secure **authentication** and backend integration.
- Modern frontend UI development with **TailwindCSS** and **React Hooks**.
- Deployment and environment management on **Vercel**.

---

## 📂 Project Structure

```
hm-shop-admin/
├── app/                     # App Router structure
│   ├── api/                 # API routes for users, wishlist, delivery, etc.
│   ├── (auth)/              # Sign-up & sign-in pages
│   └── (dashboard)/         # Pages for handling products, categories, customers, banners, and orders
├── components/          # Reusable UI components structured in folders based on usage
├── lib/                 # Database models, actions
├── public/              # Static assets
├── scripts/             # Migration scripts
└── README.md
```

---

## ⚙️ Installation & Setup

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/AntoninaZz/hm-shop-admin.git

# Navigate to the project folder
cd hm-shop-admin

# Install dependencies
npm install

# Create .env.local and add your API keys
# (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY,
#  NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL,
#  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL, NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
#  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
#  MONGODB_URI,
#  LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY,
#  NEXT_PUBLIC_ECOMMERCE_STORE_URL, ADMIN_BASE_URL)

# Run development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📄 License

This project is created for educational and portfolio purposes.  
All handmade products and photos belong to **Antonina Zdebska**.

---

© 2025 [Antonina Zdebska](https://antoninazz.github.io)
