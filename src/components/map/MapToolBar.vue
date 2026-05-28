<template>
  <div class="map-toolbar">
    <div class="tool-group">
      <el-tooltip content="放大">
        <div class="tool-btn" @click="handleZoomIn">
          <el-icon><ZoomIn /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="缩小">
        <div class="tool-btn" @click="handleZoomOut">
          <el-icon><ZoomOut /></el-icon>
        </div>
      </el-tooltip>
      <div class="divider"></div>
      <el-tooltip content="全国视角">
        <div class="tool-btn" @click="handleReset">
          <el-icon><House /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="定位灾区">
        <div class="tool-btn" @click="handleLocation">
          <el-icon><Location /></el-icon>
        </div>
      </el-tooltip>
    </div>
    
    <div class="tool-group">
      <el-tooltip content="测距">
        <div class="tool-btn" @click="handleMeasureDistance">
          <el-icon><Pointer /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="测面">
        <div class="tool-btn" @click="handleMeasureArea">
          <el-icon><Grid /></el-icon>
        </div>
      </el-tooltip>
      <div class="divider"></div>
      <el-tooltip content="卷帘对比">
        <div class="tool-btn" :class="{ active: rollupMode }" @click="toggleRollup">
          <el-icon><Switch /></el-icon>
        </div>
      </el-tooltip>
    </div>
    
    <div class="tool-group">
      <el-tooltip content="图层管理">
        <div class="tool-btn" :class="{ active: layerPanelVisible }" @click="toggleLayerPanel">
          <el-icon><Document /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="截图">
        <div class="tool-btn" @click="handleScreenshot">
          <el-icon><Camera /></el-icon>
        </div>
      </el-tooltip>
      <div class="divider"></div>
      <el-tooltip content="全屏">
        <div class="tool-btn" @click="handleFullscreen">
          <el-icon><FullScreen /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="清屏">
        <div class="tool-btn" @click="handleClear">
          <el-icon><Delete /></el-icon>
        </div>
      </el-tooltip>
    </div>
  </div>
  
  <!-- 图层管理抽屉 -->
  <el-drawer
    v-model="layerPanelVisible"
    title="图层管理"
    direction="rtl"
    size="320px"
  >
    <div class="layer-panel">
      <div v-for="(group, groupKey) in mockLayers" :key="groupKey" class="layer-group">
        <div class="group-title">
          {{ getGroupTitle(groupKey) }}
        </div>
        <div class="layer-list">
          <div 
            v-for="layer in group" 
            :key="layer.id"
            class="layer-item"
          >
            <el-icon><component :is="layer.icon" /></el-icon>
            <span class="layer-name">{{ layer.name }}</span>
            <el-switch 
              v-model="layer.checked" 
              @change="handleLayerChange(layer)"
            />
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
  
  <!-- 卷帘对比模式 -->
  <div v-if="rollupMode" class="rollup-overlay" @click="toggleRollup">
    <div class="rollup-handle" @click.stop>
      <el-icon><DArrowLeft /></el-icon>
      <div class="rollup-line"></div>
      <el-icon><DArrowRight /></el-icon>
    </div>
    <div class="rollup-left">
      <div class="rollup-label">灾前 - 光学影像</div>
    </div>
    <div class="rollup-right">
      <div class="rollup-label">灾后 - SAR影像</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  ZoomIn, ZoomOut, House, Location, Pointer, Grid, Switch,
  Document, Camera, FullScreen, Delete, DArrowLeft, DArrowRight
} from '@element-plus/icons-vue';
import { mockLayers } from '../../utils/mockData';

const emit = defineEmits(['toggleLayer', 'toggleRollup']);

const layerPanelVisible = ref(false);
const rollupMode = ref(false);

const handleZoomIn = () => {
  ElMessage.success('已放大');
};

const handleZoomOut = () => {
  ElMessage.success('已缩小');
};

const handleReset = () => {
  ElMessage.info('已重置到全国视角');
};

const handleLocation = () => {
  ElMessage.info('正在定位重点灾区');
};

const handleMeasureDistance = () => {
  ElMessage.info('测距模式已开启');
};

const handleMeasureArea = () => {
  ElMessage.info('测面模式已开启');
};

const toggleRollup = () => {
  rollupMode.value = !rollupMode.value;
  emit('toggleRollup', rollupMode.value);
};

const toggleLayerPanel = () => {
  layerPanelVisible.value = !layerPanelVisible.value;
};

const handleLayerChange = (layer: any) => {
  emit('toggleLayer', layer);
  ElMessage.info(`${layer.checked ? '已启用' : '已关闭'}: ${layer.name}`);
};

const handleScreenshot = () => {
  ElMessage.success('截图已保存');
};

const handleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const handleClear = () => {
  ElMessage.info('已清屏');
};

const getGroupTitle = (key: string) => {
  const map: Record<string, string> = {
    imagery: '遥感影像',
    disaster: '灾害识别',
    resource: '应急资源',
    base: '基础地理'
  };
  return map[key];
};
</script>

<style lang="scss" scoped>
.map-toolbar {
  position: absolute;
  right: 372px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 800;
  
  .tool-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    background: rgba(11, 22, 40, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 213, 255, 0.2);
    border-radius: 10px;
    
    .tool-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(0, 213, 255, 0.15);
        color: var(--accent-cyan);
      }
      
      &.active {
        background: linear-gradient(135deg, rgba(0, 213, 255, 0.2), rgba(47, 128, 255, 0.1));
        color: var(--accent-cyan);
        border: 1px solid rgba(0, 213, 255, 0.4);
      }
    }
    
    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.12);
      margin: 4px 0;
    }
  }
}

.layer-panel {
  .layer-group {
    margin-bottom: 20px;
    
    .group-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--accent-cyan);
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 213, 255, 0.2);
    }
    
    .layer-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .layer-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        
        .layer-name {
          flex: 1;
          font-size: 13px;
          color: var(--text-secondary);
        }
      }
    }
  }
}

.rollup-overlay {
  position: absolute;
  inset: 0;
  z-index: 700;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  .rollup-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, transparent, rgba(0, 213, 255, 0.2), transparent);
    cursor: ew-resize;
    
    .rollup-line {
      width: 4px;
      height: 60%;
      background: var(--accent-cyan);
      border-radius: 2px;
      box-shadow: 0 0 20px rgba(0, 213, 255, 0.5);
    }
    
    .el-icon {
      color: var(--accent-cyan);
      font-size: 20px;
    }
  }
  
  .rollup-left, .rollup-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
  }
  
  .rollup-left {
    left: 20%;
    color: var(--accent-blue);
  }
  
  .rollup-right {
    right: 20%;
    color: var(--accent-cyan);
  }
}
</style>
