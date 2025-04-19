import axios from 'axios';

// 创建一个axios实例用于API请求
const apiClient = axios.create({
  baseURL: 'http://localhost:8765',
  timeout: 10000
});

// 识别服务
export const recognitionService = {
  /**
   * 检查用户是否被识别
   * @param {Blob} imageData - 从摄像头捕获的图像
   * @returns {Promise<Object>} - 识别结果
   */
  async checkRecognition(imageData) {
    const formData = new FormData();
    formData.append('image', imageData, 'recognition.jpg');
    
    return apiClient.post('/check', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

// 佛学语句服务
export const sentenceService = {
  /**
   * 获取佛学语句
   * @returns {Promise<Object>} - 包含佛学语句的响应
   */
  async getSentence() {
    return apiClient.get('/sentence');
  }
};

export default apiClient; 