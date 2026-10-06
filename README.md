# ⚝ MoLucien ⚝

一个纯前端实现的个人主页 / 社交聚合页(Bio Link Page),暗色玻璃拟态风格,配全屏背景视频、打字机文案轮播与内置音乐播放器。

**在线预览:** https://molucien.github.io/lucien/

## ✨ 功能特性

- 🎬 全屏自动播放背景视频,配合暗色蒙层
- ✨ Canvas 粒子飘浮动画,轻量微光效果
- 🖱️ 鼠标视差效果:卡片随光标位置轻微倾斜、位移,营造纵深感
- 🔮 玻璃拟态(Glassmorphism)卡片,带流光边框动画
- ⌨️ 打字机效果的多段文案轮播
- 🌐 简体中文 / 繁体中文 / English 三语切换,自动检测浏览器语言并记住选择
- 🎵 内置音乐播放器(播放/暂停、进度条拖拽、音量调节,支持鼠标与触屏;音频懒加载——进入页面后才请求音频文件,不占用初始流量)
- 🔗 社交链接(Discord / Bilibili / Steam / X),悬浮显示提示文字
- 🚀 字体本地自托管(Silkscreen / Onest,woff2 子集),无第三方字体 CDN 依赖,加载稳定
- ⌨️ 播放进度条支持键盘操作(← → 步进 5 秒,Shift 步进 10 秒,Home / End 跳转首尾)
- 🔋 标签页切到后台时自动暂停背景视频,视差动画空闲时自动停止,省电低占用
- 📱 响应式布局,适配移动端与短屏幕设备
- ♿ 支持键盘操作(Tab 聚焦、Enter/空格进入)与 `prefers-reduced-motion` 无障碍偏好(自动关闭粒子与视差动效)
- 🖱️ 点击/回车/触屏进入页面后才开始播放背景音乐,符合浏览器自动播放策略

## 🛠 技术栈

纯原生实现,无构建工具、无框架依赖:HTML5 + CSS3(自定义属性 / Flexbox / 关键帧动画) + Vanilla JavaScript(ES Module)。

## 📁 目录结构

```
lucien/
├── index.html            # 页面结构与内容
├── style.css              # 样式与动画(顶部含自托管字体 @font-face)
├── script.js               # 打字机、音乐播放器等交互逻辑
├── robots.txt                # 搜索引擎抓取配置
├── sitemap.xml                 # 站点地图
├── LICENSE
└── assets/
    ├── avatar.webp          # 头像(WebP,优先加载)
    ├── avatar.jpg            # 头像(JPEG 兜底与兼容)
    ├── favicon.png            # 站点图标(由头像生成)
    ├── apple-touch-icon.png    # iOS 添加到主屏图标
    ├── og-cover.jpg             # 社交分享卡片图(1200×630)
    ├── background.mp4            # 背景视频(已压缩,~1.2MB)
    ├── bg-poster.jpg              # 背景视频首帧封面图(视频加载完成前占位)
    ├── cover.gif                   # 音乐封面
    ├── music.mp3                    # 背景音乐(懒加载)
    ├── fonts/                        # 自托管字体(Silkscreen / Onest,OFL 授权)
    ├── badge-custom.webp              # 自定义徽章(备用)
    └── cursor.png                      # 自定义光标(备用)
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

### 多语言文案

翻译文案集中在 `script.js` 顶部的 `TRANSLATIONS` 对象中,按语言代码(`zh-CN` / `zh-TW` / `en`)分组,新增文案字段后记得在三个语言块中都补上对应翻译。语言检测优先级:用户上次选择(存于 `localStorage`)→ 浏览器语言 → 默认英文。

### 字体

站点字体(Silkscreen / Onest,均为 OFL 授权,见 `assets/fonts/LICENSE.txt`)以 woff2 子集形式自托管在 `assets/fonts/`,声明位于 `style.css` 顶部。替换字体时:

1. 将新字体(建议 woff2)放入 `assets/fonts/`;
2. 更新 `style.css` 中 `@font-face` 的 `src` 与 `font-family`;
3. 若主字体文件名变化,同步更新 `index.html` 中的两个 `<link rel="preload">`。

### 缓存与版本号(部署注意)

GitHub Pages 对所有文件强制 10 分钟缓存且无法修改,更新期间可能出现新旧文件混搭。因此 `index.html`、`style.css`、`script.js` 中对 CSS / JS / 图片 / 视频的引用均带 `?v=N` 版本参数:**修改这些文件内容后,把对应引用的 `?v=` 数字统一加 1**(含 `style.css` 内 3 处字体引用、`script.js` 中封面图),访客即可立即拿到新版,不会出现新旧混搭。

### 粒子 / 视差效果

在 `script.js` 的 `initParticles()` 中调整 `COUNT`(粒子数量)、`r`/`alpha`(大小与透明度)等参数;`initParallax()` 中的 `maxShift`(位移幅度)、`maxTilt`(倾斜角度)控制视差强度。两者均会在用户开启"减弱动态效果"系统偏好,或触屏设备(视差)时自动关闭。

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

- 头像:`avatar.webp`(优先加载)与 `avatar.jpg`(兜底),当前尺寸 512×512(页面显示 110px,足够覆盖高分屏)。替换后如需同步图标与分享图,重新生成 `favicon.png`、`apple-touch-icon.png` 与 `og-cover.jpg`(1200×630),并检查 `index.html` 中 `og:image` 的绝对 URL
- 背景视频:当前已压缩至约 1.2MB;建议控制在 3MB 以内,并保持首帧图 `bg-poster.jpg` 与视频画面一致

```bash
# 压缩视频示例
ffmpeg -i input.mp4 -an -vf "scale=960:432" -c:v libx264 -preset slow -crf 28 -movflags +faststart background.mp4

# 生成 poster
ffmpeg -i background.mp4 -vframes 1 -q:v 4 bg-poster.jpg
```

## 🌐 浏览器兼容性

- 依赖 `backdrop-filter`(玻璃拟态效果),建议使用现代浏览器(Chrome / Edge / Safari / Firefox 最新版本)
- 背景音乐播放遵循浏览器自动播放策略,需用户先与页面交互(点击/按键/触屏进入)后才会开始播放

## 📌 可扩展方向

- [ ] 更多语言支持(如日语 / 韩语)
- [ ] 音乐播放列表支持多首歌曲的默认曲库
- [ ] 粒子动画增加鼠标交互(如靠近排斥/吸附效果)

## 📄 License

本项目基于 [Boost Software License 1.0](./LICENSE) 开源。
