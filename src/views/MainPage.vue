<template>
    <div>
      <h1>Welcome to the Notification App</h1>
      <button @click="authorizeWithTelegram">Login with Telegram</button>
    </div>
  </template>
<!--   
  <script>
  export default {
    methods: {
      authorizeWithTelegram() {
        const telegramAuthUrl = `https://oauth.telegram.org/auth?bot_id=214139458&origin=http://localhost:8080&embed=0`;
        window.location.href = telegramAuthUrl;
      }
    }
  };
  </script> -->
  

  <script>
  export default {
    methods: {
      authorizeWithTelegram() {
        const botId = '214139458'; // Replace with your bot ID
        const origin = 'https://evgeniimigaev.com'
        // const origin = window.location.origin;
        const telegramAuthUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&embed=0&request_access=write`;
        window.location.href = telegramAuthUrl;
      }
    },
    created() {
      // Handle Telegram OAuth redirect
      const urlParams = new URLSearchParams(window.location.search);
      const user = urlParams.get('user');
      if (user) {
        const userData = JSON.parse(decodeURIComponent(user));
        console.log(userData); // Handle user data, e.g., save session, redirect, etc.
        this.$router.push(`/user/${userData.id}`);
      }
    }
  };
  </script>