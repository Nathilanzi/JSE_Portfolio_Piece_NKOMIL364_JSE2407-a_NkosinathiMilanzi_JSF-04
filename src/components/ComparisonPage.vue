<template>
    <div v-if="isAuthenticated">
      <h1>Comparison Page</h1>
      <button @click="clearComparison">Clear All</button>
      <table v-if="comparisonItems.length > 0">
        <thead>
          <tr>
          <th v-for="item in comparisonItems" :key="`title-${item.id}`">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in comparisonItems" :key="'image-${item.id}'">
              <img :src="item.image" alt="Product Image" />
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'description-${item.id}'">{{ item.description }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'price-${item.id}'">${{ item.price }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'rating-${item.id}'">{{ item.rating }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'remove-${item.id}'">
              <button @click="removeItem(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No items to compare.</p>
    </div>
    <p v-else>You must be logged in to view this page.</p>
  </template>
