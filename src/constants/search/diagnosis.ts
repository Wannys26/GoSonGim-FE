/**
 * 키트 진단 관련 상수
 */

export const DIAGNOSIS_CONFIG = {
  /** 녹음 시간 (밀리초) */
  RECORDING_DURATION: 8000,

  /** 프로그레스 업데이트 간격 (밀리초) */
  PROGRESS_INTERVAL: 50,

  /** 결과 전환 딜레이 (밀리초) */
  RESULT_DELAY: 500,
} as const;

export const DIAGNOSIS_MESSAGES = {
  // Header
  HEADER_TITLE: '조음•발음 키트 진단받기',

  // 시작 화면
  INSTRUCTION_LINE1: '위 문장을 읽어주세요.',
  INSTRUCTION_LINE2: '키트 탐색을 도와드릴게요',

  // 로딩 화면
  LOADING: '진단중...',

  // 결과 화면
  RESULT_TITLE_LINE1: '다현님은',
  RESULT_TITLE_LINE2: '해당 키트가 필요해요',
  SAVE_ALL: '모두 내학습에 담기',
  SAVE_KIT: '담기',
  NO_KITS: '추천 키트가 없습니다',
  KIT_CATEGORY: '조음 키트',

  // 버튼
  RETRY: '다시 탐색하기',
  GO_TO_STUDY: '내 학습 가기',

  // 모달
  MODAL_TITLE: '학습을 담지 않으시겠습니까?',
  MODAL_MESSAGE_LINE1: '진단 내역은 저장되지 않아',
  MODAL_MESSAGE_LINE2: '다시 확인할 수 없습니다.',
  MODAL_CANCEL: '취소하기',
  MODAL_CONFIRM: '담지 않기',
} as const;

export type DiagnosisStep = 'start' | 'loading' | 'result';
