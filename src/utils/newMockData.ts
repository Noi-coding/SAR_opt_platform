// 光学-SAR协同小范围灾害智能识别平台 - Mock 数据

export interface Layer {
  id: string;
  name: string;
  type: 'optical' | 'sar' | 'dem' | 'weather' | 'disaster' | 'infrastructure' | 'result';
  visible: boolean;
  opacity: number;
  legend: string;
}

export interface RegistrationTask {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  rmse: number;
  residualError: number;
  boundaryError: number;
  controlPoints: Array<{ id: string; x: number; y: number; error: number }>;
  status: 'processing' | 'completed' | 'failed';
}

export interface HouseRiskRecord {
  id: string;
  houseNo: string;
  lng: number;
  lat: number;
  area: string;
  source: string;
  confidence: number;
  slope: number;
  elevation: number;
  distanceToGully: number;
  distanceToRoad: number;
  distanceToHistory: number;
  riskLevel: 'low' | 'medium' | 'high';
  verified: boolean;
  suggestion: string;
}

export interface ChangeDetectionEvent {
  id: string;
  taskNo: string;
  beforeTime: string;
  afterTime: string;
  model: string;
  iou: number;
  f1: number;
  missRate: number;
  processTime: number;
  landslideCount: number;
  debrisCount: number;
  roadBlockCount: number;
  affectedHouses: number;
  priority: 'high' | 'medium' | 'low';
}

export interface DisasterStatistic {
  id: string;
  landslideArea: number;
  debrisArea: number;
  affectedHouses: number;
  blockedRoadLength: number;
  secondaryRisk: 'low' | 'medium' | 'high';
  priorityPoints: Array<{ id: string; name: string; priority: number }>;
}

export interface VerificationTask {
  id: string;
  type: 'house' | 'landslide' | 'debris' | 'road' | 'risk';
  name: string;
  location: string;
  suggestedLevel: string;
  currentLevel: string;
  status: 'pending' | 'confirmed' | 'rejected';
  remark: string;
  verifiedAt: string | null;
  verifier: string;
}

// 1. 图层数据
export const layers: Layer[] = [
  { id: 'optical', name: '光学影像', type: 'optical', visible: true, opacity: 0.8, legend: 'image' },
  { id: 'sar_backscatter', name: 'SAR后向散射', type: 'sar', visible: false, opacity: 0.7, legend: 'image' },
  { id: 'sar_deformation', name: 'SAR形变场', type: 'sar', visible: false, opacity: 0.6, legend: 'heatmap' },
  { id: 'dem', name: 'DEM地形', type: 'dem', visible: false, opacity: 0.5, legend: 'elevation' },
  { id: 'rainfall', name: '降雨气象', type: 'weather', visible: false, opacity: 0.6, legend: 'rain' },
  { id: 'history_landslide', name: '历史滑坡点', type: 'disaster', visible: false, opacity: 1, legend: 'triangle' },
  { id: 'history_debris', name: '历史泥石流点', type: 'disaster', visible: false, opacity: 1, legend: 'circle' },
  { id: 'house', name: '房屋', type: 'infrastructure', visible: true, opacity: 0.9, legend: 'house' },
  { id: 'road', name: '道路', type: 'infrastructure', visible: true, opacity: 0.9, legend: 'line' },
  { id: 'settlement', name: '居民点', type: 'infrastructure', visible: false, opacity: 1, legend: 'cluster' },
  { id: 'forest_house', name: '林下/林缘房屋', type: 'result', visible: true, opacity: 1, legend: 'house_warning' },
  { id: 'new_landslide', name: '新增滑坡变化图斑', type: 'result', visible: false, opacity: 0.7, legend: 'polygon_red' },
  { id: 'new_debris', name: '新增泥石流变化图斑', type: 'result', visible: false, opacity: 0.7, legend: 'polygon_yellow' },
  { id: 'road_block', name: '道路阻断点', type: 'result', visible: false, opacity: 1, legend: 'road_block' },
  { id: 'heatmap', name: '次生风险热力图', type: 'result', visible: false, opacity: 0.5, legend: 'heatmap' }
];

// 2. 配准任务
export const registrationTasks: RegistrationTask[] = [
  {
    id: 'R001',
    name: '重点监测区配准',
    beforeImage: '光学影像-20260501',
    afterImage: 'SAR影像-20260510',
    rmse: 0.65,
    residualError: 0.38,
    boundaryError: 0.72,
    controlPoints: [
      { id: 'CP001', x: 103.21, y: 30.15, error: 0.32 },
      { id: 'CP002', x: 103.25, y: 30.18, error: 0.45 },
      { id: 'CP003', x: 103.19, y: 30.22, error: 0.28 },
      { id: 'CP004', x: 103.28, y: 30.25, error: 0.38 }
    ],
    status: 'completed'
  }
];

