import { defineStore } from 'pinia';

export const useWishListStore = defineStore('wishlist', {
  state: () => ({
    wishlistItems: [],
  }),
  actions: {
    loadWishlist() {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      this.wishlistItems = storedWishlist;
    },
    addItem(item) {
      this.wishlistItems.push(item);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    },
    removeItem(itemId) {
      this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    },
    updateWishlist(item) {
        const existingItem = this.wishlistItems.find(i => i.id === item.id);
        if (existingItem) {
          // Update existing item properties with new values
          Object.assign(existingItem, item);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems)); // Save changes immediately
        }
      },
      
    clearWishlist() {
      this.wishlistItems = [];
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    },
  },
});
