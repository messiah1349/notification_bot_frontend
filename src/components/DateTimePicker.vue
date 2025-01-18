<template>
    <div>
      <form @submit.prevent="handleSubmit">
            <div v-if="selectedDate !== ''" class="button-group">
                <button
                v-for="option in options"
                :key="option"
                :class="{ active: selectedOption === option }"
                type="button"
                @click="selectOption(option)"
                >
                {{ option }}
                </button>
            </div>
        <label for="date">Select Date:</label>
        <select v-model="selectedDate" id="date">
          <option v-for="date in dates" :key="date.value" :value="date.value">
            {{ date.text }}
          </option>
        </select>
  
        <div>
          <label for="hour">Select Hour:</label>
          <select v-model="selectedHour" id="hour">
            <option v-for="hour in hours" :key="hour" :value="hour">
              {{ hour === '' ? hour : hour.toString().padStart(2, '0') }}
            </option>
          </select>
        </div>
  
        <div>
            <label for="minute">Select Minute:</label>
            <select v-model="selectedMinute" id="minute">
            <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ minute === '' ? minute : minute.toString().padStart(2, '0') }}
            </option>
            </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
    // import { ref } from 'vue';

  export default {
    data() {
      return {
        selectedDate: '',
        selectedHour: 0,
        selectedMinute: 0,
        dates: [],
        hours: [],
        minutes: [],
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
        selectedOption: '',
      };
    },
    mounted() {
      this.populateDates();
      this.populateHours();
      this.populateMinutes();
    },
    methods: {
      populateDates() {
        this.dates.push('')
        const today = new Date();
        for (let i = 0; i < 10; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          this.dates.push({
            value: date.toISOString().split('T')[0],
            text: date.toDateString(),
          });
        }
        this.selectedDate = this.dates[0].value;
        console.log(`SelectedDate == ${this.selectedDate}`);
        console.log(`dates == ${this.dates}`);
      },
      populateHours() {
        this.hours.push('')
        for (let h = 0; h < 24; h++) {
          this.hours.push(h);
        }
        this.selectedHour = this.hours[0];
      },
      populateMinutes() {
        this.minutes.push('')
        for (let m = 0; m < 60; m += 5) {
          this.minutes.push(m);
        }
        this.selectedMinute = this.minutes[0];
      },
      selectOption(option) {
        this.selectedOption = option;
      },
      handleSubmit() {
        const selectedTime = `${this.selectedHour.toString().padStart(2, '0')}:${this.selectedMinute.toString().padStart(2, '0')}`;
        console.log(`Selected Date and Time: ${this.selectedDate} ${selectedTime}`);
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 200px;
  }
  
  label {
    margin-top: 10px;
  }
  
  select {
    margin-bottom: 10px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  .button-group {
  display: flex;
  justify-content: space-between;
}

.button-group button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #5657b3;
  border: 1px solid #ccc;
  cursor: pointer;
}

.button-group button.active {
  background-color: #4caf50;
  color: white;
}
  </style>
  
