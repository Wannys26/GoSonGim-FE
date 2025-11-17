# 🗂️ Folder Structure Refactoring TODO
# 폴더 구조 리팩토링 작업 목록

> **Based on**: `develop` branch (latest)
> **Strategy**: Hybrid approach - organize by domain within technical folders
> **Estimated Total**: 36-49 hours

---

## 📋 Table of Contents / 목차

1. [Current Issues](#-current-issues--현재-문제점)
2. [Target Structure](#-target-structure--목표-구조)
3. [Phase 1: Consolidate Duplicate Folders](#phase-1-consolidate-duplicate-folders)
4. [Phase 2: Reorganize Components](#phase-2-reorganize-components)
5. [Phase 3: Reorganize Hooks](#phase-3-reorganize-hooks)
6. [Phase 4: Reorganize Assets](#phase-4-reorganize-assets)
7. [Phase 5: Reorganize Utils & Constants](#phase-5-reorganize-utils--constants)
8. [Phase 6: Update Imports](#phase-6-update-imports)
9. [Phase 7: Testing & Validation](#phase-7-testing--validation)
10. [Migration Commands](#-migration-commands--마이그레이션-명령어)

---

## 🔍 Current Issues / 현재 문제점

### Discovered Problems in `develop` branch:

1. **Duplicate Folders** (중복 폴더)
   - ❌ `src/api/` (1 file) AND `src/apis/` (6 files)
   - ❌ `src/mock/` (5 domains) AND `src/mocks/` (1 domain)

2. **Inconsistent Naming** (일관성 없는 네이밍)
   - ❌ `components/Login/` (PascalCase)
   - ❌ `components/Nickname/` (PascalCase)
   - ✅ `components/common/` (lowercase)

3. **Misplaced Components** (잘못 위치한 컴포넌트)
   - ❌ `pages/studytalk/CategoryFilter.tsx` (should be in components)
   - ❌ `pages/studytalk/SortFilter.tsx` (should be in components)
   - ❌ `pages/studytalk/EmptyState.tsx` (should be in components)
   - ❌ `pages/studytalk/PracticeKitCard.tsx` (should be in components)
   - ❌ `pages/studytalk/SituationCategoryFilter.tsx` (should be in components)
   - ❌ `pages/studytalk/SituationPracticeCard.tsx` (should be in components)
   - ❌ `pages/studytalk/StudyTalkTabs.tsx` (should be in components)

4. **Scattered Auth Files** (흩어진 인증 파일)
   - Pages in: `login/`, `loginForm/`, `signupForm/`, `nickname/`, `auth/`
   - Components in: `Login/`, `Nickname/`
   - Hooks in: `login/`, `loginForm/`, `signupForm/`, `nickname/`, `mutations/`, `queries/`

5. **Deep SVG Structure** (깊은 SVG 구조)
   - `assets/svgs/login/loginForm/`
   - `assets/svgs/login/signIn/`
   - `assets/svgs/login/signInSheet/`

---

## 🎯 Target Structure / 목표 구조

```
src/
├── pages/                          # Page components by domain
│   ├── auth/                       # All auth pages
│   ├── home/
│   ├── search/
│   ├── review/
│   ├── profile/
│   ├── freetalk/
│   ├── studytalk/
│   └── talkingkit/
│
├── components/                     # UI components by domain
│   ├── auth/                       # All auth components
│   ├── home/
│   ├── search/
│   ├── review/
│   ├── profile/
│   ├── freetalk/
│   ├── studytalk/                  # NEW - move from pages
│   ├── talkingkit/
│   └── common/                     # Shared components
│
├── hooks/                          # Custom hooks by domain
│   ├── auth/                       # All auth hooks
│   │   ├── mutations/
│   │   └── queries/
│   ├── search/
│   │   └── queries/
│   ├── review/
│   ├── freetalk/
│   ├── talkingkit/
│   │   ├── queries/
│   │   ├── common/
│   │   ├── breathing/
│   │   ├── loudSound/
│   │   └── shortSound/
│   └── common/                     # Shared hooks
│
├── apis/                           # All API calls (consolidated)
├── mock/                           # All mock data (consolidated)
├── types/                          # TypeScript types
├── utils/                          # Utility functions
├── constants/                      # Constants
├── stores/                         # Global state
└── assets/                         # Static assets
    └── svgs/
        ├── auth/                   # Flattened auth SVGs
        ├── common/
        └── ...
```

---

## Phase 1: Consolidate Duplicate Folders
## 1단계: 중복 폴더 통합

**Goal**: Merge duplicate `api/apis` and `mock/mocks` folders
**목표**: 중복된 api/apis와 mock/mocks 폴더 통합

### 1.1 Consolidate API Folders (api → apis)
**중복 API 폴더 통합 (api → apis)**

- [ ] **Task 1.1.1**: Move `src/api/talkingkit.ts` to `src/apis/talkingkit.api.ts`
  ```bash
  mv src/api/talkingkit.ts src/apis/talkingkit.api.ts
  ```
  - **Files affected**: 1 file
  - **Estimated time**: 10 min

- [ ] **Task 1.1.2**: Update imports referencing `@/api/talkingkit`
  ```bash
  # Find all imports
  grep -r "from '@/api/talkingkit'" src/

  # Replace with
  # from '@/apis/talkingkit.api'
  ```
  - **Files to update**: Find with grep
  - **Estimated time**: 20 min

- [ ] **Task 1.1.3**: Delete empty `src/api/` folder
  ```bash
  rm -rf src/api/
  ```
  - **Estimated time**: 5 min

**Subtotal**: ~35 min

---

### 1.2 Consolidate Mock Folders (mocks → mock)
**중복 Mock 폴더 통합 (mocks → mock)**

- [ ] **Task 1.2.1**: Move `src/mocks/talkingkit/` to `src/mock/talkingkit/`
  ```bash
  mv src/mocks/talkingkit/* src/mock/talkingkit/
  ```
  - **Files affected**: Check with `ls src/mocks/talkingkit/`
  - **Estimated time**: 10 min

- [ ] **Task 1.2.2**: Update imports referencing `@/mocks/`
  ```bash
  # Find all imports
  grep -r "from '@/mocks/" src/

  # Replace with
  # from '@/mock/
  ```
  - **Files to update**: Find with grep
  - **Estimated time**: 20 min

- [ ] **Task 1.2.3**: Delete empty `src/mocks/` folder
  ```bash
  rm -rf src/mocks/
  ```
  - **Estimated time**: 5 min

**Subtotal**: ~35 min

---

**Phase 1 Total**: ~70 min (1-1.5 hours)

---

## Phase 2: Reorganize Components
## 2단계: 컴포넌트 재구성

**Goal**: Organize components by domain, rename inconsistent folders
**목표**: 도메인별 컴포넌트 구성, 일관성 없는 폴더 이름 변경

### 2.1 Rename Component Folders to Lowercase
**컴포넌트 폴더를 소문자로 변경**

- [ ] **Task 2.1.1**: Rename `components/Login/` → `components/auth/`
  ```bash
  mkdir -p src/components/auth
  mv src/components/Login/button/* src/components/auth/
  mv src/components/Login/input/* src/components/auth/
  mv src/components/Login/signUp/* src/components/auth/
  ```
  - **Files affected**: ~5 files
  - **Estimated time**: 15 min

- [ ] **Task 2.1.2**: Rename `components/Nickname/` → merge into `components/auth/`
  ```bash
  mv src/components/Nickname/button/* src/components/auth/
  mv src/components/Nickname/input/* src/components/auth/
  ```
  - **Files affected**: ~2 files
  - **Estimated time**: 10 min

- [ ] **Task 2.1.3**: Update imports for Login components
  ```bash
  # Find: @/components/Login
  # Replace: @/components/auth
  ```
  - **Files to update**: ~10-15 files
  - **Estimated time**: 30 min

- [ ] **Task 2.1.4**: Update imports for Nickname components
  ```bash
  # Find: @/components/Nickname
  # Replace: @/components/auth
  ```
  - **Files to update**: ~5 files
  - **Estimated time**: 15 min

- [ ] **Task 2.1.5**: Delete old folders
  ```bash
  rm -rf src/components/Login
  rm -rf src/components/Nickname
  ```
  - **Estimated time**: 5 min

**Subtotal**: ~75 min

---

### 2.2 Move Studytalk Components from Pages to Components
**Studytalk 컴포넌트를 Pages에서 Components로 이동**

- [ ] **Task 2.2.1**: Create `components/studytalk/` folder
  ```bash
  mkdir -p src/components/studytalk
  ```
  - **Estimated time**: 2 min

- [ ] **Task 2.2.2**: Move component files from `pages/studytalk/` to `components/studytalk/`
  ```bash
  mv src/pages/studytalk/CategoryFilter.tsx src/components/studytalk/
  mv src/pages/studytalk/SortFilter.tsx src/components/studytalk/
  mv src/pages/studytalk/EmptyState.tsx src/components/studytalk/
  mv src/pages/studytalk/PracticeKitCard.tsx src/components/studytalk/
  mv src/pages/studytalk/SituationCategoryFilter.tsx src/components/studytalk/
  mv src/pages/studytalk/SituationPracticeCard.tsx src/components/studytalk/
  mv src/pages/studytalk/StudyTalkTabs.tsx src/components/studytalk/
  ```
  - **Files affected**: 7 files
  - **Estimated time**: 10 min

- [ ] **Task 2.2.3**: Update imports in `HomeStudyTalk.tsx`
  ```tsx
  // Before
  import CategoryFilter from './CategoryFilter';
  import SortFilter from './SortFilter';
  // ...

  // After
  import CategoryFilter from '@/components/studytalk/CategoryFilter';
  import SortFilter from '@/components/studytalk/SortFilter';
  // ...
  ```
  - **Files to update**: `pages/studytalk/HomeStudyTalk.tsx`
  - **Estimated time**: 15 min

**Subtotal**: ~27 min

---

### 2.3 Create Missing Component Folders
**누락된 컴포넌트 폴더 생성**

- [ ] **Task 2.3.1**: Create `components/search/` folder
  ```bash
  mkdir -p src/components/search
  ```
  - **Note**: Currently no search-specific components, but prepare for future
  - **Estimated time**: 2 min

**Subtotal**: ~2 min

---

**Phase 2 Total**: ~104 min (~1.5-2 hours)

---

## Phase 3: Reorganize Hooks
## 3단계: 훅 재구성

**Goal**: Organize hooks by domain
**목표**: 도메인별 훅 구성

### 3.1 Consolidate Auth Hooks
**인증 훅 통합**

- [ ] **Task 3.1.1**: Create auth hooks folder structure
  ```bash
  mkdir -p src/hooks/auth/mutations
  mkdir -p src/hooks/auth/queries
  ```
  - **Estimated time**: 2 min

- [ ] **Task 3.1.2**: Move login hooks to `hooks/auth/`
  ```bash
  mv src/hooks/login/* src/hooks/auth/
  ```
  - **Files affected**: Check with `ls src/hooks/login/`
  - **Estimated time**: 5 min

- [ ] **Task 3.1.3**: Move loginForm hooks to `hooks/auth/`
  ```bash
  mv src/hooks/loginForm/* src/hooks/auth/
  ```
  - **Files affected**: Check with `ls src/hooks/loginForm/`
  - **Estimated time**: 5 min

- [ ] **Task 3.1.4**: Move signupForm hooks to `hooks/auth/`
  ```bash
  mv src/hooks/signupForm/* src/hooks/auth/
  ```
  - **Files affected**: Check with `ls src/hooks/signupForm/`
  - **Estimated time**: 5 min

- [ ] **Task 3.1.5**: Move nickname hooks to `hooks/auth/`
  ```bash
  mv src/hooks/nickname/* src/hooks/auth/
  ```
  - **Files affected**: Check with `ls src/hooks/nickname/`
  - **Estimated time**: 5 min

- [ ] **Task 3.1.6**: Move auth mutations to `hooks/auth/mutations/`
  ```bash
  mv src/hooks/mutations/useLoginMutation.ts src/hooks/auth/mutations/
  mv src/hooks/mutations/useLogoutMutation.ts src/hooks/auth/mutations/
  mv src/hooks/mutations/useSignupMutation.ts src/hooks/auth/mutations/
  ```
  - **Files affected**: 3 files
  - **Estimated time**: 5 min

- [ ] **Task 3.1.7**: Move auth queries to `hooks/auth/queries/`
  ```bash
  mv src/hooks/queries/useValidateEmail.ts src/hooks/auth/queries/
  ```
  - **Files affected**: 1 file
  - **Estimated time**: 3 min

- [ ] **Task 3.1.8**: Update imports for auth hooks
  ```bash
  # Find patterns:
  # - @/hooks/login/
  # - @/hooks/loginForm/
  # - @/hooks/signupForm/
  # - @/hooks/nickname/
  # - @/hooks/mutations/useLogin
  # - @/hooks/mutations/useLogout
  # - @/hooks/mutations/useSignup
  # - @/hooks/queries/useValidateEmail

  # Replace with:
  # - @/hooks/auth/
  # - @/hooks/auth/mutations/
  # - @/hooks/auth/queries/
  ```
  - **Files to update**: ~15-20 files
  - **Estimated time**: 45 min

- [ ] **Task 3.1.9**: Delete old auth hook folders
  ```bash
  rm -rf src/hooks/login
  rm -rf src/hooks/loginForm
  rm -rf src/hooks/signupForm
  rm -rf src/hooks/nickname
  ```
  - **Estimated time**: 3 min

**Subtotal**: ~78 min

---

### 3.2 Organize Search Hooks
**검색 훅 구성**

- [ ] **Task 3.2.1**: Create search hooks folder
  ```bash
  mkdir -p src/hooks/search/queries
  ```
  - **Estimated time**: 2 min

- [ ] **Task 3.2.2**: Move situation queries to `hooks/search/queries/`
  ```bash
  mv src/hooks/queries/useSituations.ts src/hooks/search/queries/
  mv src/hooks/queries/useSituationDetail.ts src/hooks/search/queries/
  ```
  - **Files affected**: 2 files
  - **Estimated time**: 5 min

- [ ] **Task 3.2.3**: Update imports for search hooks
  ```bash
  # Find: @/hooks/queries/useSituations
  # Replace: @/hooks/search/queries/useSituations

  # Find: @/hooks/queries/useSituationDetail
  # Replace: @/hooks/search/queries/useSituationDetail
  ```
  - **Files to update**: ~5 files
  - **Estimated time**: 15 min

**Subtotal**: ~22 min

---

### 3.3 Organize Talkingkit Hooks
**조음키트 훅 구성**

- [ ] **Task 3.3.1**: Create talkingkit queries folder
  ```bash
  mkdir -p src/hooks/talkingkit/queries
  ```
  - **Estimated time**: 2 min

- [ ] **Task 3.3.2**: Move kit queries to `hooks/talkingkit/queries/`
  ```bash
  mv src/hooks/queries/useKitCategories.ts src/hooks/talkingkit/queries/
  mv src/hooks/queries/useKitDetail.ts src/hooks/talkingkit/queries/
  mv src/hooks/queries/useKitsByCategory.ts src/hooks/talkingkit/queries/
  ```
  - **Files affected**: 3 files
  - **Estimated time**: 5 min

- [ ] **Task 3.3.3**: Update imports for talkingkit queries
  ```bash
  # Find: @/hooks/queries/useKitCategories
  # Replace: @/hooks/talkingkit/queries/useKitCategories

  # (same for other kit queries)
  ```
  - **Files to update**: ~10 files
  - **Estimated time**: 20 min

**Subtotal**: ~27 min

---

### 3.4 Clean Up Empty Folders
**빈 폴더 정리**

- [ ] **Task 3.4.1**: Delete empty `hooks/queries/` folder
  ```bash
  rm -rf src/hooks/queries
  ```
  - **Estimated time**: 2 min

- [ ] **Task 3.4.2**: Delete empty `hooks/mutations/` folder
  ```bash
  rm -rf src/hooks/mutations
  ```
  - **Estimated time**: 2 min

**Subtotal**: ~4 min

---

### 3.5 Move Common Hooks
**공통 훅 이동**

- [ ] **Task 3.5.1**: Move `useDebounce.ts` to `hooks/common/`
  ```bash
  mv src/hooks/useDebounce.ts src/hooks/common/useDebounce.ts
  ```
  - **Files affected**: 1 file
  - **Estimated time**: 3 min

- [ ] **Task 3.5.2**: Update imports for `useDebounce`
  ```bash
  # Find: @/hooks/useDebounce
  # Replace: @/hooks/common/useDebounce
  ```
  - **Files to update**: ~5 files
  - **Estimated time**: 10 min

**Subtotal**: ~13 min

---

**Phase 3 Total**: ~144 min (~2-2.5 hours)

---

## Phase 4: Reorganize Assets
## 4단계: 에셋 재구성

**Goal**: Flatten SVG structure, organize by domain
**목표**: SVG 구조 평탄화, 도메인별 구성

### 4.1 Consolidate Auth SVGs
**인증 SVG 통합**

- [ ] **Task 4.1.1**: Create auth SVG folders
  ```bash
  mkdir -p src/assets/svgs/auth/login
  mkdir -p src/assets/svgs/auth/signup
  mkdir -p src/assets/svgs/auth/nickname
  ```
  - **Estimated time**: 3 min

- [ ] **Task 4.1.2**: Move login SVGs to `auth/login/`
  ```bash
  mv src/assets/svgs/login/loginForm/* src/assets/svgs/auth/login/
  mv src/assets/svgs/login/signIn/* src/assets/svgs/auth/login/
  mv src/assets/svgs/login/signInSheet/* src/assets/svgs/auth/signup/
  # Move any remaining login SVGs
  mv src/assets/svgs/login/* src/assets/svgs/auth/login/
  ```
  - **Files affected**: Check with `find src/assets/svgs/login/`
  - **Estimated time**: 10 min

- [ ] **Task 4.1.3**: Move nickname SVGs to `auth/nickname/`
  ```bash
  mv src/assets/svgs/nickname/* src/assets/svgs/auth/nickname/
  ```
  - **Files affected**: Check with `ls src/assets/svgs/nickname/`
  - **Estimated time**: 5 min

- [ ] **Task 4.1.4**: Update SVG imports in auth components
  ```tsx
  // Before
  import Icon from '@/assets/svgs/login/loginForm/icon.svg';

  // After
  import Icon from '@/assets/svgs/auth/login/icon.svg';
  ```
  - **Files to update**: All auth components
  - **Estimated time**: 30 min

- [ ] **Task 4.1.5**: Delete old login/nickname folders
  ```bash
  rm -rf src/assets/svgs/login
  rm -rf src/assets/svgs/nickname
  ```
  - **Estimated time**: 3 min

**Subtotal**: ~51 min

---

### 4.2 Rename studyfind → search
**studyfind를 search로 이름 변경**

- [ ] **Task 4.2.1**: Rename folder
  ```bash
  mv src/assets/svgs/studyfind src/assets/svgs/search
  ```
  - **Estimated time**: 2 min

- [ ] **Task 4.2.2**: Update SVG imports
  ```bash
  # Find: @/assets/svgs/studyfind
  # Replace: @/assets/svgs/search
  ```
  - **Files to update**: ~5 files
  - **Estimated time**: 10 min

**Subtotal**: ~12 min

---

### 4.3 Create common SVG folder
**공통 SVG 폴더 생성**

- [ ] **Task 4.3.1**: Create common SVG folder
  ```bash
  mkdir -p src/assets/svgs/common
  ```
  - **Estimated time**: 2 min

- [ ] **Task 4.3.2**: Move bottomNav SVGs (already in common location)
  ```bash
  # Already at src/assets/svgs/bottomNav/
  # Optionally move to common/bottomNav/ for consistency
  mv src/assets/svgs/bottomNav src/assets/svgs/common/bottomNav
  ```
  - **Files affected**: Check with `ls src/assets/svgs/bottomNav/`
  - **Estimated time**: 5 min

- [ ] **Task 4.3.3**: Update bottomNav SVG imports
  ```bash
  # Find: @/assets/svgs/bottomNav
  # Replace: @/assets/svgs/common/bottomNav
  ```
  - **Files to update**: 1-2 files
  - **Estimated time**: 5 min

**Subtotal**: ~12 min

---

**Phase 4 Total**: ~75 min (~1-1.5 hours)

---

## Phase 5: Reorganize Utils & Constants
## 5단계: Utils 및 Constants 재구성

**Goal**: Organize utils by domain, create missing constants
**목표**: 도메인별 유틸 구성, 누락된 상수 파일 생성

### 5.1 Reorganize Utils
**유틸 재구성**

- [ ] **Task 5.1.1**: Create utils folder structure
  ```bash
  mkdir -p src/utils/auth
  mkdir -p src/utils/common
  ```
  - **Estimated time**: 2 min

- [ ] **Task 5.1.2**: Move login utils to `utils/auth/`
  ```bash
  mv src/utils/login/validationUtils.ts src/utils/auth/validationUtils.ts
  ```
  - **Files affected**: 1 file
  - **Estimated time**: 3 min

- [ ] **Task 5.1.3**: Move shared utils to `utils/common/`
  ```bash
  mv src/utils/audioUtils.ts src/utils/common/audioUtils.ts
  mv src/utils/errorHandlerUtils.ts src/utils/common/errorHandlerUtils.ts
  mv src/utils/loggerUtils.ts src/utils/common/loggerUtils.ts
  mv src/utils/situationUtils.ts src/utils/common/situationUtils.ts
  ```
  - **Files affected**: 4 files
  - **Estimated time**: 5 min

- [ ] **Task 5.1.4**: Update utils imports
  ```bash
  # Find: @/utils/login/
  # Replace: @/utils/auth/

  # Find: @/utils/audioUtils
  # Replace: @/utils/common/audioUtils

  # (same for other utils)
  ```
  - **Files to update**: ~20 files
  - **Estimated time**: 30 min

- [ ] **Task 5.1.5**: Delete old utils folders
  ```bash
  rm -rf src/utils/login
  ```
  - **Estimated time**: 2 min

**Subtotal**: ~42 min

---

### 5.2 Create Missing Constants
**누락된 상수 생성**

- [ ] **Task 5.2.1**: Create `constants/review.constants.ts`
  ```ts
  export const REVIEW_CONSTANTS = {
    INTRO_DURATION: 1000,
    RECORDING_DURATION: 4000,
    PROGRESS_INTERVAL: 100,
    PROGRESS_INCREMENT: 2.5,
    MAX_GUIDE_PAGES: 9,
  } as const;
  ```
  - **Estimated time**: 15 min

- [ ] **Task 5.2.2**: Create `constants/profile.constants.ts`
  ```ts
  export const PROFILE_CONSTANTS = {
    MAX_NICKNAME_LENGTH: 10,
    MIN_NICKNAME_LENGTH: 2,
  } as const;
  ```
  - **Estimated time**: 10 min

- [ ] **Task 5.2.3**: Create `constants/search.constants.ts`
  ```ts
  export const SEARCH_CONSTANTS = {
    // Add search-related constants
  } as const;
  ```
  - **Estimated time**: 10 min

- [ ] **Task 5.2.4**: Replace magic numbers in review code
  - Update `useWordQuiz.ts`
  - Update `ProfileGuide.tsx`
  - **Estimated time**: 30 min

- [ ] **Task 5.2.5**: Replace magic numbers in profile code
  - Update `NicknameChangeModal.tsx`
  - **Estimated time**: 15 min

**Subtotal**: ~80 min

---

**Phase 5 Total**: ~122 min (~2 hours)

---

## Phase 6: Update Imports
## 6단계: Import 업데이트

**Goal**: Ensure all imports reflect new structure
**목표**: 모든 import가 새 구조를 반영하도록 업데이트

### 6.1 Verify Import Updates
**Import 업데이트 확인**

- [ ] **Task 6.1.1**: Search for old import paths
  ```bash
  # Check for any remaining old imports
  grep -r "@/api/" src/
  grep -r "@/mocks/" src/
  grep -r "@/components/Login" src/
  grep -r "@/components/Nickname" src/
  grep -r "@/hooks/login/" src/
  grep -r "@/hooks/loginForm/" src/
  grep -r "@/hooks/signupForm/" src/
  grep -r "@/hooks/nickname/" src/
  grep -r "@/hooks/mutations/" src/
  grep -r "@/hooks/queries/" src/
  grep -r "@/assets/svgs/login/" src/
  grep -r "@/assets/svgs/nickname/" src/
  grep -r "@/assets/svgs/studyfind/" src/
  grep -r "@/utils/login/" src/
  ```
  - **Estimated time**: 15 min

- [ ] **Task 6.1.2**: Fix any remaining incorrect imports
  - Manually review and fix
  - **Estimated time**: 30 min

**Subtotal**: ~45 min

---

### 6.2 Update Path Mappings (if needed)
**경로 매핑 업데이트 (필요시)**

- [ ] **Task 6.2.1**: Verify `tsconfig.json` path mappings
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"],
        "@/pages/*": ["./src/pages/*"],
        "@/components/*": ["./src/components/*"],
        "@/hooks/*": ["./src/hooks/*"],
        "@/apis/*": ["./src/apis/*"],
        "@/types/*": ["./src/types/*"],
        "@/utils/*": ["./src/utils/*"],
        "@/constants/*": ["./src/constants/*"],
        "@/stores/*": ["./src/stores/*"],
        "@/assets/*": ["./src/assets/*"],
        "@/mock/*": ["./src/mock/*"]
      }
    }
  }
  ```
  - **Estimated time**: 10 min

**Subtotal**: ~10 min

---

**Phase 6 Total**: ~55 min (~1 hour)

---

## Phase 7: Testing & Validation
## 7단계: 테스트 및 검증

**Goal**: Ensure everything works after refactoring
**목표**: 리팩토링 후 모든 것이 정상 작동하는지 확인

### 7.1 Build & Runtime Tests
**빌드 및 런타임 테스트**

- [ ] **Task 7.1.1**: Run TypeScript compiler
  ```bash
  npm run type-check
  # or
  tsc --noEmit
  ```
  - **Expected**: No TypeScript errors
  - **Estimated time**: 5 min

- [ ] **Task 7.1.2**: Run development server
  ```bash
  npm run dev
  ```
  - **Expected**: Server starts without errors
  - **Estimated time**: 5 min

- [ ] **Task 7.1.3**: Test all routes manually
  - [ ] `/` (Landing)
  - [ ] `/login`
  - [ ] `/login/email`
  - [ ] `/signup/email`
  - [ ] `/home`
  - [ ] `/search`
  - [ ] `/review`
  - [ ] `/profile`
  - [ ] `/freetalk`
  - [ ] `/studytalk`
  - [ ] `/talkingkit`
  - **Estimated time**: 30 min

- [ ] **Task 7.1.4**: Check for console errors
  - Open DevTools, check for any errors or warnings
  - **Estimated time**: 15 min

- [ ] **Task 7.1.5**: Build for production
  ```bash
  npm run build
  ```
  - **Expected**: Build succeeds
  - **Estimated time**: 10 min

**Subtotal**: ~65 min

---

### 7.2 Code Quality Checks
**코드 품질 검사**

- [ ] **Task 7.2.1**: Run linter
  ```bash
  npm run lint
  ```
  - **Expected**: No linting errors
  - **Estimated time**: 5 min

- [ ] **Task 7.2.2**: Fix any linting issues
  ```bash
  npm run lint:fix
  ```
  - **Estimated time**: 15 min

**Subtotal**: ~20 min

---

### 7.3 Documentation
**문서화**

- [ ] **Task 7.3.1**: Update README.md with new folder structure
  - Add "Folder Structure" section
  - Document naming conventions
  - **Estimated time**: 30 min

- [ ] **Task 7.3.2**: Create CONTRIBUTING.md (optional)
  - Guidelines for adding new features
  - Where to place files
  - **Estimated time**: 20 min

- [ ] **Task 7.3.3**: Update team on new structure
  - Send notification
  - Schedule knowledge sharing session
  - **Estimated time**: 15 min

**Subtotal**: ~65 min

---

**Phase 7 Total**: ~150 min (~2.5 hours)

---

## 📊 Summary / 요약

### Total Estimated Time by Phase

| Phase | Description | Tasks | Estimated Time |
|-------|-------------|-------|----------------|
| **Phase 1** | Consolidate Duplicate Folders | 6 | ~70 min (1-1.5h) |
| **Phase 2** | Reorganize Components | 8 | ~104 min (1.5-2h) |
| **Phase 3** | Reorganize Hooks | 19 | ~144 min (2-2.5h) |
| **Phase 4** | Reorganize Assets | 9 | ~75 min (1-1.5h) |
| **Phase 5** | Reorganize Utils & Constants | 10 | ~122 min (2h) |
| **Phase 6** | Update Imports | 3 | ~55 min (1h) |
| **Phase 7** | Testing & Validation | 11 | ~150 min (2.5h) |
| **TOTAL** | | **66 tasks** | **~720 min (12 hours)** |

### Progress Tracking

- **Total Tasks**: 66
- **Completed**: 0
- **In Progress**: 0
- **Remaining**: 66
- **Completion**: 0%

---

## 🚀 Migration Commands / 마이그레이션 명령어

### Quick Reference Scripts

#### Phase 1: Consolidate APIs
```bash
# Move talkingkit API
mv src/api/talkingkit.ts src/apis/talkingkit.api.ts

# Delete old folder
rm -rf src/api/

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/api/talkingkit|@/apis/talkingkit.api|g" {} +
```

#### Phase 1: Consolidate Mocks
```bash
# Move talkingkit mock
mv src/mocks/talkingkit/* src/mock/talkingkit/

# Delete old folder
rm -rf src/mocks/

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/mocks/|@/mock/|g" {} +
```

#### Phase 2: Rename Components
```bash
# Create auth components folder
mkdir -p src/components/auth

# Move Login components
mv src/components/Login/button/* src/components/auth/
mv src/components/Login/input/* src/components/auth/
mv src/components/Login/signUp/* src/components/auth/

# Move Nickname components
mv src/components/Nickname/button/* src/components/auth/
mv src/components/Nickname/input/* src/components/auth/

# Delete old folders
rm -rf src/components/Login
rm -rf src/components/Nickname

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/components/Login|@/components/auth|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/components/Nickname|@/components/auth|g" {} +
```

#### Phase 2: Move Studytalk Components
```bash
# Create studytalk components folder
mkdir -p src/components/studytalk

# Move components
mv src/pages/studytalk/CategoryFilter.tsx src/components/studytalk/
mv src/pages/studytalk/SortFilter.tsx src/components/studytalk/
mv src/pages/studytalk/EmptyState.tsx src/components/studytalk/
mv src/pages/studytalk/PracticeKitCard.tsx src/components/studytalk/
mv src/pages/studytalk/SituationCategoryFilter.tsx src/components/studytalk/
mv src/pages/studytalk/SituationPracticeCard.tsx src/components/studytalk/
mv src/pages/studytalk/StudyTalkTabs.tsx src/components/studytalk/
```

#### Phase 3: Consolidate Auth Hooks
```bash
# Create auth hooks structure
mkdir -p src/hooks/auth/mutations
mkdir -p src/hooks/auth/queries

# Move hooks
mv src/hooks/login/* src/hooks/auth/
mv src/hooks/loginForm/* src/hooks/auth/
mv src/hooks/signupForm/* src/hooks/auth/
mv src/hooks/nickname/* src/hooks/auth/
mv src/hooks/mutations/useLoginMutation.ts src/hooks/auth/mutations/
mv src/hooks/mutations/useLogoutMutation.ts src/hooks/auth/mutations/
mv src/hooks/mutations/useSignupMutation.ts src/hooks/auth/mutations/
mv src/hooks/queries/useValidateEmail.ts src/hooks/auth/queries/

# Delete old folders
rm -rf src/hooks/login
rm -rf src/hooks/loginForm
rm -rf src/hooks/signupForm
rm -rf src/hooks/nickname

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/login/|@/hooks/auth/|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/loginForm/|@/hooks/auth/|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/signupForm/|@/hooks/auth/|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/nickname/|@/hooks/auth/|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/mutations/useLogin|@/hooks/auth/mutations/useLogin|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/mutations/useLogout|@/hooks/auth/mutations/useLogout|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/mutations/useSignup|@/hooks/auth/mutations/useSignup|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/queries/useValidateEmail|@/hooks/auth/queries/useValidateEmail|g" {} +
```

#### Phase 3: Organize Search & Talkingkit Hooks
```bash
# Create search hooks structure
mkdir -p src/hooks/search/queries

# Move search hooks
mv src/hooks/queries/useSituations.ts src/hooks/search/queries/
mv src/hooks/queries/useSituationDetail.ts src/hooks/search/queries/

# Create talkingkit queries folder
mkdir -p src/hooks/talkingkit/queries

# Move talkingkit hooks
mv src/hooks/queries/useKitCategories.ts src/hooks/talkingkit/queries/
mv src/hooks/queries/useKitDetail.ts src/hooks/talkingkit/queries/
mv src/hooks/queries/useKitsByCategory.ts src/hooks/talkingkit/queries/

# Delete old folders
rm -rf src/hooks/queries
rm -rf src/hooks/mutations

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/queries/useSituations|@/hooks/search/queries/useSituations|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/queries/useSituationDetail|@/hooks/search/queries/useSituationDetail|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/hooks/queries/useKit|@/hooks/talkingkit/queries/useKit|g" {} +
```

#### Phase 4: Reorganize Assets
```bash
# Create auth SVG folders
mkdir -p src/assets/svgs/auth/login
mkdir -p src/assets/svgs/auth/signup
mkdir -p src/assets/svgs/auth/nickname

# Move login SVGs
mv src/assets/svgs/login/loginForm/* src/assets/svgs/auth/login/
mv src/assets/svgs/login/signIn/* src/assets/svgs/auth/login/
mv src/assets/svgs/login/signInSheet/* src/assets/svgs/auth/signup/
mv src/assets/svgs/login/* src/assets/svgs/auth/login/

# Move nickname SVGs
mv src/assets/svgs/nickname/* src/assets/svgs/auth/nickname/

# Delete old folders
rm -rf src/assets/svgs/login
rm -rf src/assets/svgs/nickname

# Rename studyfind to search
mv src/assets/svgs/studyfind src/assets/svgs/search

# Move bottomNav to common
mkdir -p src/assets/svgs/common
mv src/assets/svgs/bottomNav src/assets/svgs/common/bottomNav

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/assets/svgs/login|@/assets/svgs/auth/login|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/assets/svgs/nickname|@/assets/svgs/auth/nickname|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/assets/svgs/studyfind|@/assets/svgs/search|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/assets/svgs/bottomNav|@/assets/svgs/common/bottomNav|g" {} +
```

#### Phase 5: Reorganize Utils
```bash
# Create utils structure
mkdir -p src/utils/auth
mkdir -p src/utils/common

# Move utils
mv src/utils/login/validationUtils.ts src/utils/auth/validationUtils.ts
mv src/utils/audioUtils.ts src/utils/common/audioUtils.ts
mv src/utils/errorHandlerUtils.ts src/utils/common/errorHandlerUtils.ts
mv src/utils/loggerUtils.ts src/utils/common/loggerUtils.ts
mv src/utils/situationUtils.ts src/utils/common/situationUtils.ts

# Delete old folders
rm -rf src/utils/login

# Update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/utils/login/|@/utils/auth/|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/utils/audioUtils|@/utils/common/audioUtils|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/utils/errorHandlerUtils|@/utils/common/errorHandlerUtils|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/utils/loggerUtils|@/utils/common/loggerUtils|g" {} +
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|@/utils/situationUtils|@/utils/common/situationUtils|g" {} +
```

---

## 🎯 Success Criteria / 성공 기준

- [ ] All TypeScript compilation errors resolved
- [ ] All routes accessible without errors
- [ ] No console errors in development mode
- [ ] Production build succeeds
- [ ] All imports updated correctly
- [ ] No duplicate folders remaining
- [ ] Consistent naming conventions throughout
- [ ] Documentation updated

---

## 📝 Notes / 참고사항

### Important Reminders

1. **Create a new branch** before starting
   ```bash
   git checkout -b refactor/folder-structure-hybrid
   ```

2. **Commit after each phase** for easy rollback
   ```bash
   git add .
   git commit -m "refactor: complete phase 1 - consolidate duplicate folders"
   ```

3. **Test frequently** - don't wait until the end

4. **Keep `develop` branch updated** while working
   ```bash
   git fetch origin develop
   git rebase origin/develop
   ```

5. **Use find/replace carefully** - verify changes before committing

### Helpful Commands

```bash
# Search for old import patterns
grep -r "pattern" src/

# Count files in a directory
find src/path -type f | wc -l

# Find all TypeScript files
find src -type f \( -name "*.tsx" -o -name "*.ts" \)

# Check for TypeScript errors
npm run type-check

# Run linter
npm run lint
```

---

## ✅ Final Checklist / 최종 체크리스트

### Pre-Migration
- [ ] Backup current codebase (commit all changes)
- [ ] Create new branch
- [ ] Review this TODO plan
- [ ] Communicate with team

### Post-Migration
- [ ] All tasks completed
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Create PR for review
- [ ] Merge to develop

---

**Last Updated**: 2025-11-17
**Based on**: `develop` branch (commit: ca3124d)
**Strategy**: Hybrid (Option 2)
**Total Tasks**: 66
**Estimated Time**: ~12 hours

---

## 📞 Questions? / 질문?

If you encounter issues during migration:
1. Check the "Migration Commands" section for quick reference
2. Review the specific task description
3. Search for similar import patterns in the codebase
4. Ask team members for clarification

리팩토링 중 문제가 발생하면:
1. "마이그레이션 명령어" 섹션 참조
2. 특정 작업 설명 검토
3. 코드베이스에서 유사한 import 패턴 검색
4. 팀원에게 질문

---

**Happy Refactoring! 🚀**
**즐거운 리팩토링 되세요! 🚀**
