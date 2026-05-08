<template>
  <div class="home-container">
    <!-- 三维地球背景 -->
    <CesiumMap ref="mapRef" />

    <!-- 顶部标题栏 -->
    <Header />

    <!-- 左侧菜单 -->
    <Sidebar @menu-click="handleMenuClick" />

    <!-- 右侧面板 -->
    <RightPanel :scene-type="currentScene" :selected-house="selectedHouse" />

    <!-- 底部时间轴 -->
    <BottomBar />

    <!-- 场景切换工具 (悬浮在地图上) -->
    <div class="scene-switcher">
      <el-radio-group v-model="currentScene" size="large">
        <el-radio-button label="fire">森林火灾</el-radio-button>
        <el-radio-button label="rain">暴雨泥石流</el-radio-button>
        <el-radio-button label="earthquake">地震滑坡</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import CesiumMap from '../components/map/CesiumMap.vue'
import Header from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import RightPanel from '../components/layout/RightPanel.vue'
import BottomBar from '../components/layout/BottomBar.vue'

const currentScene = ref('fire') // fire, rain, earthquake
const selectedHouse = ref(null)
const mapRef = ref(null)

const layerState = ref({
  optical: true,
  sar: false,
  houses: true,
  heatmap: false
})

// 提供状态给子组件
provide('currentScene', currentScene)
provide('layerState', layerState)

const handleMenuClick = (menuKey: string) => {
  console.log('Menu clicked:', menuKey)
  // 这里可以根据菜单点击切换不同的分析模式
}

// 监听房屋点击 (由 CesiumMap 组件触发)
const onHouseSelected = (houseData: any) => {
  selectedHouse.value = houseData
}

provide('onHouseSelected', onHouseSelected)
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scene-switcher {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: rgba(0, 20, 50, 0.4);
  padding: 5px;
  border-radius: 4px;
  border: 1px solid rgba(0, 74, 141, 0.3);
}

:deep(.el-radio-button__inner) {
  background: transparent !important;
  color: #fff !important;
  border: 1px solid transparent !important;
  transition: all 0.3s;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #00a2ff !important;
  color: #fff !important;
  box-shadow: none !important;
  border-radius: 4px !important;
}

:deep(.el-radio-button:first-child .el-radio-button__inner),
:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 4px !important;
}
</style>
