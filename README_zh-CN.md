# UI UX Pro Max

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

<p align="center">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases"><img src="https://img.shields.io/github/v/release/nextlevelbuilder/ui-ux-pro-max-skill?style=for-the-badge&color=blue" alt="GitHub Release"></a>
  <img src="https://img.shields.io/badge/reasoning_rules-100-green?style=for-the-badge" alt="100 Reasoning Rules">
  <img src="https://img.shields.io/badge/UI_styles-67-purple?style=for-the-badge" alt="67 UI Styles">
  <img src="https://img.shields.io/badge/python-3.x-yellow?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.x">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nextlevelbuilder/ui-ux-pro-max-skill?style=for-the-badge&color=green" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/uipro-cli"><img src="https://img.shields.io/npm/v/uipro-cli?style=flat-square&logo=npm&label=CLI" alt="npm"></a>
  <a href="https://www.npmjs.com/package/uipro-cli"><img src="https://img.shields.io/npm/dm/uipro-cli?style=flat-square&label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/stargazers"><img src="https://img.shields.io/github/stars/nextlevelbuilder/ui-ux-pro-max-skill?style=flat-square&logo=github" alt="GitHub stars"></a>
  <a href="https://paypal.me/uiuxpromax"><img src="https://img.shields.io/badge/PayPal-Support%20Development-00457C?style=flat-square&logo=paypal&logoColor=white" alt="PayPal"></a>
</p>

一个 AI 技能，为跨平台和框架构建专业 UI/UX 提供设计智能。

<p align="center">
  <img src="screenshots/website.png" alt="UI UX Pro Max" width="800">
</p>

<p align="center">
  <b>如果您觉得这很有用，请考虑支持该项目：</b><br><br>
  <a href="https://paypal.me/uiuxpromax"><img src="https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal Donate"></a>
</p>

## v2.0 新特性

### 智能设计系统生成

v2.0 的旗舰功能是 **设计系统生成器** - 一个由 AI 驱动的推理引擎，可以分析您的项目需求并在几秒钟内生成完整的、量身定制的设计系统。

```
+----------------------------------------------------------------------------------------+
|  目标：Serenity Spa - 推荐设计系统                                                       |
+----------------------------------------------------------------------------------------+
|                                                                                        |
|  模式：Hero 中心 + 社会认同                                                              |
|     转化：情感驱动，带有信任元素                                                          |
|     CTA：首屏上方，并在推荐语后重复                                                       |
|     部分：                                                                              |
|       1. Hero                                                                          |
|       2. 服务                                                                           |
|       3. 客户评价                                                                        |
|       4. 预订                                                                           |
|       5. 联系方式                                                                        |
|                                                                                        |
|  风格：Soft UI Evolution                                                                |
|     关键词：柔和阴影，微妙深度，平静，高级感，有机形状                                       |
|     最适合：健康，美容，生活方式品牌，高级服务                                              |
|     性能：优秀 | 无障碍性：WCAG AA                                                        |
|                                                                                        |
|  颜色：                                                                                 |
|     主色：      #E8B4B8 (柔粉色)                                                         |
|     次色：      #A8D5BA (鼠尾草绿)                                                       |
|     CTA：       #D4AF37 (金色)                                                          |
|     背景：      #FFF5F5 (暖白色)                                                         |
|     文本：      #2D3436 (炭灰色)                                                         |
|     备注：平静的色调搭配金色点缀，营造奢华感                                                |
|                                                                                        |
|  排版：Cormorant Garamond / Montserrat                                                  |
|     情绪：优雅，平静，精致                                                                |
|     最适合：奢侈品牌，健康，美容，编辑                                                      |
|     Google Fonts: https://fonts.google.com/share?selection.family=...                  |
|                                                                                        |
|  关键效果：                                                                             |
|     柔和阴影 + 平滑过渡 (200-300ms) + 温和的悬停状态                                        |
|                                                                                        |
|  避免 (反模式)：                                                                         |
|     明亮的霓虹色 + 刺眼的动画 + 深色模式 + AI 紫/粉渐变                                     |
|                                                                                        |
|  交付前检查清单：                                                                        |
|     [ ] 不要使用 emoji 作为图标 (使用 SVG: Heroicons/Lucide)                              |
|     [ ] 所有可点击元素添加 cursor-pointer                                                 |
|     [ ] 悬停状态具有平滑过渡 (150-300ms)                                                  |
|     [ ] 浅色模式：文本对比度最低 4.5:1                                                    |
|     [ ] 键盘导航的焦点状态可见                                                            |
|     [ ] 尊重 prefers-reduced-motion 设置                                                 |
|     [ ] 响应式：375px, 768px, 1024px, 1440px                                             |
|                                                                                        |
+----------------------------------------------------------------------------------------+
```

