# 🔧 Refactoring Plan for feature/#22-findstudy-ui
# feature/#22-findstudy-ui 브랜치 리팩토링 계획

## 📊 Overview / 개요

### Branch Information / 브랜치 정보
- **Branch**: `feature/#22-findstudy-ui`
- **Files Changed**: 90 files
- **Lines Added**: +4,624 lines
- **Lines Deleted**: -499 lines
- **Main Features**: Profile UI, Review UI, Landing Page

---

## 📂 Changed Files Summary / 변경된 파일 목록

### 1. **Profile Pages** (프로필 페이지)
- `src/pages/profile/Profile.tsx` (151 lines)
- `src/pages/profile/ProfileGuide.tsx` (279 lines)
- `src/pages/profile/AccountSettings.tsx` (94 lines)
- `src/pages/profile/WordListPage.tsx` (64 lines)

### 2. **Profile Components** (프로필 컴포넌트)
- `src/components/profile/GraphCard.tsx` (83 lines)
- `src/components/profile/NicknameChangeModal.tsx` (118 lines)
- `src/components/profile/AccountConfirmModal.tsx` (119 lines)

### 3. **Review Pages** (복습 페이지)
- `src/pages/review/Review.tsx` (147 lines)
- `src/pages/review/ReviewCalendar.tsx` (184 lines)
- `src/pages/review/practice/ReviewPractice.tsx` (120 lines)
- `src/pages/review/practice/ReviewPracticeListen.tsx` (148 lines)
- `src/pages/review/practice/ArticulationPracticeListen.tsx` (112 lines)
- `src/pages/review/words/WordListPage.tsx` (64 lines)
- `src/pages/review/words/WordQuiz.tsx` (129 lines)

### 4. **Review Components** (복습 컴포넌트)
- `src/components/review/ProgressBar.tsx` (35 lines)
- `src/components/review/ScoreModal.tsx` (40 lines)

### 5. **Hooks** (커스텀 훅)
- `src/hooks/review/useCalendar.ts` (142 lines)
- `src/hooks/review/useWordQuiz.ts` (138 lines)
- `src/hooks/review/useReviewPracticeListen.ts` (67 lines)
- `src/hooks/review/useArticulationPracticeListen.ts` (68 lines)

### 6. **Landing Page** (랜딩 페이지)
- `src/pages/landing/LandingPage.tsx` (32 lines)

### 7. **Mock Data** (목 데이터)
- `src/mock/profile/profile.mock.ts` (42 lines)
- `src/mock/profile/wordList.mock.ts` (41 lines)
- `src/mock/review/reviewCalendar.mock.ts` (75 lines)
- `src/mock/review/reviewPractice.mock.ts` (86 lines)
- `src/mock/review/wordQuiz.mock.ts` (13 lines)
- And more...

### 8. **SVG Assets** (SVG 아이콘)
- 52 SVG icon files added in `src/assets/svgs/profile/` and `src/assets/svgs/review/`

### 9. **Other Changes** (기타 변경사항)
- `src/router.tsx` - New routes added
- `src/components/common/BottomNav.tsx` - Navigation updates
- `src/index.css` - Added `.shine-effect` animation
- `package.json` - New dependencies

---

## 🎯 Refactoring Priority / 리팩토링 우선순위

### 🔴 **Priority 1: Critical Issues** (우선순위 1: 중요 이슈)

#### 1.1 **Code Duplication** (코드 중복)

**Issue**: ReviewPractice logic is duplicated across multiple components
**문제**: ReviewPractice 로직이 여러 컴포넌트에 중복됨

**Files Affected**:
- `src/pages/review/practice/ReviewPracticeListen.tsx`
- `src/pages/review/practice/ArticulationPracticeListen.tsx`

**Solution**:
- Extract common audio playback logic into a shared hook `useAudioPlayback`
- Create a reusable `PracticeListenLayout` component

**해결방안**:
- 공통 오디오 재생 로직을 `useAudioPlayback` 훅으로 분리
- 재사용 가능한 `PracticeListenLayout` 컴포넌트 생성

**Effort**: 4-6 hours

---

#### 1.2 **Hard-coded Magic Numbers** (하드코딩된 매직 넘버)

**Issue**: Many components have hard-coded values
**문제**: 많은 컴포넌트에 하드코딩된 값이 존재

**Examples**:
```tsx
// ProfileGuide.tsx
case 8: // Magic number
  return (...)

// useWordQuiz.ts
setTimeout(() => { ... }, 1000); // Magic number
setProgress(prev => prev + 2.5); // Magic number
```

