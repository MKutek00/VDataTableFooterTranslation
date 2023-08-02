<script setup lang="ts">
import { ref } from 'vue';
import { VDataTableServer } from 'vuetify/labs/components';

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22'
  }
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let items = desserts.slice();
        if (search != '') {
          items = items.filter((item) => {
            return item.name.toUpperCase().includes(search.toUpperCase());
          });
        }
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a: any, b: any) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  }
};

const itemsPerPage = ref(5);
const headers = ref([
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name'
  },
  { title: 'Calories', key: 'calories', align: 'end' },
  { title: 'Fat (g)', key: 'fat', align: 'end' },
  { title: 'Carbs (g)', key: 'carbs', align: 'end' },
  { title: 'Protein (g)', key: 'protein', align: 'end' },
  { title: 'Iron (%)', key: 'iron', align: 'end' }
]);

const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

function loadItems({ page, itemsPerPage, sortBy, search }: any) {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy, search }).then(({ items, total }: any) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
}
const search = ref('');
const selectedRequests = ref([]);
</script>

<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld /> -->
      <v-text-field label="search" v-model="search"></v-text-field>
      <v-data-table-server
        v-model:model-value="selectedRequests"
        :headers="(headers as any)"
        :items-length="totalItems"
        :items="serverItems"
        show-select
        return-object
        :search="search"
        :loading="loading"
        class="elevation-1"
        item-value="name"
        @update:options="loadItems"
      >
        <template v-slot:[`item.calories`]="{ item }">
          <td>{{ item.raw.calories }}</td>
        </template>
        <template v-slot:[`item.protein`]="{ item }">
          <td>{{ item.raw.protein }}</td>
        </template>
        <template v-slot:[`item.fat`]="{ item }">
          <td>{{ item.raw.fat }}</td>
        </template>
      </v-data-table-server>
    </v-main>
  </v-app>
</template>
