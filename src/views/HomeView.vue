<template>
    <div>
      <DeedList ref="someref"/>
    </div>
  </template>
  
  <script>
  import DeedList from '../components/DeedList';
  
  export default {
    components: {
      DeedList
    },
    methods: {
      async fetchDeeds() {
        this.$refs.someref.fetchDeeds();
      }
    }
  };
  </script>
  