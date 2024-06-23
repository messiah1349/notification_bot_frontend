<template>
    <div>
      <h2>Deeds</h2>
      <div v-for="deed in deeds" :key="deed.id">
        <DeedItem :deed="deed" @deedDeleted="fetchDeeds" />
      </div>
    </div>
  </template>
  
  <script>
  import { getDeedsByUser } from '../services/api';
  import DeedItem from './DeedItem';
  
  export default {
    components: {
      DeedItem
    },
    data() {
      return {
        deeds: []
      };
    },
    async created() {
      await this.fetchDeeds();
    },
    methods: {
      async fetchDeeds() {
        const response = await getDeedsByUser(this.$route.params.userId);
        this.deeds = response.data;
      }
    }
  };
  </script>
  