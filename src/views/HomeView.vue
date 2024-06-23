<template>
    <div>
      <AddDeed @deedAdded="fetchDeeds" />
      <DeedList ref="someref"/>
    </div>
  </template>
  
  <script>
  import AddDeed from '../components/AddDeed';
  import DeedList from '../components/DeedList';
  
  export default {
    components: {
      AddDeed,
      DeedList
    },
    methods: {
      async fetchDeeds() {
        this.$refs.someref.fetchDeeds();
      }
    }
  };
  </script>
  