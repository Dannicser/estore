<script setup>
import { ref, provide, watch, computed, inject, onMounted } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина (START) */
const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
  document.documentElement.style.overflow = 'auto';
}

const openDrawer = () => {
  drawerOpen.value = true
  document.documentElement.style.overflow = 'hidden';
}

const toggleAddToCart = (item) => {
  if (item.isAdded) {
    item.isAdded = false
  } else {
    item.isAdded = true
  }
}

provide('app', {
  cart,
  closeDrawer,
  openDrawer,
  toggleAddToCart
})

/* Корзина (END) */
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :cart="cart" :vat-price="vatPrice" />

  <div class="bg-white w-[90%] sm:w-5/6 m-auto rounded-xl shadow-xl my-[3%]">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
