<template>
  <header class="header-bar">
    <!-- 左侧：Logo + 标题 -->
    <div class="header-left">
      <div class="logo-container">
        <div class="logo-icon">
          <el-icon :size="28"><Monitor /></el-icon>
        </div>
        <div class="title-group">
          <h1 class="main-title">森安遥视</h1>
          <span class="subtitle">全国全域灾害应急智慧平台</span>
        </div>
      </div>
    </div>
    
    <!-- 中间：一级模块导航 -->
    <nav class="header-nav">
      <div 
        v-for="item in navItems" 
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="switchNav(item.id)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.name }}</span>
      </div>
    </nav>
    
    <!-- 右侧：状态、用户、工具 -->
    <div class="header-right">
      <div class="status-item weather">
        <el-icon><Sunny /></el-icon>
        <span>{{ mockWeather.temp }}°C {{ mockWeather.condition }}</span>
      </div>
      
      <div class="status-divider"></div>
      
      <div class="status-item time">
        <el-icon><Clock /></el-icon>
        <span>{{ currentTime }}</span>
      </div>
      
      <div class="status-divider"></div>
      
      <div class="status-item online">
        <span class="dot pulse-dot"></span>
        <span>在线</span>
      </div>
      
      <div class="user-avatar">
        <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      
      <el-tooltip content="全屏">
        <div class="tool-btn" @click="toggleFullscreen">
          <el-icon><FullScreen /></el-icon>
        </div>
      </el-tooltip>
      
      <el-tooltip content="设置">
        <div class="tool-btn" @click="handleSetting">
          <el-icon><Setting /></el-icon>
        </div>
      </el-tooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Monitor, Sunny, Clock, FullScreen, Setting } from '@element-plus/icons-vue';
import { mockWeather } from '../../utils/mockData';

const activeNav = ref('preDisaster');
const currentTime = ref('');
let timeInterval: number | null = null;

const navItems = [
  { id: 'preDisaster', name: '灾前普查', icon: 'Search' },
  { id: 'duringDisaster', name: '灾中导调', icon: 'Guide' },
  { id: 'postDisaster', name: '灾后重建', icon: 'Tools' },
  { id: 'dataResource', name: '数据资源', icon: 'Folder' },
  { id: 'modelAnalysis', name: '模型分析', icon: 'DataAnalysis' },
  { id: 'systemManage', name: '系统管理', icon: 'Setting' }
];

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const switchNav = (id: string) => {
  activeNav.value = id;
  ElMessage.success(`已切换到: ${navItems.find(n => n.id === id)?.name}`);
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const handleSetting = () => {
  ElMessage.info('设置面板即将打开');
};

onMounted(() => {
  updateTime();
  timeInterval = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<style lang="scss" scoped>
.header-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(180deg, rgba(11, 22, 40, 0.95) 0%, rgba(11, 22, 40, 0.8) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 213, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
}

/* 左侧 */
.header-left {
  .logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 0 20px rgba(0, 213, 255, 0.3);
    }
    
    .title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      .main-title {
        font-size: 22px;
        font-weight: 700;
        background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        letter-spacing: 2px;
      }
      
      .subtitle {
        font-size: 12px;
        color: var(--text-muted);
        letter-spacing: 1px;
      }
    }
  }
}

/* 中间导航 */
.header-nav {
  display: flex;
  gap: 8px;
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 14px;
    transition: all 0.3s;
    
    &:hover {
      background: rgba(0, 213, 255, 0.1);
      color: var(--accent-cyan);
    }
    
    &.active {
      background: linear-gradient(135deg, rgba(0, 213, 255, 0.2), rgba(47, 128, 255, 0.1));
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 213, 255, 0.3);
      box-shadow: 0 0 10px rgba(0, 213, 255, 0.2);
    }
    
    .el-icon {
      font-size: 16px;
    }
  }
}

/* 右侧 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(0, 213, 255, 0.08);
    border-radius: 6px;
    font-size: 13px;
    color: var(--text-secondary);
    
    .dot {
      width: 8px;
      height: 8px;
      background: var(--risk-low);
      border-radius: 50%;
    }
  }
  
  .status-divider {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.12);
  }
  
  .user-avatar {
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px rgba(0, 213, 255, 0.5);
    }
  }
  
  .tool-btn {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background: rgba(0, 213, 255, 0.15);
      color: var(--accent-cyan);
    }
  }
}
</style>
