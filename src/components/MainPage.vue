<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const currentDate = ref('');

onMounted(() => {
  const date = new Date();
  // Format: Month Day, Year (e.g., March 17, 2025)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.value = date.toLocaleDateString('en-US', options);
});

const navigateToBuddhismPage = () => {
  router.push('/buddhism');
};
</script>

<template>
  <div class="main-container" @click="navigateToBuddhismPage">
    <div class="header-section">
      <div class="header-content">
        <div class="date">{{ currentDate }}</div>
        <div class="foundation">星雲大師教育基金會</div>
      </div>
    </div>
    
    <div class="title-section">
      <h1 class="main-title">星雲大師</h1>
      <h1 class="subtitle">人生108</h1>
      <h1 class="subtitle">事法語</h1>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  height: 100%;
  background-color: #000000 !important;
  width: 100vw;
  max-width: 100%;
  -webkit-tap-highlight-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: white !important;
  cursor: pointer;
}

.header-section {
  text-align: center;
  position: absolute;
  top: 3vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
}

.date {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 0.2em 0;
  padding: 0;
  letter-spacing: 1px;
  color: white !important;
}

.foundation {
  font-size: 2rem;
  font-weight: 300;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  color: white !important;
}

.title-section {
  position: absolute;
  bottom: 8vh;
  left: 2vw;
}

.main-title, .subtitle {
  font-size: 10vw;
  line-height: 0.95;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans SC', sans-serif;
  color: white !important;
}

/* Responsive design for different screen sizes */
@media (min-width: 1200px) {
  .main-title, .subtitle {
    font-size: 9rem;
  }
  
  .date {
    font-size: 3rem;
    margin: 0 0 0.2em 0;
  }
  
  .foundation {
    font-size: 2.3rem;
  }
  
  .title-section {
    left: 40px;
    bottom: 6vh;
  }
  
  .header-content {
    line-height: 1.2;
  }
}

@media (max-width: 768px) {
  .header-section {
    top: 3vh;
  }
  
  .title-section {
    bottom: 15vh;
    left: 3vw;
  }
  
  .main-title, .subtitle {
    font-size: 8vw;
    line-height: 1.2;
  }
  
  .date {
    font-size: 2.2rem;
    margin: 0 0 0.2em 0;
  }
  
  .foundation {
    font-size: 1.8rem;
  }
  
  .header-content {
    line-height: 1.2;
  }
}

@media (max-width: 480px) {
  .date {
    font-size: 1.8rem;
    margin: 0 0 0.15em 0;
  }
  
  .foundation {
    font-size: 1.5rem;
  }
  
  .header-section {
    top: 2vh;
  }
  
  .header-content {
    flex-direction: column;
    align-items: center;
  }
  
  .title-section {
    bottom: 20vh;
    left: 5vw;
  }
  
  .main-title, .subtitle {
    font-size: 9vw;
    line-height: 1.2;
  }
}
</style> 