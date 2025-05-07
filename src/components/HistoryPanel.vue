<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref, onMounted } from 'vue'
import { query, limitToLast, onValue, orderByKey, ref as dbRef } from 'firebase/database'
import db from '../firebase-config.ts'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const labels = ref<string[]>([])
const temperatures = ref<number[]>([])

const chartData = ref({
  labels: labels.value,
  datasets: [
    {
      label: 'Temperature (°C)',
      backgroundColor: '#4caf50',
      borderColor: '#4caf50',
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#4caf50',
      data: temperatures.value,
      fill: false,
      tension: 0.3
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff'
      }
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: '#444'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: '#444'
      }
    }
  }
}

onMounted(() => {
  const dataRef = query(dbRef(db, 'data'), orderByKey(), limitToLast(50))

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b))

      labels.value = entries.map(([key]) => {
        const timestamp = parseInt(key)
        return isNaN(timestamp) ? key : new Date(timestamp).toLocaleTimeString()
      })

      temperatures.value = entries.map(([_, val]: [string, any]) => val.temperature ?? 0)

      chartData.value = {
        labels: labels.value,
        datasets: [
          {
            label: 'Temperature (°C)',
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#4caf50',
            data: temperatures.value,
            fill: false,
            tension: 0.3
          }
        ]
      }
    }
  })
})
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  background: #1f1f1f;
  border: 2px solid #444;
  border-radius: 12px;
  padding: 20px;
  height: 300px;
  width: 100%; 
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>

