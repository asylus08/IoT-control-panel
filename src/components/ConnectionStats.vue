<script setup lang="ts">
import * as api from '../api/api.ts';
import { ref, onMounted } from 'vue';
import db from '../firebase-config.ts';
import { ref as dbRef, set } from "firebase/database";

const isIotConnected = ref(false);
const isDBConnected = ref(false);

async function checkIoTConnection() {
  isIotConnected.value = await api.testConnection();
}

async function testFirebaseConnection() {
  try {
    await set(dbRef(db, 'testConnection'), {
      status: 'connected',
      timestamp: Date.now(),
    });
    isDBConnected.value = true;
  } catch (error) {
    isDBConnected.value = false;
    console.log('Erreur du test de connection avec Firebase: ', error);
  }
}

onMounted(checkIoTConnection);
onMounted(testFirebaseConnection)
</script>

<template>
  <div class="stats-panel">
    <button @click="checkIoTConnection">Test connection</button>

    <div class="connection-status">
      <p>IoT device connection:</p>
      <p v-if="isIotConnected" class="success-message">Connection with IoT device secured!</p>
      <p v-else class="error-message">Connection with IoT device failed!</p>
    </div>

    <div class="connection-status">
      <p>Firebase connection:</p>
      <p v-if="isDBConnected" class="success-message">Connection with Firebase secured!</p>
      <p v-else class="error-message">Connection with Firebase failed!</p>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  border: 2px solid #444;
  border-radius: 10px;
  padding: 20px;
  padding-top: 20px;
  padding-bottom: 50px;
  background: #1f1f1f;
  color: white;
  width: 100%; 
  max-width: 700px;
  margin: auto;
  box-sizing: border-box;
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
