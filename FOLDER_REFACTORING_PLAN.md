# 🗂️ Complete Folder Structure Refactoring Plan
# 전체 폴더 구조 리팩토링 계획

## 📊 Current Structure Analysis / 현재 구조 분석

### Current Problems / 현재 문제점

1. **Inconsistent Naming** (일관성 없는 네이밍)
   - `src/components/Login/` (대문자) vs `src/components/common/` (소문자)
   - `src/api/` and `src/apis/` (중복된 폴더)
   - `src/mock/` and `src/mocks/` (중복된 폴더)

2. **Inconsistent Component Organization** (일관성 없는 컴포넌트 구성)
   - Some components in `src/pages/studytalk/` (CategoryFilter, SortFilter, etc.)
   - Should be in `src/components/studytalk/`
   - Mixing page components with UI components

3. **Deep vs Flat Structure** (깊은 구조 vs 평면 구조)
   - `talkingkit` has deep structure: `components/talkingkit/breathing/`, `hooks/talkingkit/breathing/`
   - Other domains are flat: `components/profile/`, `hooks/review/`

4. **No Domain-Driven Organization** (도메인 기반 구성 없음)
   - Organized by technical type (components, hooks, utils) rather than domain
   - Hard to find all files related to a feature

5. **Asset Organization** (에셋 구성)
   - Deep SVG folder structure: `assets/svgs/login/loginForm/`, `assets/svgs/login/signIn/`
   - Could be flatter and more organized by domain

---

## 🎯 Routing Structure from router.tsx / 라우터 구조

### Route Hierarchy / 라우트 계층

```
/ (root)
├── / (landing)
├── /login
│   └── /login/email
├── /signup
│   └── /signup/email
├── /callback
│
├── /home
├── /signup/nickname
│
├── /search
│   ├── /search/diagnosis
│   ├── /search/articulation-position
│   ├── /search/articulation-position/lip-sound/step1
│   ├── /search/articulation-position/lip-sound/step2
│   ├── /search/articulation-position/lip-sound/practice
│   ├── /search/articulation-position/lip-sound/result
│   ├── /search/articulation-method
│   ├── /search/situation/:category
│   └── /search/situation/:category/:situationId
│
├── /review
│   ├── /review/calendar
│   ├── /review/practice
│   ├── /review/practice/listen
│   ├── /review/practice/articulation-listen
│   ├── /review/word-quiz
│   └── /review/word-list
│
├── /profile
│   ├── /profile/words
│   ├── /profile/guide
│   └── /profile/account-settings
│
├── /freetalk
│   └── /freetalk/intro
│
├── /studytalk
│
└── /talkingkit
    ├── /talkingkit/:id
    ├── /talkingkit/:id/breathing
    ├── /talkingkit/:id/steady-sound
    ├── /talkingkit/:id/short-sound
    ├── /talkingkit/:id/loud-sound
    ├── /talkingkit/:id/loud-sound-volume
    ├── /talkingkit/:id/loud-sound-volume/result
    ├── /talkingkit/vowel-pitch
    └── /talkingkit/vowel-pitch/result
```

### Domain Identification / 도메인 식별

Based on routing structure, we have these main domains:
라우팅 구조를 기반으로 다음 주요 도메인을 식별했습니다:

1. **auth** - Authentication & Authorization (로그인, 회원가입, 콜백)
2. **home** - Home/Dashboard (홈 화면)
3. **search** - Study Discovery (학습 탐색)
   - articulation (조음)
   - situation (상황극)
4. **review** - Review & Practice (복습)
5. **profile** - User Profile (프로필)
6. **freetalk** - Free Conversation (자유 대화)
7. **studytalk** - Study Talk (학습 대화)
8. **talkingkit** - Talking Kits (조음 키트)
   - breathing (호흡)
   - vowelPitch (모음 높낮이)
   - steadySound (안정음)
   - shortSound (짧은소리)
   - loudSound (큰소리)

---

## 🏗️ Proposed Folder Structure / 제안하는 폴더 구조

### Option 1: Feature-Based (Domain-Driven) Structure ⭐ RECOMMENDED
### 옵션 1: 기능 기반 (도메인 주도) 구조 ⭐ 추천

