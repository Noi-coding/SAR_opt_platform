<template>
  <aside class="new-left-panel">
    <div class="panel-header">
      <div class="header-icon">
        <el-icon><FolderOpened /></el-icon>
      </div>
      <div class="header-text">
        <h3>图层管理</h3>
        <span class="desc">控制地图显示</span>
      </div>
    </div>

    <div class="layer-groups">
      <div v-for="group in groupedLayers" :key="group.type" class="layer-group">
        <div class="group-title">
          <span class="title-text">{{ group.title }}</span>
        </div>
        <div class="group-layers">
          <div v-for="layer in group.layers" :key="layer.id" class="layer-item">
            <div class="layer-main">
              <el-switch v-model="layer.visible" @change="toggleLayer(layer)" />
              <div class="layer-info">
                <span class="layer-name">{{ layer.name }}</span>
                <span class="layer-desc">{{ getLayerDesc(layer) }}</span>
              </div>
            </div>
            <div class="layer-slider">
              <el-slider
                v-model="layer.opacity"
                :min="0"
                :max="1"
                :step="0.1"
                :format-tooltip="(val) => `${Math.round(val * 100)}%`"
                @change="updateOpacity(layer)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <el-button size="small" @click="resetLayers">重置图层</el-button>
      <el-button size="small" type="primary" @click="showAll">全部显示</el-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { FolderOpened } from '@element-plus/icons-vue';
import { layers, Layer } from '../../utils/newMockData';

const localLayers = ref<Layer[]>([...layers]);

const groupedLayers = computed(() => {
  const groups: Record<string, { title: string; type: string; layers: Layer[] }> = {
    optical: { title: '光学影像', type: 'optical', layers: [] },
    sar: { title: 'SAR数据', type: 'sar', layers: [] },
    base: { title: '基础数据', type: 'dem', layers: [] },
    history: { title: '历史灾害', type: 'disaster', layers: [] },
    infra: { title: '基础设施', type: 'infrastructure', layers: [] },
    result: { title: '识别结果', type: 'result', layers: [] }
  };

  localLayers.value.forEach(layer => {
    if (layer.type === 'optical') groups.optical.layers.push(layer);
    else if (layer.type === 'sar') groups.sar.layers.push(layer);
    else if (layer.type === 'dem' || layer.type === 'weather') groups.base.layers.push(layer);
    else if (layer.type === 'disaster') groups.history.layers.push(layer);
    else if (layer.type === 'infrastructure') groups.infra.layers.push(layer);
    else if (layer.type === 'result') groups.result.layers.push(layer);
  });

  return Object.values(groups).filter(g => g.layers.length > 0);
});

const getLayerDesc = (layer: Layer) => {
  const descs: Record<string, string> = {
    optical: '影像数据',
    sar: '微波数据',
    dem: '高程数据',
    weather: '气象数据',
    disaster: '历史记录',
    infrastructure: '地理要素',
    result: 'AI识别结果'
  };
  return descs[layer.type] || '';
};

const toggleLayer = (layer: Layer) => {
  ElMessage.success(`${layer.visible ? '已显示' : '已隐藏'}：${layer.name}`);
};

const updateOpacity = (layer: Layer) => {
  console.log('更新透明度:', layer.name, layer.opacity);
};

const resetLayers = () => {
  localLayers.value.forEach(layer => {
    layer.visible = ['optical', 'house', 'road', 'forest_house'].includes(layer.id);
    layer.opacity = layer.id === 'optical' ? 0.8 : 1;
  });
  ElMessage.info('图层已重置');
};

const showAll = () => {
  localLayers.value.forEach(layer => {
    layer.visible = true;
  });
  ElMessage.success('已显示全部图层');
};
</script>

<style lang="scss" scoped>
.new-left-panel {
  position: absolute;
  top: 85px;
  left: 16px;
  bottom: 90px;
  width: 280px;
  background: rgba(8, 20, 45, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 180, 255, 0.25);
  border-radius: 12px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 180, 255, 0.15);
  background: linear-gradient(180deg, rgba(0, 180, 255, 0.08), transparent);
}

.header-icon {
  width: 36px;
  height: 36px;
  background: rgba(0, 180, 255, 0.15);
  border: 1px solid rgba(0, 180, 255, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00e5ff;
}

.header-text {
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 2px 0;
  }

  .desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.layer-groups {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer-group {
  .group-title {
    margin-bottom: 10px;
    padding-left: 8px;
    border-left: 3px solid #00a0ff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-text {
      font-size: 13px;
      font-weight: 600;
      color: #00e5ff;
    }
  }

  .group-layers {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.layer-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 10px 12px;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 150, 255, 0.06);
    border-color: rgba(0, 150, 255, 0.2);
  }

  .layer-main {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;

    .layer-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .layer-name {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.9);
      }

      .layer-desc {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 2px;
      }
    }
  }

  .layer-slider {
    padding: 0 8px;
  }
}

.panel-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 180, 255, 0.15);
  display: flex;
  gap: 8px;

  .el-button {
    flex: 1;
  }
}
</style>
