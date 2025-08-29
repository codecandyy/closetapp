# PREFLIGHT REPORT - Game UI Tabs Migration

## 📋 런타임/빌드 환경 요약

### Node.js & Package Manager

- **Node.js**: 확인 필요
- **Package Manager**: npm (package-lock.json 존재)
- **Workspace**: npm workspaces 사용 (monorepo)

### Expo & React Native

- **Expo SDK**: 확인 필요
- **React Native**: 확인 필요
- **React**: ^18.3.1
- **React DOM**: ^18.3.1 (웹 앱)

### Navigation & Animation

- **React Navigation**: 확인 필요
- **React Native Reanimated**: 확인 필요
- **React Native Gesture Handler**: 확인 필요

## 🔍 의존성 점검

### 현재 설치된 핵심 패키지

```json
{
  "@tanstack/react-query": "^5.83.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "vite": "^5.4.19",
  "@vitejs/plugin-react-swc": "^3.11.0"
}
```

### 모바일 앱 의존성 (apps/mobile/package.json)

- **Expo**: 확인 필요
- **React Navigation**: 확인 필요
- **Reanimated**: 확인 필요

## 🗺️ 라우팅 맵

### 현재 웹 앱 라우팅 (React Router DOM)

| 화면 이름              | 파일 경로                                         | 라우트 경로          | 상태      |
| ---------------------- | ------------------------------------------------- | -------------------- | --------- |
| Index (Dashboard)      | `apps/web/src/pages/Index.tsx`                    | `/`                  | ✅ 구현됨 |
| Onboarding Welcome     | `apps/web/src/screens/Onboarding/Welcome.tsx`     | `/onboarding`        | ✅ 구현됨 |
| Onboarding StylePicker | `apps/web/src/screens/Onboarding/StylePicker.tsx` | `/onboarding/style`  | ✅ 구현됨 |
| Onboarding Budget      | `apps/web/src/screens/Onboarding/Budget.tsx`      | `/onboarding/budget` | ✅ 구현됨 |
| Onboarding Finish      | `apps/web/src/screens/Onboarding/Finish.tsx`      | `/onboarding/finish` | ✅ 구현됨 |
| Rewards                | `apps/web/src/screens/Rewards.tsx`                | `/rewards`           | ✅ 구현됨 |
| Settings               | `apps/web/src/screens/Settings.tsx`               | `/settings`          | ✅ 구현됨 |

### 현재 내부 네비게이션 (Index.tsx 내부)

| 섹션 이름        | 컴포넌트          | 상태      |
| ---------------- | ----------------- | --------- |
| Dashboard        | `Dashboard`       | ✅ 구현됨 |
| Style Assessment | `StyleAssessment` | ✅ 구현됨 |
| Closet Manager   | `ClosetManager`   | ✅ 구현됨 |
| Budget Tracker   | `BudgetTracker`   | ✅ 구현됨 |
| Buy or Skip      | `BuyOrSkip`       | ✅ 구현됨 |
| Rewards          | `Rewards`         | ✅ 구현됨 |
| Settings         | `Settings`        | ✅ 구현됨 |

### 모바일 앱 라우팅

- **현재 상태**: Expo React Native 앱 생성됨
- **네비게이션**: React Navigation 설정 필요
- **화면**: 웹 앱과 동일한 화면들 포팅 필요

## ⚠️ 위험 포인트

### 1. 경로 별칭 설정

- **웹 앱**: Vite alias 설정됨 (`@`, `@shared-logic`, `@shared-api`)
- **모바일 앱**: TypeScript paths 설정됨
- **위험도**: 🟡 중간 (별칭 불일치 가능성)

### 2. Reanimated 플러그인

- **현재 상태**: 확인 필요
- **위험도**: 🔴 높음 (babel.config.js 설정 필요)

### 3. Gesture Handler Import

- **현재 상태**: 확인 필요
- **위험도**: 🔴 높음 (App.tsx 최상단 import 필요)

### 4. Lottie/이미지 경로

- **현재 상태**: 에셋 없음
- **위험도**: 🟡 중간 (Graceful Fallback 필요)

### 5. 플랫폼별 의존성

- **Blur**: iOS/Android 지원 확인 필요
- **Haptics**: 플랫폼별 구현 확인 필요
- **위험도**: 🟡 중간

## 📊 현재 코드 vs 계획 차이

### 1. 네비게이션 구조

| 항목            | 현재                             | 계획                         | 차이         |
| --------------- | -------------------------------- | ---------------------------- | ------------ |
| 웹 앱           | React Router DOM (상단/사이드바) | 하단 탭                      | 🔴 대폭 변경 |
| 모바일 앱       | 미구현                           | React Navigation Bottom Tabs | 🟢 신규 구현 |
| 내부 네비게이션 | useState 기반 섹션 전환          | 탭 기반                      | 🔴 구조 변경 |

### 2. UI 컴포넌트

