import { ReactNode } from 'react';
import clsx from 'clsx';
import { UI_CONSTANTS } from '@/constants/common';

interface RecordingButtonProps {
  /**
   * 녹음 중 여부
   */
  isRecording: boolean;

  /**
   * 녹음 진행률 (0-100)
   * 원형 프로그레스 바 표시 시 사용
   */
  progress?: number;

  /**
   * 버튼 크기
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 녹음 시작 핸들러
   */
  onStart: () => void;

  /**
   * 녹음 중지 핸들러
   */
  onStop: () => void;

  /**
   * 버튼 내부 아이콘/컨텐츠
   * 제공되지 않으면 기본 마이크/중지 아이콘 표시
   */
  children?: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-[88px] w-[88px]',
};

const ICON_SIZE_CLASSES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

/**
 * 공통 녹음 버튼 컴포넌트
 *
 * 녹음 시작/중지 기능을 제공하는 원형 버튼
 * progress prop을 제공하면 원형 프로그레스 바가 표시됩니다
 *
 * @example
 * ```tsx
 * <RecordingButton
 *   isRecording={isRecording}
 *   progress={progress}
 *   onStart={handleStart}
 *   onStop={handleStop}
 * >
 *   {isRecording ? <StopIcon /> : <MicIcon />}
 * </RecordingButton>
 * ```
 */
export const RecordingButton = ({
  isRecording,
  progress = 0,
  size = 'lg',
  disabled = false,
  onStart,
  onStop,
  children,
  className,
}: RecordingButtonProps) => {
  const handleClick = () => {
    if (disabled) return;
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };

  const sizeClass = SIZE_CLASSES[size];
  const iconSizeClass = ICON_SIZE_CLASSES[size];

  return (
    <div className={clsx('relative inline-flex items-center justify-center', className)}>
      {/* 원형 프로그레스 바 (progress가 0보다 클 때만 표시) */}
      {progress > 0 && (
        <svg
          className={clsx('absolute', sizeClass)}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="4"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeDasharray={`${progress * 2.51} 251`}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
      )}

      {/* 버튼 */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={clsx(
          sizeClass,
          'relative flex items-center justify-center rounded-full transition-all',
          isRecording
            ? 'bg-red-500 hover:bg-red-600 active:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
          disabled && 'cursor-not-allowed opacity-50',
          !disabled && 'shadow-lg hover:shadow-xl'
        )}
        aria-label={isRecording ? '녹음 중지' : '녹음 시작'}
      >
        {children ? (
          children
        ) : (
          /* 기본 아이콘 - 제공되지 않은 경우 */
          <div
            className={clsx(
              iconSizeClass,
              'transition-colors',
              isRecording ? 'bg-white' : 'border-2 border-white rounded-full'
            )}
          />
        )}
      </button>
    </div>
  );
};
