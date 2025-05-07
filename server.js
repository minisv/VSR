// server.js
const express = require('express');
const si = require('systeminformation');
const path = require('path');

const app = express();
const port = 3000; // 서버가 실행될 포트

// 캐시 데이터 및 설정
const cache = {
  cpuUsage: 0,
  memory: {
    totalGB: 0,
    usedGB: 0,
    freeGB: 0,
    usagePercentage: 0
  },
  drive: null,
  lastDriveUpdate: 0,
  lastFullUpdate: 0
};

// 드라이브 정보 업데이트 간격 (5분)
const DRIVE_UPDATE_INTERVAL = 5 * 60 * 1000;

// 정적 파일 (HTML, CSS) 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// 시스템 정보 캐시 업데이트 함수
async function updateCache() {
  try {
    // CPU 및 메모리 정보는 항상 업데이트
    const cpuData = await si.currentLoad();
    const memData = await si.mem();
    
    // CPU 사용률
    cache.cpuUsage = parseFloat(cpuData.currentLoad.toFixed(2));
    
    // 메모리 정보
    cache.memory.totalGB = parseFloat((memData.total / (1024 ** 3)).toFixed(2));
    cache.memory.usedGB = parseFloat((memData.used / (1024 ** 3)).toFixed(2));
    cache.memory.freeGB = parseFloat((memData.free / (1024 ** 3)).toFixed(2));
    cache.memory.usagePercentage = parseFloat(((memData.used / memData.total) * 100).toFixed(2));
    
    const currentTime = Date.now();
    
    // 드라이브 정보는 주기적으로만 업데이트 (5분마다)
    if (!cache.drive || (currentTime - cache.lastDriveUpdate) > DRIVE_UPDATE_INTERVAL) {
      const fsData = await si.fsSize();
      
      // C 드라이브 정보 (Windows 기준)
      let cDriveInfo = null;
      const cDrive = fsData.find(drive => drive.fs.toLowerCase().startsWith('c:') || drive.mount.toLowerCase() === 'c:');
      
      if (cDrive) {
        cDriveInfo = {
          fs: cDrive.fs,
          mount: cDrive.mount,
          totalGB: parseFloat((cDrive.size / (1024 ** 3)).toFixed(2)),
          usedGB: parseFloat((cDrive.used / (1024 ** 3)).toFixed(2)),
          freeGB: parseFloat(((cDrive.size - cDrive.used) / (1024 ** 3)).toFixed(2)),
          usagePercentage: parseFloat(cDrive.use.toFixed(2)),
          notFound: false,
        };
      } else {
        // C 드라이브를 찾지 못한 경우, 첫 번째 드라이브를 예시로 보여주거나 메시지 전달
        const firstDrive = fsData.length > 0 ? fsData[0] : null;
        if (firstDrive) {
          cDriveInfo = {
            fs: firstDrive.fs,
            mount: firstDrive.mount,
            totalGB: parseFloat((firstDrive.size / (1024 ** 3)).toFixed(2)),
            usedGB: parseFloat((firstDrive.used / (1024 ** 3)).toFixed(2)),
            freeGB: parseFloat(((firstDrive.size - firstDrive.used) / (1024 ** 3)).toFixed(2)),
            usagePercentage: parseFloat(firstDrive.use.toFixed(2)),
            notFound: true, // C 드라이브는 아니지만 다른 드라이브 정보 표시
            message: `C 드라이브를 찾을 수 없습니다. '${firstDrive.mount}' 드라이브 정보를 표시합니다.`
          };
        } else {
          cDriveInfo = {
            notFound: true,
            message: "사용 가능한 드라이브 정보를 찾을 수 없습니다."
          };
        }
      }
      
      cache.drive = cDriveInfo;
      cache.lastDriveUpdate = currentTime;
    }
    
    cache.lastFullUpdate = currentTime;
  } catch (error) {
    console.error("시스템 정보 캐싱 오류:", error);
  }
}

// 시작 시 초기 캐시 업데이트
updateCache().then(() => {
  console.log("초기 시스템 정보가 캐시되었습니다.");
  
  // 주기적으로 캐시 업데이트 (3초마다)
  setInterval(updateCache, 3000);
});

// 시스템 정보를 제공하는 API 엔드포인트
app.get('/api/system-info', (req, res) => {
  try {
    // 캐시된 데이터 반환
    res.json({
      cpuUsage: cache.cpuUsage,
      memory: cache.memory,
      drive: cache.drive
    });
  } catch (error) {
    console.error("시스템 정보 API 오류:", error);
    res.status(500).json({ error: "서버에서 시스템 정보를 가져오는 데 실패했습니다." });
  }
});

app.listen(port, () => {
  console.log(`시스템 모니터 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log(`웹 UI는 http://localhost:${port}/index.html 에서 확인할 수 있습니다.`);
});