```
src/
├── features/                          # Feature modules (도메인별 모듈)
│   ├── auth/                          # Authentication domain
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── NicknamePage.tsx
│   │   │   └── GoogleCallback.tsx
│   │   ├── components/
│   │   │   ├── LoginButton.tsx
│   │   │   ├── LoginInput.tsx
│   │   │   ├── SignupBottomSheet.tsx
│   │   │   └── NicknameInput.tsx
│   │   ├── hooks/
│   │   │   ├── useLogin.ts
│   │   │   ├── useLoginForm.ts
│   │   │   ├── useSignupForm.ts
│   │   │   ├── useNickname.ts
│   │   │   ├── useLoginMutation.ts
│   │   │   ├── useLogoutMutation.ts
│   │   │   └── useSignupMutation.ts
│   │   ├── api/
│   │   │   └── auth.api.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   ├── utils/
│   │   │   └── validationUtils.ts
│   │   └── assets/
│   │       └── svgs/
│   │           ├── login/
│   │           └── nickname/
│   │
│   ├── home/                          # Home/Dashboard
│   │   ├── pages/
│   │   │   └── Home.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Welcome.tsx
│   │   │   ├── MyStudy.tsx
│   │   │   ├── StudyPractice.tsx
│   │   │   └── MoreContents.tsx
│   │   ├── mock/
│   │   │   └── home.mock.ts
│   │   └── assets/
│   │       └── svgs/
│   │
│   ├── search/                        # Study Discovery
│   │   ├── pages/
│   │   │   ├── Search.tsx
│   │   │   ├── KitDiagnosis.tsx
│   │   │   ├── ArticulationPositionKit.tsx
│   │   │   ├── ArticulationMethodKit.tsx
│   │   │   ├── SituationCategory.tsx
│   │   │   ├── SituationDetail.tsx
│   │   │   └── lipSound/
│   │   │       ├── LipSoundStep1.tsx
│   │   │       ├── LipSoundStep2.tsx
│   │   │       ├── LipSoundPractice.tsx
│   │   │       └── LipSoundResult.tsx
│   │   ├── components/
│   │   │   └── (search-specific components)
│   │   ├── hooks/
│   │   │   └── queries/
│   │   │       ├── useSituations.ts
│   │   │       └── useSituationDetail.ts
│   │   ├── api/
│   │   │   ├── situation.api.ts
│   │   │   └── lipSound.api.ts
│   │   ├── types/
│   │   │   ├── situation.types.ts
│   │   │   └── lipSound.types.ts
│   │   ├── utils/
│   │   │   └── situationUtils.ts
│   │   ├── mock/
│   │   │   └── search.mock.ts
│   │   └── assets/
│   │       └── svgs/
│   │
│   ├── review/                        # Review & Practice
│   │   ├── pages/
│   │   │   ├── Review.tsx
│   │   │   ├── ReviewCalendar.tsx
│   │   │   ├── practice/
│   │   │   │   ├── ReviewPractice.tsx
│   │   │   │   ├── ReviewPracticeListen.tsx
│   │   │   │   └── ArticulationPracticeListen.tsx
│   │   │   └── words/
│   │   │       ├── WordQuiz.tsx
│   │   │       └── WordListPage.tsx
│   │   ├── components/
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ScoreModal.tsx
│   │   ├── hooks/
│   │   │   ├── useCalendar.ts
│   │   │   ├── useWordQuiz.ts
│   │   │   ├── useReviewPracticeListen.ts
│   │   │   └── useArticulationPracticeListen.ts
│   │   ├── mock/
│   │   │   ├── reviewCalendar.mock.ts
│   │   │   ├── reviewPractice.mock.ts
│   │   │   ├── wordQuiz.mock.ts
│   │   │   └── wordList.mock.ts
│   │   ├── constants/
│   │   │   └── review.constants.ts
│   │   ├── types/
│   │   │   └── review.types.ts
│   │   └── assets/
│   │       └── svgs/
│   │
│   ├── profile/                       # User Profile
│   │   ├── pages/
│   │   │   ├── Profile.tsx
│   │   │   ├── ProfileGuide.tsx
│   │   │   ├── AccountSettings.tsx
│   │   │   └── WordListPage.tsx
│   │   ├── components/
│   │   │   ├── GraphCard.tsx
│   │   │   ├── NicknameChangeModal.tsx
│   │   │   └── AccountConfirmModal.tsx
│   │   ├── mock/
│   │   │   ├── profile.mock.ts
│   │   │   └── wordList.mock.ts
│   │   ├── constants/
│   │   │   └── profile.constants.ts
│   │   ├── types/
│   │   │   └── profile.types.ts
│   │   └── assets/
│   │       └── svgs/
│   │
│   ├── freetalk/                      # Free Conversation
│   │   ├── pages/
│   │   │   ├── FreeTalk.tsx
│   │   │   └── FreeTalkIntro.tsx
│   │   ├── components/
│   │   │   └── CircularProgress.tsx
│   │   ├── hooks/
│   │   │   ├── useFreeTalkConversation.ts
│   │   │   ├── useHeygenAvatar.ts
│   │   │   └── useTypingAnimation.ts
│   │   ├── api/
│   │   │   └── heygen.api.ts
│   │   ├── types/
│   │   │   └── heygen.types.ts
│   │   ├── mock/
│   │   │   └── freetalk.mock.ts
│   │   └── assets/
│   │       └── svgs/
│   │
│   ├── studytalk/                     # Study Talk
│   │   ├── pages/
│   │   │   └── HomeStudyTalk.tsx
│   │   ├── components/
│   │   │   ├── StudyTalkTabs.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── SortFilter.tsx
│   │   │   ├── SituationCategoryFilter.tsx
│   │   │   ├── PracticeKitCard.tsx
│   │   │   ├── SituationPracticeCard.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── hooks/
│   │   │   └── (studytalk-specific hooks)
│   │   └── stores/
│   │       └── studyTalkStore.ts
│   │
│   └── talkingkit/                    # Talking Kits (조음 키트)
│       ├── pages/
│       │   ├── TalkingKit.tsx
│       │   ├── KitDetail.tsx
│       │   ├── breathing/
│       │   │   └── BreathingExercise.tsx
│       │   ├── vowelPitch/
│       │   │   ├── VowelPitch.tsx
│       │   │   └── VowelPitchResult.tsx
│       │   ├── steadySound/
│       │   │   └── SteadySound.tsx
│       │   ├── shortSound/
│       │   │   ├── ShortSound.tsx
│       │   │   └── ShortSoundResult.tsx
│       │   └── loudSound/
│       │       ├── LoudSound.tsx
│       │       ├── LoudSoundVolume.tsx
│       │       └── LoudSoundVolumeResult.tsx
│       ├── components/
│       │   ├── common/
│       │   │   ├── AnimatedContainer.tsx
│       │   │   ├── KitCard.tsx
│       │   │   └── SituationCard.tsx
│       │   ├── layout/
│       │   │   ├── KitListLayout.tsx
│       │   │   ├── Step1Layout.tsx
│       │   │   └── Step2Layout.tsx
│       │   ├── progressBar/
│       │   │   ├── CircularProgress.tsx
│       │   │   ├── ProgressBar.tsx
│       │   │   └── TimerProgressBar.tsx
│       │   ├── breathing/
│       │   │   ├── BreathingBall.tsx
│       │   │   └── BreathingGraph.tsx
│       │   ├── vowelPitch/
│       │   │   └── PitchVisualizer.tsx
│       │   ├── shortSound/
│       │   │   └── ShortSoundVisualizer.tsx
│       │   └── loudSound/
│       │       └── DecibelBar.tsx
│       ├── hooks/
│       │   ├── common/
│       │   │   ├── useDecibelDetection.ts
│       │   │   ├── usePitchDetection.ts
│       │   │   └── useVoiceDetection.ts
│       │   ├── queries/
│       │   │   ├── useKitCategories.ts
│       │   │   ├── useKitDetail.ts
│       │   │   └── useKitsByCategory.ts
│       │   ├── breathing/
│       │   │   └── useBreathingAnimation.ts
│       │   ├── loudSound/
│       │   │   └── useLoudSound.ts
│       │   └── shortSound/
│       │       └── useBallAnimation.ts
│       ├── api/
│       │   └── kit.api.ts
│       ├── types/
│       │   ├── index.ts
│       │   ├── kit.types.ts
│       │   ├── breathing.ts
│       │   └── pitch.ts
│       ├── utils/
│       │   ├── audioErrorHandlerUtils.ts
│       │   ├── breathingPathUtils.ts
│       │   ├── pitchEvaluation.ts
│       │   ├── shortSoundEvaluation.ts
│       │   └── volumeEvaluation.ts
│       ├── constants/
│       │   ├── audio.ts
│       │   ├── breathing.ts
│       │   └── shortSound.ts
│       ├── mock/
│       │   └── talkingkit.mock.ts
│       └── assets/
│           └── svgs/
│
├── shared/                            # Shared across features (공통 리소스)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx
│   │   ├── navigation/
│   │   │   └── BottomNav.tsx
│   │   ├── ui/
│   │   │   ├── Modal.tsx
│   │   │   └── DeleteConfirmModal.tsx
│   │   └── router/
│   │       └── RequireAuth.tsx
│   ├── hooks/
│   │   ├── useAudioRecorder.ts
│   │   ├── useDebounce.ts
│   │   └── queries/
│   │       └── useValidateEmail.ts
│   ├── utils/
│   │   ├── audioUtils.ts
│   │   ├── errorHandlerUtils.ts
│   │   └── loggerUtils.ts
│   ├── types/
│   │   └── audio.ts
│   ├── stores/
│   │   └── useAuthStore.ts
│   ├── api/
│   │   └── client.ts
│   └── assets/
│       ├── fonts/
│       └── svgs/
│           └── bottomNav/
│
├── pages/                             # Re-export pages for routing (라우팅용 페이지 재내보내기)
│   └── index.ts                       # Barrel exports
│
├── styles/                            # Global styles (전역 스타일)
│   └── index.css
│
├── providers/                         # React providers (리액트 프로바이더)
│   └── (provider files)
│
├── router.tsx                         # Route configuration (라우트 설정)
├── App.tsx
└── main.tsx
```

