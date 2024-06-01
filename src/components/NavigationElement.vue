<template>
    <nav class="navigation-bar">
      <ul>
        <li v-for="(item, index) in items" :key="index" @click="scrollToSection(index)">
          {{ item }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: ['Начальная', 'Просмотр', 'Метки', 'Лог'],
      };
    },
    methods: {
      scrollToSection(sectionIndex) {
        const sectionHeight = window.innerHeight;
        const targetPosition = sectionIndex * sectionHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  .navigation-bar {
    position: fixed;
    border-top-left-radius: 10px;
    right: 0;
    bottom: 0; 
    background-color: #e21a1a;
    font-weight: bold;
    opacity: 0.8;
    color: white;
    padding-left: 0.5rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
  }
  
  .navigation-bar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .navigation-bar li {
    cursor: pointer;
    border-radius: 5px;
    margin: 0.35rem;
    padding: 0.35rem;
    transition: 250ms ease; 
  }
  
  .navigation-bar li:hover {
    background-color: #e63c3c;
    font-size: 1.2em;
    padding: 0.5rem; 
    transition: 350ms ease; 
  }
  </style>