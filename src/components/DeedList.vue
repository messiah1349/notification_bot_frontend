<template>
    <div>
      <h2>Deeds</h2>
      <ul class="deeeds-list">
        <div v-for="deed in deeds" :key="deed.id">
          <DeedItem :deed="deed" @deedDeleted="fetchDeeds" />
        </div>
        <NewDeedItem @deedAdded="fetchDeeds"/>
      </ul>
    </div>
  </template>
  
  <script>
  import { getDeedsByUser } from '../services/api';
  import DeedItem from './DeedItem';
  import NewDeedItem from './NewDeedItem';
  
  export default {
    components: {
      DeedItem,
      NewDeedItem,
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
        this.deeds.forEach(deed => {deed.showNotification = false;});
        // console.log(this.deeds[0].showNotification)
      }
    }
  };
  </script>
  