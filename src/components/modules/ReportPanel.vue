<template>
  <div class="report-panel">
    <div class="panel-header">
      <el-icon class="header-icon"><Document /></el-icon>
      <h3>报告预览</h3>
    </div>

    <!-- 配准精度指标 -->
    <div class="report-card">
      <h4>
        <el-icon><Monitor /></el-icon>
        配准精度指标
      </h4>
      <p v-for="item in registrationMetrics" :key="item.label">
        • {{ item.label }}: {{ item.value }}
      </p>
    </div>

    <!-- 灾前风险房屋清单 -->
    <div class="report-card">
      <h4>
        <el-icon><House /></el-icon>
        灾前风险房屋清单
      </h4>
      <p>• 已识别房屋：{{ houseStats.total }} 处</p>
      <p>• 高风险房屋：{{ houseStats.highRisk }} 处</p>
      <p>• 待人工核验：{{ houseStats.pending }} 处</p>
    </div>

    <!-- 灾中新增灾害点 -->
    <div class="report-card">
      <h4>
        <el-icon><Warning /></el-icon>
        灾中新增灾害点
      </h4>
      <p>• 新增滑坡：{{ disasterStats.landslide }} 处</p>
      <p>• 泥石流堆积区：{{ disasterStats.debrisFlow }} 处</p>
      <p>• 道路阻断点：{{ disasterStats.blockedRoad }} 处</p>
    </div>

    <!-- 灾后统计与预测 -->
    <div class="report-card">
      <h4>
        <el-icon><DataLine /></el-icon>
        灾后统计与预测
      </h4>
      <p>• 受灾面积：{{ postDisasterStats.area }}</p>
      <p>• 次生风险点：{{ postDisasterStats.secondaryRisk }} 处</p>
      <p>• 恢复优先级：{{ postDisasterStats.priority }}</p>
    </div>

    <!-- 导出操作区 -->
    <div class="report-actions">
      <el-button 
        type="primary" 
        :loading="exporting === 'pdf'" 
        :disabled="exporting !== null"
        @click="exportReport('pdf')"
      >
        <el-icon><Document /></el-icon>
        导出 PDF
      </el-button>
      <el-button 
        :loading="exporting === 'excel'" 
        :disabled="exporting !== null"
        @click="exportReport('excel')"
      >
        <el-icon><Tickets /></el-icon>
        导出 Excel
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, Tickets, Monitor, House, Warning, DataLine } from '@element-plus/icons-vue'

// 导出状态控制
const exporting = ref<string | null>(null)

// 配准精度指标数据
const registrationMetrics = [
  { label: 'RMSE', value: '0.65' },
  { label: '控制点残差', value: '0.38' },
  { label: '边界叠加误差', value: '0.72' },
  { label: '目标精度', value: '0.5—1 像素' }
]

// 房屋统计信息
const houseStats = {
  total: 126,
  highRisk: 18,
  pending: 34
}

// 灾害点统计
const disasterStats = {
  landslide: 9,
  debrisFlow: 4,
  blockedRoad: 3
}

// 灾后统计信息
const postDisasterStats = {
  area: '2.36 km²',
  secondaryRisk: 7,
  priority: '重点处置 5 处'
}

// 导出报告（模拟）
const exportReport = async (format: string) => {
  if (exporting.value) return
  
  exporting.value = format
  ElMessage.info(`正在生成${format.toUpperCase()}报告...`)
  
  // 模拟导出延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // 模拟导出数据内容
  const reportData = {
    format,
    registrationMetrics,
    houseStats,
    disasterStats,
    postDisasterStats,
    exportTime: new Date().toLocaleString()
  }
  
  console.log(`导出${format.toUpperCase()}报告数据:`, reportData)
  
  exporting.value = null
  ElMessage.success(`${format.toUpperCase()}报告导出成功！`)
}
</script>

<style lang="scss" scoped>
.report-panel {
  padding: 16px;
  color: #eaf6ff;
  
  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(77, 208, 255, 0.3);
    
    .header-icon {
      font-size: 20px;
      color: #00e5ff;
    }
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #00e5ff;
    }
  }
  
  .report-card {
    margin-bottom: 14px;
    padding: 14px;
    border: 1px solid rgba(77, 208, 255, 0.28);
    border-radius: 12px;
    background: rgba(8, 28, 58, 0.72);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
    
    &:hover {
      border-color: rgba(77, 208, 255, 0.5);
      background: rgba(8, 28, 58, 0.82);
      box-shadow: 0 2px 8px rgba(0, 229, 255, 0.1);
    }
    
    h4 {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 10px 0;
      font-size: 14px;
      font-weight: 600;
      color: #6ee7ff;
      
      .el-icon {
        font-size: 16px;
      }
    }
    
    p {
      margin: 6px 0;
      font-size: 13px;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.75);
    }
  }
  
  .report-actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    
    .el-button {
      flex: 1;
      gap: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
      
      &:first-child {
        background: linear-gradient(135deg, #00b4d8, #0077b6);
        border: none;
        
        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #00c8e8, #0088c8);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
        }
      }
      
      &:last-child {
        background: linear-gradient(135deg, #6c63ff, #3f3d9e);
        border: none;
        
        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c73ff, #4f4dae);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
        }
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}
</style>