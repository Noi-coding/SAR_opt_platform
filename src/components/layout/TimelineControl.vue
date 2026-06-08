<template>
  <div class="timeline-control">
    <div class="timeline-container">
      <!-- 控制按钮 -->
      <div class="play-controls">
        <div class="control-btn" @click="handleReset" title="重置">
          <el-icon><RefreshLeft /></el-icon>
        </div>
        <div class="control-btn play" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
          <el-icon><VideoPlay v-if="!isPlaying" /><VideoPause v-else /></el-icon>
        </div>
        <div class="control-btn" @click="handleSpeed" title="倍速">
          <span>{{ speed }}x</span>
        </div>
      </div>
      
      <!-- 时间轴 -->
      <div class="timeline-track">
        <div class="timeline-marks">
          <div 
            v-for="(phase, index) in mockTimelinePhases" 
            :key="phase.id"
            class="timeline-mark"
            :class="{ active: currentPhase === index }"
            @click="goToPhase(index)"
          >
            <div 
              class="mark-dot" 
              :style="{ background: phase.color, boxShadow: `0 0 10px ${phase.color}` }"
            ></div>
            <div class="mark-label">{{ phase.label }}</div>
          </div>
        </div>
        <el-slider 
          v-model="currentPhase" 
          :min="0" 
          :max="5" 
          :step="null"
          :show-tooltip="false"
          @change="onSliderChange"
        />
      </div>
      
      <!-- 当前信息 -->
      <div class="current-info">
        <div class="info-label">当前阶段:</div>
        <div class="info-value" :style="{ color: mockTimelinePhases[currentPhase].color }">
          {{ mockTimelinePhases[currentPhase].label }}
        </div>
      </div>
    </div>
    
    <!-- 版权信息 -->
    <div class="copyright">
      © 2026 森安遥视平台 | 基于多源遥感协同与时序InSAR预测
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { RefreshLeft, VideoPlay, VideoPause } from '@element-plus/icons-vue';
import { mockTimelinePhases } from '../../utils/mockData';

const emit = defineEmits(['phaseChange']);

const currentPhase = ref(0);
const isPlaying = ref(false);
const speed = ref(1);
let playInterval: number | null = null;

const togglePlay = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
};

const play = () => {
  isPlaying.value = true;
  playInterval = window.setInterval(() => {
    if (currentPhase.value >= 5) {
      currentPhase.value = 0;
    } else {
      currentPhase.value++;
    }
    emit('phaseChange', mockTimelinePhases[currentPhase.value]);
  }, 2000 / speed.value);
};

const pause = () => {
  isPlaying.value = false;
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
};

const handleReset = () => {
  pause();
  currentPhase.value = 0;
  ElMessage.info('已重置');
};

const handleSpeed = () => {
  const speeds = [1, 1.5, 2, 3];
  const currentIndex = speeds.indexOf(speed.value);
  speed.value = speeds[(currentIndex + 1) % speeds.length];
  
  if (isPlaying.value) {
    pause();
    play();
  }
};

const goToPhase = (index: number) => {
  currentPhase.value = index;
  emit('phaseChange', mockTimelinePhases[index]);
};

const onSliderChange = (val: number) => {
  emit('phaseChange', mockTimelinePhases[val]);
};

onUnmounted(() => {
  pause();
});
</script>

<style lang="scss" scoped>
.timeline-control {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(0deg, rgba(11, 22, 40, 0.95) 0%, rgba(11, 22, 40, 0.8) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 213, 255, 0.2);
  padding: 12px 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-container {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

/* 播放控制 */
.play-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .control-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 213, 255, 0.1);
    border: 1px solid rgba(0, 213, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    color: var(--accent-cyan);
    transition: all 0.3s;
    
    &:hover {
      background: rgba(0, 213, 255, 0.2);
      box-shadow: 0 0 15px rgba(0, 213, 255, 0.3);
    }
    
    &.play {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
      border: none;
      color: #fff;
      font-size: 18px;
    }
  }
}

/* 时间轴轨道 */
.timeline-track {
  flex: 1;
  position: relative;
  
  .timeline-marks {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    
    .timeline-mark {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.3s;
      
      &:hover {
        opacity: 0.8;
      }
      
      &.active {
        opacity: 1;
      }
      
      .mark-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent-cyan);
      }
      
      .mark-label {
        font-size: 11px;
        color: var(--text-secondary);
        white-space: nowrap;
      }
    }
  }
  
  :deep(.el-slider__runway) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  :deep(.el-slider__bar) {
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple));
  }
  
  :deep(.el-slider__button) {
    border-color: var(--accent-cyan);
    box-shadow: 0 0 15px rgba(0, 213, 255, 0.5);
  }
}

/* 当前信息 */
.current-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  
  .info-label {
    font-size: 12px;
    color: var(--text-muted);
  }
  
  .info-value {
    font-size: 14px;
    font-weight: 700;
  }
}

.copyright {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}
</style>
