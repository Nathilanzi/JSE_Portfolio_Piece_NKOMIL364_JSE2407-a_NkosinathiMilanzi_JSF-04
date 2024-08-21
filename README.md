Vue.js E-Commerce Application README
Deployment website : https://jse-portfolio-piece-nkomil-364-jse-2407-a-nathilanzis-projects.vercel.app/ 
Overview
This project is a Vue.js e-commerce application designed to provide a rich and dynamic shopping experience. The application features a comprehensive shopping cart, product comparison, a discount carousel, product filtering, and user authentication. Additionally, it includes modern enhancements like light and dark mode themes and a sticky navigation header for an improved user experience.

Features
Shopping Cart: Users can add, update, and remove items from the shopping cart, with real-time updates and a total price calculation.
Product Comparison: Allows users to compare multiple products side-by-side, helping them make informed purchasing decisions.
Discount Carousel: Displays rotating discounts and promotions, enhancing the shopping experience.
Product Filtering: Enables users to filter products based on categories, price, ratings, and more.
Sticky Navigation Header: Ensures the navigation menu is always accessible, even when scrolling.
User Authentication: Includes JWT-based login, allowing users to manage their cart and comparison lists securely.
Light and Dark Mode: Users can toggle between light and dark themes, improving accessibility and user preference.
Prerequisites
Node.js and npm
Vue CLI (install with npm install -g @vue/cli if not already installed)
Vuex for state management
Tailwind CSS for styling
Setup
1. Clone the Repository
git clone <https://github.com/Nathilanzi/Module_4_NKOMIL364_JSE2407-a_NkosinathiMilanzi_JSF-03.git>
cd vue-ecommerce-app
2. Install Dependencies
npm install
npm run dev
File Structure
src/
components/
ShoppingCart.vue: Manages the shopping cart, including adding, updating, and removing items.
ProductComparison.vue: Displays a table for comparing selected products.
DiscountCarousel.vue: Shows rotating discounts and promotions.
ProductFilter.vue: Provides filtering options for products.
StickyHeader.vue: Implements the sticky navigation header.
stores/
cartStore.js: Manages the shopping cart state using Vuex.
comparisonStore.js: Manages the product comparison list.
router/index.js: Configures routing for the application.
App.vue: Main application component.
main.js: Entry point for the Vue.js application.
Shopping Cart Component
Template
Handles the display and management of the shopping cart, including real-time updates.
Store Setup
Cart Store 
Manages the state of the shopping cart, including adding, updating, and removing items.
Authentication
Login Component
Handles user authentication with JWT, including a password visibility toggle.
Contributing
Contributions are welcome! Feel free to submit issues or pull requests to enhance the application.