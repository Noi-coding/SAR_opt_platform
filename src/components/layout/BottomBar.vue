<template>
  <div class="platform-bottom-bar">
    <div class="timeline-container">
      <div class="play-btn">
        <el-icon><VideoPlay /></el-icon>
      </div>
      <div class="timeline">
        <el-slider v-model="timeValue" :max="24" :step="1" show-stops />
      </div>
      <div class="time-labels">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
    <div class="copyright">
      © 2026 森安遥视 - 基于 SAR 林下遥感的全域灾害应急智慧平台 | 核心引擎：AI 智能计算层 v1.0
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeValue = ref(12)
</script>

<style lang="scss" scoped>
.platform-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: rgba(0, 11, 29, 0.9);
  border-top: 1px solid rgba(0, 74, 141, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
}

.timeline-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  gap: 15px;

  .play-btn {
    font-size: 24px;
    color: #00d2ff;
    cursor: pointer;
  }

  .timeline {
    flex: 1;
    :deep(.el-slider__runway) {
      background-color: rgba(255, 255, 255, 0.1);
    }
    :deep(.el-slider__bar) {
      background-color: #00a2ff;
    }
  }

  .time-labels {
    display: flex;
    gap: 10px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    width: 200px;
    justify-content: space-between;
  }
}

.copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}
</style>
