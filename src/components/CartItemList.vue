<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, toggleAddToCart } = inject('app')

</script>

<template>
  <div class="flex flex-col gap-4" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => toggleAddToCart(item)"
    />
  </div>
</template>