### 设计系统生成如何工作

```
┌─────────────────────────────────────────────────────────────────┐
│  1. 用户请求                                                     │
│     "为我的美容 spa 建立一个着陆页"                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. 多领域搜索 (5 个并行搜索)                                      │
│     • 产品类型匹配 (100 个类别)                                    │
│     • 风格推荐 (67 种风格)                                         │
│     • 调色板选择 (96 种调色板)                                     │
│     • 着陆页模式 (24 种模式)                                       │
│     • 排版配对 (57 种字体组合)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. 推理引擎                                                     │
│     • 匹配产品 → UI 类别规则                                       │
│     • 应用风格优先级 (BM25 排名)                                   │
│     • 过滤行业反模式                                               │
│     • 处理决策规则 (JSON 条件)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. 完整的设计系统输出                                            │
│     模式 + 风格 + 颜色 + 排版 + 效果                                │
│     + 需避免的反模式 + 交付前检查清单                               │
└─────────────────────────────────────────────────────────────────┘
```

### 100 条特定行业推理规则

推理引擎包括针对以下行业的专门规则：

| 类别 | 示例 |
|----------|----------|
| **Tech & SaaS** | SaaS, Micro SaaS, B2B Enterprise, Developer Tools, AI/Chatbot Platform |
| **Finance** | Fintech, Banking, Crypto, Insurance, Trading Dashboard |
| **Healthcare** | Medical Clinic, Pharmacy, Dental, Veterinary, Mental Health |
| **E-commerce** | General, Luxury, Marketplace, Subscription Box |
| **Services** | Beauty/Spa, Restaurant, Hotel, Legal, Consulting |
| **Creative** | Portfolio, Agency, Photography, Gaming, Music Streaming |
| **Emerging Tech** | Web3/NFT, Spatial Computing, Quantum Computing, Autonomous Systems |

每条规则包括：
- **推荐模式** - 着陆页结构
- **风格优先级** - 最佳匹配的 UI 风格
- **色彩情绪** - 行业适用的调色板
- **排版情绪** - 字体个性匹配
- **关键效果** - 动画和交互
- **反模式** - 不该做什么 (例如，银行业的 "AI 紫/粉渐变")

## 功能特性

- **67 种 UI 风格** - Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode, AI-Native UI 等
- **96 种调色板** - 针对 SaaS, E-commerce, Healthcare, Fintech, Beauty 等的行业特定调色板
- **57 种字体配对** - 精选的排版组合，带有 Google Fonts 导入
- **25 种图表类型** - 仪表板和分析的推荐
- **13 种技术栈** - React, Next.js, Astro, Vue, Nuxt.js, Nuxt UI, Svelte, SwiftUI, React Native, Flutter, HTML+Tailwind, shadcn/ui, Jetpack Compose
- **99 条 UX 指南** - 最佳实践，反模式和无障碍规则
- **100 条推理规则** - 行业特定的设计系统生成 (v2.0 新增)

### 可用风格 (67)

<details>
<summary><b>通用风格 (49)</b></summary>

