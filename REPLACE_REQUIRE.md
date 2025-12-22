# require를 import로 변경 가이드

## 변경 패턴

### Before
```typescript
<Image source={require("../../../../assets/image/back.png")}/>
```

### After
```typescript
import { Images } from "../../../../assets/images";

<Image source={Images.back}/>
```

## 변경 방법

1. 파일 상단에 import 추가:
```typescript
import { Images } from "../../../../assets/images";
```

2. 모든 `require(".../image/...")`를 `Images.이미지명`으로 변경

## 이미지 매핑

| require 경로 | Images 키 |
|-------------|-----------|
| `back.png` | `Images.back` |
| `upload.png` | `Images.upload` |
| `write.png` | `Images.write` |
| `search.png` | `Images.search` |
| `profile.png` | `Images.profile` |
| `delete.png` | `Images.delete` |
| `camera.png` | `Images.camera` |
| `gallery.png` | `Images.gallery` |
| `addUnit.png` | `Images.addUnit` |
| `remove.png` | `Images.remove` |
| `leftArrow.png` | `Images.leftArrow` |
| `rightArrow.png` | `Images.rightArrow` |
| `like.png` | `Images.like` |
| `unlike.png` | `Images.unlike` |
| `thumb.png` | `Images.thumb` |
| `noImage.png` | `Images.noImage` |
| `time.png` | `Images.time` |
| `viewCount.png` | `Images.viewCount` |
| `LesChef_Logo.png` | `Images.LesChef_Logo` |
| `참치김치찌개.jpg` | `Images.참치김치찌개` |

## 자동 변경 스크립트 (참고용)

수동으로 변경하거나, 아래 패턴을 사용하여 일괄 변경할 수 있습니다:

```bash
# 각 파일에서
# 1. import 추가
# 2. require(".../image/파일명") → Images.키명
```

## 주의사항

- `src/assets/images.ts`에 모든 이미지가 정의되어 있어야 함
- 이미지 파일명과 Images 키가 일치해야 함
- 경로는 상대 경로에 맞게 조정 필요

