<template>
  <div class="platform-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="collapse-btn" @click="isCollapsed = !isCollapsed">
      <el-icon><ArrowLeft v-if="!isCollapsed" /><ArrowRight v-else /></el-icon>
    </div>
    
    <div class="menu-container">
      <div 
        v-for="item in menuItems" 
        :key="item.key"
        class="menu-item"
        :class="{ active: activeMenu === item.key }"
        @click="selectMenu(item.key)"
      >
        <el-icon class="menu-icon"><component :is="item.icon" /></el-icon>
        <span class="menu-label">{{ item.label }}</span>
      </div>
    </div>

    <div class="ai-engine-status" v-if="!isCollapsed">
      <div class="engine-title">AI 智能计算引擎</div>
      <div class="engine-item">
        <div class="dot active pulse-dot"></div>
        <span>林下房屋识别引擎</span>
      </div>
      <div class="engine-item">
        <div class="dot active pulse-dot"></div>
        <span>风险健康档案引擎</span>
      </div>
      <div class="engine-item">
        <div class="dot active pulse-dot"></div>
        <span>多灾种判读引擎</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)
const activeMenu = ref('census')

const menuItems = [
  { key: 'census', label: '房屋普查', icon: 'House' },
  { key: 'archive', label: '风险档案', icon: 'FolderChecked' },
  { key: 'judgement', label: '灾害研判', icon: 'Aim' },
  { key: 'stats', label: '灾情统计', icon: 'DataAnalysis' },
  { key: 'rebuild', label: '重建分析', icon: 'Operation' }
]

const emit = defineEmits(['menu-click'])

const selectMenu = (key: string) => {
  activeMenu.value = key
  emit('menu-click', key)
}
</script>

<style lang="scss" scoped>
.platform-sidebar {
  position: absolute;
  top: 80px;
  left: 20px;
  bottom: 60px;
  width: 220px;
  background: rgba(0, 20, 50, 0.8);
  border: 1px solid #004a8d;
  border-radius: 4px;
  z-index: 1000;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  &.collapsed {
    width: 60px;
    .menu-label, .ai-engine-status {
      display: none;
    }
  }
}

.collapse-btn {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background: #004a8d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
}

.menu-container {
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 162, 255, 0.2);
    color: #00d2ff;
  }

  &.active {
    background: linear-gradient(90deg, rgba(0, 162, 255, 0.3) 0%, rgba(0, 162, 255, 0) 100%);
    color: #00d2ff;
    border-left: 3px solid #00d2ff;
  }

  .menu-icon {
    font-size: 20px;
    margin-right: 15px;
  }

  .menu-label {
    font-size: 16px;
  }
}

.ai-engine-status {
  padding: 20px;
  border-top: 1px solid rgba(0, 74, 141, 0.5);

  .engine-title {
    font-size: 14px;
    color: #00d2ff;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .engine-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 10px;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
      background: #444;

      &.active {
        background: #00ff88;
        box-shadow: 0 0 5px #00ff88;
      }
    }
  }
}
</style>