---

### Option 2: Hybrid Structure (Current + Improved)
### 옵션 2: 하이브리드 구조 (현재 + 개선)

```
src/
├── pages/                             # Page components (페이지 컴포넌트)
│   ├── auth/                          # Group auth-related pages
│   │   ├── Login.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── NicknamePage.tsx
│   │   └── GoogleCallback.tsx
│   ├── home/
│   │   ├── Home.tsx
│   │   └── LandingPage.tsx
│   ├── search/
│   │   ├── Search.tsx
│   │   ├── KitDiagnosis.tsx
│   │   ├── ArticulationPositionKit.tsx
│   │   ├── ArticulationMethodKit.tsx
│   │   ├── SituationCategory.tsx
│   │   ├── SituationDetail.tsx
│   │   └── lipSound/
│   │       ├── LipSoundStep1.tsx
│   │       ├── LipSoundStep2.tsx
│   │       ├── LipSoundPractice.tsx
│   │       └── LipSoundResult.tsx
│   ├── review/
│   │   ├── Review.tsx
│   │   ├── ReviewCalendar.tsx
│   │   ├── practice/
│   │   │   ├── ReviewPractice.tsx
│   │   │   ├── ReviewPracticeListen.tsx
│   │   │   └── ArticulationPracticeListen.tsx
│   │   └── words/
│   │       ├── WordQuiz.tsx
│   │       └── WordListPage.tsx
│   ├── profile/
│   │   ├── Profile.tsx
│   │   ├── ProfileGuide.tsx
│   │   ├── AccountSettings.tsx
│   │   └── WordListPage.tsx
│   ├── freetalk/
│   │   ├── FreeTalk.tsx
│   │   └── FreeTalkIntro.tsx
│   ├── studytalk/
│   │   └── HomeStudyTalk.tsx
│   └── talkingkit/
│       ├── TalkingKit.tsx
│       ├── KitDetail.tsx
│       ├── breathing/
│       │   └── BreathingExercise.tsx
│       ├── vowelPitch/
│       │   ├── VowelPitch.tsx
│       │   └── VowelPitchResult.tsx
│       ├── steadySound/
│       │   └── SteadySound.tsx
│       ├── shortSound/
│       │   ├── ShortSound.tsx
│       │   └── ShortSoundResult.tsx
│       └── loudSound/
│           ├── LoudSound.tsx
│           ├── LoudSoundVolume.tsx
│           └── LoudSoundVolumeResult.tsx
│
├── components/                        # UI components by domain (도메인별 컴포넌트)
│   ├── auth/
│   │   ├── LoginButton.tsx
│   │   ├── LoginInput.tsx
│   │   ├── SignupBottomSheet.tsx
│   │   └── NicknameInput.tsx
│   ├── home/
│   │   ├── Header.tsx
│   │   ├── Welcome.tsx
│   │   ├── MyStudy.tsx
│   │   ├── StudyPractice.tsx
│   │   └── MoreContents.tsx
│   ├── search/
│   │   └── (search components)
│   ├── review/
│   │   ├── ProgressBar.tsx
│   │   └── ScoreModal.tsx
│   ├── profile/
│   │   ├── GraphCard.tsx
│   │   ├── NicknameChangeModal.tsx
│   │   └── AccountConfirmModal.tsx
│   ├── freetalk/
│   │   └── CircularProgress.tsx
│   ├── studytalk/
│   │   ├── StudyTalkTabs.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SortFilter.tsx
│   │   ├── SituationCategoryFilter.tsx
│   │   ├── PracticeKitCard.tsx
│   │   ├── SituationPracticeCard.tsx
│   │   └── EmptyState.tsx
│   ├── talkingkit/
│   │   ├── common/
│   │   │   ├── AnimatedContainer.tsx
│   │   │   ├── KitCard.tsx
│   │   │   └── SituationCard.tsx
│   │   ├── layout/
│   │   │   ├── KitListLayout.tsx
│   │   │   ├── Step1Layout.tsx
│   │   │   └── Step2Layout.tsx
│   │   ├── progressBar/
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── TimerProgressBar.tsx
│   │   ├── breathing/
│   │   │   ├── BreathingBall.tsx
│   │   │   └── BreathingGraph.tsx
│   │   ├── vowelPitch/
│   │   │   └── PitchVisualizer.tsx
│   │   ├── shortSound/
│   │   │   └── ShortSoundVisualizer.tsx
│   │   └── loudSound/
│   │       └── DecibelBar.tsx
│   └── common/                        # Shared components
│       ├── layout/
│       │   └── Layout.tsx
│       ├── navigation/
│       │   └── BottomNav.tsx
│       ├── ui/
│       │   ├── Modal.tsx
│       │   └── DeleteConfirmModal.tsx
│       └── router/
│           └── RequireAuth.tsx
│
├── hooks/                             # Custom hooks by domain (도메인별 훅)
│   ├── auth/
│   │   ├── useLogin.ts
│   │   ├── useLoginForm.ts
│   │   ├── useSignupForm.ts
│   │   ├── useNickname.ts
│   │   ├── mutations/
│   │   │   ├── useLoginMutation.ts
│   │   │   ├── useLogoutMutation.ts
│   │   │   └── useSignupMutation.ts
│   │   └── queries/
│   │       └── useValidateEmail.ts
│   ├── search/
│   │   └── queries/
│   │       ├── useSituations.ts
│   │       └── useSituationDetail.ts
│   ├── review/
│   │   ├── useCalendar.ts
│   │   ├── useWordQuiz.ts
│   │   ├── useReviewPracticeListen.ts
│   │   └── useArticulationPracticeListen.ts
│   ├── freetalk/
│   │   ├── useFreeTalkConversation.ts
│   │   ├── useHeygenAvatar.ts
│   │   └── useTypingAnimation.ts
│   ├── talkingkit/
│   │   ├── queries/
│   │   │   ├── useKitCategories.ts
│   │   │   ├── useKitDetail.ts
│   │   │   └── useKitsByCategory.ts
│   │   ├── common/
│   │   │   ├── useDecibelDetection.ts
│   │   │   ├── usePitchDetection.ts
│   │   │   └── useVoiceDetection.ts
│   │   ├── breathing/
│   │   │   └── useBreathingAnimation.ts
│   │   ├── loudSound/
│   │   │   └── useLoudSound.ts
│   │   └── shortSound/
│   │       └── useBallAnimation.ts
│   └── common/                        # Shared hooks
│       ├── useAudioRecorder.ts
│       └── useDebounce.ts
│
├── api/                               # API calls by domain (도메인별 API)
│   ├── client.ts                      # Axios client with interceptors
│   ├── auth.api.ts
│   ├── kit.api.ts
│   ├── situation.api.ts
│   ├── lipSound.api.ts
│   └── heygen.api.ts
│
├── types/                             # TypeScript types by domain (도메인별 타입)
│   ├── auth.types.ts
│   ├── kit.types.ts
│   ├── situation.types.ts
│   ├── lipSound.types.ts
│   ├── audio.ts
│   ├── freetalk/
│   │   └── heygen.types.ts
│   └── talkingkit/
│       ├── index.ts
│       ├── breathing.ts
│       └── pitch.ts
│
├── utils/                             # Utility functions by domain (도메인별 유틸)
│   ├── auth/
│   │   └── validationUtils.ts
│   ├── talkingkit/
│   │   ├── audioErrorHandlerUtils.ts
│   │   ├── breathingPathUtils.ts
│   │   ├── pitchEvaluation.ts
│   │   ├── shortSoundEvaluation.ts
│   │   └── volumeEvaluation.ts
│   └── common/
│       ├── audioUtils.ts
│       ├── errorHandlerUtils.ts
│       ├── loggerUtils.ts
│       └── situationUtils.ts
│
├── constants/                         # Constants by domain (도메인별 상수)
│   ├── review.constants.ts
│   ├── profile.constants.ts
│   └── talkingkit/
│       ├── audio.ts
│       ├── breathing.ts
│       └── shortSound.ts
│
├── stores/                            # Global state management (전역 상태 관리)
│   ├── useAuthStore.ts
│   └── studyTalkStore.ts
│
├── mock/                              # Mock data by domain (도메인별 목 데이터)
│   ├── home/
│   │   └── home.mock.ts
│   ├── search/
│   │   └── search.mock.ts
│   ├── review/
│   │   ├── reviewCalendar.mock.ts
│   │   ├── reviewPractice.mock.ts
│   │   ├── reviewPracticeListen.mock.ts
│   │   ├── articulationPracticeListen.mock.ts
│   │   ├── wordQuiz.mock.ts
│   │   └── wordList.mock.ts
│   ├── profile/
│   │   ├── profile.mock.ts
│   │   └── wordList.mock.ts
│   ├── freetalk/
│   │   └── freetalk.mock.ts
│   └── talkingkit/
│       └── talkingkit.mock.ts
│
├── assets/                            # Static assets (정적 에셋)
│   ├── fonts/
│   └── svgs/
│       ├── common/
│       │   └── bottomNav/
│       ├── auth/
│       │   ├── login/
│       │   └── nickname/
│       ├── home/
│       ├── search/
│       ├── review/
│       ├── profile/
│       │   ├── profilehome/
│       │   └── profileinfo/
│       ├── freetalk/
│       ├── studyfind/
│       └── talkingkit/
│           ├── common/
│           ├── breathing/
│           ├── vowelPitch/
│           ├── shortSound/
│           └── loudSound/
│
├── styles/                            # Global styles (전역 스타일)
│   └── index.css
│
├── providers/                         # React providers (리액트 프로바이더)
│   └── (provider files)
│
├── router.tsx                         # Route configuration (라우트 설정)
├── App.tsx
└── main.tsx
```

