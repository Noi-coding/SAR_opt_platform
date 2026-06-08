<template>
  <div class="timeline-control">
    <div class="timeline-container">
      <div class="play-controls">
        <div class="control-btn" @click="resetTimeline" title="重置">
          <el-icon><RefreshLeft /></el-icon>
        </div>
        <div class="control-btn play-btn" @click="togglePlay" :title="playing ? '暂停' : '播放'">
          <el-icon><VideoPlay v-if="!playing" /><VideoPause v-else /></el-icon>
        </div>
        <div class="control-btn" @click="toggleSpeed" title="倍速">
          <span>{{ speed }}x</span>
        </div>
      </div>

      <div class="timeline-track">
        <div class="timeline-nodes">
          <div 
            v-for="(phase, index) in timelinePhases" 
            :key="phase.id"
            class="timeline-node"
            :class="{ active: currentPhaseIndex === index }"
            @click="goToPhase(index)"
          >
            <div class="node-dot" :style="{ backgroundColor: phase.color, boxShadow: `0 0 10px ${phase.color}` }">
              <span class="node-index">{{ index + 1 }}</span>
            </div>
            <div class="node-label">{{ phase.name }}</div>
            <div class="node-desc">{{ phase.desc }}</div>
          </div>
        </div>
        <el-slider 
          v-model="currentPhaseIndex" 
          :min="0" 
          :max="timelinePhases.length - 1" 
          :step="1"
          :show-tooltip="false"
          @change="onSliderChange"
          style="margin-top: 8px;"
        />
      </div>

      <div class="current-display">
        <div class="current-label">当前阶段</div>
        <div class="current-value" :style="{ color: timelinePhases[currentPhaseIndex].color }">
          {{ timelinePhases[currentPhaseIndex].name }} - {{ timelinePhases[currentPhaseIndex].desc }}
        </div>
      </div>
    </div>

    <div class="copyright">
      © 2026 光学-SAR协同的小范围滑坡泥石流智能识别平台 · 森安遥视
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { RefreshLeft, VideoPlay, VideoPause } from '@element-plus/icons-vue';

const emit = defineEmits(['phaseChange']);
const currentPhaseIndex = ref(0);
const playing = ref(false);
const speed = ref(1);
let playInterval: number | null = null;
const currentPhase = inject('currentPhase', ref('pre'));

const timelinePhases = [
  { id: 'pre', name: '灾前', desc: '承灾目标建档', color: '#00e5ff' },
  { id: 'during', name: '灾中', desc: '快速变化识别', color: '#ff8800' },
  { id: 'post', name: '灾后', desc: '受灾范围统计', color: '#00ff88' },
  { id: 'predict', name: '预测', desc: '次生风险研判', color: '#8064ff' }
];

const togglePlay = () => {
  if (playing.value) {
    pause();
  } else {
    play();
  }
};

const play = () => {
  playing.value = true;
  playInterval = window.setInterval(() => {
    if (currentPhaseIndex.value >= timelinePhases.length - 1) {
      currentPhaseIndex.value = 0;
    } else {
      currentPhaseIndex.value++;
    }
    emitPhaseChange();
  }, 2000 / speed.value);
};

const pause = () => {
  playing.value = false;
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
};

const toggleSpeed = () => {
  const speeds = [1, 1.5, 2, 3];
  const currentIdx = speeds.indexOf(speed.value);
  speed.value = speeds[(currentIdx + 1) % speeds.length];
  if (playing.value) {
    pause();
    play();
  }
};

const resetTimeline = () => {
  pause();
  currentPhaseIndex.value = 0;
  emitPhaseChange();
  ElMessage.info('已重置时间轴');
};

const goToPhase = (index: number) => {
  currentPhaseIndex.value = index;
  emitPhaseChange();
};

const onSliderChange = (val: number) => {
  currentPhaseIndex.value = val;
  emitPhaseChange();
};

const emitPhaseChange = () => {
  const phase = timelinePhases[currentPhaseIndex.value];
  currentPhase.value = phase.id;
  emit('phaseChange', phase);
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
  height: 90px;
  background: linear-gradient(0deg, rgba(8, 20, 45, 0.98), rgba(15, 30, 60, 0.9));
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 200, 255, 0.2);
  padding: 10px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .timeline-container {
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;

    .play-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;

      .control-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 150, 255, 0.1);
        border: 1px solid rgba(0, 150, 255, 0.3);
        border-radius: 8px;
        color: #00e5ff;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 12px;
        font-weight: 700;

        &:hover {
          background: rgba(0, 150, 255, 0.2);
          box-shadow: 0 0 15px rgba(0, 200, 255, 0.2);
        }

        &.play-btn {
          width: 50px;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border: none;
          color: #fff;
        }
      }
    }

    .timeline-track {
      flex: 1;
      position: relative;

      .timeline-nodes {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0 10px;

        .timeline-node {
          flex: 1;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          opacity: 0.6;

          &:hover {
            opacity: 0.9;
          }

          &.active {
            opacity: 1;
          }

          .node-dot {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 6px;
            border: 2px solid rgba(255, 255, 255, 0.2);

            .node-index {
              font-size: 12px;
              font-weight: 700;
              color: #fff;
            }
          }

          .node-label {
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
          }

          .node-desc {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 2px;
          }
        }
      }
    }

    .current-display {
      flex-shrink: 0;
      padding: 10px 16px;
      background: rgba(0, 100, 200, 0.1);
      border-radius: 10px;
      text-align: right;

      .current-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 2px;
      }

      .current-value {
        font-size: 13px;
        font-weight: 600;
      }
    }
  }

  .copyright {
    text-align: center;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