| 항목        | 현재          | 계획                         | 차이               |
| ----------- | ------------- | ---------------------------- | ------------------ |
| 카드 스타일 | 기본 Tailwind | Glassmorphism                | 🟡 스타일 변경     |
| 애니메이션  | 기본 CSS      | Reanimated                   | 🔴 기술 변경       |
| 햅틱 피드백 | 없음          | react-native-haptic-feedback | 🟢 신규 추가       |
| 아이콘      | Lucide React  | Phosphor React Native        | 🟡 라이브러리 변경 |

### 3. 화면 구조

| 항목      | 현재          | 계획                   | 차이         |
| --------- | ------------- | ---------------------- | ------------ |
| Dashboard | 단일 페이지   | 탭 기반 분리           | 🔴 구조 변경 |
| Closet    | 그리드 + 필터 | 바텀시트 필터          | 🟡 UX 변경   |
| Buy/Skip  | 단일 화면     | 카드 뒤집기 애니메이션 | 🟡 UX 변경   |
| Budget    | 단일 화면     | 차트 추가              | 🟡 기능 확장 |
| Rewards   | 기본 리스트   | Lottie + 컨페티        | 🟡 UX 변경   |

## 🏗️ 변경 설계안

### 추가될 파일 리스트

```
apps/mobile/src/
├── navigation/
│   └── Tabs.tsx                    # 하단 탭 네비게이션
├── theme/
│   └── tokens.ts                   # 디자인 토큰
├── components/
│   ├── GlassCard.tsx              # 글래스모피즘 카드
│   ├── QuestCard.tsx              # 퀘스트 카드
│   └── ButtonGame.tsx             # 게임용 버튼 (기존 Button 래핑)
├── screens/
│   ├── Dashboard/
│   │   └── DashboardScreen.tsx    # 홈 탭 화면
│   ├── ClosetGrid/
│   │   └── ClosetGridScreen.tsx   # 옷장 탭 화면
│   ├── BuySkip/
│   │   └── BuySkipScreen.tsx      # Buy/Skip 탭 화면
│   ├── Budget/
│   │   └── BudgetScreen.tsx       # 예산 탭 화면
│   └── Rewards/
│       └── RewardsScreen.tsx      # 보상 탭 화면
└── constants/
    └── FeatureFlags.ts            # 기능 플래그
```

### 수정될 파일 리스트

```
apps/mobile/
├── App.tsx                        # Feature Flag 분기 추가
├── babel.config.js               # Reanimated 플러그인 추가
└── package.json                  # 새 의존성 추가

apps/web/
├── App.tsx                       # Feature Flag 분기 추가 (웹용)
└── package.json                  # 새 의존성 추가 (웹용)
```

### 완전 신규 의존성

```json
{
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/bottom-tabs": "^6.x.x",
  "react-native-screens": "^3.x.x",
  "react-native-safe-area-context": "^4.x.x",
  "react-native-reanimated": "^3.x.x",
  "@gorhom/bottom-sheet": "^4.x.x",
  "expo-blur": "^12.x.x",
  "react-native-haptic-feedback": "^2.x.x",
  "phosphor-react-native": "^1.x.x",
  "lottie-react-native": "^6.x.x",
  "react-native-gesture-handler": "^2.x.x"
}
```

## 🚨 위험도 평가

### 🔴 높은 위험도

1. **네비게이션 구조 변경**: 기존 웹 앱의 라우팅 구조 대폭 변경
2. **Reanimated 설정**: babel.config.js 수정 필요
3. **플랫폼별 의존성**: Blur, Haptics 플랫폼 지원 확인 필요

### 🟡 중간 위험도

1. **경로 별칭**: 웹/모바일 간 별칭 불일치 가능성
2. **UI 라이브러리**: Lucide → Phosphor 변경
3. **에셋 의존성**: Lottie 파일 없음

### 🟢 낮은 위험도

1. **Feature Flag**: 비파괴적 구현 가능
2. **컴포넌트 래핑**: 기존 컴포넌트 시그니처 유지
3. **타입 안전성**: TypeScript 설정 완료

## 📋 권장 사항

### 1. 단계별 구현

1. **Phase 1**: 모바일 앱에만 탭 네비게이션 구현
2. **Phase 2**: 웹 앱에 Feature Flag로 탭 네비게이션 추가
3. **Phase 3**: UI 컴포넌트 (GlassCard, QuestCard) 추가
4. **Phase 4**: 애니메이션 및 햅틱 피드백 추가

### 2. 안전장치

1. **Feature Flag**: `FEATURE_GAME_UI_TABS` 플래그로 토글
2. **Graceful Fallback**: 에셋/플랫폼 미지원 시 조건부 렌더
3. **점진적 마이그레이션**: 기존 기능 100% 보존

### 3. 테스트 전략

1. **타입 체크**: `npx tsc --noEmit`
2. **런타임 테스트**: iOS/Android/Web 각 플랫폼별 테스트
3. **기능 테스트**: 기존 기능 동작 확인

---

**다음 단계**: 승인 후 단계별 커밋 진행

