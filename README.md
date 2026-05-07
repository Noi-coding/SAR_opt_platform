# 森安遥视 —— 基于 SAR 林下遥感的全域灾害应急智慧平台

本项目是一个基于 Vue 3 + Vite + TypeScript 的前端初始框架，用于展示 SAR 林下遥感在灾害应急中的应用。

## 技术栈
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件库**: Element Plus
- **三维引擎**: CesiumJS 1.110 (CDN 引入)
- **样式**: Sass (深蓝色科技风)

## 核心引擎 (AI 智能计算层)
1. **林下房屋精准识别与重点标识引擎**: 依托 L 波段 SAR 穿透优势，识别并重点标识林下隐匿房屋。
2. **全域房屋风险健康档案生成引擎**: 结合 D-InSAR 形变监测，为房屋生成专属风险档案。
3. **多灾种差异化智能判读引擎**: 针对火灾、暴雨、地震等场景提供差异化研判服务。

## 项目运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

## 项目结构
- `src/components/layout`: 页面布局组件（顶部、侧边栏、右侧面板、底部）
- `src/components/map`: Cesium 地图核心组件
- `src/assets/mock`: 本地模拟数据 (GeoJSON)
- `src/views`: 页面视图

## 注意事项
- 本项目不包含登录、用户管理、数据库等功能。
- 所有数据均为本地 Mock 数据。
- CesiumJS 通过 CDN 加载，请确保网络连接正常。