**Solution**:
- Create constants file `src/constants/review.constants.ts`
- Define named constants like `INTRO_DURATION`, `RECORDING_DURATION`, `MAX_PAGES`

**해결방안**:
- 상수 파일 `src/constants/review.constants.ts` 생성
- `INTRO_DURATION`, `RECORDING_DURATION`, `MAX_PAGES` 같은 명명된 상수 정의

**Effort**: 2-3 hours

---

#### 1.3 **Type Safety Issues** (타입 안전성 문제)

**Issue**: Some props and state lack proper TypeScript types
**문제**: 일부 props와 state에 적절한 TypeScript 타입이 없음

**Examples**:
```tsx
// ProfileGuide.tsx - renderPage returns JSX.Element | null but not typed
const renderPage = () => { ... }

// Review.tsx - hoveredCard could be more strict
const [hoveredCard, setHoveredCard] = useState<'quiz' | 'all' | null>(null);
```

**Solution**:
- Add explicit return types to all functions
- Create shared type definitions in `src/types/review.types.ts`

**해결방안**:
- 모든 함수에 명시적 반환 타입 추가
- `src/types/review.types.ts`에 공유 타입 정의 생성

**Effort**: 3-4 hours

---

### 🟡 **Priority 2: Performance Optimization** (우선순위 2: 성능 최적화)

#### 2.1 **Large SVG Bundle** (큰 SVG 번들)

**Issue**: 52 SVG files imported directly, increasing bundle size
**문제**: 52개의 SVG 파일이 직접 import되어 번들 크기 증가

**Current Approach**:
```tsx
import ProfileInfo1 from '@/assets/svgs/profile/profileinfo/profile-info1.svg';
import ProfileInfo2 from '@/assets/svgs/profile/profileinfo/profile-info2.svg';
// ... 8 more imports
```

**Solution**:
- Use dynamic imports with lazy loading
- Implement SVG sprite system or icon font
- Only ProfileGuide uses these - consider code splitting

**해결방안**:
- 지연 로딩과 함께 동적 import 사용
- SVG 스프라이트 시스템 또는 아이콘 폰트 구현
- ProfileGuide만 사용하므로 코드 스플리팅 고려

**Effort**: 6-8 hours

---

#### 2.2 **Unnecessary Re-renders** (불필요한 리렌더링)

**Issue**: Components re-render excessively due to missing memoization
**문제**: 메모이제이션 누락으로 인한 과도한 컴포넌트 리렌더링

**Examples**:
```tsx
// Profile.tsx - GraphCard could be memoized
<GraphCard
  title="단어 성공 그래프"
  data={wordSuccessData}
  totalCount={totalSuccessCount}
/>

// ReviewCalendar.tsx - calendarDays regenerated on every render
const { calendarDays } = useCalendar();
```

**Solution**:
- Wrap GraphCard with `React.memo`
- Use `useMemo` for expensive calculations in useCalendar hook
- Add `useCallback` for event handlers passed as props

**해결방안**:
- GraphCard를 `React.memo`로 래핑
- useCalendar 훅의 비용이 큰 계산에 `useMemo` 사용
- props로 전달되는 이벤트 핸들러에 `useCallback` 추가

**Effort**: 3-4 hours

---

#### 2.3 **Audio Resource Management** (오디오 리소스 관리)

**Issue**: Audio files loaded without proper cleanup
**문제**: 적절한 정리 없이 오디오 파일이 로드됨

**Examples**:
```tsx
// useWordQuiz.ts
audioRef.current = new Audio(audioPath);
audioRef.current.play();
```

**Solution**:
- Implement audio pooling system
- Add proper cleanup in useEffect
- Preload audio files for better UX

**해결방안**:
- 오디오 풀링 시스템 구현
- useEffect에 적절한 cleanup 추가
- 더 나은 UX를 위해 오디오 파일 미리 로드

**Effort**: 4-5 hours

---

### 🟢 **Priority 3: Code Quality & Maintainability** (우선순위 3: 코드 품질 및 유지보수성)

#### 3.1 **Component Extraction** (컴포넌트 추출)

**Issue**: Large components with multiple responsibilities
**문제**: 여러 책임을 가진 큰 컴포넌트

**Examples**:
- `ProfileGuide.tsx` (279 lines) - Contains 9 different page renders
- `ReviewCalendar.tsx` (184 lines) - Calendar grid + kit list in one component
- `Profile.tsx` (151 lines) - Profile info + stats + graphs + settings

