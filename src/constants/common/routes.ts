/**
 * 공통 라우트 경로 상수
 * 프로젝트의 모든 라우트 경로를 중앙 관리
 */

export const ROUTES = {
  // Public routes
  LANDING: '/',
  LOGIN: '/login',
  LOGIN_EMAIL: '/login/email',
  SIGNUP_EMAIL: '/signup/email',
  GOOGLE_CALLBACK: '/callback',

  // Protected routes
  HOME: '/home',

  // Search domain
  SEARCH: '/search',
  SEARCH_KIT_DIAGNOSIS: '/search/kit-diagnosis',
  SEARCH_ARTICULATION_POSITION: '/search/articulation-position',
  SEARCH_ARTICULATION_METHOD: '/search/articulation-method',
  SEARCH_SITUATION_CATEGORY: '/search/situation/:categoryId',
  SEARCH_SITUATION_DETAIL: '/search/situation/:categoryId/:practiceId',
  SEARCH_LIP_SOUND_STEP1: '/search/lipsound/step1',
  SEARCH_LIP_SOUND_STEP2: '/search/lipsound/step2',
  SEARCH_LIP_SOUND_PRACTICE: '/search/lipsound/practice',
  SEARCH_LIP_SOUND_RESULT: '/search/lipsound/result',

  // TalkingKit domain
  TALKINGKIT: '/talkingkit',
  TALKINGKIT_DETAIL: '/talkingkit/:id',
  TALKINGKIT_BREATHING: '/talkingkit/breathing/:id',
  TALKINGKIT_LOUD_SOUND: '/talkingkit/loud-sound/:id',
  TALKINGKIT_LOUD_SOUND_VOLUME: '/talkingkit/loud-sound-volume/:id',
  TALKINGKIT_LOUD_SOUND_VOLUME_RESULT: '/talkingkit/loud-sound-volume-result/:id',
  TALKINGKIT_SHORT_SOUND: '/talkingkit/short-sound/:id',
  TALKINGKIT_SHORT_SOUND_RESULT: '/talkingkit/short-sound-result/:id',
  TALKINGKIT_STEADY_SOUND: '/talkingkit/steady-sound/:id',
  TALKINGKIT_VOWEL_PITCH: '/talkingkit/vowel-pitch/:id',
  TALKINGKIT_VOWEL_PITCH_RESULT: '/talkingkit/vowel-pitch-result/:id',

  // FreeTalk domain
  FREETALK: '/freetalk',
  FREETALK_INTRO: '/freetalk-intro',

  // Review domain
  REVIEW: '/review',
  REVIEW_CALENDAR: '/review/calendar',
  REVIEW_PRACTICE: '/review/practice',
  REVIEW_PRACTICE_LISTEN: '/review/practice/listen',
  REVIEW_PRACTICE_SPEAK: '/review/practice/speak',

  // Profile domain
  PROFILE: '/profile',
  PROFILE_GUIDE: '/profile/guide',
  PROFILE_ACCOUNT: '/profile/account',
  PROFILE_WORD_LIST: '/profile/word-list',

  // StudyTalk domain
  STUDYTALK: '/studytalk',

  // Nickname setup
  NICKNAME: '/nickname',
} as const;

export type Routes = typeof ROUTES;

/**
 * 라우트 경로 생성 헬퍼 함수
 */
export const createRoute = {
  situationCategory: (categoryId: number) =>
    ROUTES.SEARCH_SITUATION_CATEGORY.replace(':categoryId', String(categoryId)),

  situationDetail: (categoryId: number, practiceId: number) =>
    ROUTES.SEARCH_SITUATION_DETAIL.replace(':categoryId', String(categoryId)).replace(
      ':practiceId',
      String(practiceId)
    ),

  talkingkitDetail: (id: number) => ROUTES.TALKINGKIT_DETAIL.replace(':id', String(id)),

  talkingkitBreathing: (id: number) => ROUTES.TALKINGKIT_BREATHING.replace(':id', String(id)),

  talkingkitLoudSound: (id: number) => ROUTES.TALKINGKIT_LOUD_SOUND.replace(':id', String(id)),

  talkingkitShortSound: (id: number) => ROUTES.TALKINGKIT_SHORT_SOUND.replace(':id', String(id)),

  talkingkitSteadySound: (id: number) => ROUTES.TALKINGKIT_STEADY_SOUND.replace(':id', String(id)),

  talkingkitVowelPitch: (id: number) => ROUTES.TALKINGKIT_VOWEL_PITCH.replace(':id', String(id)),
};
