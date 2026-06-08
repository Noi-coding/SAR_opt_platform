// 森安遥视平台统一模拟数据

export interface RiskLevel {
  text: string;
  color: string;
  class: string;
}

export const RiskLevelConfig: Record<string, RiskLevel> = {
  low: { text: '低风险', color: '#00ff88', class: 'risk-low' },
  medium: { text: '中风险', color: '#ffcc00', class: 'risk-medium' },
  high: { text: '高风险', color: '#ff8800', class: 'risk-high' },
  extreme: { text: '极高风险', color: '#ff3333', class: 'risk-extreme' }
};

export interface DisasterPoint {
  id: string;
  type: 'landslide' | 'debris' | 'fire' | 'roadBlock' | 'houseDamage';
  lng: number;
  lat: number;
  location: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  confidence: number;
  createTime: string;
  status: string;
}

export interface HouseArchive {
  id: string;
  address: string;
  district: string;
  area: number;
  riskLevel: string;
  isUnderForest: boolean;
  latestDeformation: number;
  historyDeformations: number[];
  hiddenDangerPoints: string[];
  lastCheckTime: string;
  responsiblePerson: string;
  evacuationRoute: string;
}

export interface ResourcePoint {
  id: string;
  type: 'hospital' | 'shelter' | 'warehouse' | 'rescueTeam';
  name: string;
  lng: number;
  lat: number;
  capacity?: number;
  distance?: number;
}

export interface TimelinePhase {
  id: string;
  label: string;
  color: string;
}

// 模拟灾害点数据
export const mockDisasterPoints: DisasterPoint[] = [
  { id: 'D001', type: 'landslide', lng: 103.5, lat: 29.3, location: '四川省雅安市雨城区', riskLevel: 'extreme', confidence: 0.96, createTime: '2026-05-25 08:23:00', status: '识别完成' },
  { id: 'D002', type: 'debris', lng: 104.2, lat: 30.1, location: '四川省绵阳市平武县', riskLevel: 'high', confidence: 0.91, createTime: '2026-05-24 14:45:00', status: '已处置' },
  { id: 'D003', type: 'fire', lng: 101.8, lat: 26.8, location: '云南省丽江市宁蒗县', riskLevel: 'medium', confidence: 0.88, createTime: '2026-05-26 10:12:00', status: '监测中' },
  { id: 'D004', type: 'roadBlock', lng: 105.6, lat: 31.2, location: '四川省广元市青川县', riskLevel: 'high', confidence: 0.93, createTime: '2026-05-26 06:30:00', status: '正在处置' },
  { id: 'D005', type: 'houseDamage', lng: 102.3, lat: 27.9, location: '四川省凉山州昭觉县', riskLevel: 'extreme', confidence: 0.98, createTime: '2026-05-25 22:15:00', status: '识别完成' }
];

// 模拟房屋档案数据
export const mockHouseArchives: HouseArchive[] = [
  {
    id: 'H0001',
    address: '四川省雅安市雨城区碧峰峡镇庙后村2组',
    district: '四川省-雅安市-雨城区',
    area: 125.5,
    riskLevel: 'extreme',
    isUnderForest: true,
    latestDeformation: 18.5,
    historyDeformations: [2.3, 3.1, 4.5, 6.2, 8.9, 12.1, 15.6, 18.5],
    hiddenDangerPoints: ['附近边坡不稳定', '房屋墙体有裂缝'],
    lastCheckTime: '2026-05-20',
    responsiblePerson: '张三',
    evacuationRoute: '向东300米至村委会广场'
  },
  {
    id: 'H0002',
    address: '四川省绵阳市平武县大桥镇',
    district: '四川省-绵阳市-平武县',
    area: 98.0,
    riskLevel: 'high',
    isUnderForest: false,
    latestDeformation: 8.2,
    historyDeformations: [1.2, 2.5, 3.8, 4.2, 5.6, 6.9, 7.5, 8.2],
    hiddenDangerPoints: ['临近河道'],
    lastCheckTime: '2026-05-22',
    responsiblePerson: '李四',
    evacuationRoute: '向北500米至中学操场'
  }
];

// 模拟应急资源数据
export const mockResources: ResourcePoint[] = [
  { id: 'R001', type: 'hospital', name: '雅安市人民医院', lng: 103.0, lat: 29.9, capacity: 1200 },
  { id: 'R002', type: 'shelter', name: '雨城区应急避难广场', lng: 103.1, lat: 30.0, capacity: 5000 },
  { id: 'R003', type: 'warehouse', name: '四川省救灾物资储备中心', lng: 104.0, lat: 30.6, capacity: 10000 },
  { id: 'R004', type: 'rescueTeam', name: '国家应急管理部地震灾害应急救援大队', lng: 103.8, lat: 30.5, capacity: 300 }
];

