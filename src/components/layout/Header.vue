<template>
  <header class="platform-header">
    <div class="header-left">
      <div class="logo">
        <el-icon><Monitor /></el-icon>
      </div>
      <div class="title">森安遥视・全域灾害应急智慧平台</div>
    </div>
    <div class="header-right">
      <div class="status-item">
        <span class="label">系统状态:</span>
        <span class="value success">正常运行</span>
      </div>
      <div class="status-item">
        <span class="label">当前时间:</span>
        <span class="value">{{ currentTime }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let timer: any = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.platform-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, rgba(0, 11, 29, 0.9) 0%, rgba(0, 11, 29, 0) 100%);
  border-bottom: 1px solid rgba(0, 74, 141, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  pointer-events: auto;
}

.header-left {
  display: flex;
  align-items: center;
  
  .logo {
    font-size: 28px;
    color: #00d2ff;
    margin-right: 15px;
    filter: drop-shadow(0 0 10px #00a2ff);
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 2px;
    background: linear-gradient(180deg, #fff 0%, #00d2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.header-right {
  display: flex;
  gap: 20px;
  
  .status-item {
    font-size: 14px;
    
    .label {
      color: rgba(255, 255, 255, 0.7);
      margin-right: 8px;
    }
    
    .value {
      color: #00d2ff;
      
      &.success {
        color: #00ff88;
      }
    }
  }
}
</style>
