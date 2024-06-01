<template>
  <div class="player-page">
    <video
      v-if="videoSrc"
      ref="videoPlayer"
      controls
    >
      <source :src="videoSrc" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div v-else class="loader" style="margin-bottom: 3rem;"></div>
    <h5 class="va-h5">
      <VaIcon name="play_arrow" style="margin-right: 0.5rem;"/>
      доступные видео:
    </h5>
    <div v-for="(url, index) in videoUrls" :key="index">
      <VaButton
        color="#e21a1a"
        preset="secondary"
        @click="fetchVideo(url)"
        style="gap: 0.8rem;"
      >
        <VaIcon name="link" style="margin-right: 0.5rem;"/>
        {{ url }}
      </VaButton>
    </div>
    <div style="display: flex">
      <div class="timestamp-container">
        <h5 class="va-h5">
          <VaIcon name="schedule" style="margin-right: 0.5rem;"/>
          тайм-коды нарушений: {{ obviousCount }}
        </h5>
        <div style="display: flex; gap: 1rem;">
          <VaButton
            v-for="(item, index) in testJson"
            :key="index"
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
        const videoResponse = await axios.get(`http://192.168.110.63:3000/getvideo/${name}`, { responseType: 'blob' });
        const videoBlob = new Blob([videoResponse.data], { type: 'video/mp4' });
        this.videoSrc = URL.createObjectURL(videoBlob);

        const violationResponse = await axios.get(`http://192.168.110.63:3000/getviolation/${name}`);
        const violationData = violationResponse.data;

        this.violationDetails = violationData;

        console.log(violationData);
      } catch (error) {
        console.error('Error fetching video or violation data:', error);
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
  justify-content:center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

video {
  width: auto;
  height: 65%;
  border-radius: 10px;
  border: #e21a1a 1px solid;
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