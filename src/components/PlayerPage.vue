<template>
    <div class="player-page">
      <video ref="videoPlayer" v-if="videoSrc" controls>
        <source :src="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div v-else class="loader"></div>
      <VaButton
        color="warning"
        class="mr-6 mb-2"
        round
        icon="warning"
        border-color="warning"
        @click="seekToTime('00:46')"
      >
        00:46
      </VaButton>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'PlayerPage',
  data() {
    return {
      videoSrc: null
    };
  },
  mounted() {
    this.fetchVideo();
  },
  methods: {
    async fetchVideo() {
      try {
        const response = await axios.get('http://192.168.110.63:3000/getvideo', { responseType: 'blob' });
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
  </style>