// 模拟时间轴数据
export const mockTimelinePhases: TimelinePhase[] = [
  { id: 'pre', label: '灾前', color: '#00d5ff' },
  { id: 'during', label: '灾中', color: '#ff8800' },
  { id: 'post', label: '灾后', color: '#00ff88' },
  { id: 'f1', label: '未来1个月', color: '#2f80ff' },
  { id: 'f3', label: '未来3个月', color: '#7c5cff' },
  { id: 'f6', label: '未来6个月', color: '#9933ff' }
];

// 模拟 InSAR 形变曲线数据
export const mockInSARData = {
  labels: ['2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05'],
  values: [3.2, 5.1, 8.5, 12.8, 16.3, 18.5],
  trend: 'accelerate'
};

// 模拟图层配置
export const mockLayers = {
  imagery: [
    { id: 'optical', name: '光学影像', checked: true, icon: 'Picture' },
    { id: 'sar', name: 'SAR影像', checked: false, icon: 'Monitor' },
    { id: 'coherence', name: '相干系数图', checked: false, icon: 'Connection' },
    { id: 'deformation', name: '形变速率图', checked: false, icon: 'TrendCharts' }
  ],
  disaster: [
    { id: 'landslide', name: '滑坡', checked: false, icon: 'Warning' },
    { id: 'debris', name: '泥石流', checked: false, icon: 'WindPower' },
    { id: 'fire', name: '林火', checked: false, icon: 'Fire' },
    { id: 'road', name: '道路断阻', checked: false, icon: 'Van' },
    { id: 'house', name: '房屋损毁', checked: false, icon: 'OfficeBuilding' }
  ],
  resource: [
    { id: 'hospital', name: '医院', checked: false, icon: 'FirstAidKit' },
    { id: 'shelter', name: '避难场所', checked: false, icon: 'HomeFilled' },
    { id: 'warehouse', name: '物资仓库', checked: false, icon: 'Box' },
    { id: 'rescue', name: '救援队伍', checked: false, icon: 'User' }
  ],
  base: [
    { id: 'boundary', name: '行政区划', checked: true, icon: 'Location' },
    { id: 'road', name: '道路', checked: true, icon: 'Van' },
    { id: 'water', name: '水系', checked: false, icon: 'Watermelon' },
    { id: 'building', name: '建筑', checked: false, icon: 'OfficeBuilding' }
  ]
};

// 模拟功能按钮配置
export const mockFunctions = {
  preDisaster: [
    { id: 'insar', name: '全国重点灾斑区InSAR形变普查', icon: 'TrendCharts' },
    { id: 'forestHouse', name: '高郁闭度林下建筑自动提取', icon: 'House' },
    { id: 'houseArchive', name: '一房一档一隐患动态建库', icon: 'Document' },
    { id: 'chainRisk', name: '多灾种链式风险空间拓扑关联', icon: 'Connection' },
    { id: 'predict', name: '未来3-6个月滑坡失稳趋势预测', icon: 'TrendCharts' }
  ],
  duringDisaster: [
    { id: 'compare', name: '灾前灾后光学-SAR卷帘比对', icon: 'Switch' },
    { id: 'roadBlock', name: '道路塌方断阻自动识别', icon: 'Van' },
    { id: 'houseDamage', name: '房屋坍塌与损毁等级评估', icon: 'OfficeBuilding' },
    { id: 'fireSpread', name: '林火火点与蔓延方向识别', icon: 'Fire' },
    { id: 'route', name: '应急救援路径动态规划', icon: 'Guide' }
  ],
  postDisaster: [
    { id: 'index', name: '灾害损毁指数计算', icon: 'DataAnalysis' },
    { id: 'site', name: '重建选址地形适宜性分析', icon: 'Location' },
    { id: 'secondary', name: '次生灾害风险叠加评估', icon: 'Warning' },
    { id: 'ecology', name: '生态修复优先区划定', icon: 'Sunny' },
    { id: 'archive', name: '灾害档案自动归档与专题图输出', icon: 'Document' }
  ]
};

// 模拟天气数据
export const mockWeather = {
  temp: 22,
  condition: '多云',
  wind: '东风3级',
  humidity: '65%',
  location: '四川省雅安市'
};

// 模拟接口返回函数
export const mockApi = {
  analyzeInsar: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            affectedCount: 32,
            highRiskCount: 8,
            deformationTrend: 'accelerate',
            avgConfidence: 0.92,
            points: mockDisasterPoints.filter(p => p.type === 'landslide')
          }
        });
      }, 1500);
    });
  },
  extractForestHouse: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalCount: 256,
            forestCount: 142,
            highRiskCount: 36,
            avgAccuracy: 0.89,
            houses: mockHouseArchives
          }
        });
      }, 1200);
    });
  },
  planRoute: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            distance: 28.5,
            estimatedTime: 45,
            riskPoints: 2,
            suggestedTeam: '四川省森林消防总队',
            pathPoints: [
              [103.0, 30.0],
              [103.2, 29.8],
              [103.4, 29.5],
              [103.5, 29.3]
            ]
          }
        });
      }, 1000);
    });
  }
};