---

## 📋 Comparison: Option 1 vs Option 2 / 비교

| Aspect | Option 1 (Feature-Based) | Option 2 (Hybrid) | Winner |
|--------|--------------------------|-------------------|--------|
| **Co-location** | ⭐⭐⭐⭐⭐ All related files together | ⭐⭐⭐ Related by type | Option 1 |
| **Scalability** | ⭐⭐⭐⭐⭐ Easy to add new features | ⭐⭐⭐⭐ Good | Option 1 |
| **Learning Curve** | ⭐⭐⭐ Different from current | ⭐⭐⭐⭐⭐ Similar to current | Option 2 |
| **Migration Effort** | ⭐⭐ More refactoring needed | ⭐⭐⭐⭐ Less refactoring | Option 2 |
| **Code Discovery** | ⭐⭐⭐⭐⭐ All feature code in one place | ⭐⭐⭐ Jump between folders | Option 1 |
| **Team Collaboration** | ⭐⭐⭐⭐⭐ Clear ownership | ⭐⭐⭐⭐ Clear by type | Option 1 |
| **Testing** | ⭐⭐⭐⭐⭐ Easy to test per feature | ⭐⭐⭐⭐ Good | Option 1 |

### Recommendation: Option 2 (Hybrid) for Now, Migrate to Option 1 Later
### 권장사항: 현재는 옵션 2 (하이브리드), 나중에 옵션 1로 이전

