<script setup>
import { ref, computed, inject, toRaw } from 'vue'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('app')

const isCreating = ref(false)

const createOrder = async () => {
  const items = toRaw(cart.value)
  const price = props.totalPrice

  console.log(items, price, window.Telegram.WebApp);
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-full h-full md:w-96 fixed right-0 top-0 z-20 p-8 overflow-y-auto pb-[200px]">
      <div>
        <DrawerHead />
        <CartItemList />

        <div v-if="!totalPrice" class="flex items-center justify-center h-full"> <!-- Центрирование -->
          <InfoBlock
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            image-url="/package-icon.png"
          />
        </div>
      </div>

      <!-- Блок с кнопкой, прижатый к нижней части окна браузера -->
      <div v-if="totalPrice" class="fixed bottom-0 left-0 right-0 md:right-0 md:left-auto md:w-96 bg-white p-8 border-t border-gray-200">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} ₽</b>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
