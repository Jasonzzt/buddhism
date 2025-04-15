# Buddhism Wisdom

佛教智慧应用 - 通过手势识别获取星云大师的一句话

## 项目设置

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 编译打包
npm run build

# 本地预览打包结果
npm run preview
```

## 部署到GitHub Pages

项目配置了两种部署到GitHub Pages的方式：

### 方法1：手动部署

1. 确保已安装gh-pages依赖：
   ```bash
   npm install gh-pages --save-dev
   ```

2. 运行部署命令：
   ```bash
   npm run deploy
   ```
   
3. 部署完成后，访问 https://你的用户名.github.io/buddhism/

### 方法2：GitHub Actions 自动部署

项目已配置GitHub Actions工作流，每次推送到main分支时会自动部署：

1. 将代码推送到GitHub仓库：
   ```bash
   git add .
   git commit -m "更新内容"
   git push origin main
   ```

2. GitHub Actions将自动执行部署流程

3. 部署完成后，访问 https://你的用户名.github.io/buddhism/

## 注意事项

- 本项目使用的base path为`/buddhism/`，如果您的仓库名不同，请在`vite.config.js`文件中修改
- 请确保GitHub仓库设置中已启用GitHub Pages，并将部署源设置为gh-pages分支

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
