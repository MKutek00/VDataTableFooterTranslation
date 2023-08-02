<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useUserStore } from '@/stores/UserStore';
import { getLocale, changeLanguage } from '@/plugins/i18n';

const theme = useTheme();
const user = useUserStore();

const title = ref(import.meta.env.VITE_APP_TITLE || 'Vite Vuetify Application');
const languages = {
  en: { name: 'English (EN)', code: 'en' },
  pl: { name: 'Polski (PL)', code: 'pl' },
  de: { name: 'Deutsch (DE)', code: 'de' }
};

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

const isDarkTheme = computed((): boolean => {
  return theme.global.current.value.dark;
});

const currentLocale = computed((): string => {
  return getLocale();
});
const hostColor = computed((): string => {
  return location.host.includes('dev') ? 'yellow' : 'green';
});
</script>
<template>
  <v-app-bar app :color="hostColor">
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <v-spacer />
    <v-btn icon href="http://intranet/">
      <v-icon color="grey-darken-3">mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn icon @click="toggleTheme">
      <v-icon :color="isDarkTheme ? 'yellow' : 'grey-darken-3'">mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-btn class="bg-white" elevation="3" @click="user.logout" v-t="'auth.logout'"></v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn class="bg-warning ml-2" elevation="3" v-bind="props">
          <v-icon left>mdi-translate</v-icon>
          {{ $t('main.language', { locale: currentLocale }) }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item link v-for="(language, index) in languages" :key="index">
          <v-list-item-title @click="changeLanguage(language.code)">{{
            language.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
