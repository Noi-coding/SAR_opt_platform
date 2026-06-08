<template>
  <div class="change-detection-panel">
    <div class="panel-section">
      <div class="section-title">
        <el-icon><Lightning /></el-icon>
        <span>灾中快速变化识别</span>
        <span class="section-desc">解决「识不快」的问题</span>
      </div>

      <div class="compare-area">
        <div class="compare-card">
          <div class="card-label">灾前</div>
          <div class="card-content blue"></div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="compare-card">
          <div class="card-label">灾中</div>
          <div class="card-content red"></div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="section-title">
        <el-icon><TrendCharts /></el-icon>
        <span>识别任务信息</span>
      </div>
      <div class="task-info-grid">
        <div class="info-item">
          <span class="info-label">任务编号</span>
          <span class="info-value">TC-20260510</span>
        </div>
        <div class="info-item">
          <span class="info-label">数据时相</span>
          <span class="info-value">05-01 / 05-10</span>
        </div>
        <div class="info-item">
          <span class="info-label">识别模型</span>
          <span class="info-value">Siamese U-Net</span>
        </div>
        <div class="info-item">
          <span class="info-label">IoU</span>
          <span class="info-value good">78%</span>
        </div>
        <div class="info-item">
          <span class="info-label">F1 Score</span>
          <span class="info-value good">85%</span>
        </div>
        <div class="info-item">
          <span class="info-label">处理时长</span>
          <span class="info-value">45s</span>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="section-title">
        <el-icon><DataAnalysis /></el-icon>
        <span>识别结果统计</span>
      </div>
      <div class="result-stats">
        <div class="result-item">
          <div class="result-icon">🆕</div>
          <div class="result-content">
            <div class="result-value">3</div>
            <div class="result-label">新增滑坡</div>
          </div>
        </div>
        <div class="result-item">
          <div class="result-icon">🟡</div>
          <div class="result-content">
            <div class="result-value">1</div>
            <div class="result-label">泥石流堆积区</div>
          </div>
        </div>
        <div class="result-item">
          <div class="result-icon">🚧</div>
          <div class="result-content">
            <div class="result-value">2</div>
            <div class="result-label">道路阻断点</div>
          </div>
        </div>
        <div class="result-item">
          <div class="result-icon">🏠</div>
          <div class="result-content">
            <div class="result-value">8</div>
            <div class="result-label">受威胁房屋</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <el-button type="primary" size="default" style="width: 100%;" @click="runDetection">
        <el-icon><VideoPlay /></el-icon>
        运行变化识别
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Lightning, TrendCharts, DataAnalysis, VideoPlay } from '@element-plus/icons-vue';

const running = ref(false);

const runDetection = async () => {
  if (running.value) return;
  
  running.value = true;
  ElMessage.info('开始运行变化识别...');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  running.value = false;
  ElMessage.success('变化识别完成！');
};
</script>

<style lang="scss" scoped>
.change-detection-panel {
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

    .compare-area {
      display: flex;
      align-items: center;
      gap: 12px;

      .compare-card {
        flex: 1;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 10px;
        text-align: center;

        .card-label {
          font-size: 12px;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.6);
        }

        .card-content {
          height: 80px;
          border-radius: 8px;

          &.blue {
            background: linear-gradient(135deg, rgba(0, 150, 255, 0.3), rgba(0, 100, 200, 0.1));
          }

          &.red {
            background: linear-gradient(135deg, rgba(255, 68, 68, 0.3), rgba(200, 40, 40, 0.1));
          }
        }
      }

      .vs-divider {
        font-size: 16px;
        font-weight: 700;
        color: rgba(0, 200, 255, 0.5);
      }
    }

    .task-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 10px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 6px;
        font-size: 12px;

        .info-label {
          color: rgba(255, 255, 255, 0.5);
        }

        .info-value {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;

          &.good {
            color: #00ff88;
          }
        }
      }
    }

    .result-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;

      .result-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 10px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;

        .result-icon {
          font-size: 24px;
        }

        .result-content {
          .result-value {
            font-size: 20px;
            font-weight: 700;
            color: #00e5ff;
          }

          .result-label {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 2px;
          }
        }
      }
    }
  }
}
</style>
