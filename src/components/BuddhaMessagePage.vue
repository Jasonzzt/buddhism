<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { sentenceService } from '@/services/api';

const router = useRouter();
const countdown = ref(30);
let timer = null;

// 消息文本
const messageText = ref("");
const messageTranslation = ref("");

// 从后端获取佛学语句
const fetchSentence = async () => {
  try {
    const response = await sentenceService.getSentence();
    const data = response.data;
    
    messageText.value = data.text || "";
    messageTranslation.value = data.translation || "";
  } catch (error) {
    console.error('获取语句失败:', error);
    // 使用默认语句作为后备
    messageText.value = "什么都可以缺少，慈悲喜舍不可少也；\n善事好心都可增加，贪瞋气恼不可增也。";
    messageTranslation.value = "You can be short of anything as long as that thing is not loving-kindness, compassion, joy and equanimity.\n Increase only good deeds and kind intentions, never greed, aversion, or anger.";
  }
};

// 检测是否为中文文本
// const isChinese = computed(() => /[\u4e00-\u9fa5]/.test(messageText));

// 根据文本长度计算中文字体大小和行数
const textStyle = computed(() => {
  return {
    fontSize: '3rem',
    maxWidth: '75%', // 统一使用相同宽度
    whiteSpace: 'pre-line',     // 保留 \n 为换行
    lineHeight: '1.0em',
    overflow: 'hidden',         // 隐藏但不省略
  };
});

// 英文翻译样式
const translationStyle = computed(() => {
  return {
    maxWidth: '70%', // 略小于中文文本宽度
    fontSize: '1.8rem',
    lineHeight: '1.4em',
    whiteSpace: 'pre-line',    // 保留 \n 为换行
    fontWeight: 'bold',
  };
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

onMounted(async () => {
  await fetchSentence();
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
    <!-- Header with logos -->
    <div class="header">
      <div class="left-logo">
      </div>
      <div class="right-logo">
        <!-- Hsing Yun Education Foundation logo could be placed here -->
      </div>
    </div>
    
    <div class="message-content">
      <p class="message-number">108</p>
      
      <div class="message-text-container">
        <p class="message-text" :style="textStyle">
          {{ messageText }}
        </p>
      </div>
      
      <div class="message-translation-container">
        <p class="message-translation" :style="translationStyle">
          {{ messageTranslation }}
        </p>
      </div>
    </div>
    
    <div class="footer">
      <div class="countdown-button" @click="goToHome">
        <div class="countdown-circle">
          <span class="countdown-text">{{ countdown }}s</span>
          <span class="countdown-return">返 回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  min-height: 100vh;
  height: 100%;
  background-color: #f5f2ee;
  background-image: url('@/assets/p3bg.webp');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: #886631;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
}

.left-logo {
  display: flex;
  align-items: center;
}

.chinese-characters {
  font-size: 2rem;
  font-weight: bold;
  color: #886631;
}

.logo-circle {
  width: 45px;
  height: 45px;
  background-color: #D4AF37;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #886631;
  margin-left: 10px;
  line-height: 1.2;
}

.right-logo {
  width: 120px;
  height: 60px;
}

.message-content {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  flex-grow: 1;
}

.message-number {
  font-size: 2.5rem;
  color: #886631;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
}

.message-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.message-text {
  font-weight: 900;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: #886631;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
  text-align: center;
}

.message-translation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
}

.message-translation {
  font-weight: 500;
  margin-bottom: 0.2rem;
  letter-spacing: 0.5px;
  color: #886631;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
  font-style: italic;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.countdown-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.countdown-text {
  font-size: 2.2rem;
  font-weight: bold;
  color: #886631;
  margin-bottom: -5px;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
}

.countdown-return {
  font-size: 1.7rem;
  font-weight: bold;
  color: #886631;
  font-family: 'Xingkai SC', 'Xingkai TC', cursive;
}

/* Responsive design for different screen sizes */
@media (min-width: 1200px) {
  .message-content {
    margin-top: 0;
  }
  
  .message-number {
    font-size: 3rem;
  }
  
  .message-text {
    font-weight: 900;
    margin-bottom: 0.5rem;
    font-size: 4rem;
  }
  
  .message-translation {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  
  .countdown-circle {
    width: 150px;
    height: 150px;
  }
  
  .countdown-text {
    font-size: 2.6rem;
  }
  
  .countdown-return {
    font-size: 1.7rem;
  }
  
  .left-logo .chinese-characters {
    font-size: 2.5rem;
  }
  
  .logo-circle {
    width: 55px;
    height: 55px;
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .right-logo {
    width: 150px;
    height: 75px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
  }
  
  .left-logo .chinese-characters {
    font-size: 1.7rem;
  }
  
  .logo-circle {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
  }
  
  .subtitle {
    font-size: 0.8rem;
  }
  
  .right-logo {
    width: 100px;
    height: 50px;
  }
  
  .message-number {
    font-size: 2.2rem;
  }
  
  .message-text {
    margin-bottom: 0.5rem;
  }
  
  .message-translation {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
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
}

@media (max-width: 480px) {
  .header {
    padding: 10px 15px;
  }
  
  .left-logo .chinese-characters {
    font-size: 1.4rem;
  }
  
  .logo-circle {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    margin: 0 5px;
  }
  
  .subtitle {
    font-size: 0.7rem;
    margin-left: 5px;
  }
  
  .right-logo {
    width: 80px;
    height: 40px;
  }
  
  .message-number {
    font-size: 2rem;
  }
  
  .message-text {
    margin-bottom: 0.5rem;
  }
  
  .message-translation {
    font-size: 1rem;
    margin-bottom: 0.2rem;
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
}
</style> 