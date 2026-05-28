<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { ElMessage } from 'element-plus';

declare const Cesium: any;

let viewer: any = null;

const props = defineProps<{
  activePhase?: any;
  activeLayer?: any;
}>();

onMounted(() => {
  initCesium();
  addMockEntities();
});

onUnmounted(() => {
  if (viewer) {
    viewer.destroy();
  }
});

const initCesium = () => {
  try {
    viewer = new Cesium.Viewer('cesiumContainer', {
      baseLayer: false,
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false
    });

    viewer.scene.globe.show = true;
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0B3D91');
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.globe.enableLighting = true;

    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(104.0, 35.0, 20000000)
    });
    
    ElMessage.success('三维地球加载完成');
  } catch (e) {
    console.error('Cesium初始化失败:', e);
    ElMessage.error('地图初始化失败，请刷新页面');
  }
};

const addMockEntities = () => {
  // 添加模拟标记点
  const points = [
    { lng: 103.0, lat: 30.0, color: '#ff3333', label: '隐患点 1' },
    { lng: 103.5, lat: 29.8, color: '#ff8800', label: '隐患点 2' },
    { lng: 104.0, lat: 30.2, color: '#00ff88', label: '隐患点 3' }
  ];
  
  points.forEach((p, i) => {
    viewer.entities.add({
      id: `mock-point-${i}`,
      position: Cesium.Cartesian3.fromDegrees(p.lng, p.lat),
      point: {
        pixelSize: 12,
        color: Cesium.Color.fromCssColorString(p.color),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      label: {
        text: p.label,
        font: '14px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  });
  
  // 添加模拟多边形 - 灾区范围
  viewer.entities.add({
    id: 'fire-area',
    name: '灾区范围',
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        102.8, 29.8, 103.2, 29.8, 103.2, 30.2, 102.8, 30.2
      ]),
      material: Cesium.Color.RED.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 3
    }
  });
  
  // 添加第二个多边形
  viewer.entities.add({
    id: 'danger-area',
    name: '危险区域',
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        103.3, 29.6, 103.8, 29.6, 103.8, 30.1, 103.3, 30.1
      ]),
      material: Cesium.Color.ORANGE.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.ORANGE,
      outlineWidth: 3
    }
  });
};

// 监听时间轴变化
watch(() => props.activePhase, (newPhase) => {
  console.log('时间轴变化:', newPhase);
}, { deep: true });

// 监听图层变化
watch(() => props.activeLayer, (newLayer) => {
  console.log('图层变化:', newLayer);
}, { deep: true });
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #07111F;
}
</style>
