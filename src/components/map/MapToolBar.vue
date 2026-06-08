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
      <div v-for="(group, groupKey) in localLayers" :key="groupKey" class="layer-group">
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
import { ref, onMounted } from 'vue';  // 关键修复：导入 onMounted
import { ElMessage } from 'element-plus';
import {
  ZoomIn, ZoomOut, House, Location, Pointer, Grid, Switch,
  Document, Camera, FullScreen, Delete, DArrowLeft, DArrowRight
} from '@element-plus/icons-vue';

// 模拟图层数据（避免外部依赖）
const mockLayers = [
  { id: 'optical1', name: '灾前光学影像', type: 'optical', visible: true, icon: 'Picture' },
  { id: 'optical2', name: '灾后光学影像', type: 'optical', visible: false, icon: 'Picture' },
  { id: 'sar1', name: '灾前SAR', type: 'sar', visible: false, icon: 'Monitor' },
  { id: 'sar2', name: '灾后SAR', type: 'sar', visible: true, icon: 'Monitor' },
  { id: 'base1', name: '行政区划', type: 'base', visible: true, icon: 'Location' },
  { id: 'base2', name: '交通路网', type: 'base', visible: true, icon: 'Grid' },
  { id: 'history1', name: '历史滑坡点', type: 'history', visible: false, icon: 'Warning' },
  { id: 'infra1', name: '学校医院', type: 'infrastructure', visible: false, icon: 'School' },
  { id: 'result1', name: 'AI识别结果', type: 'result', visible: true, icon: 'Flag' }
];

const emit = defineEmits(['toggleLayer', 'toggleRollup']);

const layerPanelVisible = ref(false);
const rollupMode = ref(false);
const localLayers = ref<Record<string, any[]>>({});

// 初始化图层数据
onMounted(() => {
  const result: Record<string, any[]> = {};
  mockLayers.forEach(layer => {
    if (!result[layer.type]) {
      result[layer.type] = [];
    }
    result[layer.type].push({
      ...layer,
      checked: layer.visible
    });
  });
  localLayers.value = result;
});

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
    optical: '光学影像',
    sar: 'SAR数据',
    base: '基础数据',
    history: '历史灾害',
    infrastructure: '基础设施',
    result: '识别结果'
  };
  return map[key] || key;
};
</script>

<style lang="scss" scoped>
/* 保持原有样式不变 */
.map-toolbar {
  position: absolute;
  right: 380px;
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
    background: rgba(8, 20, 45, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 180, 255, 0.25);
    border-radius: 10px;
    
    .tool-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(0, 180, 255, 0.15);
        color: #00e5ff;
      }
      
      &.active {
        background: linear-gradient(135deg, rgba(0, 180, 255, 0.2), rgba(47, 128, 255, 0.1));
        color: #00e5ff;
        border: 1px solid rgba(0, 180, 255, 0.4);
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
      color: #00e5ff;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 180, 255, 0.2);
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
          color: rgba(255, 255, 255, 0.7);
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
    background: linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.2), transparent);
    cursor: ew-resize;
    
    .rollup-line {
      width: 4px;
      height: 60%;
      background: #00e5ff;
      border-radius: 2px;
      box-shadow: 0 0 20px rgba(0, 180, 255, 0.5);
    }
    
    .el-icon {
      color: #00e5ff;
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
    color: #00a0ff;
  }
  
  .rollup-right {
    right: 20%;
    color: #00e5ff;
  }
}
</style>