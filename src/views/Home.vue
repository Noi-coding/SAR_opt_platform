<template>
  <div class="home-container">
    <!-- 三维地球 -->
    <CesiumMap 
      :activePhase="activePhase" 
      :activeLayer="activeLayer" 
    />
    
    <!-- 顶部导航 -->
    <HeaderBar />
    
    <!-- 左侧功能面板 -->
    <LeftFunctionPanel @selectFunc="onSelectFunc" />
    
    <!-- 右侧分析面板 -->
    <RightAnalysisPanel :currentFunc="currentFunc" />
    
    <!-- 地图工具栏 -->
    <MapToolBar @toggleLayer="onToggleLayer" @toggleRollup="onToggleRollup" />
    
    <!-- 底部时间轴 -->
    <TimelineControl @phaseChange="onPhaseChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderBar from '../components/layout/HeaderBar.vue';
import LeftFunctionPanel from '../components/layout/LeftFunctionPanel.vue';
import RightAnalysisPanel from '../components/layout/RightAnalysisPanel.vue';
import TimelineControl from '../components/layout/TimelineControl.vue';
import MapToolBar from '../components/map/MapToolBar.vue';
import CesiumMap from '../components/map/CesiumMap.vue';

const currentFunc = ref<any>(null);
const activePhase = ref<any>(null);
const activeLayer = ref<any>(null);

const onSelectFunc = (func: any) => {
  currentFunc.value = func;
};

const onPhaseChange = (phase: any) => {
  activePhase.value = phase;
};

const onToggleLayer = (layer: any) => {
  activeLayer.value = layer;
};

const onToggleRollup = (open: boolean) => {
  console.log('卷帘模式:', open);
};
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #07111F;
}
</style>