// 3. 房屋风险档案
export const houseRiskRecords: HouseRiskRecord[] = [
  {
    id: 'H0001',
    houseNo: 'FZ-0001',
    lng: 103.2156,
    lat: 30.1682,
    area: '四川省雅安市雨城区',
    source: 'SAR识别',
    confidence: 0.96,
    slope: 28.5,
    elevation: 1245,
    distanceToGully: 45,
    distanceToRoad: 180,
    distanceToHistory: 220,
    riskLevel: 'high',
    verified: false,
    suggestion: '建议尽快搬迁'
  },
  {
    id: 'H0002',
    houseNo: 'FZ-0002',
    lng: 103.2234,
    lat: 30.1745,
    area: '四川省雅安市雨城区',
    source: '光学识别',
    confidence: 0.89,
    slope: 22.3,
    elevation: 1180,
    distanceToGully: 80,
    distanceToRoad: 250,
    distanceToHistory: 500,
    riskLevel: 'medium',
    verified: true,
    suggestion: '需持续监测'
  },
  {
    id: 'H0003',
    houseNo: 'FZ-0003',
    lng: 103.2089,
    lat: 30.1578,
    area: '四川省雅安市雨城区',
    source: '人工核验',
    confidence: 1.0,
    slope: 15.8,
    elevation: 1050,
    distanceToGully: 150,
    distanceToRoad: 100,
    distanceToHistory: 800,
    riskLevel: 'low',
    verified: true,
    suggestion: '定期巡查'
  },
  {
    id: 'H0004',
    houseNo: 'FZ-0004',
    lng: 103.2311,
    lat: 30.1655,
    area: '四川省雅安市雨城区',
    source: 'SAR+光学融合',
    confidence: 0.93,
    slope: 32.1,
    elevation: 1320,
    distanceToGully: 25,
    distanceToRoad: 320,
    distanceToHistory: 150,
    riskLevel: 'high',
    verified: false,
    suggestion: '建议尽快搬迁'
  }
];

// 4. 变化识别事件
export const changeDetectionEvents: ChangeDetectionEvent[] = [
  {
    id: 'C0001',
    taskNo: 'TC-20260510',
    beforeTime: '2026-05-01',
    afterTime: '2026-05-10',
    model: 'Siamese U-Net',
    iou: 0.78,
    f1: 0.85,
    missRate: 0.08,
    processTime: 45,
    landslideCount: 3,
    debrisCount: 1,
    roadBlockCount: 2,
    affectedHouses: 8,
    priority: 'high'
  }
];

// 5. 灾后统计
export const disasterStatistics: DisasterStatistic[] = [
  {
    id: 'S0001',
    landslideArea: 12560,
    debrisArea: 8920,
    affectedHouses: 15,
    blockedRoadLength: 1.8,
    secondaryRisk: 'high',
    priorityPoints: [
      { id: 'P001', name: '滑坡核心区', priority: 1 },
      { id: 'P002', name: '林缘房屋集中区', priority: 2 },
      { id: 'P003', name: '道路阻断点', priority: 3 }
    ]
  }
];

// 6. 核验任务
export const verificationTasks: VerificationTask[] = [
  {
    id: 'V0001',
    type: 'house',
    name: '疑似高风险房屋',
    location: '雨城区庙后村2组',
    suggestedLevel: 'high',
    currentLevel: 'high',
    status: 'pending',
    remark: '',
    verifiedAt: null,
    verifier: ''
  },
  {
    id: 'V0002',
    type: 'landslide',
    name: '新增滑坡图斑',
    location: '雨城区某山沟',
    suggestedLevel: 'high',
    currentLevel: 'medium',
    status: 'pending',
    remark: '',
    verifiedAt: null,
    verifier: ''
  },
  {
    id: 'V0003',
    type: 'debris',
    name: '泥石流堆积区',
    location: '雨城区河道下游',
    suggestedLevel: 'medium',
    currentLevel: 'medium',
    status: 'confirmed',
    remark: '确认为新增泥石流堆积区',
    verifiedAt: '2026-05-10',
    verifier: '系统管理员'
  },
  {
    id: 'V0004',
    type: 'road',
    name: '道路阻断点',
    location: '村道K1+200',
    suggestedLevel: 'high',
    currentLevel: 'high',
    status: 'pending',
    remark: '',
    verifiedAt: null,
    verifier: ''
  }
];

// 综合概览统计
export const overviewStats = {
  monitoredAreas: 1,
  dataLayers: 15,
  forestHouses: 128,
  highRiskHouses: 42,
  newLandslides: 3,
  roadBlocks: 2,
  affectedArea: 21480,
  riskWarnings: 8
};

// 时间轴阶段
export const timelinePhases = [
  { id: 'pre', name: '灾前', desc: '承灾目标建档' },
  { id: 'during', name: '灾中', desc: '快速变化识别' },
  { id: 'post', name: '灾后', desc: '受灾范围统计' },
  { id: 'predict', name: '预测', desc: '次生风险与恢复优先级' }
];