**Why Option 2 First?**
1. Easier migration from current structure
2. Lower risk, incremental improvements
3. Team can adapt gradually
4. Current router.tsx works without major changes

**옵션 2를 먼저 선택하는 이유?**
1. 현재 구조에서 더 쉬운 마이그레이션
2. 낮은 위험, 점진적 개선
3. 팀이 점진적으로 적응 가능
4. 현재 router.tsx가 큰 변경 없이 작동

**Migration Path to Option 1:**
나중에 옵션 1로의 마이그레이션 경로:
- Phase 1-3: Implement Option 2
- Phase 4: Gradually move to feature-based structure
- Feature-by-feature migration

---

## 🚀 Migration Plan (Option 2 - Hybrid) / 마이그레이션 계획

### Phase 1: Clean Up Inconsistencies (Week 1) / 일관성 정리

#### 1.1 Rename Inconsistent Folders
**일관성 없는 폴더 이름 변경**

```bash
# Rename capital folders to lowercase
src/components/Login → src/components/auth
src/components/Nickname → src/components/auth

# Consolidate duplicate folders
src/apis/ → src/api/
src/mocks/ → src/mock/
```

**Files to Move:**
- `src/components/Login/*` → `src/components/auth/`
- `src/components/Nickname/*` → `src/components/auth/`
- All files from `src/apis/` → `src/api/`
- All files from `src/mocks/` → `src/mock/`

**Effort**: 2-3 hours

---

#### 1.2 Move Page Components from Components Folder
**컴포넌트 폴더에서 페이지 컴포넌트 이동**

Currently in `src/pages/studytalk/`:
- CategoryFilter.tsx ❌ (should be component)
- SortFilter.tsx ❌ (should be component)
- EmptyState.tsx ❌ (should be component)
- PracticeKitCard.tsx ❌ (should be component)
- SituationCategoryFilter.tsx ❌ (should be component)
- SituationPracticeCard.tsx ❌ (should be component)
- StudyTalkTabs.tsx ❌ (should be component)

**Action:**
```bash
# Move these to components
src/pages/studytalk/CategoryFilter.tsx → src/components/studytalk/CategoryFilter.tsx
src/pages/studytalk/SortFilter.tsx → src/components/studytalk/SortFilter.tsx
# ... (same for all others)
```

**Effort**: 1-2 hours

---

### Phase 2: Reorganize by Domain (Week 2-3) / 도메인별 재구성

#### 2.1 Group Auth Pages
**인증 페이지 그룹화**

```bash
# Create auth folder
mkdir -p src/pages/auth

# Move auth pages
src/pages/login/Login.tsx → src/pages/auth/Login.tsx
src/pages/loginForm/LoginForm.tsx → src/pages/auth/LoginForm.tsx
src/pages/signupForm/SignupForm.tsx → src/pages/auth/SignupForm.tsx
src/pages/nickname/NicknamePage.tsx → src/pages/auth/NicknamePage.tsx
src/pages/auth/GoogleCallback.tsx (already in auth/)

# Delete old folders
rm -rf src/pages/login src/pages/loginForm src/pages/signupForm src/pages/nickname
```

**Update imports in router.tsx:**
```tsx
// Before
import Login from '@/pages/login/Login';
import LoginForm from '@/pages/loginForm/LoginForm';

// After
import Login from '@/pages/auth/Login';
import LoginForm from '@/pages/auth/LoginForm';
```

**Effort**: 3-4 hours

---

#### 2.2 Organize Auth Components
**인증 컴포넌트 구성**

```bash
# Create auth components folder
mkdir -p src/components/auth

# Move auth components
src/components/Login/button/* → src/components/auth/
src/components/Login/input/* → src/components/auth/
src/components/Login/signUp/* → src/components/auth/
src/components/Nickname/* → src/components/auth/

# Delete old folders
rm -rf src/components/Login src/components/Nickname
```

**Effort**: 2-3 hours

---

#### 2.3 Organize Auth Hooks
**인증 훅 구성**

```bash
# Create auth hooks folder
mkdir -p src/hooks/auth/mutations
mkdir -p src/hooks/auth/queries

# Move hooks
src/hooks/login/* → src/hooks/auth/
src/hooks/loginForm/* → src/hooks/auth/
src/hooks/signupForm/* → src/hooks/auth/
src/hooks/nickname/* → src/hooks/auth/
src/hooks/mutations/useLoginMutation.ts → src/hooks/auth/mutations/
src/hooks/mutations/useLogoutMutation.ts → src/hooks/auth/mutations/
src/hooks/mutations/useSignupMutation.ts → src/hooks/auth/mutations/
src/hooks/queries/useValidateEmail.ts → src/hooks/auth/queries/

# Delete old folders
rm -rf src/hooks/login src/hooks/loginForm src/hooks/signupForm src/hooks/nickname
```

**Effort**: 2-3 hours

---

#### 2.4 Organize Search Domain Hooks
**검색 도메인 훅 구성**

```bash
mkdir -p src/hooks/search/queries

src/hooks/queries/useSituations.ts → src/hooks/search/queries/
src/hooks/queries/useSituationDetail.ts → src/hooks/search/queries/
```

**Effort**: 1 hour

---

#### 2.5 Organize TalkingKit Domain Hooks
**조음키트 도메인 훅 구성**

```bash
mkdir -p src/hooks/talkingkit/queries

src/hooks/queries/useKitCategories.ts → src/hooks/talkingkit/queries/
src/hooks/queries/useKitDetail.ts → src/hooks/talkingkit/queries/
src/hooks/queries/useKitsByCategory.ts → src/hooks/talkingkit/queries/
```

**Effort**: 1 hour

---

#### 2.6 Move Common Hooks
**공통 훅 이동**

```bash
mkdir -p src/hooks/common

src/hooks/common/useAudioRecorder.ts (already here)
src/hooks/useDebounce.ts → src/hooks/common/useDebounce.ts
```

**Delete empty queries/mutations folders:**
```bash
rm -rf src/hooks/queries src/hooks/mutations
```

**Effort**: 1 hour

---