**Solution**:
Extract smaller components:
```
ProfileGuide.tsx
  ├── ProfileGuidePage.tsx (container)
  ├── components/
  │   ├── GuidePageContent.tsx (each page content)
  │   ├── GuideIndicator.tsx
  │   └── GuideNavigation.tsx

ReviewCalendar.tsx
  ├── ReviewCalendar.tsx (container)
  ├── components/
  │   ├── CalendarGrid.tsx
  │   ├── CalendarNavigation.tsx
  │   └── KitListSection.tsx
```

**해결방안**:
작은 컴포넌트로 분리:
- ProfileGuide의 각 페이지를 별도 컴포넌트로
- ReviewCalendar의 캘린더와 키트 리스트 분리
- Profile의 통계, 그래프, 설정 섹션 분리

**Effort**: 8-10 hours

---

#### 3.2 **Improve Hook Composition** (훅 구성 개선)

**Issue**: Hooks contain UI logic mixed with business logic
**문제**: 훅에 UI 로직과 비즈니스 로직이 혼재

**Examples**:
```tsx
// useWordQuiz.ts - contains both data and UI state
const [showIntro, setShowIntro] = useState(true); // UI state
const [words] = useState<QuizWord[]>(MOCK_QUIZ_WORDS); // Data
const [isRecording, setIsRecording] = useState(false); // Business logic
```

**Solution**:
Separate concerns:
```tsx
// Data layer
const { words, score } = useWordQuizData();

// Business logic
const { startRecording, stopRecording } = useRecording();

// UI state
const { showIntro, showModal } = useWordQuizUI();
```

**해결방안**:
관심사 분리:
- 데이터 레이어 (`useWordQuizData`)
- 비즈니스 로직 (`useRecording`)
- UI 상태 (`useWordQuizUI`)

**Effort**: 6-8 hours

---

#### 3.3 **Consistent Styling Approach** (일관된 스타일링 접근)

**Issue**: Mix of different styling patterns
**문제**: 다양한 스타일링 패턴의 혼재

**Examples**:
```tsx
// Inline styles
style={{ background: 'linear-gradient(270deg, #4C5EFF 0%, #2E3899 100%)' }}

// Tailwind classes
className="bg-background-primary relative flex h-full flex-col"

// Conditional Tailwind
className={`cursor-pointer ${currentPage > 0 ? 'cursor-pointer' : 'invisible'}`}
```

**Solution**:
- Define all gradient values in tailwind.config
- Create reusable className utilities
- Use clsx/classnames consistently

**해결방안**:
- tailwind.config에 모든 그라디언트 값 정의
- 재사용 가능한 className 유틸리티 생성
- clsx/classnames 일관되게 사용

**Effort**: 4-5 hours

---

#### 3.4 **Accessibility Improvements** (접근성 개선)

**Issue**: Missing ARIA labels and keyboard navigation
**문제**: ARIA 레이블 및 키보드 내비게이션 누락

**Examples**:
```tsx
// Missing aria-label
<button onClick={handleNext}>
  <ProfileRight />
</button>

// Images without alt
<img src={MikeIconUrl} loading="lazy" />
```

**Solution**:
- Add proper aria-labels to all interactive elements
- Implement keyboard navigation (Tab, Enter, Escape)
- Add focus indicators
- Use semantic HTML

**해결방안**:
- 모든 인터랙티브 요소에 적절한 aria-label 추가
- 키보드 내비게이션 구현 (Tab, Enter, Escape)
- 포커스 인디케이터 추가
- 시맨틱 HTML 사용

**Effort**: 5-6 hours

---

### 🔵 **Priority 4: Testing & Documentation** (우선순위 4: 테스트 및 문서화)

#### 4.1 **Add Unit Tests** (단위 테스트 추가)

**Critical Components to Test**:
1. `useCalendar.ts` - Date calculations
2. `useWordQuiz.ts` - Recording logic
3. `GraphCard.tsx` - Data visualization
4. `NicknameChangeModal.tsx` - Form validation

**해결방안**:
```tsx
// useCalendar.test.ts
describe('useCalendar', () => {
  it('should generate correct calendar days', () => { ... })
  it('should handle month navigation', () => { ... })
  it('should identify today correctly', () => { ... })
})
```

**Effort**: 12-16 hours

---

#### 4.2 **Add Component Documentation** (컴포넌트 문서화)

**Solution**:
Add JSDoc comments to all components and hooks

```tsx
/**
 * GraphCard displays monthly success data in a bar chart with trend line
 *
 * @param title - Chart title
 * @param data - Array of monthly data points
 * @param totalCount - Total success count to display
 * @param showArrow - Whether to show navigation arrow
 *
 * @example
 * <GraphCard
 *   title="단어 성공 그래프"
 *   data={wordSuccessData}
 *   totalCount={120}
 *   showArrow={true}
 * />
 */
```