| # | 风格 | 最适合 |
|---|-------|----------|
| 1 | Minimalism & Swiss Style | 企业应用, 仪表板, 文档 |
| 2 | Neumorphism | 健康/养生应用, 冥想平台 |
| 3 | Glassmorphism | 现代 SaaS, 金融仪表板 |
| 4 | Brutalism | 设计作品集, 艺术项目 |
| 5 | 3D & Hyperrealism | 游戏, 产品展示, 沉浸式体验 |
| 6 | Vibrant & Block-based | 初创公司, 创意代理, 游戏 |
| 7 | Dark Mode (OLED) | 夜间模式应用, 编码平台 |
| 8 | Accessible & Ethical | 政府, 医疗, 教育 |
| 9 | Claymorphism | 教育应用, 儿童应用, SaaS |
| 10 | Aurora UI | 现代 SaaS, 创意代理 |
| 11 | Retro-Futurism | 游戏, 娱乐, 音乐平台 |
| 12 | Flat Design | Web 应用, 移动应用, 初创公司 MVP |
| 13 | Skeuomorphism | 遗留应用, 游戏, 高级产品 |
| 14 | Liquid Glass | 高级 SaaS, 高端电商 |
| 15 | Motion-Driven | 作品集网站, 叙事平台 |
| 16 | Micro-interactions | 移动应用, 触摸屏 UI |
| 17 | Inclusive Design | 公共服务, 教育, 医疗 |
| 18 | Zero Interface | 语音助手, AI 平台 |
| 19 | Soft UI Evolution | 现代企业应用, SaaS |
| 20 | Neubrutalism | Z 世代品牌, 初创公司, Figma 风格 |
| 21 | Bento Box Grid | 仪表板, 产品页面, 作品集 |
| 22 | Y2K Aesthetic | 时尚品牌, 音乐, Z 世代 |
| 23 | Cyberpunk UI | 游戏, 科技产品, 加密应用 |
| 24 | Organic Biophilic | 养生应用, 可持续品牌 |
| 25 | AI-Native UI | AI 产品, 聊天机器人, copilots |
| 26 | Memphis Design | 创意代理, 音乐, 青年品牌 |
| 27 | Vaporwave | 音乐平台, 游戏, 作品集 |
| 28 | Dimensional Layering | 仪表板, 卡片布局, 模态框 |
| 29 | Exaggerated Minimalism | 时尚, 建筑, 作品集 |
| 30 | Kinetic Typography | Hero 部分, 营销网站 |
| 31 | Parallax Storytelling | 品牌叙事, 产品发布 |
| 32 | Swiss Modernism 2.0 | 企业网站, 建筑, 编辑 |
| 33 | HUD / Sci-Fi FUI | 科幻游戏, 空间技术, 网络安全 |
| 34 | Pixel Art | 独立游戏, 复古工具, 创意 |
| 35 | Bento Grids | 产品特性, 仪表板, 个人 |
| 36 | Spatial UI (VisionOS) | 空间计算应用, VR/AR |
| 37 | E-Ink / Paper | 阅读应用, 数字报纸 |
| 38 | Gen Z Chaos / Maximalism | Z 世代生活方式, 音乐艺术家 |
| 39 | Biomimetic / Organic 2.0 | 可持续技术, 生物技术, 健康 |
| 40 | Anti-Polish / Raw Aesthetic | 创意作品集, 艺术家网站 |
| 41 | Tactile Digital / Deformable UI | 现代移动应用, 趣味品牌 |
| 42 | Nature Distilled | 养生品牌, 可持续产品 |
| 43 | Interactive Cursor Design | 创意作品集, 交互式 |
| 44 | Voice-First Multimodal | 语音助手, 无障碍应用 |
| 45 | 3D Product Preview | 电商, 家具, 时尚 |
| 46 | Gradient Mesh / Aurora Evolved | Hero 部分, 背景, 创意 |
| 47 | Editorial Grid / Magazine | 新闻网站, 博客, 杂志 |
| 48 | Chromatic Aberration / RGB Split | 音乐平台, 游戏, 科技 |
| 49 | Vintage Analog / Retro Film | 摄影, 音乐/黑胶品牌 |

</details>

<details>
<summary><b>着陆页风格 (8)</b></summary>

