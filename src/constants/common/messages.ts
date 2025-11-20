/**
 * 공통 메시지 상수
 * 프로젝트 전반에서 사용되는 메시지 문자열
 */

export const ERROR_MESSAGES = {
  // Network errors
  NETWORK: '네트워크 오류가 발생했습니다',
  NETWORK_TIMEOUT: '요청 시간이 초과되었습니다',
  SERVER_ERROR: '서버 오류가 발생했습니다',

  // Recording errors
  RECORDING_START: '녹음을 시작할 수 없습니다',
  RECORDING_STOP: '녹음을 중지할 수 없습니다',
  RECORDING_PERMISSION: '마이크 권한이 필요합니다',
  RECORDING_DEVICE: '마이크 장치를 찾을 수 없습니다',
  RECORDING_IN_USE: '마이크를 사용할 수 없습니다. 다른 앱에서 사용 중일 수 있습니다',

  // Upload errors
  UPLOAD_FAILED: '업로드에 실패했습니다',
  UPLOAD_SIZE: '파일 크기가 너무 큽니다',

  // Auth errors
  AUTH_REQUIRED: '로그인이 필요합니다',
  AUTH_EXPIRED: '로그인 세션이 만료되었습니다',
  AUTH_INVALID: '잘못된 인증 정보입니다',

  // Validation errors
  VALIDATION_EMAIL: '올바른 이메일 형식이 아닙니다',
  VALIDATION_PASSWORD: '비밀번호는 8자 이상이어야 합니다',
  VALIDATION_REQUIRED: '필수 항목입니다',

  // General errors
  UNKNOWN: '알 수 없는 오류가 발생했습니다',
  TRY_AGAIN: '다시 시도해주세요',
} as const;

export const SUCCESS_MESSAGES = {
  // General success
  SAVED: '저장되었습니다',
  DELETED: '삭제되었습니다',
  UPDATED: '수정되었습니다',
  COMPLETED: '완료되었습니다',

  // Auth success
  LOGIN_SUCCESS: '로그인되었습니다',
  LOGOUT_SUCCESS: '로그아웃되었습니다',
  SIGNUP_SUCCESS: '회원가입이 완료되었습니다',

  // Recording success
  RECORDING_SAVED: '녹음이 저장되었습니다',
  UPLOAD_SUCCESS: '업로드가 완료되었습니다',
} as const;

export const CONFIRM_MESSAGES = {
  DELETE: '정말 삭제하시겠습니까?',
  CANCEL: '작업을 취소하시겠습니까?',
  LOGOUT: '로그아웃하시겠습니까?',
  EXIT: '나가시겠습니까?',
  DISCARD: '변경사항을 저장하지 않으시겠습니까?',
} as const;

export const LOADING_MESSAGES = {
  LOADING: '로딩 중...',
  SAVING: '저장 중...',
  UPLOADING: '업로드 중...',
  PROCESSING: '처리 중...',
  RECORDING: '녹음 중...',
  EVALUATING: '평가 중...',
  ANALYZING: '분석 중...',
} as const;

export const BUTTON_LABELS = {
  CONFIRM: '확인',
  CANCEL: '취소',
  SAVE: '저장',
  DELETE: '삭제',
  EDIT: '수정',
  RETRY: '다시 시도',
  CLOSE: '닫기',
  NEXT: '다음',
  PREV: '이전',
  COMPLETE: '완료',
  START: '시작',
  STOP: '중지',
} as const;

export type ErrorMessages = typeof ERROR_MESSAGES;
export type SuccessMessages = typeof SUCCESS_MESSAGES;
export type ConfirmMessages = typeof CONFIRM_MESSAGES;
export type LoadingMessages = typeof LOADING_MESSAGES;
export type ButtonLabels = typeof BUTTON_LABELS;
