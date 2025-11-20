/**
 * 입술 소리 연습 관련 상수
 */

export const LIP_SOUND_CONFIG = {
  /** 녹음 시간 (밀리초) */
  RECORDING_DURATION: 3000,

  /** 프로그레스 업데이트 간격 (밀리초) */
  PROGRESS_INTERVAL: 50,

  /** 총 라운드 수 */
  TOTAL_ROUNDS: 3,

  /** S3 폴더명 */
  S3_FOLDER: 'kit',
} as const;

export const LIP_SOUND_MESSAGES = {
  // Header
  HEADER_TITLE: '입술 소리',

  // 단계 정보
  STEP_LABEL: '2단계',
  STEP_TITLE: '실전 발음 연습',

  // 안내
  INSTRUCTION: '소리를 잘 듣고\n음성 버튼을 눌러 단어를 발음해주세요',

  // 로딩 오버레이
  UPLOADING: '녹음 업로드 중...',
  UPLOADING_SUB: '잠시만 기다려주세요',
  EVALUATING: '발음 평가 중...',
  EVALUATING_SUB: '발음을 분석하고 있어요',

  // 버튼
  ROUND_PREFIX: '차',
  ROUND_COMPLETED: '완료',

  // 에러 메시지
  ERROR_RECORDING: '녹음 파일을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.',
  ERROR_EVALUATION: '발음 평가 중 오류가 발생했습니다. 다시 시도해주세요.',
  ERROR_WORD_NOT_FOUND: '라운드에 해당하는 단어를 찾을 수 없습니다.',
  ERROR_S3_UPLOAD: 'S3 업로드 실패',
} as const;