| # | 风格 | 最适合 |
|---|-------|----------|
| 1 | Hero-Centric Design | 具有强烈视觉识别的产品 |
| 2 | Conversion-Optimized | 潜在客户开发, 销售页面 |
| 3 | Feature-Rich Showcase | SaaS, 复杂产品 |
| 4 | Minimal & Direct | 简单产品, 应用 |
| 5 | Social Proof-Focused | 服务, B2C 产品 |
| 6 | Interactive Product Demo | 软件, 工具 |
| 7 | Trust & Authority | B2B, 企业, 咨询 |
| 8 | Storytelling-Driven | 品牌, 代理机构, 非营利组织 |

</details>

<details>
<summary><b>BI/分析仪表板风格 (10)</b></summary>

| # | 风格 | 最适合 |
|---|-------|----------|
| 1 | Data-Dense Dashboard | 复杂数据分析 |
| 2 | Heat Map & Heatmap Style | 地理/行为数据 |
| 3 | Executive Dashboard | 高管摘要 |
| 4 | Real-Time Monitoring | 运营, DevOps |
| 5 | Drill-Down Analytics | 详细探索 |
| 6 | Comparative Analysis Dashboard | 并排比较 |
| 7 | Predictive Analytics | 预测, ML 洞察 |
| 8 | User Behavior Analytics | UX 研究, 产品分析 |
| 9 | Financial Dashboard | 金融, 会计 |
| 10 | Sales Intelligence Dashboard | 销售团队, CRM |

</details>

## 安装

### 使用 Claude Marketplace (Claude Code)

直接在 Claude Code 中使用两个命令安装：

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

### 使用 CLI (推荐)

```bash
# 全局安装 CLI
npm install -g uipro-cli

# 进入您的项目
cd /path/to/your/project

# 为您的 AI 助手安装
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai antigravity # Antigravity
uipro init --ai copilot     # GitHub Copilot
uipro init --ai kiro        # Kiro
uipro init --ai codex       # Codex CLI
uipro init --ai qoder       # Qoder
uipro init --ai roocode     # Roo Code
uipro init --ai gemini      # Gemini CLI
uipro init --ai trae        # Trae
uipro init --ai opencode    # OpenCode
uipro init --ai continue    # Continue
uipro init --ai codebuddy   # CodeBuddy
uipro init --ai all         # 所有助手
```

### 其他 CLI 命令

```bash
uipro versions              # 列出可用版本
uipro update                # 更新到最新版本
uipro init --offline        # 跳过 GitHub 下载，使用内置资源
```

## 先决条件

搜索脚本需要 Python 3.x。

```bash
# 检查 Python 是否已安装
python3 --version

# macOS
brew install python3

# Ubuntu/Debian
sudo apt update && sudo apt install python3

# Windows
winget install Python.Python.3.12
```

## 使用方法

### 技能模式 (自动激活)

**支持:** Claude Code, Windsurf, Antigravity, Codex CLI, Continue, Gemini CLI, OpenCode, Qoder, CodeBuddy

当您请求 UI/UX 工作时，该技能会自动激活。只需自然地聊天：

```
Build a landing page for my SaaS product
```

> **Trae**: 先切换到 **SOLO** 模式。技能将针对 UI/UX 请求激活。

### 工作流模式 (斜杠命令)

**支持:** Cursor, Kiro, GitHub Copilot, Roo Code

使用斜杠命令调用该技能：

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

### 示例提示词

```
Build a landing page for my SaaS product

Create a dashboard for healthcare analytics

Design a portfolio website with dark mode

Make a mobile app UI for e-commerce

Build a fintech banking app with dark theme
```

### 如何工作

1.  **您提问** - 请求任何 UI/UX 任务 (build, design, create, implement, review, fix, improve)
2.  **设计系统生成** - AI 使用推理引擎自动生成完整的设计系统
3.  **智能推荐** - 根据您的产品类型和需求，找到最佳匹配的风格、颜色和排版
4.  **代码生成** - 使用正确的颜色、字体、间距和最佳实践实现 UI
5.  **交付前检查** - 针对常见的 UI/UX 反模式进行验证

