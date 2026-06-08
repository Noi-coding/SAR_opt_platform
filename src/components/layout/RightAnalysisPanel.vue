<template>
  <aside class="right-panel">
    <!-- 如果没有选择功能，显示默认面板 -->
    <template v-if="!currentFunc">
      <el-card class="panel-card">
        <template #header>
          <div class="card-title">
            <el-icon><DataAnalysis /></el-icon>
            <span>平台概览</span>
          </div>
        </template>
        <div class="overview-stats">
          <div class="stat-item">
            <div class="stat-value cyan">86</div>
            <div class="stat-label">监测区域数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value blue">1,254</div>
            <div class="stat-label">建档房屋</div>
          </div>
          <div class="stat-item">
            <div class="stat-value orange">12</div>
            <div class="stat-label">高风险区</div>
          </div>
        </div>
        <div class="tip">
          <el-icon><InfoFilled /></el-icon>
          <span>请从左侧选择功能开始分析</span>
        </div>
      </el-card>
    </template>
    
    <!-- 动态面板 -->
    <template v-else>
      <!-- 状态指示器 -->
      <div class="status-bar" :class="analysisStatus">
        <span class="status-dot"></span>
        <span class="status-text">{{ statusText }}</span>
        <span class="status-progress" v-if="analysisStatus === 'analyzing'">{{ progress }}%</span>
      </div>
      
      <!-- 分析结果 -->
      <el-card class="panel-card">
        <template #header>
          <div class="card-title">
            <el-icon><TrendCharts /></el-icon>
            <span>{{ currentFunc?.name }}</span>
          </div>
        </template>
        
        <div class="result-section">
          <div class="result-row">
            <span class="label">影响区域:</span>
            <span class="value">四川省雅安市、凉山州</span>
          </div>
          <div class="result-row">
            <span class="label">风险等级:</span>
            <span class="risk-tag" :class="`risk-${currentResult?.riskLevel || 'high'}`">
              {{ currentResult?.riskLevelText || '高风险' }}
            </span>
          </div>
          <div class="result-row">
            <span class="label">置信度:</span>
            <span class="value cyan">{{ currentResult?.confidence || '92%' }}</span>
          </div>
          <div class="result-row">
            <span class="label">识别数量:</span>
            <span class="value orange">{{ currentResult?.count || '32处' }}</span>
          </div>
        </div>
        
        <div class="brief-section">
          <h4>简要结论</h4>
          <p>{{ currentResult?.brief || '通过SAR影像与光学影像联合解译，识别出多个潜在灾害隐患点，建议重点监测红色标记区域。' }}</p>
        </div>
        
        <div class="action-buttons">
          <el-button type="primary" size="default" @click="handleStart">
            <el-icon><VideoPlay /></el-icon>
            开始分析
          </el-button>
          <el-button size="default" @click="handleLocate">
            <el-icon><Location /></el-icon>
            定位区域
          </el-button>
          <el-button size="default" @click="handleExport">
            <el-icon><Download /></el-icon>
            生成专题图
          </el-button>
        </div>
        
        <div class="extra-actions">
          <el-button text type="primary" @click="handleMeeting">
            <el-icon><ChatDotRound /></el-icon>
            加入应急会商
          </el-button>
          <el-button text @click="handleClear">
            <el-icon><Delete /></el-icon>
            清除结果
          </el-button>
        </div>
      </el-card>
      
      <!-- 灾害点列表 -->
      <el-card class="panel-card list-card">
        <template #header>
          <div class="card-title">
            <el-icon><List /></el-icon>
            <span>识别结果列表</span>
          </div>
        </template>
        <div class="disaster-list">
          <div 
            v-for="point in mockDisasterPoints" 
            :key="point.id"
            class="list-item"
            @click="handlePointClick(point)"
          >
            <div class="item-header">
              <span class="item-id">{{ point.id }}</span>
              <span class="item-type">{{ getTypeText(point.type) }}</span>
              <span class="risk-tag" :class="`risk-${point.riskLevel}`">{{ RiskLevelConfig[point.riskLevel].text }}</span>
            </div>
            <div class="item-content">
              <el-icon><Location /></el-icon>
              <span>{{ point.location }}</span>
            </div>
            <div class="item-foot">
              <span>置信度: {{ (point.confidence * 100).toFixed(0) }}%</span>
              <span>{{ point.createTime }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { 
  DataAnalysis, TrendCharts, VideoPlay, Location, Download,
  ChatDotRound, Delete, List, InfoFilled
} from '@element-plus/icons-vue';
import { 
  mockDisasterPoints, 
  RiskLevelConfig, 
  mockApi 
} from '../../utils/mockData';

const props = defineProps<{
  currentFunc: any;
}>();

const analysisStatus = ref<'idle' | 'analyzing' | 'completed'>('idle');
const progress = ref(0);

const statusText = computed(() => {
  if (analysisStatus.value === 'idle') return '待执行';
  if (analysisStatus.value === 'analyzing') return 'AI正在分析...';
  return '分析完成';
});

const currentResult = ref<any>({
  riskLevel: 'high',
  riskLevelText: '高风险',
  confidence: '92%',
  count: '32处'
});

const handleStart = () => {
  analysisStatus.value = 'analyzing';
  progress.value = 0;
  
  const interval = setInterval(() => {
    progress.value += Math.floor(Math.random() * 15);
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(interval);
      analysisStatus.value = 'completed';
      ElMessage.success('分析完成！');
    }
  }, 200);
};

