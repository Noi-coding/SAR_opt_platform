<template>
  <div class="house-archive-panel">
    <div class="panel-section">
      <div class="section-title">
        <el-icon><House /></el-icon>
        <span>林下/林缘承灾目标识别</span>
        <span class="section-desc">解决「看不见」的问题</span>
      </div>

      <el-table :data="houseList" size="small" style="width: 100%" @row-click="selectHouse">
        <el-table-column prop="houseNo" label="编号" width="80" />
        <el-table-column prop="area" label="位置" show-overflow-tooltip width="120" />
        <el-table-column prop="source" label="来源" width="80" />
        <el-table-column prop="riskLevel" label="风险" width="70">
          <template #default="scope">
            <span class="risk-tag" :class="`risk-${scope.row.riskLevel}`">
              {{ scope.row.riskLevel === 'high' ? '高' : (scope.row.riskLevel === 'medium' ? '中' : '低') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="核验" width="60">
          <template #default="scope">
            <span :style="{ color: scope.row.verified ? '#00ff88' : '#ffcc00' }">
              {{ scope.row.verified ? '已核验' : '待核验' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="selectedHouse" class="detail-panel">
      <el-divider content-position="left">一房一档详情</el-divider>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">经纬度</span>
          <span class="value">{{ selectedHouse.lng }}, {{ selectedHouse.lat }}</span>
        </div>
        <div class="detail-item">
          <span class="label">识别来源</span>
          <span class="value">{{ selectedHouse.source }}</span>
        </div>
        <div class="detail-item">
          <span class="label">置信度</span>
          <span class="value">{{ (selectedHouse.confidence * 100).toFixed(0) }}%</span>
        </div>
        <div class="detail-item">
          <span class="label">坡度</span>
          <span class="value">{{ selectedHouse.slope }}°</span>
        </div>
        <div class="detail-item">
          <span class="label">高程</span>
          <span class="value">{{ selectedHouse.elevation }}m</span>
        </div>
        <div class="detail-item">
          <span class="label">距沟谷距离</span>
          <span class="value">{{ selectedHouse.distanceToGully }}m</span>
        </div>
        <div class="detail-item">
          <span class="label">距道路距离</span>
          <span class="value">{{ selectedHouse.distanceToRoad }}m</span>
        </div>
        <div class="detail-item">
          <span class="label">距历史灾害点</span>
          <span class="value">{{ selectedHouse.distanceToHistory }}m</span>
        </div>
      </div>

      <div class="suggestion-box">
        <div class="suggestion-title">处置建议</div>
        <div class="suggestion-text">{{ selectedHouse.suggestion }}</div>
      </div>
    </div>

    <div class="panel-section">
      <el-button type="primary" size="default" style="width: 100%">
        <el-icon><Refresh /></el-icon>
        重新识别
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { House, Refresh } from '@element-plus/icons-vue';
import { houseRiskRecords, HouseRiskRecord } from '../../utils/newMockData';

const houseList = ref<HouseRiskRecord[]>(houseRiskRecords);
const selectedHouse = ref<HouseRiskRecord | null>(null);

const selectHouse = (row: HouseRiskRecord) => {
  selectedHouse.value = row;
  ElMessage.success(`已选中房屋：${row.houseNo}`);
};
</script>

<style lang="scss" scoped>
.house-archive-panel {
  .panel-section {
    margin-bottom: 16px;

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #00e5ff;
      flex-wrap: wrap;

      .section-desc {
        font-size: 12px;
        color: #ff8800;
        background: rgba(255, 136, 0, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        border: 1px solid rgba(255, 136, 0, 0.3);
        margin-left: 8px;
      }
    }
  }

  .detail-panel {
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 12px;

      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 6px 8px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 6px;
        font-size: 12px;

        .label {
          color: rgba(255, 255, 255, 0.5);
        }

        .value {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
      }
    }

    .suggestion-box {
      padding: 12px;
      background: linear-gradient(135deg, rgba(0, 200, 255, 0.08), rgba(0, 150, 255, 0.04));
      border: 1px solid rgba(0, 200, 255, 0.2);
      border-radius: 8px;

      .suggestion-title {
        font-size: 12px;
        font-weight: 600;
        color: #00e5ff;
        margin-bottom: 6px;
      }

      .suggestion-text {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.5;
      }
    }
  }
}

.risk-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.risk-high {
  background: rgba(255, 68, 68, 0.2);
  color: #ff6666;
  border: 1px solid rgba(255, 68, 68, 0.3);
}

.risk-medium {
  background: rgba(255, 136, 0, 0.2);
  color: #ffaa44;
  border: 1px solid rgba(255, 136, 0, 0.3);
}

.risk-low {
  background: rgba(0, 255, 136, 0.2);
  color: #66ff99;
  border: 1px solid rgba(0, 255, 136, 0.3);
}
</style>
