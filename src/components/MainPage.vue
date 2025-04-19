<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { recognitionService } from '../services/api';

const router = useRouter();
const videoRef = ref(null);
const videoDisplayEl = ref(null);
const canvasRef = ref(null);
const stream = ref(null);
const isChecking = ref(false);
const errorMessage = ref('');
// 默认不显示摄像头
const videoDisplay = ref(false);
let recognitionTimer = null;
const recognitionInterval = 1000 / 30; // 30fps

// 在组件挂载时启动摄像头并开始识别
onMounted(() => {
  startCamera().then(() => {
    // 启动摄像头后停1s开始30fps识别
    setTimeout(() => {
      startRecognition();
    }, 1000);
  });
});

// 在组件卸载时停止摄像头和识别
onUnmounted(() => {
  stopRecognition();
  stopCamera();
});

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
    errorMessage.value = 'Unable to access camera. Please allow camera access.';
    return false;
  }
};

// 停止摄像头流
const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
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

// 检查用户是否被识别
const checkRecognition = async () => {
  if (isChecking.value || !videoRef.value || !videoRef.value.readyState) return;
  
  isChecking.value = true;
  
  try {
    // 将当前视频帧绘制到canvas
    const context = canvasRef.value.getContext('2d');
    canvasRef.value.width = videoRef.value.videoWidth;
    canvasRef.value.height = videoRef.value.videoHeight;
    context.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height);
    
    // 将canvas转换为blob
    const blob = await new Promise(resolve => {
      canvasRef.value.toBlob(resolve, 'image/jpeg', 0.8);
    });
    
    // 使用识别服务检查用户是否被识别
    const response = await recognitionService.checkRecognition(blob);
    console.log('Recognition response:', response.data);
    
    // 只在识别成功时跳转
    if (response.data && response.data.recognized === true) {
      stopRecognition(); // 停止识别
      router.push('/recognition');
    }
    // 如果识别失败，继续尝试
  } catch (err) {
    console.error('Recognition check error:', err);
  } finally {
    isChecking.value = false;
  }
};
</script>

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <h1 class="main-title">心中疑難事&nbsp;&nbsp;法語可告知</h1>
      
      <div class="prayer-icon">
        <img src="../assets/Asset 1@4x.webp" alt="Prayer Hands" />
      </div>
      
      <p class="instruction-text">请站在屏幕前双手合十</p>
      
      <!-- 摄像头视图功能元素 - 始终存在但隐藏 -->
      <div style="display: none;">
        <video 
          ref="videoRef" 
          autoplay 
          playsinline 
          muted
          class="camera-feed"
        ></video>
        <canvas ref="canvasRef"></canvas>
      </div>

      <!-- 可见的摄像头显示 - 仅在videoDisplay为true时显示 -->
      <div v-if="videoDisplay" class="visible-camera">
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
.main-container {
  min-height: 100vh;
  height: 100%;
  background-color: #000000 !important;
  background-image: url('@/assets/p1bg.webp');
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
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: -8vh;
}

.main-title {
  font-size: 10vw;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0;
  font-family: 'Heiti SC', 'Heiti TC', sans-serif;
  color: white !important;
}

.prayer-icon {
  margin: 2vh 0 1vh 0;
}

.prayer-icon img {
  width: 14vw;
  max-width: 140px;
  height: auto;
}

.instruction-text {
  font-size: 3vw;
  font-weight: 800;
  margin-top: 0;
  color: #FFCF6D;
  font-family: 'Songti SC', 'Songti TC', serif;
  margin-bottom: 2vh;
}

/* 摄像头显示容器 - 圆形且清晰，右下角，白色边框 */
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

/* 调试用的可见摄像头 */
.visible-camera {
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

/* 响应式设计 */
@media (min-width: 1200px) {
  .main-title {
    font-size: 6rem;
  }
  
  .prayer-icon img {
    width: 120px;
  }
  
  .instruction-text {
    font-size: 2.0rem;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 8vw;
  }
  
  .prayer-icon img {
    width: 16vw;
  }
  
  .instruction-text {
    font-size: 3.5vw;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 9vw;
  }
  
  .prayer-icon img {
    width: 22vw;
  }
  
  .instruction-text {
    font-size: 4.5vw;
  }
}
</style> 