<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { inject } from 'vue';
import CardList from '../components/CardList.vue';

const { cart, toggleAddToCart } = inject('app');

const items = ref([]);
const isInit = ref(false);

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
});

// Загрузка товаров
const fetchItems = async () => {
  try {
    const { data } = await axios.get('/data/goods.json');
    items.value = data;
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err);
  }
};

const initItems = () => {
  try {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localCart.length) {
      items.value = items.value.map(item => ({
        ...item,
        isAdded: localCart.some(localItem => localItem.id === item.id),
      }));
    }
    isInit.value = true;
  } catch (error) {
    console.error('Ошибка инициализации корзины:', error);
  }
};

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.title.toLowerCase().trim().includes(filters.searchQuery.toLowerCase().trim())
  );
});

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 500);

const saveCartToLocalStorage = () => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
};

onMounted(() => {
  fetchItems();
});

watch(items, () => {
  if (!isInit.value) {
    initItems();
  } else {
    cart.value = items.value.filter(item => item.isAdded);
    saveCartToLocalStorage();
  }
}, { deep: true });

</script>

<template>
  <div class="md:flex md:justify-between md:items-center">
    <h2 class="text-3xl font-bold mb-4">Вся техника</h2>

    <div>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="w-full border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="filteredItems" @add-to-cart="toggleAddToCart" />
  </div>
</template>