<template>
  <aside class="left-panel">
    <!-- 灾前 -->
    <div class="panel-section">
      <div class="section-header">
        <el-icon><Warning /></el-icon>
        <span>灾前广域动态普查</span>
      </div>
      <div class="function-list">
        <div 
          v-for="func in mockFunctions.preDisaster" 
          :key="func.id"
          class="function-btn"
          :class="{ active: activeFunc === func.id }"
          @click="selectFunc(func)"
        >
          <el-icon><component :is="func.icon" /></el-icon>
          <span class="func-name">{{ func.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 灾中 -->
    <div class="panel-section">
      <div class="section-header">
        <el-icon><Guide /></el-icon>
        <span>灾中秒级联合判读</span>
      </div>
      <div class="function-list">
        <div 
          v-for="func in mockFunctions.duringDisaster" 
          :key="func.id"
          class="function-btn"
          :class="{ active: activeFunc === func.id }"
          @click="selectFunc(func)"
        >
          <el-icon><component :is="func.icon" /></el-icon>
          <span class="func-name">{{ func.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 灾后 -->
    <div class="panel-section">
      <div class="section-header">
        <el-icon><Tools /></el-icon>
        <span>灾后适宜性评估</span>
      </div>
      <div class="function-list">
        <div 
          v-for="func in mockFunctions.postDisaster" 
          :key="func.id"
          class="function-btn"
          :class="{ active: activeFunc === func.id }"
          @click="selectFunc(func)"
        >
          <el-icon><component :is="func.icon" /></el-icon>
          <span class="func-name">{{ func.name }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Warning, Guide, Tools } from '@element-plus/icons-vue';
import { mockFunctions } from '../../utils/mockData';

const emit = defineEmits(['selectFunc']);
const activeFunc = ref<string | null>(null);

const selectFunc = (func: any) => {
  activeFunc.value = func.id;
  emit('selectFunc', func);
};
</script>

<style lang="scss" scoped>
.left-panel {
  position: absolute;
  top: 80px;
  left: 16px;
  bottom: 96px;
  width: 300px;
  background: rgba(11, 22, 40, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 213, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  z-index: 900;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-section {
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(0, 213, 255, 0.1);
    border-left: 3px solid var(--accent-cyan);
    border-radius: 0 6px 6px 0;
    margin-bottom: 12px;
    color: var(--accent-cyan);
    font-weight: 600;
    font-size: 14px;
  }
  
  .function-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .function-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      color: var(--text-secondary);
      
      &:hover {
        background: rgba(0, 213, 255, 0.08);
        border-color: rgba(0, 213, 255, 0.3);
        color: var(--accent-cyan);
        transform: translateX(4px);
      }
      
      &.active {
        background: linear-gradient(135deg, rgba(0, 213, 255, 0.15), rgba(47, 128, 255, 0.1));
        border-color: rgba(0, 213, 255, 0.5);
        color: var(--accent-cyan);
        box-shadow: 0 0 15px rgba(0, 213, 255, 0.2);
      }
      
      .el-icon {
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .func-name {
        font-size: 13px;
        line-height: 1.4;
      }
    }
  }
}
</style>
