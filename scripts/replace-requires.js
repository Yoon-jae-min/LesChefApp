/**
 * require를 Images import로 변경하는 스크립트
 * 
 * 사용법: node scripts/replace-requires.js
 * 
 * 주의: 실행 전에 백업을 권장합니다.
 */

const fs = require('fs');
const path = require('path');

// 이미지 파일명과 Images 키 매핑
const imageMapping = {
  'back.png': 'Images.back',
  'upload.png': 'Images.upload',
  'write.png': 'Images.write',
  'search.png': 'Images.search',
  'profile.png': 'Images.profile',
  'delete.png': 'Images.delete',
  'camera.png': 'Images.camera',
  'gallery.png': 'Images.gallery',
  'addImg.png': 'Images.addImg',
  'addUnit.png': 'Images.addUnit',
  'remove.png': 'Images.remove',
  'leftArrow.png': 'Images.leftArrow',
  'rightArrow.png': 'Images.rightArrow',
  'like.png': 'Images.like',
  'unlike.png': 'Images.unlike',
  'thumb.png': 'Images.thumb',
  'noImage.png': 'Images.noImage',
  'time.png': 'Images.time',
  'viewCount.png': 'Images.viewCount',
  'LesChef_Logo.png': 'Images.LesChef_Logo',
  '참치김치찌개.jpg': 'Images.참치김치찌개',
  'cancel_BK.png': 'Images.cancel_BK',
  'cancel_DG.png': 'Images.cancel_DG',
  'cancel_WT.png': 'Images.cancel_WT',
  'ok_BK.png': 'Images.ok_BK',
  'textAlignLeft.png': 'Images.textAlignLeft',
  'textAlignCenter.png': 'Images.textAlignCenter',
  'textAlignRight.png': 'Images.textAlignRight',
};

// require 패턴 정규식
const requirePattern = /require\(["']([^"']*\/image\/([^"']+))["']\)/g;

// 파일 처리 함수
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let hasImagesImport = content.includes('from') && content.includes('assets/images');

    // require 패턴 찾기 및 교체
    content = content.replace(requirePattern, (match, fullPath, imageFile) => {
      const imageKey = imageMapping[imageFile];
      if (imageKey) {
        modified = true;
        return imageKey;
      }
      return match; // 매핑이 없으면 그대로 유지
    });

    // Images import 추가 (변경사항이 있고 import가 없는 경우)
    if (modified && !hasImagesImport) {
      // import 문 찾기
      const importMatch = content.match(/^import\s+.*from\s+["'].*["'];?\s*$/m);
      if (importMatch) {
        // 마지막 import 다음에 Images import 추가
        const lastImportIndex = content.lastIndexOf('import');
        const lastImportEnd = content.indexOf('\n', lastImportIndex);
        
        // 상대 경로 계산
        const relativePath = path.relative(
          path.dirname(filePath),
          path.join(__dirname, '../src/assets')
        ).replace(/\\/g, '/');
        
        const imagesImport = `import { Images } from "${relativePath}/images";\n`;
        content = content.slice(0, lastImportEnd + 1) + imagesImport + content.slice(lastImportEnd + 1);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 디렉토리 재귀 탐색
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // node_modules, .git 등 제외
      if (!file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 메인 실행
function main() {
  const srcDir = path.join(__dirname, '../src');
  const files = walkDir(srcDir);
  
  console.log(`Found ${files.length} files to process...\n`);
  
  let updatedCount = 0;
  files.forEach(file => {
    if (processFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✓ Updated ${updatedCount} files`);
  console.log('⚠️  Please review the changes and test your app!');
}

if (require.main === module) {
  main();
}

module.exports = { processFile, walkDir };

