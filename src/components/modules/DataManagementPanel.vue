<template>
  <div class="data-management-panel">
    <div class="panel-section">
      <div class="section-title">
        <el-icon><Folder /></el-icon>
        <span>数据接入状态</span>
      </div>
      <el-table :data="dataList" size="small" style="width: 100%">
        <el-table-column prop="type" label="类型" width="90">
          <template #default="scope">
            <span class="type-tag">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip />
        <el-table-column prop="time" label="时间" width="95" />
        <el-table-column prop="resolution" label="分辨率" width="70" />
        <el-table-column prop="status" label="状态" width="70">
          <template #default="scope">
            <span class="status-badge" :class="scope.row.status === 'ready' ? 'ready' : 'processing'">
              {{ scope.row.status === 'ready' ? '就绪' : '处理中' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="panel-section">
      <div class="section-title">
        <el-icon><Refresh /></el-icon>
        <span>数据操作</span>
      </div>
      <div class="action-buttons">
        <el-button type="primary" size="default" style="width: 100%">
          <el-icon><Download /></el-icon>
          刷新数据
        </el-button>
        <div class="button-group">
          <el-button size="default">
            <el-icon><Upload /></el-icon>
            导入数据
          </el-button>
          <el-button size="default">
            <el-icon><Setting /></el-icon>
            数据源配置
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Folder, Refresh, Download, Upload, Setting } from '@element-plus/icons-vue';

const dataList = [
  { type: '光学', name: 'GF-2 影像-20260501', time: '2026-05-01', resolution: '0.8m', status: 'ready' },
  { type: 'SAR', name: 'Sentinel-1 影像-20260510', time: '2026-05-10', resolution: '10m', status: 'ready' },
  { type: 'DEM', name: '30m 高程数据', time: '2026-01-01', resolution: '30m', status: 'ready' },
  { type: '降雨', name: '气象站观测数据', time: '2026-05-10', resolution: '1h', status: 'ready' },
  { type: '历史', name: '历史灾害点数据库', time: '2025-12-31', resolution: '-', status: 'ready' },
  { type: '房屋', name: '房屋普查数据', time: '2026-04-01', resolution: '-', status: 'ready' },
  { type: '道路', name: '路网数据', time: '2026-01-01', resolution: '-', status: 'ready' }
];
</script>

<style lang="scss" scoped>
.data-management-panel {
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
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .button-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  }

  .type-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(0, 150, 255, 0.15);
    color: #00a0ff;
    font-size: 11px;
    border: 1px solid rgba(0, 150, 255, 0.3);
  }

  .status-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;

    &.ready {
      background: rgba(0, 255, 136, 0.15);
      color: #00ff88;
      border: 1px solid rgba(0, 255, 136, 0.3);
    }

    &.processing {
      background: rgba(255, 204, 0, 0.15);
      color: #ffcc00;
      border: 1px solid rgba(255, 204, 0, 0.3);
    }
  }
}
</style>
