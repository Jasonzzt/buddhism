<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(30);
const recognitionSuccess = ref(false);
const recognitionFailed = ref(false);
let timer = null;

// 模拟识别过程，实际应用中可替换为真实的识别逻辑
const simulateRecognition = () => {
  // 随机模拟识别成功或失败
  // 在实际应用中，这里应该替换为真实的手势识别逻辑
  const result = Math.random() > 0.3; // 70%概率成功
  
  if (result) {
    recognitionSuccess.value = true;
    // 识别成功后延迟2秒跳转到下一页
    setTimeout(() => {
      router.push('/message');
    }, 2000);
  } else {
    recognitionFailed.value = true;
    // 识别失败后3秒重置状态，重新开始识别
    setTimeout(() => {
      recognitionFailed.value = false;
      countdown.value = 30;
      startCountdown();
    }, 3000);
  }
};

const startCountdown = () => {
  // 清除可能存在的旧计时器
  if (timer) {
    clearInterval(timer);
  }
  
  timer = setInterval(() => {
    countdown.value--;
    
    // 当倒计时到25秒时显示失败
    if (countdown.value === 25) {
      recognitionFailed.value = true;
    }
    
    // 当倒计时到20秒时显示成功并准备跳转
    if (countdown.value === 20) {
      clearInterval(timer);
      recognitionFailed.value = false;
      recognitionSuccess.value = true;
      
      // 识别成功后延迟2秒跳转到下一页
      setTimeout(() => {
        router.push('/message');
      }, 2000);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div class="recognition-container">
    <div class="header-content">
      <div class="title">星雲大師給您的一句話</div>
      <div class="subtitle">A Personal Message from Venerable Master Hsing Yun</div>
    </div>
    
    <div class="countdown-wrapper">
      <div class="countdown-circle">
        <span class="countdown-text">{{ countdown }}S</span>
      </div>
    </div>
    
    <div class="message-area">
      <p v-if="recognitionSuccess" class="success-message">识别成功</p>
      <p v-if="recognitionFailed" class="failed-message">请调整您的手势</p>
    </div>
  </div>
</template>

<style scoped>
.recognition-container {
  min-height: 100vh;
  height: 100%;
  background-color: #000000;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.header-content {
  text-align: center;
  width: 100%;
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.95;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.countdown-wrapper {
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
}

.countdown-text {
  font-size: 2.2rem;
  font-weight: bold;
  color: black;
}

.message-area {
  height: 3rem;
  margin-top: 2rem;
  text-align: center;
}

.success-message, .failed-message {
  font-size: 1.5rem;
  font-weight: 300;
}

.success-message {
  color: #ffffff;
}

.failed-message {
  color: #ffffff;
}

/* Responsive design for different screen sizes */
@media (min-width: 1200px) {
  .header-content {
    margin-top: 27vh;
  }
  
  .title {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
  }
  
  .subtitle {
    font-size: 2.2rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
  
  .countdown-circle {
    width: 150px;
    height: 150px;
  }
  
  .countdown-text {
    font-size: 2.6rem;
  }
  
  .countdown-wrapper {
    margin-top: 1vh;
  }
}

@media (max-width: 768px) {
  .header-content {
    margin-top: 23vh;
  }
  
  .title {
    font-size: 2.2rem;
    margin-bottom: 0.1rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .countdown-circle {
    width: 130px;
    height: 130px;
  }
  
  .countdown-text {
    font-size: 2.2rem;
  }
  
  .countdown-wrapper {
    margin-top: 1vh;
  }
  
  .message-area {
    margin-bottom: 8vh;
  }
}

@media (max-width: 480px) {
  .header-content {
    margin-top: 20vh;
  }
  
  .title {
    font-size: 1.8rem;
    margin-bottom: 0.1rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .countdown-circle {
    width: 120px;
    height: 120px;
  }
  
  .countdown-text {
    font-size: 2rem;
  }
  
  .countdown-wrapper {
    margin-top: 1vh;
  }
  
  .message-area {
    margin-bottom: 8vh;
  }
}
</style> 