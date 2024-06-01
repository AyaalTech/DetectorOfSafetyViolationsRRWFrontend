<script setup>
import MainPanel from './components/MainPanel.vue'
import PlayerPage from './components/PlayerPage.vue'
</script>

<template>
  <img src="./../public/red_icon.png" alt="RWW" class="app-icon" />
  <MainPanel />
  <PlayerPage />
</template>

<style>
body {
  background-color: #f6f6f6;
}

.app-icon {
  width: 4rem;
  position: sticky;
  top: 0;
  left: 0;
}
</style>