### Phase 3: Organize Assets (Week 4) / 에셋 구성

#### 3.1 Flatten SVG Structure
**SVG 구조 평탄화**

**Before:**
```
assets/svgs/login/loginForm/
assets/svgs/login/signIn/
assets/svgs/login/signInSheet/
```

**After:**
```
assets/svgs/auth/login/
assets/svgs/auth/signup/
assets/svgs/auth/nickname/
```

**Move commands:**
```bash
mkdir -p src/assets/svgs/auth
mkdir -p src/assets/svgs/common

# Consolidate login SVGs
src/assets/svgs/login/* → src/assets/svgs/auth/login/
src/assets/svgs/nickname/* → src/assets/svgs/auth/nickname/

# Move shared SVGs
src/assets/svgs/bottomNav/* → src/assets/svgs/common/bottomNav/
```

**Effort**: 3-4 hours

---

#### 3.2 Organize Other SVGs
**다른 SVG 구성**

```bash
# Already good structure - just verify
src/assets/svgs/home/
src/assets/svgs/search/ (rename from studyfind)
src/assets/svgs/review/
src/assets/svgs/profile/
src/assets/svgs/freetalk/
src/assets/svgs/talkingkit/
```

**Effort**: 1-2 hours

---

### Phase 4: Organize Utils and Constants (Week 5) / 유틸과 상수 구성

#### 4.1 Organize Utils by Domain
**도메인별 유틸 구성**

```bash
# Create domain folders
mkdir -p src/utils/auth
mkdir -p src/utils/common

# Move files
src/utils/login/validationUtils.ts → src/utils/auth/validationUtils.ts
src/utils/situationUtils.ts → src/utils/common/situationUtils.ts
src/utils/audioUtils.ts → src/utils/common/audioUtils.ts
src/utils/errorHandlerUtils.ts → src/utils/common/errorHandlerUtils.ts
src/utils/loggerUtils.ts → src/utils/common/loggerUtils.ts

# talkingkit utils already organized
src/utils/talkingkit/ (keep as is)
```

**Effort**: 2 hours

---

#### 4.2 Create Missing Constants Files
**누락된 상수 파일 생성**

```bash
# Create new constants
touch src/constants/review.constants.ts
touch src/constants/profile.constants.ts
touch src/constants/search.constants.ts
```

**Content for review.constants.ts:**
```ts
export const REVIEW_CONSTANTS = {
  INTRO_DURATION: 1000,
  RECORDING_DURATION: 4000,
  PROGRESS_INTERVAL: 100,
  PROGRESS_INCREMENT: 2.5,
  MAX_GUIDE_PAGES: 9,
} as const;
```

**Effort**: 2-3 hours

---

### Phase 5: Update Imports (Week 6) / import 업데이트

