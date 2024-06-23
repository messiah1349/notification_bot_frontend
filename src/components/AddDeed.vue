<template>
    <div>
      <h2>Add New Deed</h2>
      <form @submit.prevent="submitDeed">
        <div>
          <label for="name">Deed Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="notification">Notification Time:</label>
          <input type="text" v-model="notificationTime" required />
        </div>
        <button type="submit">Add Deed</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addDeed, addNotification  } from '../services/api';

  async function proceedNotification(id, notificationTime) {
    if (notificationTime !== '') {await addNotification(id, {notification_time: notificationTime})}
  }
  
  export default {
    data() {
      return {
        name: '',
        notificationTime: ''
      };
    },
    methods: {
      async submitDeed() {
        const deed = {
          deed_name: this.name,
          telegram_id: this.$route.params.userId,
        };
        const response = await addDeed(deed);
        console.log(response.data.id)
        await proceedNotification(response.data.id, this.notificationTime)

        // await proceedNotification(deed)
        this.$emit('deedAdded');
        this.name = '';
        this.notificationTime = '';
      }
    }
  };
  </script>
  