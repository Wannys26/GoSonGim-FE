import { DIAGNOSIS_MESSAGES } from '@/constants/search/diagnosis';

interface DiagnosisActionButtonsProps {
  /**
   * 다시 탐색하기 버튼 클릭 핸들러
   */
  onRetry: () => void;

  /**
   * 내 학습 가기 버튼 클릭 핸들러
   */
  onGoToStudy: () => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 진단 결과 하단 액션 버튼들
 *
 * "다시 탐색하기"와 "내 학습 가기" 버튼
 */
export const DiagnosisActionButtons = ({
  onRetry,
  onGoToStudy,
  className,
}: DiagnosisActionButtonsProps) => {
  return (
    <div className={`absolute bottom-0 left-0 flex w-full gap-4 px-[15px] pb-[68px] ${className || ''}`}>
      <button
        onClick={onRetry}
        className="bg-gray-20 hover:bg-gray-40 flex h-16 flex-1 items-center justify-center rounded-lg p-[10px] transition-colors"
      >
        <p className="text-body-01-semibold text-gray-100">{DIAGNOSIS_MESSAGES.RETRY}</p>
      </button>
      <button
        onClick={onGoToStudy}
        className="bg-blue-1 hover:bg-blue-1-hover flex h-16 flex-1 items-center justify-center rounded-lg p-[10px] transition-colors"
      >
        <p className="text-body-01-semibold text-white">{DIAGNOSIS_MESSAGES.GO_TO_STUDY}</p>
      </button>
    </div>
  );
};
