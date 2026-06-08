<template>
  <header class="new-header">
    <div class="header-left">
      <div class="logo-area">
        <div class="logo-icon">
          <el-icon :size="24"><Monitor /></el-icon>
        </div>
        <div class="title-group">
          <h1 class="main-title">光学-SAR协同小范围灾害智能识别平台</h1>
        </div>
      </div>
    </div>

    <div class="header-center">
      <div class="status-badges">
        <div class="status-badge">
          <el-icon><Location /></el-icon>
          <span>监测区域：雅安市雨城区</span>
        </div>
        <div class="status-badge">
          <el-icon><Timer /></el-icon>
          <span>阶段：{{ currentPhaseDesc }}</span>
        </div>
        <div class="status-badge">
          <el-icon><CircleCheck /></el-icon>
          <span class="status-text">任务正常</span>
        </div>
      </div>
    </div>

    <nav class="header-nav">
      <div 
        v-for="(item, index) in navItems" 
        :key="item.id"
        class="nav-item"
        :class="{ active: activeNav === item.id }"
        @click="switchNav(item.id)"
      >
        <span class="nav-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="nav-text">{{ item.name }}</span>
      </div>
    </nav>

    <div class="header-right">
      <div class="time-display">
        <el-icon><Clock /></el-icon>
        <span>{{ currentTime }}</span>
      </div>
      <div class="user-avatar">
        <el-avatar :size="32" icon="UserFilled" />
      </div>
      <div class="status-dot active"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { Monitor, Location, Timer, CircleCheck, Clock } from '@element-plus/icons-vue';

const activeNav = ref('dashboard');
const currentTime = ref('');
const currentPhase = inject('currentPhase', ref('pre'));
const activeModule = inject('activeModule', ref('dashboard'));

const navItems = [
  { id: 'dashboard', name: '综合驾驶舱' },
  { id: 'data', name: '数据管理' },
  { id: 'registration', name: '配准融合' },
  { id: 'pre', name: '灾前建档' },
  { id: 'during', name: '灾中识别' },
  { id: 'post', name: '灾后研判' },
  { id: 'verify', name: '人工核验' },
  { id: 'report', name: '报告导出' }
];

const currentPhaseDesc = computed(() => {
  const phases: Record<string, string> = {
    pre: '灾前-承灾目标建档',
    during: '灾中-快速变化识别',
    post: '灾后-受灾范围统计',
    predict: '预测-次生风险'
  };
  return phases[currentPhase.value] || '灾前';
});

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
  activeModule.value = id;
  
  // 更新当前阶段
  if (id === 'pre') currentPhase.value = 'pre';
  else if (id === 'during') currentPhase.value = 'during';
  else if (id === 'post') currentPhase.value = 'post';
  
  ElMessage.success(`已切换到：${navItems.find(n => n.id === id)?.name}`);
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<style lang="scss" scoped>
.new-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(180deg, rgba(5, 15, 35, 0.98) 0%, rgba(10, 25, 50, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 200, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
}

.header-left {
  flex: 0 0 380px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 20px rgba(0, 198, 255, 0.3);
}

.main-title {
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(90deg, #00e5ff, #00a0ff, #8060ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.status-badges {
  display: flex;
  gap: 16px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(0, 150, 255, 0.08);
  border: 1px solid rgba(0, 150, 255, 0.2);
  border-radius: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.status-text {
  color: #00ff88;
}

.header-nav {
  display: flex;
  gap: 4px;
  margin: 0 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  transition: all 0.3s;
  position: relative;

  &:hover {
    background: rgba(0, 150, 255, 0.1);
    color: #00c6ff;
  }

  &.active {
    background: linear-gradient(135deg, rgba(0, 198, 255, 0.25), rgba(0, 114, 255, 0.15));
    color: #00e5ff;
    border: 1px solid rgba(0, 200, 255, 0.4);
  }

  .nav-number {
    font-size: 11px;
    font-weight: 600;
    color: rgba(0, 200, 255, 0.6);
    border: 1px solid rgba(0, 200, 255, 0.3);
    padding: 0 4px;
    border-radius: 3px;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.user-avatar {
  cursor: pointer;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);

  &.active {
    background: #00ff88;
    box-shadow: 0 0 8px #00ff88;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
