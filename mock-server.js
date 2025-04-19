import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建上传目录
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 配置multer存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  }
});

const upload = multer({ storage: storage });

// 创建Express应用
const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors());

// 解析JSON请求体
app.use(express.json());

// 识别成功的概率 (70%)
const RECOGNITION_SUCCESS_RATE = 1.0;

// 佛教语句数据库
const buddhistSentences = [
  {
    text: "什么都可以缺少，慈悲喜舍不可少也；\n善事好心都可增加，贪瞋气恼不可增也。",
    translation: "You can be short of anything as long as that thing is not loving-kindness, compassion, joy and equanimity.\nIncrease only good deeds and kind intentions, never greed, aversion, or anger."
  },
  {
    text: "心如莲花,不染尘埃。\n道法自然,随缘自在。",
    translation: "Let your heart be like a lotus flower, untainted by worldly dust.\nThe Way follows nature, adapting freely to circumstances."
  },
  {
    text: "善恶两条路,修行看自己。\n菩提本无树,明镜亦非台。",
    translation: "Good and evil are two separate paths, spiritual practice depends on oneself.\nBodhi originally has no tree, and the bright mirror is not a stand."
  },
  {
    text: "放下屠刀,立地成佛。\n心中有佛,处处是道。",
    translation: "Put down the butcher's knife and become a Buddha on the spot.\nWith Buddha in your heart, the Way is everywhere."
  },
  {
    text: "种瓜得瓜,种豆得豆。\n因果循环,报应不爽。",
    translation: "Sow melons, reap melons; sow beans, reap beans.\nKarma cycles with unfailing retribution."
  }
];

// 处理/check端点
app.post('/check', upload.single('image'), (req, res) => {
  // 如果没有上传文件
  if (!req.file) {
    return res.status(400).json({ 
      error: '没有提供图像文件',
      recognized: false 
    });
  }
  
  console.log('接收到图像:', req.file.path);
  
  // 在真实应用中，这里会分析图像
  // 对于模拟服务器，随机决定用户是否被识别
  const isRecognized = Math.random() < RECOGNITION_SUCCESS_RATE;
  
  // 返回识别结果
  console.log('识别结果:', isRecognized ? '成功' : '失败');
  
  res.json({
    recognized: isRecognized,
    message: isRecognized 
      ? '用户识别成功'
      : '用户识别失败'
  });
});

// 处理/sentence端点 - 随机返回一句佛教语句
app.get('/sentence', (req, res) => {
  const randomIndex = Math.floor(Math.random() * buddhistSentences.length);
  const selectedSentence = buddhistSentences[randomIndex];
  
  console.log('返回佛教语句:', selectedSentence.text);
  
  res.json({
    text: selectedSentence.text,
    translation: selectedSentence.translation
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Mock服务器运行在 http://localhost:${PORT}`);
  console.log(`图像识别端点: http://localhost:${PORT}/check`);
  console.log(`佛教语句端点: http://localhost:${PORT}/sentence`);
}); 