const handleLocate = () => {
  ElMessage.info('正在定位到分析区域...');
};

const handleExport = () => {
  ElMessage.success('专题图正在生成...');
};

const handleMeeting = () => {
  ElMessage.info('已加入应急会商会议室');
};

const handleClear = () => {
  analysisStatus.value = 'idle';
  progress.value = 0;
  ElMessage.info('结果已清除');
};

const handlePointClick = (point: any) => {
  ElMessage.info(`定位到: ${point.location}`);
};

const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    landslide: '滑坡',
    debris: '泥石流',
    fire: '林火',
    roadBlock: '道路断阻',
    houseDamage: '房屋损毁'
  };
  return map[type] || type;
};
</script>

<style lang="scss" scoped>
.right-panel {
  position: absolute;
  top: 80px;
  right: 16px;
  bottom: 96px;
  width: 340px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  pointer-events: none;
  
  .panel-card {
    pointer-events: auto;
  }
}

.status-bar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--risk-low);
  border-radius: 8px;
  color: var(--risk-low);
  font-size: 13px;
  
  &.analyzing {
    background: rgba(0, 213, 255, 0.1);
    border-color: var(--accent-cyan);
    color: var(--accent-cyan);
  }
  
  &.completed {
    background: rgba(0, 255, 136, 0.1);
    border-color: var(--risk-low);
    color: var(--risk-low);
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--risk-low);
  }
  
  .status-progress {
    margin-left: auto;
    font-weight: 700;
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
  
  .stat-item {
    text-align: center;
    padding: 12px 8px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      
      &.cyan { color: var(--accent-cyan); }
      &.blue { color: var(--accent-blue); }
      &.orange { color: var(--risk-high); }
    }
    
    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }
  }
}

.tip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  background: rgba(0, 213, 255, 0.08);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  
  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    
    .label { color: var(--text-muted); }
    .value { color: var(--text-primary); }
    .value.cyan { color: var(--accent-cyan); }
    .value.orange { color: var(--risk-high); }
  }
}

.brief-section {
  margin-bottom: 20px;
  
  h4 {
    font-size: 14px;
    color: var(--accent-cyan);
    margin-bottom: 8px;
  }
  
  p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.extra-actions {
  display: flex;
  justify-content: space-between;
}

.list-card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  
  .disaster-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .list-item {
      padding: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: rgba(0, 213, 255, 0.4);
        background: rgba(0, 213, 255, 0.05);
      }
      
      .item-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .item-id {
          color: var(--accent-cyan);
          font-weight: 600;
          font-size: 12px;
        }
        
        .item-type {
          font-size: 12px;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      }
      
      .item-content {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 6px;
      }
      
      .item-foot {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: var(--text-muted);
      }
    }
  }
}
</style>
