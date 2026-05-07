<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, watch } from 'vue'
import housesData from '../../assets/mock/houses.json'

declare const Cesium: any

let viewer: any = null
const onHouseSelected = inject('onHouseSelected') as (data: any) => void
const currentScene = inject('currentScene') as any

onMounted(() => {
  initCesium()
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
  }
})

const initCesium = () => {
  // 初始化 Cesium Viewer
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    scene3DOnly: true,
  })

  // 默认定位到西南山区
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(102.26, 27.88, 5000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  })

  // 加载模拟房屋数据
  loadHouses()

  // 注册点击事件
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction((click: any) => {
    const pickedObject = viewer.scene.pick(click.position)
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      const entity = pickedObject.id
      if (entity.properties) {
        const properties: any = {}
        entity.properties.propertyNames.forEach((name: string) => {
          properties[name] = entity.properties[name].getValue()
        })
        onHouseSelected(properties)
        
        // 弹出 Cesium 原生气泡 (可选) 或通知 UI 面板
        showEntityPopup(entity, properties)
      }
    } else {
      onHouseSelected(null)
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

const loadHouses = () => {
  const dataSource = Cesium.GeoJsonDataSource.load(housesData, {
    markerColor: Cesium.Color.fromCssColorString('#00a2ff'),
    markerSize: 32
  })

  dataSource.then((ds: any) => {
    viewer.dataSources.add(ds)
    const entities = ds.entities.values
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      const isUnderForest = entity.properties.isUnderForest.getValue()
      
      // 林下房屋特殊标识
      if (isUnderForest) {
        entity.billboard.image = 'https://img.icons8.com/color/48/000000/marker.png' // 替换为本地或CDN图标
        entity.billboard.color = Cesium.Color.YELLOW
        entity.label = {
          text: '林下房屋',
          font: '12px sans-serif',
          fillColor: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20)
        }
      }
    }
  })
}

const showEntityPopup = (entity: any, props: any) => {
  // 简单的气泡效果，实际项目中可能用 HTML 叠加层
  viewer.entities.removeById('popup')
  viewer.entities.add({
    id: 'popup',
    position: entity.position.getValue(viewer.clock.currentTime),
    label: {
      text: `编号: ${props.id}\n风险: ${props.riskLevel}\n面积: ${props.area}㎡`,
      font: '14px sans-serif',
      backgroundColor: Cesium.Color.fromCssColorString('rgba(0, 20, 50, 0.8)'),
      showBackground: true,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -50),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
}

// 监听场景变化，切换底图或效果
watch(() => currentScene.value, (newScene) => {
  console.log('Map switching to scene:', newScene)
  if (newScene === 'fire') {
    // 模拟增加烟雾/火点效果
    viewer.scene.fog.enabled = true
    viewer.scene.fog.density = 0.001
  } else if (newScene === 'rain') {
    // 模拟雨雾
    viewer.scene.fog.enabled = true
    viewer.scene.fog.density = 0.005
  } else {
    viewer.scene.fog.enabled = false
  }
})
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
