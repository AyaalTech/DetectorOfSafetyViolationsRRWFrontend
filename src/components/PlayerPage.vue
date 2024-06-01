<template>
    <div class="player-page">
      <video ref="videoPlayer" v-if="videoSrc" controls>
        <source :src="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div v-else class="loader"></div>
      <div v-for="(url, index) in videoUrls" :key="index">
        <VaButton preset="secondary" class="mr-6 mb-2" @click="fetchVideo(url)">
          Play Video: {{ url }}
        </VaButton>
      </div>
      <div style="display: flex">
        <div class="timestamp-container">
        <h2 class="va-h2">Однозначные нарушения: {{ obviousCount }}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
          <VaButton v-for="(item, index) in testJson" :key="index"
            color="danger"
            class="mr-6 mb-2"
            preset="secondary"
            round
            icon="warning"
            border-color="danger"
            @click="seekToTime(item.timestamp)"
          >
            {{ item.timestamp }}
          </VaButton>
        </div>
      </div>
      <div class="timestamp-container">
        <h2 class="va-h2">Неоднозначные нарушения: {{ unclearCount }}</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
            <VaButton v-for="(item, index) in testJson" :key="index"
              color="warning"
              class="mr-6 mb-2"
              preset="secondary"
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
            "timestamp": "00:09",
            "value": "unclear",
            "date": "2024-06-11"
          },
          {
            "timestamp": "00:43",
            "value": "obvious",
            "date": "2024-06-24"
          }
        ],
        videoUrls: [],
    };
  },
  mounted() {
    this.fetchVideoUrls();
  },
  computed: {
    obviousCount() {
        return this.testJson.filter(item => item.value === 'obvious').length;
    },
    unclearCount() {
        return this.testJson.filter(item => item.value === 'unclear').length;
    }
  },
  methods: {
    async fetchVideoUrls() {
      try {
        const response = await axios.get('http://192.168.110.63:3000/getvideos', { responseType: 'json' });
        this.videoUrls = response.data.files;
        console.log(this.videoUrls);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    },
    async fetchVideo(name) {
      try {
        const response = await axios.get(`http://192.168.110.63:3000/getvideo/${name}`, { responseType: 'blob' });
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
  height: 100vh;
}

video {
  max-width: 70%;
  width: 70%;
  height: auto;
  max-height: 70%;
}

.loader {
  width: 200px;
  height: 30px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
</style>