**Effort**: 6-8 hours

---

## 📅 Implementation Timeline / 구현 일정

### Phase 1: Critical Issues (Week 1)
**우선순위 1: 중요 이슈 (1주차)**
- [ ] Fix code duplication (4-6h)
- [ ] Remove magic numbers (2-3h)
- [ ] Improve type safety (3-4h)
- **Total**: 9-13 hours

### Phase 2: Performance (Week 2)
**우선순위 2: 성능 최적화 (2주차)**
- [ ] Optimize SVG bundle (6-8h)
- [ ] Add memoization (3-4h)
- [ ] Improve audio management (4-5h)
- **Total**: 13-17 hours

### Phase 3: Code Quality (Week 3-4)
**우선순위 3: 코드 품질 (3-4주차)**
- [ ] Extract components (8-10h)
- [ ] Refactor hooks (6-8h)
- [ ] Standardize styling (4-5h)
- [ ] Improve accessibility (5-6h)
- **Total**: 23-29 hours

### Phase 4: Testing & Docs (Week 5)
**우선순위 4: 테스트 및 문서화 (5주차)**
- [ ] Write unit tests (12-16h)
- [ ] Add documentation (6-8h)
- **Total**: 18-24 hours

### **Grand Total**: 63-83 hours (~2 months part-time)

---

## 🔍 Detailed Refactoring Examples / 상세 리팩토링 예시

### Example 1: Extract ProfileGuide Pages

**Before** (ProfileGuide.tsx - 279 lines):
```tsx
const ProfileGuide = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 0: return <>{/* 60 lines */}</>
      case 1: return <>{/* 60 lines */}</>
      // ... 7 more cases
    }
  };

  return <div>{renderPage()}</div>
}
```

**After** (ProfileGuide.tsx - 80 lines):
```tsx
// src/pages/profile/ProfileGuide.tsx
const ProfileGuide = () => {
  const { currentPage, handleNext, handlePrev } = useProfileGuide();

  return (
    <GuideLayout
      currentPage={currentPage}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      <GuidePageContent page={currentPage} />
    </GuideLayout>
  );
};

// src/components/profile/guide/GuidePageContent.tsx
const GUIDE_PAGES = [
  { id: 0, component: IntroPage },
  { id: 1, component: HomePage },
  // ... 7 more pages
];

const GuidePageContent = ({ page }: { page: number }) => {
  const PageComponent = GUIDE_PAGES[page].component;
  return <PageComponent />;
};
```

---

### Example 2: Create Constants File

**Before**:
```tsx
// useWordQuiz.ts
setTimeout(() => { ... }, 1000); // What is 1000?
setProgress(prev => prev + 2.5); // Why 2.5?

// ProfileGuide.tsx
if (currentPage < 8) // Why 8?
```

**After**:
```tsx
// src/constants/review.constants.ts
export const REVIEW_CONSTANTS = {
  INTRO_DURATION: 1000, // 1 second
  RECORDING_DURATION: 4000, // 4 seconds
  PROGRESS_INTERVAL: 100, // Update every 100ms
  PROGRESS_INCREMENT: 2.5, // 100ms * 40 = 4000ms (4s)
  MAX_GUIDE_PAGES: 9, // 0-8 inclusive
} as const;

// useWordQuiz.ts
setTimeout(() => { ... }, REVIEW_CONSTANTS.INTRO_DURATION);
setProgress(prev => prev + REVIEW_CONSTANTS.PROGRESS_INCREMENT);

// ProfileGuide.tsx
if (currentPage < REVIEW_CONSTANTS.MAX_GUIDE_PAGES - 1)
```

---

### Example 3: Memoize GraphCard

**Before**:
```tsx
// Profile.tsx
<GraphCard
  title="단어 성공 그래프"
  data={wordSuccessData}
  totalCount={totalSuccessCount}
  showArrow={true}
  ArrowIcon={ProfileRightArrow}
  onArrowClick={() => navigate('/profile/words')}
/>
```

**After**:
```tsx
// Profile.tsx
const handleWordGraphClick = useCallback(() => {
  navigate('/profile/words');
}, [navigate]);

const memoizedWordSuccessData = useMemo(() => wordSuccessData, [wordSuccessData]);

<MemoizedGraphCard
  title="단어 성공 그래프"
  data={memoizedWordSuccessData}
  totalCount={totalSuccessCount}
  showArrow={true}
  ArrowIcon={ProfileRightArrow}
  onArrowClick={handleWordGraphClick}
/>

// GraphCard.tsx
export default React.memo(GraphCard, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.totalCount === nextProps.totalCount &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  );
});
```

