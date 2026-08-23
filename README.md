# ⚝ MoLucien ⚝

一个纯前端实现的个人主页 / 社交聚合页(Bio Link Page),暗色玻璃拟态风格,配全屏背景视频、打字机文案轮播与内置音乐播放器。

**在线预览:** _(在此处填写你的部署地址)_

## ✨ 功能特性

- 🎬 全屏自动播放背景视频,配合暗色蒙层
- 🔮 玻璃拟态(Glassmorphism)卡片,带流光边框动画
- ⌨️ 打字机效果的多段文案轮播
- 🎵 内置音乐播放器(播放/暂停、上一首/下一首、进度条拖拽、音量调节,支持鼠标与触屏)
- 🔗 社交链接(Discord / Bilibili / Steam / X),悬浮显示提示文字
- 📱 响应式布局,适配移动端与短屏幕设备
- ♿ 支持键盘操作(Tab 聚焦、Enter/空格进入)与 `prefers-reduced-motion` 无障碍偏好
- 🖱️ 点击/回车/触屏进入页面后才开始播放背景音乐,符合浏览器自动播放策略

## 🛠 技术栈

纯原生实现,无构建工具、无框架依赖:HTML5 + CSS3(自定义属性 / Flexbox / 关键帧动画) + Vanilla JavaScript(ES Module)。

## 📁 目录结构

```
lucien-main/
├── index.html            # 页面结构与内容
├── style.css              # 样式与动画
├── script.js               # 打字机、音乐播放器等交互逻辑
├── LICENSE
└── assets/
    ├── avatar.png          # 头像(PNG 兜底,同时用作 favicon / OG 图)
    ├── avatar.webp          # 头像(WebP,体积更小,优先加载)
    ├── background.mp4       # 背景视频
    ├── bg-poster.jpg          # 背景视频首帧封面图(视频加载完成前占位)
    ├── cover.gif               # 音乐封面
    ├── music.mp3                # 背景音乐
    ├── badge-custom.webp         # 自定义徽章
    └── cursor.png                 # 自定义光标
```

## 🚀 本地运行

纯静态页面,无需安装依赖,起一个静态服务器即可预览:

```bash
# 任选其一
npx serve .
# 或
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`(或对应端口)。

> ⚠️ 不建议直接双击 `index.html` 用 `file://` 协议打开,部分浏览器会限制视频/音频自动播放和模块脚本(`type="module"`)加载。

也可以直接把整个文件夹部署到 GitHub Pages / Vercel / Netlify / Cloudflare Pages 等静态托管平台。

## 🎨 自定义配置

### 文案与音乐

编辑 `script.js` 顶部的 `CONFIG` 与 `TRACKS`:

```js
const CONFIG = {
  typewriterTexts: ['Digital Dream ✦ Chill Vibes', 'Welcome To My Domain', 'Stay A While'],
  typewriterSpeed: 80,
  typewriterDeleteSpeed: 35,
  typewriterPause: 1500,
};

const TRACKS = [
  { title: 'Change Your Life', src: './assets/music.mp3', cover: './assets/cover.gif' },
];
```

`TRACKS` 支持配置多首歌曲,播放器会自动支持上一首/下一首切换。

### 主题颜色

在 `style.css` 顶部的 `:root` 中修改 CSS 变量,可统一调整主题色、卡片圆角、边框等:

```css
:root {
  --textColor: #ffffff;
  --iconColor: #e8e8e8;
  --backgroundColor: #000000;
  --containerWidth: 40rem;
  --containerRadius: 0px;
  --buttonRadius: 12px;
  ...
}
```

### 社交链接

在 `index.html` 的 `.socials` 区块中增删 `<a>` 标签,并替换对应的 SVG 图标。

### 头像 / 背景素材

替换 `assets/` 下对应文件即可。建议:

- 头像:512×512 左右足够(页面实际只显示 110px),同时提供 `.webp`(体积小,优先加载)与 `.png`(兼容性好,用于 favicon / OG 图)
- 背景视频:建议控制在 3–5MB 以内,并生成一张首帧图作为 `poster`,提升首屏加载体验

```bash
# 压缩视频示例
ffmpeg -i input.mp4 -an -vf "scale=960:432" -c:v libx264 -preset slow -crf 28 -movflags +faststart background.mp4

# 生成 poster
ffmpeg -i background.mp4 -vframes 1 -q:v 4 bg-poster.jpg
```

## 🌐 浏览器兼容性

- 依赖 `backdrop-filter`(玻璃拟态效果),建议使用现代浏览器(Chrome / Edge / Safari / Firefox 最新版本)
- 背景音乐播放遵循浏览器自动播放策略,需用户先与页面交互(点击/按键/触屏进入)后才会开始播放

## 📌 待办 / 可扩展方向

- [ ] 粒子动画效果
- [ ] 鼠标视差效果
- [ ] 简体中文 / 繁体中文 / 英文多语言切换

## 📄 License

本项目基于 [Boost Software License 1.0](./LICENSE) 开源。
