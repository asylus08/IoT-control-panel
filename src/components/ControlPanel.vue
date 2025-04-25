<script setup lang="ts">
import * as api from '../api/api.ts';

async function doorActionHandler() {}
async function alarmActionHandler() {}
async function tempActionHandler() {}
async function testActionHandler() {}

</script>

<template>
    <div class="control-panel">
      <div class="info-section">
        <div class="info-row">
          <label>Temperature:</label>
          <p class="value-bubble">24.6°C</p>
        </div>
        <div class="info-row">
          <label>Door State:</label>
          <p class="value-bubble">Closed</p>
        </div>
      </div>
  
      <div class="test-mode-section">
        <button class="toggle-btn">Activate/Deactivate Test Mode</button>
        <p>Test Mode: <span class="status-text">Off</span></p>
      </div>
  
      <div class="temp-control-section">
        <label>Adjust Temperature:</label>
        <div class="button-group">
          <button class="green-btn">+</button>
          <button class="red-btn">-</button>
        </div>
      </div>
  
      <div class="controls-row">
        <div class="door-control-section stacked-control">
          <label>Door:</label>
          <button class="green-btn" @click="api.triggerDoorAction('OPEN_DOOR')">Open</button>
          <button class="red-btn" @click="api.triggerDoorAction('CLOSE_DOOR')">Close</button>
        </div>
  
        <div class="alarm-control-section stacked-control">
          <label>Alarm:</label>
          <button class="green-btn">Activate</button>
          <button class="red-btn">Deactivate</button>
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
  