
<script setup lang="ts">
import ControlPanel from './components/ControlPanel.vue'
import * as api from './api/api.ts';
import {ref,  onMounted  } from 'vue';

let isConnected = ref(false);
onMounted(async () => {
  isConnected.value = await api.testConnection()
})
</script>

<template>
  <div class="title">
    <h1>IoT Control Panel</h1>
    <img src="./assets/vue.svg" class="logo"/>
  </div>

  <div class="connection-status">
    <p>Connection status: </p>
    <p v-if="isConnected" class="sucess-message">Connection with IoT device secured!</p>
    <p v-else class="error-message">Connection with IoT device failed!</p>
  </div>
  
  <ControlPanel />

</template>
<style scoped>
.sucess-message {
  color: green;
}

.error-message {
  color: red;
}
.connection-status {
  justify-content: center;
  display: flex;
  gap:5px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.title {
  justify-content: center;
  display: flex;
}
</style>
