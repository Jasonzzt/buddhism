<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(60);
let timer = null;

// 消息文本
const messageText = "要做正人君子，不要計較人我是非，不貪取非分之財，不爭奪虛妄名利";
const messageTranslation = "Be a person of moral integrity do not fuss over disputes of right and wrong, do not covet indecent wealth, and do not fall prey to illusions of fame and gain.";

// 根据文本长度计算中文字体大小和行数
const textStyle = computed(() => {
  const length = messageText.length;
  let fontSize = '1.8rem';
  let maxWidth = '90%';
  
  if (length > 40) {
    fontSize = '1.4rem';
  } else if (length > 30) {
    fontSize = '1.6rem';
  }
  
  return { fontSize, maxWidth };
});

// 返回主页
const goToHome = () => {
  router.push('/');
};

// 开始计时器
const startCountdown = () => {
  // 清除可能存在的旧计时器
  if (timer) {
    clearInterval(timer);
  }
  
  timer = setInterval(() => {
    countdown.value--;
    
    if (countdown.value <= 0) {
      clearInterval(timer);
      goToHome();
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
  <div class="message-container">
    <div class="message-content">
      <p class="message-text" :style="{ fontSize: textStyle.fontSize, maxWidth: textStyle.maxWidth }">
        "{{ messageText }}"
      </p>
      <p class="message-translation">
        {{ messageTranslation }}
      </p>
    </div>
    
    <div class="countdown-button" @click="goToHome">
      <div class="countdown-circle">
        <span class="countdown-text">{{ countdown }}S</span>
        <span class="countdown-return">返回</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  min-height: 100vh;
  height: 100%;
  background-color: #f5f2ee;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.message-content {
  text-align: center;
  width: 100%;
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.message-text {
  font-weight: 600;
  margin-bottom: 0.1rem;
  letter-spacing: 1px;
  line-height: 1.6;
  max-width: 90%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-translation {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  color: #555;
  line-height: 1.6;
  max-width: 90%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.countdown-button {
  margin-top: 1vh;
  cursor: pointer;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.countdown-text {
  font-size: 2.2rem;
  font-weight: bold;
  color: black;
  margin-bottom: -5px;
}

.countdown-return {
  font-size: 1.2rem;
  color: black;
}

/* Responsive design for different screen sizes */
@media (min-width: 1200px) {
  .message-content {
    margin-top: 27vh;
  }
  
  .message-text {
    font-weight: 600;
    margin-bottom: 0.1rem;
  }
  
  .message-translation {
    font-size: 1.7rem;
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
  
  .countdown-return {
    font-size: 1.4rem;
  }
  
  .countdown-button {
    margin-top: 1vh;
  }
}

@media (max-width: 768px) {
  .message-content {
    margin-top: 23vh;
  }
  
  .message-text {
    margin-bottom: 0.1rem;
  }
  
  .message-translation {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .countdown-circle {
    width: 130px;
    height: 130px;
  }
  
  .countdown-text {
    font-size: 2.2rem;
  }
  
  .countdown-return {
    font-size: 1.2rem;
  }
  
  .countdown-button {
    margin-top: 1vh;
  }
}

@media (max-width: 480px) {
  .message-content {
    margin-top: 20vh;
  }
  
  .message-text {
    margin-bottom: 0.1rem;
  }
  
  .message-translation {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .countdown-circle {
    width: 120px;
    height: 120px;
  }
  
  .countdown-text {
    font-size: 2rem;
  }
  
  .countdown-return {
    font-size: 1rem;
  }
  
  .countdown-button {
    margin-top: 1vh;
  }
}
</style> 