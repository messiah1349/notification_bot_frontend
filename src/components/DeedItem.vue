<template>
    <li class="list-item">
      <div class="notificationRow">
        <div :class="{ strikethrough: deedTextIsStrikethrogh }" class="deed-text">
          {{ deed.name }} - {{ deed.notify_time }}
        </div>
        <div class="deed-actions">
          <button @click="removeDeed">Done</button>
          <button @click="showNotification = !showNotification">Set Notification</button>
        </div>
      </div>
      <div v-if="showNotification === true" class="notification">
        <input 
          v-model="notificationTime"
          type="datetime-local" 
          id="notification-time"
          ref="notificationTimeInput"
          placeholder="Select notification time"
        />
        <button @click="setNotification">Set notification</button>
      </div>
    </li>
  </template>
  
  <script>
  import { addNotification, deleteDeed } from '../services/api';

  export default {
    props: {
      deed: Object
    },
    data() {
      return {
        showNotification: false,
        deedActiveStatus: true,
        notificationTime: "",
        deedTextIsStrikethrogh: false,
      }
    },
    methods: {
      async markAsDone() {
        await deleteDeed(this.deed.id);
        this.$emit('deedDeleted');
      },
      async setNotification() {
        if (!this.isValidTime(this.notificationTime)) {
          this.flashDtimePlaceholder();
          return;
        }
        const outputNotificationTime = this.convertDateTime(this.notificationTime);
        console.log(outputNotificationTime);
        console.log(this.deed.id);
        const response = await addNotification(this.deed.id, outputNotificationTime);
        console.log(response);
        this.$emit('notificationHasSet');
        this.showNotification = !this.showNotification;
      },
      convertDateTime(inputTime) {
        const date = new Date(inputTime);
        return date.toISOString();
      },
      isValidTime(time) {
        return time && !isNaN(new Date(time).getTime());
      },
      flashDtimePlaceholder() {
        console.log('error in notification time format')
        const input = this.$refs.notificationTimeInput;

        // Temporarily change the placeholder
        const originalPlaceholder = input.placeholder;
        input.placeholder = "Invalid time format!";
        input.classList.add("error");

        // Restore the placeholder and remove the error class after 1 second
        setTimeout(() => {
          input.placeholder = originalPlaceholder;
          input.classList.remove("error");
        }, 1000);
      },
      async removeDeed() {
        const response = await deleteDeed(this.deed.id);
        console.log("Deed remove response", response)
        this.strikethrowText();
      },
      strikethrowText() {
        this.deedTextIsStrikethrogh = !this.deedTextIsStrikethrogh;
      },
    }
  };
</script>

<style>
.list-item {
  display: flex;
  flex-direction: column;
}

.notificationRow {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background: #f9f9f9;
}
.deed-actions {
  display: flex;
  gap: 10px;
}

.notification {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  display: flex;
}
.notification input.error {
  border: 1px solid red; /* Highlight the input with a red border */
  background-color: #ffe5e5; /* Add a subtle red background */
  animation: flash 1s; /* Optional: Flash animation */
}
.deed-text {
  font-weight: bold;
}
.strikethrough {
  text-decoration: line-through;
}


@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
  