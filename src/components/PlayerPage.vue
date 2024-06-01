<template>
    <div class="player-page">
      <video v-if="videoSrc" controls>
        <source :src="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <VaProgressCircle indeterminate v-else
        />
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
    }
  }
};
</script>
  
  <style scoped>
  .player-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  video {
    max-width: 100%;
    height: auto;
  }
  </style>
  