<script setup lang="ts">
import * as api from '../api/api.ts';
import { ref, onMounted } from 'vue';

const isConnected = ref(false);

async function checkConnection() {
  isConnected.value = await api.testConnection();
}

onMounted(checkConnection);
</script>

<template>
  <div class="stats-panel">
    <button @click="checkConnection">Tester la connexion</button>

    <div class="connection-status">
      <p>IoT device connection:</p>
      <p v-if="isConnected" class="success-message">Connection with IoT device secured!</p>
      <p v-else class="error-message">Connection with IoT device failed!</p>
    </div>

    <div class="connection-status">
      <p>Firebase connection:</p>
      <p v-if="isConnected" class="success-message">Connection with Firebase secured!</p>
      <p v-else class="error-message">Connection with Firebase failed!</p>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  border: 2px solid #444;
  border-radius: 10px;
  padding: 20px;
  background: #1f1f1f;
  color: white;
  max-width: 600px;
  margin: auto;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
