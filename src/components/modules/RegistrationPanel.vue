<template>
  <div class="registration-panel">
    <div class="problem-banner">
      <div class="banner-icon">⚠️</div>
      <div class="banner-content">
        <div class="banner-title">对不齐的问题</div>
        <div class="banner-desc">光学与SAR影像存在几何配准偏差</div>
      </div>
    </div>

    <div class="reg-section">
      <div class="section-title">
        <el-icon><Link /></el-icon>
        <span>配准融合</span>
      </div>
      
      <div class="compare-area">
        <div class="compare-side before">
          <div class="side-label">配准前</div>
          <div class="side-content">
            <div class="line-display">
              <div class="line-item line-red">
                <div class="line-color red"></div>
                <span>光学边界</span>
              </div>
              <div class="line-item line-blue">
                <div class="line-color blue"></div>
                <span>SAR边界</span>
              </div>
            </div>
          </div>
        </div>
        <div class="compare-divider">→</div>
        <div class="compare-side after">
          <div class="side-label">配准后</div>
          <div class="side-content">
            <div class="line-display">
              <div class="line-item line-green">
                <div class="line-color green"></div>
                <span>对齐边界</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">0.65</div>
          <div class="metric-label">RMSE</div>
          <div class="metric-target">目标: ≤0.8</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">0.38</div>
          <div class="metric-label">控制点残差</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">0.72</div>
          <div class="metric-label">边界叠加误差</div>
        </div>
      </div>

      <div class="quality-badge">
        ✅ 对重点监测区实现亚像素级局部精配准
      </div>
    </div>

    <div class="workflow-section">
      <div class="section-title">
        <el-icon><Operation /></el-icon>
        <span>技术流程</span>
      </div>
      <div class="workflow-steps">
        <div class="step-item">
          <span class="step-num">1</span>
          <span class="step-name">几何预处理</span>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <span class="step-num">2</span>
          <span class="step-name">稳定特征提取</span>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <span class="step-num">3</span>
          <span class="step-name">跨模态深度匹配</span>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <span class="step-num">4</span>
          <span class="step-name">DEM地形约束</span>
        </div>
        <div class="step-arrow">→</div>
        <div class="step-item">
          <span class="step-num">5</span>
          <span class="step-name">亚像素精配准</span>
        </div>
      </div>
    </div>

    <el-button type="primary" size="default" style="width: 100%; margin-top: 16px;">
      <el-icon><VideoPlay /></el-icon>
      重新配准
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Link, Operation, VideoPlay } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.registration-panel {
  .problem-banner {
    display: flex;
    gap: 12px;
    padding: 14px;
    background: linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(255, 136, 0, 0.1));
    border: 1px solid rgba(255, 136, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 16px;

    .banner-icon {
      font-size: 28px;
    }

    .banner-content {
      .banner-title {
        font-size: 14px;
        font-weight: 600;
        color: #ffaa44;
        margin-bottom: 4px;
      }

      .banner-desc {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .reg-section {
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

    .compare-area {
      display: flex;
      align-items: stretch;
      gap: 12px;
      margin-bottom: 16px;

      .compare-side {
        flex: 1;
        background: rgba(0, 100, 200, 0.05);
        border: 1px solid rgba(0, 150, 255, 0.2);
        border-radius: 10px;
        padding: 12px;
        text-align: center;

        &.before {
          border-color: rgba(255, 68, 68, 0.3);
        }

        &.after {
          border-color: rgba(0, 255, 136, 0.3);
        }

        .side-label {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        &.before .side-label {
          color: #ff6666;
        }

        &.after .side-label {
          color: #00ff88;
        }

        .side-content {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .line-display {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .line-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);

            .line-color {
              width: 40px;
              height: 4px;
              border-radius: 2px;

              &.red {
                background: #ff4444;
              }

              &.blue {
                background: #00a0ff;
              }

              &.green {
                background: #00ff88;
              }
            }
          }
        }
      }

      .compare-divider {
        font-size: 24px;
        align-self: center;
        color: rgba(0, 200, 255, 0.5);
      }
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 12px;

      .metric-card {
        padding: 12px 8px;
        background: rgba(0, 150, 255, 0.08);
        border: 1px solid rgba(0, 150, 255, 0.2);
        border-radius: 8px;
        text-align: center;

        .metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #00e5ff;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 2px;
        }

        .metric-target {
          font-size: 10px;
          color: rgba(0, 255, 136, 0.8);
        }
      }
    }

    .quality-badge {
      text-align: center;
      padding: 10px;
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 8px;
      color: #00ff88;
      font-size: 12px;
    }
  }

  .workflow-section {
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

    .workflow-steps {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;

      .step-item {
        flex: 1;
        text-align: center;
        padding: 8px 4px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;

        .step-num {
          display: inline-block;
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .step-name {
          display: block;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.2;
        }
      }

      .step-arrow {
        color: rgba(0, 200, 255, 0.5);
        font-size: 14px;
      }
    }
  }
}
</style>
