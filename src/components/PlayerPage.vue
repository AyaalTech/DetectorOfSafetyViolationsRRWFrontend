<template>
    <div class="player-page">
      <video ref="videoPlayer" v-if="videoSrc" controls>
        <source :src="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div v-else class="loader"></div>
        <div style="display: flex;">
          <div class="timestamp-container">
            <h2 class="va-h2">⚠️Однозначные нарушения:</h2>
            <VaButton v-for="(item, index) in testJson" :key="index"
              color="danger"
              class="mr-6 mb-2"
              round
              icon="warning"
              border-color="danger"
              @click="seekToTime(item.timestamp)"
            >
              {{ item.timestamp }}
            </VaButton>
          </div>
          <div class="timestamp-container">
            <h2 class="va-h2">❓Неоднозначные нарушения:</h2>
            <VaButton v-for="(item, index) in testJson" :key="index"
              color="warning"
              class="mr-6 mb-2"
              round
              icon="help"
              border-color="warning"
              @click="seekToTime(item.timestamp)"
            >
              {{ item.timestamp }}
            </VaButton>
          </div>
        </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'PlayerPage',
  data() {
    return {
      videoSrc: null,
      testJson: [
          {
            "timestamp": "00:02",
            "value": "faintly",
            "date": "2024-06-05"
          },
          {
            "timestamp": "00:37",
            "value": "obvious",
            "date": "2024-06-14"
          },
          {
            "timestamp": "00:21",
            "value": "faintly",
            "date": "2024-06-22"
          },
          {
            "timestamp": "00:58",
            "value": "obvious",
            "date": "2024-06-08"
          },
          {
            "timestamp": "00:46",
            "value": "obvious",
            "date": "2024-06-18"
          },
          {
            "timestamp": "00:19",
            "value": "faintly",
            "date": "2024-06-07"
          },
          {
            "timestamp": "00:49",
            "value": "obvious",
            "date": "2024-06-16"
          },
          {
            "timestamp": "00:04",
            "value": "faintly",
            "date": "2024-06-25"
          },
          {
            "timestamp": "00:28",
            "value": "faintly",
            "date": "2024-06-12"
          },
          {
            "timestamp": "00:33",
            "value": "obvious",
            "date": "2024-06-03"
          },
          {
            "timestamp": "00:45",
            "value": "obvious",
            "date": "2024-06-27"
          },
          {
            "timestamp": "00:11",
            "value": "faintly",
            "date": "2024-06-21"
          },
          {
            "timestamp": "00:57",
            "value": "obvious",
            "date": "2024-06-30"
          },
          {
            "timestamp": "00:14",
            "value": "faintly",
            "date": "2024-06-09"
          },
          {
            "timestamp": "00:38",
            "value": "faintly",
            "date": "2024-06-04"
          },
          {
            "timestamp": "00:25",
            "value": "obvious",
            "date": "2024-06-13"
          },
          {
            "timestamp": "00:51",
            "value": "faintly",
            "date": "2024-06-01"
          },
          {
            "timestamp": "00:16",
            "value": "obvious",
            "date": "2024-06-28"
          },
          {
            "timestamp": "00:09",
            "value": "faintly",
            "date": "2024-06-11"
          },
          {
            "timestamp": "00:43",
            "value": "obvious",
            "date": "2024-06-24"
          }
        ],
    };
  },
  mounted() {
    this.fetchVideo();
  },
  methods: {
    async fetchVideo() {
      try {
        const response = await axios.get('http://192.168.110.209:3000/getvideo', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'video/mp4' });
        this.videoSrc = URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    },
    seekToTime(time) {
      const totalSeconds = this.convertTimeStringToSeconds(time);
      this.$refs.videoPlayer.currentTime = totalSeconds;
    },
    convertTimeStringToSeconds(timeString) {
      const [minutes, seconds] = timeString.split(':').map(Number);
      return minutes * 60 + seconds;
    }
  }
};
</script>
  
<style scoped>
.player-page {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: fit-content;
}

video {
  max-width: 100%;
  width: 100%;
  height: auto;
}

.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background:
    repeating-linear-gradient(135deg,#f03355 0 10px,#ffa516 0 20px) 0/0%   no-repeat,
    repeating-linear-gradient(135deg,#ddd    0 10px,#eee    0 20px) 0/100%;
  animation: l3 2s infinite;
}
  
@keyframes l3 {
  100% {background-size:100%}
}

.timestamp-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
</style>