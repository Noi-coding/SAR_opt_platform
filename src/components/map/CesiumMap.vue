<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, watch, ref } from 'vue'

declare const Cesium: any

let viewer: any = null
const onHouseSelected = inject('onHouseSelected') as (data: any) => void
const currentScene = inject('currentScene') as any
const layerState = inject('layerState') as any

let housesDataSource: any = null
let disasterDataSource: any = null
let sarLayer: any = null
let opticalLayer: any = null

onMounted(() => {
  initCesium()
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
  }
})

const initCesium = async () => {
  // 初始化 Cesium Viewer
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
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

  // 设置底图
  const layers = viewer.imageryLayers
  opticalLayer = layers.get(0)
  
  // 添加一个模拟的 SAR 图层 (使用深蓝色的单色图层或不同的影像源)
  sarLayer = layers.addImageryProvider(new Cesium.GridImageryProvider({
    color: Cesium.Color.fromCssColorString('rgba(0, 162, 255, 0.2)')
  }))
  sarLayer.show = false

  // 默认定位到西南山区
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(102.30, 27.85, 15000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  })

  // 加载模拟房屋数据
  loadHouses()
  // 加载灾害范围图层
  loadDisasterLayers()

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
        showEntityPopup(entity, properties)
      }
    } else {
      onHouseSelected(null)
      viewer.entities.removeById('popup')
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

const loadHouses = async () => {
  try {
    const response = await fetch('/mock/house.geojson')
    const data = await response.json()
    
    housesDataSource = await Cesium.GeoJsonDataSource.load(data, {
      markerColor: Cesium.Color.fromCssColorString('#00a2ff'),
      markerSize: 32,
      clampToGround: true // 确保贴地
    })

    viewer.dataSources.add(housesDataSource)
    const entities = housesDataSource.entities.values
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      const isUnderForest = entity.properties.isUnderForest.getValue()
      
      // 林下房屋使用不同的图标和发光效果
      if (isUnderForest) {
        entity.billboard.image = 'https://img.icons8.com/fluent/48/000000/tree-structure.png'
        entity.billboard.scale = 0.8
        entity.billboard.color = Cesium.Color.YELLOW
        entity.label = {
          text: '林下隐匿',
          font: '10px sans-serif',
          fillColor: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000)
        }
      }
    }
  } catch (error) {
    console.error('Error loading houses:', error)
  }
}

const loadDisasterLayers = async () => {
  try {
    const response = await fetch('/mock/disaster_layers.json')
    const data = await response.json()
    
    disasterDataSource = await Cesium.GeoJsonDataSource.load(data)
    viewer.dataSources.add(disasterDataSource)
    
    const entities = disasterDataSource.entities.values
    entities.forEach((entity: any) => {
      const type = entity.properties.type.getValue()
      if (type === 'fire') {
        entity.polygon.material = Cesium.Color.RED.withAlpha(0.4)
        entity.polygon.outlineColor = Cesium.Color.RED
      } else if (type === 'rain') {
        entity.polygon.material = Cesium.Color.BLUE.withAlpha(0.4)
        entity.polygon.outlineColor = Cesium.Color.BLUE
      } else if (type === 'earthquake') {
        entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.4)
        entity.polygon.outlineColor = Cesium.Color.ORANGE
      }
      // 默认隐藏，根据场景显示
      entity.show = false
    })
    
    updateDisasterVisibility()
  } catch (error) {
    console.error('Error loading disaster layers:', error)
  }
}

const updateDisasterVisibility = () => {
  if (!disasterDataSource) return
  const entities = disasterDataSource.entities.values
  entities.forEach((entity: any) => {
    entity.show = entity.properties.type.getValue() === currentScene.value
  })
}

const showEntityPopup = (entity: any, props: any) => {
  viewer.entities.removeById('popup')
  viewer.entities.add({
    id: 'popup',
    position: entity.position.getValue(viewer.clock.currentTime),
    label: {
      text: `【${props.isUnderForest ? '林下房屋' : '普通房屋'}】\n编号: ${props.id}\n风险: ${props.riskLevel}\n面积: ${props.area}㎡\n形变: ${props.historyDeformation}`,
      font: '14px sans-serif',
      backgroundColor: Cesium.Color.fromCssColorString('rgba(0, 20, 50, 0.9)'),
      showBackground: true,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -50),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
}

// 监听图层状态变化
watch(layerState, (state) => {
  if (opticalLayer) opticalLayer.show = state.optical
  if (sarLayer) sarLayer.show = state.sar
  if (housesDataSource) housesDataSource.show = state.houses
  // heatmap 模拟
  if (disasterDataSource) {
     const entities = disasterDataSource.entities.values
     entities.forEach((e: any) => {
       if (e.properties.type.getValue() === currentScene.value) {
         e.show = state.heatmap || true // 暂时默认显示当前场景图层
       }
     })
  }
}, { deep: true })

// 监听场景变化
watch(() => currentScene.value, (newScene) => {
  updateDisasterVisibility()
  if (newScene === 'fire') {
    viewer.scene.fog.enabled = true
    viewer.scene.fog.density = 0.001
  } else if (newScene === 'rain') {
    viewer.scene.fog.enabled = true
    viewer.scene.fog.density = 0.003
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
