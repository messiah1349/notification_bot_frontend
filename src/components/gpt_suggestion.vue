<template>
    <div class="container">
      <h1>Deeds List</h1>
      <ul class="deeds-list">
        <!-- Loop through deeds and display them -->
        <li v-for="deed in deeds" :key="deed.id" class="deed-item">
          <div class="deed-name">{{ deed.name }}</div>
          <div class="deed-actions">
            <button @click="toggleDone(deed)" class="btn">
              {{ deed.done_flag ? "Activate" : "Finish" }}
            </button>
            <button @click="setNotification(deed)" class="btn">Set Notification</button>
          </div>
        </li>
  
        <!-- Add New Deed Row -->
        <li class="deed-item new-deed">
          <input
            v-model="newDeedName"
            placeholder="Enter new deed name"
            class="input"
          />
          <button @click="addNewDeed" class="btn">Add Deed</button>
          <button @click="setNotificationForNewDeed" class="btn">
            Set Notification
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getDeedsByUser } from "../services/api";
  
  export default {
    data() {
      return {
        deeds: [], // List of deeds from backend
        newDeedName: "", // New deed name
        newDeedNotificationTime: null, // New deed notification time
      };
    },
    async created() {
      await this.fetchDeeds();
    },
    methods: {
      async fetchDeeds() {
        const response = await getDeedsByUser(this.$route.params.userId);
        this.deeds = response.data;
      },
      async toggleDone(deed) {
        deed.done_flag = !deed.done_flag; // Toggle the done flag
        // Call backend API to update the deed
        await this.updateDeed(deed);
      },
      async setNotification(deed) {
        const notificationTime = prompt("Enter notification time (YYYY-MM-DD HH:mm:ss):");
        if (notificationTime) {
          deed.notify_time = notificationTime;
          // Call backend API to update the deed
          await this.updateDeed(deed);
        }
      },
      async addNewDeed() {
        if (!this.newDeedName.trim()) {
          alert("Deed name cannot be empty!");
          return;
        }
        const newDeed = {
          name: this.newDeedName,
          notify_time: this.newDeedNotificationTime,
          done_flag: false,
        };
        // Call backend API to save the new deed
        const response = await this.saveNewDeed(newDeed);
        this.deeds.push(response.data); // Add the new deed to the list
        this.newDeedName = ""; // Reset the input field
        this.newDeedNotificationTime = null; // Reset the notification time
      },
      setNotificationForNewDeed() {
        const notificationTime = prompt("Enter notification time (YYYY-MM-DD HH:mm:ss):");
        if (notificationTime) {
          this.newDeedNotificationTime = notificationTime;
        }
      },
      async updateDeed(deed) {
        // Placeholder function for updating the deed in backend
        console.log("Updating deed:", deed);
        // Add backend call here
      },
      async saveNewDeed(deed) {
        // Placeholder function for saving a new deed in backend
        console.log("Saving new deed:", deed);
        // Add backend call here and return response
        return { data: { ...deed, id: Date.now() } }; // Mock response
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  .deeds-list {
    list-style: none;
    padding: 0;
  }
  
  .deed-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background: #f9f9f9;
  }
  
  .new-deed {
    background: #eef;
  }
  
  .deed-name {
    flex-grow: 1;
  }
  
  .deed-actions {
    display: flex;
    gap: 10px;
  }
  
  .btn {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  .btn:hover {
    background: #0056b3;
  }
  
  .input {
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  </style>
  