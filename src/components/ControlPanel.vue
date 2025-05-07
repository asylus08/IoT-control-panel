<script setup lang="ts">
import * as api from '../api/api.ts';
import { ref, onMounted } from 'vue';
import {ref as dbRef, onValue } from 'firebase/database';
import db from '../firebase-config.ts';

const isTestMode = ref(false);
const isDoorOpen = ref(false);
const currentTemp = ref(0.0);

onMounted(() => {
  const dataRef = dbRef(db, '/data');
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const temperatures = Object.values(data)
        .map((entry: any) => entry.temperature)
        .filter((temp: any) => typeof temp === 'number');

      currentTemp.value = temperatures[temperatures.length - 1] ?? 0;

      console.log('All temperatures:', temperatures);
    }
  });
});

async function testModeHandler() {
  let response = await api.triggerTestMode();
  isTestMode.value = response || false;
}

async function adjustTemp(action: string) {
  let response = await api.triggerAdjustTemp(action);
  currentTemp.value = response || currentTemp.value;
}

async function doorActionHandler(action: string) {
  let response = await api.triggerDoorAction(action);
  isDoorOpen.value = response || isDoorOpen.value;
}

</script>

<template>
    <div class="control-panel">
      <div class="info-section">
        <div class="info-row">
          <label>Temperature:</label>
          <p class="value-bubble">{{ currentTemp.toFixed(1) }}°C</p>
        </div>
        <div class="info-row">
          <label>Door State:</label>
          <p class="value-bubble">{{ isDoorOpen ? 'Open' : 'Closed' }}</p>
        </div>
      </div>
  
      <div class="test-mode-section">
        <button class="toggle-btn" @click="testModeHandler">Activate/Deactivate Test Mode</button>
        <p>Test Mode: <span class="status-text">{{ isTestMode ? 'On' : 'Off' }}</span></p>
      </div>
  
      <div class="temp-control-section">
        <label>Adjust Temperature:</label>
        <div class="button-group">
          <button class="green-btn" @click="adjustTemp('RISE_TEMP')">+</button>
          <button class="red-btn" @click="adjustTemp('LOWER_TEMP')">-</button>
        </div>
      </div>
  
      <div class="controls-row">
        <div class="door-control-section stacked-control">
          <label>Door:</label>
          <button class="green-btn" @click="doorActionHandler('OPEN_DOOR')">Open</button>
          <button class="red-btn" @click="doorActionHandler('CLOSE_DOOR')">Close</button>
        </div>
  
        <div class="alarm-control-section stacked-control">
          <label>Alarm:</label>
          <button class="green-btn" @click="api.triggerAlarmAction('ACTIVATE_ALARM')">Activate</button>
          <button class="red-btn" @click="api.triggerAlarmAction('DEACTIVATE_ALARM')">Deactivate</button>
        </div>
      </div>
    </div>
  </template>
  

  
  <style scoped>
  .control-panel {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background: #1f1f1f;
    border-radius: 12px;
    border: 2px solid #444;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .info-section .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .value-bubble {
    background-color: #000;
    padding: 6px 12px;
    border-radius: 8px;
    color: #4caf50;
    font-weight: bold;
    white-space: nowrap;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 0; 
  }
  
  .green-btn,
  .red-btn,
  .toggle-btn {
    border: none;
    padding: 10px 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  
  .green-btn {
    background-color: #4caf50;
    color: #fff;
  }
  
  .red-btn {
    background-color: #f44336;
    color: #fff;
  }
  
  .toggle-btn {
    background-color: #2196f3;
    color: #fff;
  }
  
  .toggle-btn:hover,
  .green-btn:hover,
  .red-btn:hover {
    transform: scale(1.05);
  }
  
  .status-text {
    font-weight: bold;
    color: #ffeb3b;
  }
  
  .test-mode-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .temp-control-section {
    background-color: #2a2a2a;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border: 2px solid #444;
  }
  
  .temp-control-section label {
    margin: 0;
    font-weight: bold;
  }
  
  .controls-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .stacked-control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #2a2a2a;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    flex: 1;
    align-items: center;
    gap:10px;
    border: 2px solid #444;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  </style>
  