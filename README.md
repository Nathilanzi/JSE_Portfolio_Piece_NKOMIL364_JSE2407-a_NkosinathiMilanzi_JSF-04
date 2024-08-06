SwiftCart E-Commerce Application
Welcome to SwiftCart, a comprehensive e-commerce application built using Vue 3 and Vite. This application allows users to browse products, filter by categories, view product details, and manage their cart and wishlist. This README provides an in-depth introduction to the project, details about the technologies used, setup instructions, and usage examples.

Table of Contents
Introduction
Technologies Used
Setup Instructions
Project Structure
Usage Examples

Introduction
SwiftCart is designed to demonstrate the capabilities of modern front-end development with Vue 3 and Vite. It includes features such as:

Product listing with category filters
Product detail view with ratings and reviews
Cart and wishlist management
Responsive navigation and layout
Loading spinner for improved user experience

Technologies Used
Vue 3: A progressive JavaScript framework for building user interfaces.
Vite: A fast development build tool that provides a rich feature set for modern web development.
Vue Router: The official router for Vue.js to create a Single Page Application (SPA).
Axios: A promise-based HTTP client for making API requests.
Tailwind CSS: A utility-first CSS framework for rapid UI development.

Setup Instructions
Follow these steps to set up the project locally:


cd swiftcart

Install Dependencies:
npm install

Start the Development Server:
npm run dev
The application will be available at http://localhost:3000.

Project Structure

swiftcart/
├── public/
│   ├── online-shop.png
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Layout.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ProductCard.vue
│   │   ├── ProductDetails.vue
│   │   ├── ProductList.vue
│   │   └── ...
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

Usage Examples
Product List and Filtering
The main product listing page allows users to filter products by category and sort by price. The product data is fetched from a public API (FakeStoreAPI).
Product Details
The product detail view provides more information about a selected product, including ratings and reviews.