### 支持的技术栈

该技能为以下内容提供特定于技术栈的指南：

| 类别 | 技术栈 |
|----------|--------|
| **Web (HTML)** | HTML + Tailwind (默认) |
| **React 生态** | React, Next.js, shadcn/ui |
| **Vue 生态** | Vue, Nuxt.js, Nuxt UI |
| **其他 Web** | Svelte, Astro |
| **iOS** | SwiftUI |
| **Android** | Jetpack Compose |
| **跨平台** | React Native, Flutter |

只需在提示词中提及您首选的技术栈，或者让其默认为 HTML + Tailwind。

## 设计系统命令 (高级)

直接访问设计系统生成器：

> 注意：如果您通过 Continue 安装，请将下面命令中的 `.claude/skills/` 替换为 `.continue/skills/`。

```bash
# 生成带有 ASCII 输出的设计系统
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# 生成带有 Markdown 输出的设计系统
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown

# 特定领域搜索
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart

# 特定技术栈指南
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
```

### 持久化设计系统 (Master + Overrides 模式)

将您的设计系统保存到文件，以便 **跨会话分层检索**：

```bash
# 生成并持久化到 design-system/MASTER.md
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"

# 同时也创建一个页面特定的覆盖文件
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"
```

这将创建 `design-system/` 文件夹结构：

```
design-system/
├── MASTER.md           # 全局事实来源 (颜色, 排版, 间距, 组件)
└── pages/
    └── dashboard.md    # 页面特定覆盖 (仅偏离 Master 的部分)
```

**分层检索如何工作：**
1. 构建特定页面 (例如，"Checkout") 时，首先检查 `design-system/pages/checkout.md`
2. 如果页面文件存在，其规则 **覆盖** Master 文件
3. 如果不存在，仅使用 `design-system/MASTER.md`

**上下文感知检索提示词：**
```
I am building the [Page Name] page. Please read design-system/MASTER.md.
Also check if design-system/pages/[page-name].md exists.
If the page file exists, prioritize its rules.
If not, use the Master rules exclusively.
Now, generate the code...
```

## 架构与贡献

### 对于用户

代码库已重构为使用 **基于模板的生成系统**。所有特定于平台的文件 (`.cursor/`, `.windsurf/`, `.kiro/` 等) 现在都由 CLI 动态生成。

**始终使用 CLI 安装：**

```bash
npm install -g uipro-cli
uipro init --ai <platform>
```

这确保您获得适用于您的 AI 助手的最新模板和正确的文件结构。

### 对于贡献者

如果您想为这个项目做贡献：

```bash
# 1. 克隆仓库
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
cd ui-ux-pro-max-skill

# 2. 了解结构
src/ui-ux-pro-max/           # 事实来源 (数据, 脚本, 模板)
cli/                         # CLI 安装程序 (从模板生成文件)
.claude/                     # Claude Code 技能的本地开发/测试

# 3. 在 src/ui-ux-pro-max/ 中进行更改
# - data/*.csv              → 数据库文件
# - scripts/*.py            → 搜索引擎 & 设计系统
# - templates/              → 平台特定模板

# 4. 同步到 CLI 并在本地测试
cp -r src/ui-ux-pro-max/data/* cli/assets/data/
cp -r src/ui-ux-pro-max/scripts/* cli/assets/scripts/
cp -r src/ui-ux-pro-max/templates/* cli/assets/templates/

# 5. 构建并测试 CLI
cd cli && bun run build
node dist/index.js init --ai claude --offline  # 在临时文件夹中测试

# 6. 创建 PR (永远不要直接 push 到 main)
git checkout -b feat/your-feature
git commit -m "feat: description"
git push -u origin feat/your-feature
gh pr create
```

查看 [CLAUDE.md](CLAUDE.md) 了解详细的开发指南。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nextlevelbuilder/ui-ux-pro-max-skill&type=Date)](https://star-history.com/#nextlevelbuilder/ui-ux-pro-max-skill&Date)

## 许可证

本项目基于 [MIT License](LICENSE) 授权。
