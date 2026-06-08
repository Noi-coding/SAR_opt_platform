<template>
  <div class="post-disaster-panel">
    <div class="panel-section">
      <div class="section-title">
        <el-icon><TrendCharts /></el-icon>
        <span>灾后受灾统计</span>
        <span class="section-desc">解决「判不清」的问题</span>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">12560㎡</div>
          <div class="stat-label">滑坡面积</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">8920㎡</div>
          <div class="stat-label">泥石流堆积面积</div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">15</div>
          <div class="stat-label">受影响房屋</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">1.8km</div>
          <div class="stat-label">阻断道路长度</div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="section-title">
        <el-icon><Warning /></el-icon>
        <span>次生风险预测</span>
      </div>
      <div class="risk-card">
        <div class="risk-level" style="color: #ff4444;">高风险</div>
        <div class="risk-desc">监测区域存在较高的次生滑坡与泥石流风险</div>
      </div>
    </div>

    <div class="panel-section">
      <div class="section-title">
        <el-icon><List /></el-icon>
        <span>处置优先级</span>
      </div>
      <el-table :data="priorityList" size="small" style="width: 100%">
        <el-table-column prop="id" label="编号" width="60" />
        <el-table-column prop="name" label="名称" show-overflow-tooltip />
        <el-table-column prop="type" label="类型" width="70" />
        <el-table-column prop="priority" label="优先级" width="60" align="center">
          <template #default="scope">
            <span style="color: #ffcc00; font-weight: 700;">{{ scope.row.priority }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendCharts, Warning, List } from '@element-plus/icons-vue';

const priorityList = [
  { id: 'P001', name: '滑坡核心区', type: '滑坡', priority: 1 },
  { id: 'P002', name: '林缘房屋集中区', type: '房屋', priority: 2 },
  { id: 'P003', name: '道路阻断点', type: '道路', priority: 3 },
  { id: 'P004', name: '次生风险区', type: '风险', priority: 4 },
  { id: 'P005', name: '下游居民点', type: '居民点', priority: 5 }
];
</script>

<style lang="scss" scoped>
.post-disaster-panel {
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

    .stats-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;

      .stat-card {
        padding: 14px 12px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        text-align: center;

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #00e5ff;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }

    .risk-card {
      padding: 14px;
      background: linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(255, 136, 0, 0.05));
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 10px;

      .risk-level {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 6px;
      }

      .risk-desc {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.5;
      }
    }
  }
}
</style>
