/**
 * 공통 UI 상수
 * 프로젝트 전반에서 사용되는 UI 관련 상수값
 */

export const UI_CONSTANTS = {
  // Layout dimensions
  HEADER_HEIGHT: 64,
  BOTTOM_NAV_HEIGHT: 68,
  CONTAINER_MAX_WIDTH: 393,
  CONTAINER_HEIGHT: 852,

  // Button sizes
  RECORDING_BUTTON_SIZE: 88,
  ICON_BUTTON_SIZE: 48,

  // Border radius
  BORDER_RADIUS: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },

  // Card dimensions
  CARD: {
    WIDTH: 173,
    HEIGHT: 138,
    LARGE_WIDTH: 232,
  },

  // Animation durations (ms)
  ANIMATION: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Z-index layers
  Z_INDEX: {
    dropdown: 1000,
    modal: 2000,
    toast: 3000,
    tooltip: 4000,
  },
} as const;

export type UIConstants = typeof UI_CONSTANTS;
