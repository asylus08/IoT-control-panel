<script>
import * as api from '../api/api.ts';
import {ref,  onMounted  } from 'vue';


let isConnected = ref(false);
onMounted(async () => {
  isConnected.value = await api.testConnection()
})
</script>
<template>
    <div class="stats-panel">
        <button v-on:click="api.testConnection">Tester la connexion</button>
        <div class="connection-status">
            <p>IoT device connection: </p>
            <p v-if="isConnected" class="sucess-message">Connection with IoT device secured!</p>
            <p v-else class="error-message">Connection with IoT device failed!</p>
        </div>
        <div class="connection-status">
            <p>Firebase connection: </p>
            <p v-if="isConnected" class="sucess-message">Connection with Firebase secured!</p>
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
    height: 200px;
}

.sucess-message {
  color: green;
}

.error-message {
  color: red;
}
.connection-status {
  justify-content: start;
  display: flex;
  gap:5px;
}
</style>