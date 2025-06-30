# 学术个人网站模板

这是一个基于HTML、CSS和JavaScript的学术个人网站模板，适合学者、研究人员和教育工作者使用。

## 功能特点

- 响应式设计，适配各种设备屏幕尺寸
- 清晰的导航结构，方便访问者浏览
- 丰富的页面布局，包括首页、关于我、学术成果、开源项目和博客
- 支持过滤和搜索功能
- 现代化的UI设计和动画效果
- 无需后端，纯静态网站，易于部署

## 页面说明

1. **首页 (index.html)**
   - 个人简介和联系方式
   - 最新动态展示区域

2. **关于我 (about.html)**
   - 详细个人介绍
   - 教育背景和工作经历
   - 研究兴趣和荣誉奖项

3. **学术成果 (publications.html)**
   - 按类别和时间展示学术论文
   - 包含论文详细信息和链接

4. **开源项目 (projects.html)**
   - 展示研究项目和开源代码
   - 项目分类和详细描述

5. **博客 (blog.html)**
   - 技术笔记、研究思考和论文解读
   - 支持标签过滤和搜索

## 如何使用

1. 克隆或下载此仓库
2. 根据需要修改HTML文件中的内容
3. 替换`img`文件夹中的图片
4. 根据个人喜好调整`css/style.css`中的样式
5. 部署到任何静态网站托管服务（如GitHub Pages、Netlify等）

## 文件结构

```
├── index.html          # 首页
├── about.html          # 关于我页面
├── publications.html   # 学术成果页面
├── projects.html       # 开源项目页面
├── blog.html           # 博客列表页面
├── css/
│   └── style.css       # 主样式文件
├── js/
│   └── script.js       # JavaScript脚本
├── img/                # 图片文件夹
└── blog/               # 博客文章文件夹
    └── pytorch-tips.html  # 示例博客文章
```

## 自定义

### 修改颜色主题

在`css/style.css`文件的开头，可以通过修改CSS变量来更改网站的颜色主题：

```css
:root {
    --primary-color: #3498db;    /* 主色调 */
    --secondary-color: #2c3e50;  /* 次要色调 */
    --accent-color: #e74c3c;     /* 强调色 */
    --light-color: #f8f9fa;      /* 浅色背景 */
    --dark-color: #343a40;       /* 深色文本 */
    /* 其他颜色变量... */
}
```

### 添加新的博客文章

1. 在`blog`文件夹中创建新的HTML文件
2. 使用`blog/pytorch-tips.html`作为模板
3. 在`blog.html`中添加新文章的链接和预览

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT许可证 - 详见LICENSE文件 