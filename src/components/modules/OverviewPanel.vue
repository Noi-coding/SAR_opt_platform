<template>
  <div class="overview-panel">
    <div class="stats-grid">
      <div class="stat-card" v-for="(stat, index) in stats" :key="index">
        <div class="stat-icon" :style="{ background: stat.color }">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <el-divider content-position="left">趋势与分布</el-divider>

    <div class="charts-section">
      <div class="chart-card">
        <div class="chart-title">风险趋势</div>
        <div class="chart-placeholder">
          <div class="line-chart">
            <div v-for="i in 5" :key="i" class="chart-bar" :style="{ height: 40 + i * 20 + 'px', background: ['#00ff88', '#ffcc00', '#ff8800', '#ff4444', '#ff2222'][i-1] }"></div>
          </div>
          <div class="chart-labels">
            <span>第1天</span>
            <span>第2天</span>
            <span>第3天</span>
            <span>第4天</span>
            <span>第5天</span>
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-title">灾害类型占比</div>
        <div class="pie-chart">
          <div class="pie-segment segment1" style="width: 55%; background: #ff4444;"></div>
          <div class="pie-segment segment2" style="width: 35%; background: #ff8800;"></div>
          <div class="pie-segment segment3" style="width: 10%; background: #ffcc00;"></div>
        </div>
        <div class="pie-legend">
          <div class="legend-item">
            <span class="legend-color" style="background: #ff4444;"></span>
            <span>滑坡</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #ff8800;"></span>
            <span>泥石流</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #ffcc00;"></span>
            <span>其他</span>
          </div>
        </div>
      </div>
    </div>

    <el-divider content-position="left">处置优先级</el-divider>

    <el-table :data="priorityList" size="small" style="width: 100%">
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="level" label="风险等级">
        <template #default="scope">
          <span class="risk-tag" :class="scope.row.level === 'high' ? 'risk-high' : (scope.row.level === 'medium' ? 'risk-medium' : 'risk-low')">
            {{ scope.row.level === 'high' ? '高' : (scope.row.level === 'medium' ? '中' : '低') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" width="80" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { overviewStats } from '../../utils/newMockData';

const stats = [
  { icon: '🗺️', value: '1', label: '监测区域', color: 'linear-gradient(135deg, #00c6ff, #0072ff)' },
  { icon: '📁', value: '15', label: '数据图层', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: '🏠', value: overviewStats.forestHouses, label: '林下/林缘房屋', color: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { icon: '⚠️', value: overviewStats.highRiskHouses, label: '高风险房屋', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { icon: '🆕', value: overviewStats.newLandslides, label: '新增滑坡/泥石流', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: '🚧', value: overviewStats.roadBlocks, label: '道路阻断', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { icon: '📏', value: overviewStats.affectedArea + '㎡', label: '受灾面积', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { icon: '🔔', value: overviewStats.riskWarnings, label: '次生风险预警', color: 'linear-gradient(135deg, #d299c2, #fef9d7)' }
];

const priorityList = [
  { id: 'P001', name: '滑坡核心区', level: 'high', priority: 1 },
  { id: 'P002', name: '林缘房屋集中区', level: 'high', priority: 2 },
  { id: 'P003', name: '道路阻断点', level: 'medium', priority: 3 },
  { id: 'P004', name: '次生风险区', level: 'medium', priority: 4 },
  { id: 'P005', name: '下游居民点', level: 'low', priority: 5 }
];
</script>

<style lang="scss" scoped>
.overview-panel {
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 16px;

    .stat-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;

      .stat-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }

      .stat-content {
        flex: 1;

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 2px;
        }
      }
    }
  }

  .charts-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;

    .chart-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 12px;

      .chart-title {
        font-size: 13px;
        color: #00e5ff;
        margin-bottom: 12px;
        font-weight: 600;
      }

      .chart-placeholder {
        height: 120px;
        background: rgba(0, 100, 200, 0.05);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .line-chart {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 70px;
          margin-bottom: 8px;

          .chart-bar {
            width: 24px;
            border-radius: 4px 4px 0 0;
            opacity: 0.8;
          }
        }

        .chart-labels {
          display: flex;
          gap: 18px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .pie-chart {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        margin: 0 auto 12px auto;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
      }

      .pie-legend {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);

          .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 3px;
          }
        }
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
