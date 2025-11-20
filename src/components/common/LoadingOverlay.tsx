import clsx from 'clsx';
import { UI_CONSTANTS } from '@/constants/common';

interface LoadingOverlayProps {
  /**
   * 오버레이 표시 여부
   */
  isVisible: boolean;

  /**
   * 메인 메시지
   */
  message: string;

  /**
   * 서브 메시지 (선택적)
   */
  subMessage?: string;

  /**
   * 커스텀 로딩 스피너
   * 제공되지 않으면 기본 스피너 사용
   */
  spinner?: React.ReactNode;

  /**
   * 오버레이 배경색
   * @default 'bg-black/50'
   */
  backgroundColor?: string;

  /**
   * z-index 값
   * @default UI_CONSTANTS.Z_INDEX.modal
   */
  zIndex?: number;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 공통 로딩 오버레이 컴포넌트
 *
 * 전체 화면을 덮는 반투명 오버레이와 로딩 메시지를 표시합니다
 *
 * @example
 * ```tsx
 * <LoadingOverlay
 *   isVisible={isLoading}
 *   message="업로드 중..."
 *   subMessage="잠시만 기다려주세요"
 * />
 * ```
 */
export const LoadingOverlay = ({
  isVisible,
  message,
  subMessage,
  spinner,
  backgroundColor = 'bg-black/50',
  zIndex = UI_CONSTANTS.Z_INDEX.modal,
  className,
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center',
        backgroundColor,
        className
      )}
      style={{ zIndex }}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-8 py-10 shadow-xl">
        {/* 로딩 스피너 */}
        {spinner || <DefaultSpinner />}

        {/* 메시지 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-heading-02-semibold text-gray-100">{message}</p>
          {subMessage && <p className="text-body-02 text-gray-60">{subMessage}</p>}
        </div>
      </div>
    </div>
  );
};

/**
 * 기본 로딩 스피너
 */
const DefaultSpinner = () => (
  <div className="relative h-12 w-12">
    <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
    <div
      className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      style={{ animationDuration: '0.8s' }}
    />
  </div>
);
