# 佛教应用 - 摄像头自动识别功能

## 功能说明

本应用包含以下功能：

1. 主页面加载时自动启动摄像头
2. 无需按钮，自动将捕获的图像发送到后端`/check`接口进行识别
3. 识别结果返回后自动跳转到识别页面

## 技术实现

- 前端：Vue 3 + Vite
- 请求处理：Axios
- 路由：Vue Router
- 摄像头捕获：Web API (getUserMedia)

## 后端接口要求

后端需要提供以下接口：

```
POST /check
```

- 接收`multipart/form-data`格式的图像文件，字段名为`image`
- 返回JSON格式的响应：`{ recognized: true/false }`

## 开发与测试

### 运行Mock服务器

项目包含一个简单的Mock服务器，用于模拟后端API，方便测试：

```bash
# 安装依赖
npm install

# 启动Mock服务器 (http://localhost:3000)
npm run mock
```

Mock服务器会随机返回成功/失败的结果，成功概率为70%。

### 本地开发

```bash
# 在一个终端启动Mock服务器
npm run mock

# 在另一个终端启动开发服务器
npm run dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 配置后端地址

修改`vite.config.js`中的proxy配置指向您的实际后端地址：

```js
server: {
  proxy: {
    '/check': {
      target: 'http://your-backend-server.com',
      changeOrigin: true,
      secure: false,
    }
  }
}
```
