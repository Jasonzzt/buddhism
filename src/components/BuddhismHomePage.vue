<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/');
};

const goToRecognition = () => {
  router.push('/recognition');
};
</script>

<template>
  <div class="main-container buddhism-page">
    <div class="back-button" @click="goBack">
      <span>←</span>
    </div>
    <div class="content-wrapper" @click="goToRecognition">
      <h1 class="main-title">心有疑難，法語能答</h1>
      
      <div class="prayer-icon">
        <img src="../assets/2.png" alt="Prayer Hands" />
      </div>
      
      <p class="instruction-text">"请站在屏幕前，双手合十"</p>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
  min-height: 100vh;
  height: 100%;
  background-color: #f5f2ee;
  width: 100vw;
  max-width: 100%;
  -webkit-tap-highlight-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 1rem;
  width: 100%;
  max-width: 90%;
  margin-top: 0;
}

.main-title {
  font-size: 1.75rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.9);
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}

.prayer-icon {
  width: 130px;
  height: 130px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.prayer-icon img {
  width: 80%;
  height: 80%;
}

.instruction-text {
  font-size: 1.125rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
}

/* Responsive design for different screen sizes */
@media (min-width: 481px) {
  .main-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  
  .prayer-icon {
    width: 150px;
    height: 150px;
  }
  
  .instruction-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 0;
    padding-top: 10vh;
    align-items: flex-start;
  }
  
  .content-wrapper {
    padding: 1rem;
    margin-top: 0;
  }
}

@media (max-height: 600px) {
  .main-container {
    padding-top: 5vh;
  }
  
  .content-wrapper {
    margin-top: 0;
  }
  
  .main-title {
    margin-bottom: 1.5rem;
  }
  
  .prayer-icon {
    margin-bottom: 1.5rem;
  }
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 10;
  cursor: pointer;
  color: #333;
}
</style> 