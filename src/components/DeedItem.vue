<template>
    <div>
      <p>{{ deed.name }} - {{ deed.notify_time }}</p>
      <button @click="markAsDone">Mark as Done</button>
    </div>
  </template>
  
  <script>
  import { deleteDeed } from '../services/api';
  
  export default {
    props: {
      deed: Object
    },
    methods: {
      async markAsDone() {
        await deleteDeed(this.deed.id);
        this.$emit('deedDeleted');
      }
    }
  };
  </script>
  