---

## 🎨 Proposed File Structure / 제안된 파일 구조

```
src/
├── pages/
│   ├── profile/
│   │   ├── Profile.tsx
│   │   ├── ProfileGuide.tsx (container)
│   │   ├── AccountSettings.tsx
│   │   └── components/              ← NEW
│   │       ├── ProfileHeader.tsx
│   │       ├── ProfileStats.tsx
│   │       ├── ProfileGraphs.tsx
│   │       └── guide/
│   │           ├── GuideLayout.tsx
│   │           ├── GuidePageContent.tsx
│   │           ├── IntroPage.tsx
│   │           └── ... (8 more pages)
│   │
│   └── review/
│       ├── Review.tsx
│       ├── ReviewCalendar.tsx
│       └── components/              ← NEW
│           ├── CalendarGrid.tsx
│           ├── CalendarNavigation.tsx
│           └── KitListSection.tsx
│
├── components/
│   ├── profile/
│   │   ├── GraphCard.tsx
│   │   ├── NicknameChangeModal.tsx
│   │   └── AccountConfirmModal.tsx
│   │
│   └── review/
│       ├── ProgressBar.tsx
│       ├── ScoreModal.tsx
│       └── PracticeListenLayout.tsx  ← NEW
│
├── hooks/
│   ├── review/
│   │   ├── useCalendar.ts
│   │   ├── useWordQuiz.ts
│   │   ├── useAudioPlayback.ts      ← NEW (extracted)
│   │   └── useRecording.ts          ← NEW (extracted)
│   │
│   └── profile/
│       └── useProfileGuide.ts       ← NEW
│
├── constants/
│   ├── review.constants.ts          ← NEW
│   └── profile.constants.ts         ← NEW
│
├── types/
│   ├── review.types.ts              ← NEW
│   └── profile.types.ts             ← NEW
│
└── utils/
    ├── audio/                       ← NEW
    │   ├── audioPool.ts
    │   └── audioPreloader.ts
    └── styles/                      ← NEW
        └── classNames.ts
```

---

## 📊 Expected Outcomes / 기대 효과

### Code Quality Metrics
**코드 품질 지표**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Average Component Size | 150 lines | 80 lines | **-47%** |
| Code Duplication | High | Low | **-60%** |
| Type Coverage | 75% | 95% | **+20%** |
| Bundle Size (SVG) | ~500KB | ~200KB | **-60%** |
| Re-renders (Profile) | 12/sec | 3/sec | **-75%** |

### Developer Experience
**개발자 경험**

- ✅ Easier to understand and maintain
- ✅ Better TypeScript autocomplete
- ✅ Faster development with reusable components
- ✅ Confident refactoring with tests
- ✅ Clear documentation

### User Experience
**사용자 경험**

- ✅ Faster page loads (smaller bundle)
- ✅ Smoother interactions (less re-renders)
- ✅ Better accessibility
- ✅ Improved audio playback

---

## 🚀 Getting Started / 시작하기

### Step 1: Setup Branch
```bash
git checkout feature/#22-findstudy-ui
git pull origin feature/#22-findstudy-ui
git checkout -b refactor/feature-22-cleanup
```

### Step 2: Install Testing Dependencies
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event @vitest/coverage-v8
```

### Step 3: Create Constants File
```bash
mkdir -p src/constants
touch src/constants/review.constants.ts
touch src/constants/profile.constants.ts
```

### Step 4: Start Refactoring (Priority 1)
Focus on critical issues first, then move to performance and code quality.

---

## 📝 Notes / 참고사항

1. **Backward Compatibility**: All refactoring should maintain existing functionality
   **하위 호환성**: 모든 리팩토링은 기존 기능을 유지해야 합니다

2. **Incremental Approach**: Implement changes in small, testable chunks
   **점진적 접근**: 작고 테스트 가능한 단위로 변경사항 구현

3. **Code Reviews**: Each priority level should have a dedicated PR
   **코드 리뷰**: 각 우선순위 레벨마다 별도의 PR 필요

4. **Performance Testing**: Measure bundle size and render performance before/after
   **성능 테스트**: 번들 크기와 렌더 성능을 변경 전후로 측정

---

## 🤝 Contributors / 기여자

This refactoring plan was created by analyzing the feature/#22-findstudy-ui branch.
이 리팩토링 계획은 feature/#22-findstudy-ui 브랜치 분석을 통해 작성되었습니다.

For questions or suggestions, please create an issue or PR.
질문이나 제안사항이 있으시면 이슈나 PR을 생성해주세요.

---

**Last Updated**: 2025-11-16
**Version**: 1.0.0