#### 5.1 Create Path Mapping
**경로 매핑 생성**

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/api/*": ["./src/api/*"],
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

**Effort**: 1 hour

---

#### 5.2 Update All Imports
**모든 import 업데이트**

Use find-and-replace or codemod:
```bash
# Example: Update auth imports
# Before: import Login from '@/components/Login/...'
# After: import Login from '@/components/auth/...'
```

**Tools to help:**
- VS Code Find & Replace (Regex)
- jscodeshift
- Manual review

**Effort**: 8-10 hours

---

### Phase 6: Testing & Validation (Week 7) / 테스트 및 검증

#### 6.1 Verify All Routes Work
**모든 라우트 작동 확인**

- [ ] Test all pages load correctly
- [ ] Verify no broken imports
- [ ] Check dev server runs without errors
- [ ] Build production bundle successfully

**Effort**: 4-5 hours

---

#### 6.2 Update Documentation
**문서 업데이트**

- [ ] Update README.md with new structure
- [ ] Document folder conventions
- [ ] Create CONTRIBUTING.md

**Effort**: 2-3 hours

---

## 📊 Migration Timeline Summary / 마이그레이션 일정 요약

| Phase | Tasks | Duration | Effort |
|-------|-------|----------|--------|
| Phase 1 | Clean up inconsistencies | Week 1 | 3-5h |
| Phase 2 | Reorganize by domain | Week 2-3 | 10-14h |
| Phase 3 | Organize assets | Week 4 | 4-6h |
| Phase 4 | Organize utils/constants | Week 5 | 4-5h |
| Phase 5 | Update imports | Week 6 | 9-11h |
| Phase 6 | Testing & docs | Week 7 | 6-8h |
| **Total** | | **7 weeks** | **36-49h** |

---

## 📝 Folder Naming Conventions / 폴더 네이밍 규칙

### General Rules / 일반 규칙

1. **Use lowercase with hyphens** for multi-word folders
   - ✅ `lip-sound/`, `vowel-pitch/`
   - ❌ `lipSound/`, `LipSound/`

2. **Use singular for folders containing items of one type**
   - ✅ `component/`, `hook/`, `util/`
   - ❌ `components/`, `hooks/`, `utils/`

3. **Use plural for folders containing multiple items**
   - ✅ `pages/`, `types/`, `constants/`

4. **Match route names when possible**
   - Route: `/search/articulation-position`
   - Folder: `pages/search/articulation-position/`

5. **Group by domain first, then by type**
   - ✅ `auth/components/`, `auth/hooks/`, `auth/api/`
   - ❌ `components/auth/`, `hooks/auth/`, `api/auth/`

---

## 🎯 File Organization Best Practices / 파일 구성 모범 사례

### Component Files

```tsx
// ✅ Good: One component per file
// GraphCard.tsx
export default function GraphCard() { ... }

// ❌ Bad: Multiple components in one file
// ProfileComponents.tsx
export function GraphCard() { ... }
export function NicknameModal() { ... }
```

### Hook Files

```tsx
// ✅ Good: One hook per file with clear name
// useCalendar.ts
export const useCalendar = () => { ... }

// ✅ Good: Related hooks can be co-located
// mutations/
//   ├── useLoginMutation.ts
//   ├── useLogoutMutation.ts
//   └── useSignupMutation.ts
```

### Type Files

```ts
// ✅ Good: Group related types by domain
// auth.types.ts
export interface LoginRequest { ... }
export interface SignupRequest { ... }
export interface User { ... }

// ❌ Bad: One type per file
// LoginRequest.types.ts
// SignupRequest.types.ts
```

### Index Files (Barrel Exports)

```ts
// ✅ Good: Use index.ts for cleaner imports
// components/auth/index.ts
export { LoginButton } from './LoginButton';
export { LoginInput } from './LoginInput';
export { SignupBottomSheet } from './SignupBottomSheet';

// Usage:
import { LoginButton, LoginInput } from '@/components/auth';

// ❌ Avoid: Deep imports
import LoginButton from '@/components/auth/LoginButton';
import LoginInput from '@/components/auth/LoginInput';
```

---

## 🔍 Before & After Examples / 변경 전후 예시

### Example 1: Auth Login Component

**Before:**
```
src/
├── pages/
│   └── login/
│       └── Login.tsx
├── components/
│   └── Login/
│       ├── button/
│       │   ├── Button.tsx
│       │   └── LoginButton.tsx
│       └── input/
│           └── Input.tsx
└── hooks/
    └── login/
        └── useLogin.ts
```

**After:**
```
src/
├── pages/
│   └── auth/
│       └── Login.tsx
├── components/
│   └── auth/
│       ├── LoginButton.tsx
│       └── LoginInput.tsx
└── hooks/
    └── auth/
        └── useLogin.ts
```

---

### Example 2: Review Domain

**Before:**
```
src/
├── pages/
│   └── review/
│       ├── Review.tsx
│       ├── ReviewCalendar.tsx
│       ├── practice/
│       │   ├── ReviewPractice.tsx
│       │   ├── ReviewPracticeListen.tsx
│       │   └── ArticulationPracticeListen.tsx
│       └── words/
│           ├── WordQuiz.tsx
│           └── WordListPage.tsx
├── components/
│   └── review/
│       ├── ProgressBar.tsx
│       └── ScoreModal.tsx
├── hooks/
│   └── review/
│       ├── useCalendar.ts
│       ├── useWordQuiz.ts
│       ├── useReviewPracticeListen.ts
│       └── useArticulationPracticeListen.ts
└── mock/
    └── review/
        ├── reviewCalendar.mock.ts
        ├── reviewPractice.mock.ts
        ├── wordQuiz.mock.ts
        └── wordList.mock.ts
```

**After:** (Same structure - already good! ✅)
```
# No changes needed - review domain is already well-organized
```

---

### Example 3: TalkingKit Hooks

**Before:**
```
src/
└── hooks/
    ├── queries/
    │   ├── useKitCategories.ts
    │   ├── useKitDetail.ts
    │   └── useKitsByCategory.ts
    └── talkingkit/
        ├── breathing/
        │   └── useBreathingAnimation.ts
        ├── common/
        │   ├── useDecibelDetection.ts
        │   ├── usePitchDetection.ts
        │   └── useVoiceDetection.ts
        ├── loudSound/
        │   └── useLoudSound.ts
        └── shortSound/
            └── useBallAnimation.ts
```

**After:**
```
src/
└── hooks/
    └── talkingkit/
        ├── queries/
        │   ├── useKitCategories.ts
        │   ├── useKitDetail.ts
        │   └── useKitsByCategory.ts
        ├── common/
        │   ├── useDecibelDetection.ts
        │   ├── usePitchDetection.ts
        │   └── useVoiceDetection.ts
        ├── breathing/
        │   └── useBreathingAnimation.ts
        ├── loudSound/
        │   └── useLoudSound.ts
        └── shortSound/
            └── useBallAnimation.ts
```

---

## 🛠️ Migration Scripts / 마이그레이션 스크립트

### Script 1: Move Auth Files

```bash
#!/bin/bash
# migrate-auth.sh

echo "🚀 Migrating auth files..."

# Create new directories
mkdir -p src/pages/auth
mkdir -p src/components/auth
mkdir -p src/hooks/auth/mutations
mkdir -p src/hooks/auth/queries

# Move pages
mv src/pages/login/Login.tsx src/pages/auth/
mv src/pages/loginForm/LoginForm.tsx src/pages/auth/
mv src/pages/signupForm/SignupForm.tsx src/pages/auth/
mv src/pages/nickname/NicknamePage.tsx src/pages/auth/

# Move components
cp -r src/components/Login/button/* src/components/auth/
cp -r src/components/Login/input/* src/components/auth/
cp -r src/components/Login/signUp/* src/components/auth/
cp -r src/components/Nickname/* src/components/auth/

# Move hooks
mv src/hooks/login/* src/hooks/auth/
mv src/hooks/loginForm/* src/hooks/auth/
mv src/hooks/signupForm/* src/hooks/auth/
mv src/hooks/nickname/* src/hooks/auth/
mv src/hooks/mutations/useLoginMutation.ts src/hooks/auth/mutations/
mv src/hooks/mutations/useLogoutMutation.ts src/hooks/auth/mutations/
mv src/hooks/mutations/useSignupMutation.ts src/hooks/auth/mutations/
mv src/hooks/queries/useValidateEmail.ts src/hooks/auth/queries/

# Clean up old directories
rm -rf src/pages/login src/pages/loginForm src/pages/signupForm src/pages/nickname
rm -rf src/components/Login src/components/Nickname
rm -rf src/hooks/login src/hooks/loginForm src/hooks/signupForm src/hooks/nickname

echo "✅ Auth migration complete!"
```

---

### Script 2: Consolidate API Folders

```bash
#!/bin/bash
# consolidate-api.sh

echo "🚀 Consolidating API folders..."

# Move all files from apis to api
cp -r src/apis/* src/api/

# Remove old folder
rm -rf src/apis

echo "✅ API consolidation complete!"
```

---

### Script 3: Update Import Paths

```bash
#!/bin/bash
# update-imports.sh

echo "🚀 Updating import paths..."

# Update Login imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/pages/login/Login|@/pages/auth/Login|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/pages/loginForm/LoginForm|@/pages/auth/LoginForm|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/pages/signupForm/SignupForm|@/pages/auth/SignupForm|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/pages/nickname/NicknamePage|@/pages/auth/NicknamePage|g' {} +

# Update component imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/components/Login|@/components/auth|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/components/Nickname|@/components/auth|g' {} +

# Update hook imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/hooks/login/|@/hooks/auth/|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/hooks/loginForm/|@/hooks/auth/|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/hooks/signupForm/|@/hooks/auth/|g' {} +

find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/hooks/nickname/|@/hooks/auth/|g' {} +

# Update API imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/apis/|@/api/|g' {} +

echo "✅ Import updates complete!"
echo "⚠️  Please review changes and test thoroughly"
```

---

## 📚 Documentation Updates / 문서 업데이트

### New README Section

```markdown
## 📁 Folder Structure

This project follows a **domain-based organization** where files are grouped by feature/domain rather than technical type.

### Structure Overview

```
src/
├── pages/          # Page components (route entry points)
├── components/     # UI components organized by domain
├── hooks/          # Custom React hooks organized by domain
├── api/            # API calls organized by domain
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── constants/      # Application constants
├── stores/         # Global state management (Zustand)
├── mock/           # Mock data for development
├── assets/         # Static assets (fonts, SVGs, images)
├── styles/         # Global styles
└── providers/      # React context providers
```

### Domain Organization

Each domain (auth, review, profile, etc.) has its files organized by type:

```
auth/
├── pages/          # Auth-related pages
├── components/     # Auth-specific UI components
├── hooks/          # Auth-related hooks
├── api/            # Auth API calls
└── types/          # Auth type definitions
```

### Naming Conventions

- **Folders**: lowercase with hyphens (`lip-sound/`)
- **Components**: PascalCase (`LoginButton.tsx`)
- **Hooks**: camelCase starting with `use` (`useLogin.ts`)
- **Types**: camelCase with `.types.ts` suffix (`auth.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`AUTH_CONSTANTS`)
```

---

## ✅ Checklist / 체크리스트

### Pre-Migration
- [ ] Backup current codebase (git commit)
- [ ] Create new branch for refactoring
- [ ] Review this plan with team
- [ ] Set up migration scripts

### Phase 1: Cleanup
- [ ] Rename `components/Login` → `components/auth`
- [ ] Rename `components/Nickname` → `components/auth`
- [ ] Merge `apis/` → `api/`
- [ ] Merge `mocks/` → `mock/`

### Phase 2: Domain Organization
- [ ] Move auth pages to `pages/auth/`
- [ ] Move auth components to `components/auth/`
- [ ] Move auth hooks to `hooks/auth/`
- [ ] Move search hooks to `hooks/search/`
- [ ] Move talkingkit hooks to `hooks/talkingkit/`
- [ ] Move studytalk components to `components/studytalk/`

### Phase 3: Assets
- [ ] Reorganize auth SVGs
- [ ] Flatten SVG structure
- [ ] Rename `studyfind` → `search`

### Phase 4: Utils & Constants
- [ ] Move auth utils
- [ ] Move common utils
- [ ] Create review.constants.ts
- [ ] Create profile.constants.ts
- [ ] Create search.constants.ts

### Phase 5: Imports
- [ ] Update path mappings in tsconfig.json
- [ ] Run migration scripts
- [ ] Manually review all imports
- [ ] Fix any broken imports

### Phase 6: Testing
- [ ] Test all routes
- [ ] Verify build succeeds
- [ ] Check for console errors
- [ ] Test in development mode
- [ ] Test in production build

### Post-Migration
- [ ] Update documentation
- [ ] Create PR for review
- [ ] Merge to main branch
- [ ] Update team on new structure

---

## 🎓 Team Training / 팀 교육

### New Team Member Onboarding

**Where to find things:**

1. **Page Components** → `src/pages/{domain}/`
2. **UI Components** → `src/components/{domain}/`
3. **Hooks** → `src/hooks/{domain}/`
4. **API Calls** → `src/api/{domain}.api.ts`
5. **Types** → `src/types/{domain}.types.ts`

**Example: Adding a new auth feature**

1. Create page in `src/pages/auth/NewAuthPage.tsx`
2. Create component in `src/components/auth/NewAuthComponent.tsx`
3. Create hook in `src/hooks/auth/useNewAuth.ts`
4. Add API call in `src/api/auth.api.ts`
5. Add types in `src/types/auth.types.ts`

---

## 📊 Expected Benefits / 기대 효과

### Developer Experience

- ✅ **Faster file discovery** - All related files in one domain folder
- ✅ **Easier refactoring** - Change one domain without affecting others
- ✅ **Better code organization** - Clear separation of concerns
- ✅ **Consistent naming** - No more Login vs login confusion

### Code Quality

- ✅ **Reduced coupling** - Domain-driven organization promotes modularity
- ✅ **Easier testing** - Test entire domains independently
- ✅ **Better scalability** - Add new features without reorganizing entire codebase

### Team Collaboration

- ✅ **Clear ownership** - Teams can own specific domains
- ✅ **Parallel development** - Work on different domains without conflicts
- ✅ **Easier onboarding** - New developers find things faster

---

## 🚨 Risks & Mitigation / 위험 요소 및 완화 방안

### Risk 1: Breaking Changes During Migration
**위험**: 마이그레이션 중 코드 중단

**Mitigation**:
- Use feature branch
- Migrate incrementally
- Test after each phase
- Keep rollback plan ready

### Risk 2: Import Path Confusion
**위험**: import 경로 혼란

**Mitigation**:
- Use migration scripts
- Review all changes before merge
- Update documentation immediately
- Use TypeScript for compile-time checks

### Risk 3: Team Resistance
**위험**: 팀 저항

**Mitigation**:
- Explain benefits clearly
- Get team buy-in before starting
- Provide training session
- Document new conventions

---

## 📅 Rollout Strategy / 출시 전략

### Week 1-2: Preparation
- Review plan with team
- Get approval
- Create migration branch
- Set up scripts

### Week 3-5: Migration
- Execute phases 1-4
- Daily standup updates
- Code reviews at each phase

### Week 6: Import Updates & Testing
- Run migration scripts
- Manual review
- Comprehensive testing

### Week 7: Launch
- Final review
- Merge to main
- Update documentation
- Team announcement

---

## 🎯 Success Metrics / 성공 지표

- [ ] All routes work without errors
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] All tests pass
- [ ] Team understands new structure
- [ ] Documentation updated
- [ ] Migration completed within 7 weeks

---

**Last Updated**: 2025-11-17
**Version**: 1.0.0
**Status**: Draft - Pending Team Review

---

## 📞 Contact / 문의

For questions about this refactoring plan:
- Create an issue in the repository
- Reach out to the dev team lead
- Schedule a meeting to discuss

이 리팩토링 계획에 대한 질문은:
- 저장소에 이슈 생성
- 개발팀 리드에게 문의
- 논의를 위한 미팅 일정 잡기
