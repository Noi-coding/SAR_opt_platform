<template>
  <div class="new-home-container">
    <CesiumMap />
    
    <NewHeader />
    
    <NewLeftPanel />
    
    <NewRightPanel />
    
    <MapToolBar />
    
    <NewTimelineControl />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import NewHeader from '../components/layout/NewHeader.vue';
import NewLeftPanel from '../components/layout/NewLeftPanel.vue';
import NewRightPanel from '../components/layout/NewRightPanel.vue';
import NewTimelineControl from '../components/layout/NewTimelineControl.vue';
import MapToolBar from '../components/map/MapToolBar.vue';
import CesiumMap from '../components/map/CesiumMap.vue';

const activeModule = ref('dashboard');
const currentPhase = ref('pre');

provide('activeModule', activeModule);
provide('currentPhase', currentPhase);
</script>

<style lang="scss" scoped>
.new-home-container {
  width: 100%;
  height: 100vh;
  background: #07111f;
  position: relative;
  overflow: hidden;
}
</style>
