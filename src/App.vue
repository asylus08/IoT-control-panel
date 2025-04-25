<script setup lang="ts">
import ControlPanel from './components/ControlPanel.vue'
import ConnectionStats from './components/ConnectionStats.vue'
</script>

<template>
  <div class="title">
    <h1>IoT Control Panel</h1>
    <img src="./assets/vue.svg" class="logo" />
  </div>

  <div class="main-controls">
    <ConnectionStats />
    <ControlPanel />
  </div>
</template>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
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

.main-controls {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .main-controls {
    flex-direction: column;
    align-items: center;
  }

  .main-controls>* {
    width: 100%;
    max-width: 500px;
  }
}
</style>
