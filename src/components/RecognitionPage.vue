<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { recognitionService } from '../services/api';

const router = useRouter();
const countdown = ref(12);
const recognitionStatus = ref('checking'); // 'checking', 'success', 'failed'
const videoRef = ref(null);
const videoDisplayEl = ref(null);
const canvasRef = ref(null);
const stream = ref(null);
// 默认不显示摄像头
const videoDisplay = ref(false);
let timer = null;
let recognitionTimer = null;
const recognitionInterval = 1000 / 30; // 30fps

// 启动摄像头
const startCamera = async () => {
  try {
    // 请求访问用户的摄像头
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    });
    
    // 设置视频源为摄像头流
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;
    }
    
    // 只有当videoDisplay为true且元素存在时，才设置显示用的视频元素
    if (videoDisplay.value && videoDisplayEl.value) {
      videoDisplayEl.value.srcObject = stream.value;
    }
    
    return true;
  } catch (err) {
    console.error('Error accessing camera:', err);
    return false;
  }
};

// 停止摄像头流
const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
  }
};

// 开始倒计时
const startCountdown = () => {
  // 清除可能存在的旧计时器
  if (timer) {
    clearInterval(timer);
  }
  
  timer = setInterval(() => {
    countdown.value--;
    
    if (countdown.value <= 0) {
      clearInterval(timer);
      // 如果倒计时结束且状态仍为checking，则认为识别成功
      if (recognitionStatus.value === 'checking') {
        recognitionStatus.value = 'success';
        stopRecognition();
        
        // 识别成功后延迟2秒跳转到消息页
        setTimeout(() => {
          router.push('/message');
        }, 2000);
      }
    }
  }, 1000);
};

// 发送识别请求
const checkRecognition = async () => {
  if (!videoRef.value || !videoRef.value.readyState) return;
  
  try {
    // 将当前视频帧绘制到canvas
    const context = canvasRef.value.getContext('2d');
    canvasRef.value.width = 640; // 设置canvas宽度为640
    canvasRef.value.height = 640; // 设置canvas高度为640
    context.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height); // 使用drawImage方法进行图像缩放
    
    // 将canvas转换为blob
    const blob = await new Promise(resolve => {
      canvasRef.value.toBlob(resolve, 'image/jpeg', 0.8);
    });
    
    // 发送识别请求
    const response = await recognitionService.checkRecognition(blob);
    console.log('Recognition response:', response.data);
    
    // 处理响应
    if (response.data && response.data.recognized === false) {
      // 识别失败，立即返回首页
      recognitionStatus.value = 'failed';
      stopRecognition();
      router.push('/');
    }
    // 不处理true的情况，让倒计时结束时处理
  } catch (err) {
    console.error('Recognition check error:', err);
  }
};

// 开始定时识别
const startRecognition = () => {
  if (recognitionTimer) {
    clearInterval(recognitionTimer);
  }
  
  // 以30fps的速率发送识别请求
  recognitionTimer = setInterval(checkRecognition, recognitionInterval);
};

// 停止识别
const stopRecognition = () => {
  if (recognitionTimer) {
    clearInterval(recognitionTimer);
    recognitionTimer = null;
  }
};

onMounted(() => {
  startCamera().then(() => {
    startCountdown();
    startRecognition();
  });
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  stopRecognition();
  stopCamera();
});
</script>

<template>
  <div class="recognition-container">
    <div class="main-content">
      <div class="upper-content">
        <div class="title">星雲大師給您的一句話</div>
        <div class="subtitle">A Personal Message from Venerable Master Hsing Yun</div>
        
        <div class="countdown-wrapper">
          <div class="countdown-circle">
            <span class="countdown-text">{{ countdown }}s</span>
          </div>
        </div>
      </div>
      
      <div class="footer-text" :class="{'failed-text': recognitionStatus === 'failed'}">
        {{ recognitionStatus === 'checking' ? '请保持合十姿势' : 
           recognitionStatus === 'success' ? '识别成功' : '识别失败' }}
      </div>
      
      <!-- 摄像头视图处理元素 - 始终存在但隐藏 -->
      <div style="display: none;">
        <video 
          ref="videoRef" 
          autoplay 
          playsinline 
          muted
        ></video>
        <canvas ref="canvasRef"></canvas>
      </div>
      
      <!-- 可见的摄像头 - 仅在videoDisplay为true时显示 -->
      <div v-if="videoDisplay" class="camera-container">
        <video 
          ref="videoDisplayEl" 
          autoplay 
          playsinline 
          muted
          class="camera-feed"
        ></video>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recognition-container {
  min-height: 100vh;
  height: 100%;
  background-color: #000000 !important;
  background-image: url('@/assets/p2bg.webp');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
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
  display: flex;
  flex-direction: column;
  padding: 0;
  filter: none;
}

.logo-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}

.left-logo img, .right-logo img {
  height: 50px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  text-align: center;
  padding-top: 120px;
  padding-bottom: 80px;
  height: 100%;
  box-sizing: border-box;
}

.upper-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  margin-bottom: 80px;
}

.title {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 0.1rem;
  letter-spacing: 0.5px;
  color: #886631;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
}

.subtitle {
  font-size: 1.7rem;
  font-weight: 600;
  opacity: 0.95;
  letter-spacing: 0.5px;
  margin-bottom: 3rem;
  color: #886631;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
}

.countdown-wrapper {
  /* margin-top: 0vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid #886631;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-text {
  font-size: 2.2rem;
  font-weight: bold;
  color: #886631;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
}

.footer-text {
  position: absolute;
  bottom: 60px;
  font-size: 1.5rem;
  color: #886631;
  font-family: 'Xingkai SC', 'STXingkai', serif;
  font-weight: 600;
  transition: color 0.3s ease;
}

.failed-text {
  color: #D32F2F;
}

/* 摄像头显示容器 - 与MainPage一致 */
.camera-container {
  width: 10vw; 
  height: 10vw;
  max-width: 90px;
  max-height: 90px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  overflow: hidden;
  border-radius: 50%;
  opacity: 0.9;
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.camera-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive design for different screen sizes */
@media (min-width: 1200px) {
  .title {
    font-size: 3.5rem;
  }
  
  .subtitle {
    font-size: 2.2rem;
  }
  
  .countdown-circle {
    width: 150px;
    height: 150px;
  }
  
  .countdown-text {
    font-size: 2.6rem;
  }
  
  .footer-text {
    font-size: 2.0rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .countdown-circle {
    width: 130px;
    height: 130px;
  }
  
  .countdown-text {
    font-size: 2.2rem;
  }
  
  .footer-text {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .logo-container {
    padding: 15px;
  }
  
  .left-logo img, .right-logo img {
    height: 40px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .countdown-circle {
    width: 120px;
    height: 120px;
  }
  
  .countdown-text {
    font-size: 2rem;
  }
  
  .footer-text {
    font-size: 1.2rem;
  }
}
</style> 