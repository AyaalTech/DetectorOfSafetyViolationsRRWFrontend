<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: ['ducking', 'vest'],
  computed: {
    chartData() {
      return {
        labels: ['Ducking', 'Vest'],
        datasets: [
          {
            label: 'Ducking',
            backgroundColor: '#FF6384',
            data: this.ducking,
          },
          {
            label: 'Vest',
            backgroundColor: '#36A2EB',
            data: this.vest,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    }
  }
}
</script>