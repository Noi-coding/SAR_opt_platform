<template>
  <div class="verification-panel">
    <div class="panel-section">
      <div class="section-title">
        <el-icon><CircleCheck /></el-icon>
        <span>人工核验任务列表</span>
      </div>

      <div class="verification-list">
        <div 
          v-for="(item, index) in localVerificationList" 
          :key="item.id"
          class="verification-item"
          :class="{ pending: item.status === 'pending' }"
        >
          <div class="item-header">
            <span class="item-type" :class="`type-${item.type}`">{{ getTypeText(item.type) }}</span>
            <span class="item-status" :class="item.status">
              {{ item.status === 'pending' ? '待核验' : (item.status === 'confirmed' ? '已确认' : '已驳回') }}
            </span>
          </div>
          <div class="item-name">{{ item.name }}</div>
          <div class="item-location">
            <el-icon><Location /></el-icon>
            {{ item.location }}
          </div>
          <div class="item-levels">
            <div class="level-pair">
              <span class="level-label">建议等级：</span>
              <span class="level-value" :class="`risk-${item.suggestedLevel}`">{{ getLevelText(item.suggestedLevel) }}</span>
            </div>
            <div v-if="item.status !== 'pending'" class="level-pair">
              <span class="level-label">当前等级：</span>
              <span class="level-value" :class="`risk-${item.currentLevel}`">{{ getLevelText(item.currentLevel) }}</span>
            </div>
          </div>
          
          <div v-if="item.status === 'pending'" class="item-actions">
            <el-button size="small" type="success" @click="confirmItem(index)">
              <el-icon><Check /></el-icon>
              确认
            </el-button>
            <el-button size="small" type="danger" @click="rejectItem(index)">
              <el-icon><Close /></el-icon>
              驳回
            </el-button>
          </div>
          
          <div v-if="item.remark" class="item-remark">
            <span class="remark-label">备注：</span>
            <span class="remark-text">{{ item.remark }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="stats-summary">
        <div class="stat-item">
          <div class="stat-value pending">{{ stats.pending }}</div>
          <div class="stat-label">待核验</div>
        </div>
        <div class="stat-item">
          <div class="stat-value confirmed">{{ stats.confirmed }}</div>
          <div class="stat-label">已确认</div>
        </div>
        <div class="stat-item">
          <div class="stat-value rejected">{{ stats.rejected }}</div>
          <div class="stat-label">已驳回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { CircleCheck, Location, Check, Close } from '@element-plus/icons-vue';

// 定义任务类型
interface VerificationTask {
  id: number;
  name: string;
  type: string;
  location: string;
  suggestedLevel: string;
  currentLevel?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  remark?: string;
  verifiedAt?: string;
  verifier?: string;
}

// 模拟数据（避免外部依赖缺失）
const defaultTasks: VerificationTask[] = [
  {
    id: 1,
    name: '滑坡隐患点A',
    type: 'landslide',
    location: '经度:103.2, 纬度:30.1',
    suggestedLevel: 'high',
    status: 'pending'
  },
  {
    id: 2,
    name: '泥石流堆积区B',
    type: 'debris',
    location: '经度:103.5, 纬度:29.9',
    suggestedLevel: 'medium',
    status: 'pending'
  },
  {
    id: 3,
    name: '林缘房屋C',
    type: 'house',
    location: '经度:104.0, 纬度:30.5',
    suggestedLevel: 'high',
    currentLevel: 'medium',
    status: 'confirmed',
    remark: '现场核实，风险中等'
  }
];

const localVerificationList = ref<VerificationTask[]>([...defaultTasks]);

const stats = computed(() => {
  return {
    pending: localVerificationList.value.filter(i => i.status === 'pending').length,
    confirmed: localVerificationList.value.filter(i => i.status === 'confirmed').length,
    rejected: localVerificationList.value.filter(i => i.status === 'rejected').length
  };
});

const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    house: '房屋',
    landslide: '滑坡',
    debris: '泥石流',
    road: '道路',
    risk: '风险'
  };
  return map[type] || type;
};

const getLevelText = (level: string) => {
  const map: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高'
  };
  return map[level] || level;
};

const confirmItem = async (index: number) => {
  try {
    const inputRemark = await ElMessageBox.prompt('请输入核验备注（可选）', '确认结果', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });
    
    localVerificationList.value[index].status = 'confirmed';
    if (inputRemark.value) {
      localVerificationList.value[index].remark = inputRemark.value;
    }
    localVerificationList.value[index].verifiedAt = new Date().toISOString().slice(0, 10);
    localVerificationList.value[index].verifier = '当前用户';
    
    ElMessage.success('已确认！');
  } catch {
    // 用户取消
  }
};

const rejectItem = async (index: number) => {
  try {
    const inputRemark = await ElMessageBox.prompt('请输入驳回原因', '驳回', {
      confirmButtonText: '驳回',
      cancelButtonText: '取消'
    });
    
    localVerificationList.value[index].status = 'rejected';
    localVerificationList.value[index].remark = inputRemark.value;
    localVerificationList.value[index].verifiedAt = new Date().toISOString().slice(0, 10);
    localVerificationList.value[index].verifier = '当前用户';
    
    ElMessage.success('已驳回！');
  } catch {
    // 用户取消
  }
};
</script>

<style lang="scss" scoped>
/* 保持原有样式不变 */
.verification-panel {
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

    .verification-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .verification-item {
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;

        &.pending {
          border-color: rgba(255, 204, 0, 0.3);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .item-type {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;

            &.type-house {
              background: rgba(0, 200, 255, 0.15);
              color: #00a0ff;
            }

            &.type-landslide {
              background: rgba(255, 68, 68, 0.15);
              color: #ff6666;
            }

            &.type-debris {
              background: rgba(255, 136, 0, 0.15);
              color: #ffaa44;
            }

            &.type-road {
              background: rgba(255, 204, 0, 0.15);
              color: #ffcc00;
            }

            &.type-risk {
              background: rgba(128, 100, 255, 0.15);
              color: #8064ff;
            }
          }

          .item-status {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;

            &.pending {
              background: rgba(255, 204, 0, 0.15);
              color: #ffcc00;
            }

            &.confirmed {
              background: rgba(0, 255, 136, 0.15);
              color: #00ff88;
            }

            &.rejected {
              background: rgba(255, 68, 68, 0.15);
              color: #ff6666;
            }
          }
        }

        .item-name {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .item-location {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .item-levels {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;

          .level-pair {
            font-size: 11px;

            .level-label {
              color: rgba(255, 255, 255, 0.5);
            }

            .level-value {
              padding: 1px 6px;
              border-radius: 3px;
              font-weight: 600;
            }
          }
        }

        .item-actions {
          display: flex;
          gap: 8px;
        }

        .item-remark {
          margin-top: 8px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          font-size: 11px;

          .remark-label {
            color: rgba(255, 255, 255, 0.5);
          }

          .remark-text {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }

    .stats-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;

      .stat-item {
        padding: 12px 10px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        text-align: center;

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;

          &.pending {
            color: #ffcc00;
          }

          &.confirmed {
            color: #00ff88;
          }

          &.rejected {
            color: #ff6666;
          }
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
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