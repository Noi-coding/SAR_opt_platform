<template>
  <div class="platform-right-panel">
    <!-- 房屋信息面板 (选中时显示) -->
    <el-card v-if="selectedHouse" class="info-card house-info">
      <template #header>
        <div class="card-header">
          <span>房屋详细信息</span>
          <el-tag :type="getRiskTagType(selectedHouse.riskLevel)">{{ selectedHouse.riskLevel }}</el-tag>
        </div>
      </template>
      <div class="info-item">
        <span class="label">房屋编号:</span>
        <span class="value">{{ selectedHouse.id }}</span>
      </div>
      <div class="info-item">
        <span class="label">地理位置:</span>
        <span class="value">{{ selectedHouse.location }}</span>
      </div>
      <div class="info-item">
        <span class="label">建筑面积:</span>
        <span class="value">{{ selectedHouse.area }} m²</span>
      </div>
      <div class="info-item">
        <span class="label">林下遮蔽:</span>
        <span class="value">{{ selectedHouse.isUnderForest ? '是' : '否' }}</span>
      </div>
      <div class="info-item">
        <span class="label">损毁等级:</span>
        <span class="value">{{ selectedHouse.damageLevel }}</span>
      </div>
      <div class="health-archive">
        <div class="archive-title">风险健康档案</div>
        <div class="archive-content">
          <p>基于 D-InSAR 形变监测与地质敏感性评估，该房屋处于 {{ selectedHouse.riskLevel }} 区域。建议重点监测。</p>
        </div>
      </div>
    </el-card>

    <!-- 灾情简报面板 -->
    <el-card class="info-card disaster-brief">
      <template #header>
        <div class="card-header">
          <span>灾情简报 ({{ sceneTitle }})</span>
        </div>
      </template>
      <div class="stats-grid">
        <div class="stats-item">
          <div class="stats-value">{{ stats.affectedHouses }}</div>
          <div class="stats-label">受灾房屋</div>
        </div>
        <div class="stats-item">
          <div class="stats-value highlight">{{ stats.forestHouses }}</div>
          <div class="stats-label">林下重点房屋</div>
        </div>
        <div class="stats-item">
          <div class="stats-value danger">{{ stats.highRiskCount }}</div>
          <div class="stats-label">高风险点</div>
        </div>
      </div>
      <div class="ai-insight">
        <div class="insight-title"><el-icon><Cpu /></el-icon> AI 智能研判</div>
        <div class="insight-text">{{ aiInsightText }}</div>
      </div>
    </el-card>

    <!-- 图层控制面板 -->
    <el-card class="info-card layer-control">
      <template #header>
        <div class="card-header">
          <span>图层控制</span>
        </div>
      </template>
      <div class="layer-item">
        <span>光学影像 (Optical)</span>
        <el-switch v-model="layerState.optical" @change="toggleLayer('optical')" />
      </div>
      <div class="layer-item">
        <span>SAR 增强视图</span>
        <el-switch v-model="layerState.sar" @change="toggleLayer('sar')" />
      </div>
      <div class="layer-item">
        <span>房屋普查图层</span>
        <el-switch v-model="layerState.houses" @change="toggleLayer('houses')" />
      </div>
      <div class="layer-item">
        <span>风险热力图</span>
        <el-switch v-model="layerState.heatmap" @change="toggleLayer('heatmap')" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue'

const props = defineProps({
  sceneType: {
    type: String,
    default: 'fire'
  },
  selectedHouse: {
    type: Object,
    default: null
  }
})

const layerState = ref({
  optical: true,
  sar: false,
  houses: true,
  heatmap: false
})

const sceneTitle = computed(() => {
  const titles: Record<string, string> = {
    fire: '森林火灾',
    rain: '暴雨泥石流',
    earthquake: '地震滑坡'
  }
  return titles[props.sceneType] || '全域监测'
})

const stats = computed(() => {
  if (props.sceneType === 'fire') {
    return { affectedHouses: 124, forestHouses: 86, highRiskCount: 12 }
  } else if (props.sceneType === 'rain') {
    return { affectedHouses: 256, forestHouses: 112, highRiskCount: 34 }
  } else {
    return { affectedHouses: 89, forestHouses: 45, highRiskCount: 56 }
  }
})

const aiInsightText = computed(() => {
  if (props.sceneType === 'fire') {
    return 'SAR 引擎已穿透烟雾，识别出火线正向西南方向蔓延，涉及 15 栋隐匿林下房屋。'
  } else if (props.sceneType === 'rain') {
    return '利用 SAR 反演林下 DEM 评估，预计未来 3 小时内低洼区淹没深度将达 1.5 米。'
  } else {
    return 'D-InSAR 捕捉到地表形变异常（累计 15mm），滑坡隐患点已精准锁定。'
  }
})

const getRiskTagType = (level: string) => {
  if (level === '极高') return 'danger'
  if (level === '高') return 'warning'
  return 'info'
}

const toggleLayer = (layer: string) => {
  console.log('Toggle layer:', layer)
  // 这里的逻辑可以通过事件发送给地图组件
}
</script>

<style lang="scss" scoped>
.platform-right-panel {
  position: absolute;
  top: 80px;
  right: 20px;
  bottom: 60px;
  width: 300px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  pointer-events: none; /* 让鼠标穿透空隙 */

  .info-card {
    pointer-events: auto; /* 面板本身响应鼠标 */
    background: rgba(0, 20, 50, 0.85);
    border: 1px solid #004a8d;
    
    :deep(.el-card__header) {
      padding: 10px 15px;
      border-bottom: 1px solid rgba(0, 74, 141, 0.5);
      font-weight: bold;
      color: #00d2ff;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;

  .label {
    color: rgba(255, 255, 255, 0.6);
  }
  .value {
    color: #fff;
  }
}

.health-archive {
  margin-top: 15px;
  padding: 10px;
  background: rgba(0, 162, 255, 0.1);
  border-radius: 4px;
  border-left: 3px solid #00a2ff;

  .archive-title {
    font-size: 14px;
    color: #00d2ff;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .archive-content {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;

  .stats-item {
    text-align: center;
    
    .stats-value {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      
      &.highlight { color: #00d2ff; }
      &.danger { color: #ff4d4f; }
    }
    
    .stats-label {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 4px;
    }
  }
}

.ai-insight {
  padding: 10px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px dashed rgba(0, 255, 136, 0.3);
  border-radius: 4px;

  .insight-title {
    font-size: 13px;
    color: #00ff88;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .insight-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
  }
}

.layer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
