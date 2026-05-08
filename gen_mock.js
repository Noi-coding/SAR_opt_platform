const fs = require('fs');
const path = require('path');

const mockDir = path.join(__dirname, 'public', 'mock');

// 1. Generate houses.json
const generateHouses = () => {
    const features = [];
    const riskLevels = ['极高', '高', '中', '低'];
    const damageLevels = ['正常', '轻微损毁', '中度损毁', '严重损毁', '倒塌'];
    
    for (let i = 1; i <= 80; i++) {
        const lon = 102.2 + Math.random() * 0.2;
        const lat = 27.8 + Math.random() * 0.2;
        const isUnderForest = Math.random() > 0.4;
        const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
        const damageLevel = damageLevels[Math.floor(Math.random() * damageLevels.length)];
        
        features.push({
            type: 'Feature',
            properties: {
                id: `H-${i.toString().padStart(3, '0')}`,
                location: `西南山区-区域${Math.floor(Math.random() * 10)}`,
                area: 80 + Math.floor(Math.random() * 150),
                isUnderForest: isUnderForest,
                riskLevel: riskLevel,
                damageLevel: damageLevel,
                historyDeformation: (Math.random() * 20).toFixed(2) + 'mm',
                sensitivity: (Math.random() * 100).toFixed(0) + '%'
            },
            geometry: {
                type: 'Point',
                coordinates: [lon, lat]
            }
        });
    }
    
    const geojson = {
        type: 'FeatureCollection',
        features: features
    };
    
    fs.writeFileSync(path.join(mockDir, 'houses.json'), JSON.stringify(geojson, null, 2));
};

// 2. Generate disaster_layers.json
const generateDisasters = () => {
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: { type: 'fire', name: '森林火场范围', intensity: 0.8 },
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [102.25, 27.85], [102.30, 27.85], [102.32, 27.88], [102.28, 27.90], [102.25, 27.85]
                    ]]
                }
            },
            {
                type: 'Feature',
                properties: { type: 'rain', name: '山洪淹没模拟区', depth: '1.5m' },
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [102.35, 27.82], [102.40, 27.82], [102.42, 27.85], [102.38, 27.87], [102.35, 27.82]
                    ]]
                }
            },
            {
                type: 'Feature',
                properties: { type: 'earthquake', name: '地震形变敏感区', deformation: '35mm' },
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [102.20, 27.88], [102.25, 27.88], [102.27, 27.92], [102.22, 27.94], [102.20, 27.88]
                    ]]
                }
            }
        ]
    };
    fs.writeFileSync(path.join(mockDir, 'disaster_layers.json'), JSON.stringify(geojson, null, 2));
};

// 3. Generate stats.json
const generateStats = () => {
    const stats = {
        fire: {
            affectedHouses: 42,
            forestHouses: 28,
            highRiskCount: 15,
            damageLevel: '中等',
            aiInsight: 'SAR 引擎探测到烟雾下方存在 5 处隐匿火点，建议加强西南侧阻燃隔离。'
        },
        rain: {
            affectedHouses: 65,
            forestHouses: 12,
            highRiskCount: 24,
            damageLevel: '严重',
            aiInsight: '基于 SAR 反演 DEM，低洼河谷区存在山洪暴发风险，建议撤离林下低层房屋住户。'
        },
        earthquake: {
            affectedHouses: 18,
            forestHouses: 35,
            highRiskCount: 42,
            damageLevel: '极重',
            aiInsight: 'D-InSAR 捕捉到地表形变加速，滑坡隐患点已增至 12 处，AI 已自动锁定重点排查名单。'
        }
    };
    fs.writeFileSync(path.join(mockDir, 'stats.json'), JSON.stringify(stats, null, 2));
};

generateHouses();
generateDisasters();
generateStats();
console.log('Mock data generated successfully!');
