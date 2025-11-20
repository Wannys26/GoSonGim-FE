import CheckIcon from '@/assets/svgs/search/studyfind-check.svg';
import { DIAGNOSIS_MESSAGES } from '@/constants/search/diagnosis';

interface DiagnosisResultCardProps {
  /**
   * 키트 ID
   */
  kitId: number;

  /**
   * 키트 이름
   */
  kitName: string;

  /**
   * 저장 여부
   */
  isSaved: boolean;

  /**
   * 담기 버튼 클릭 핸들러
   */
  onToggleSave: (kitId: number) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 진단 결과 키트 카드
 *
 * 추천된 키트를 표시하고 담기 기능을 제공하는 카드
 */
export const DiagnosisResultCard = ({
  kitId,
  kitName,
  isSaved,
  onToggleSave,
  className,
}: DiagnosisResultCardProps) => {
  return (
    <div className={`flex h-[66px] items-center justify-between rounded-lg bg-white px-4 py-2 ${className || ''}`}>
      <div className="flex flex-col gap-[2px] leading-normal">
        <p className="text-detail-02 text-gray-60">{DIAGNOSIS_MESSAGES.KIT_CATEGORY}</p>
        <p className="text-heading-02-semibold text-gray-100">{kitName}</p>
      </div>

      <button
        onClick={() => onToggleSave(kitId)}
        className={`flex items-center justify-center gap-[10px] rounded-full border px-4 py-2 transition-colors ${
          isSaved ? 'border-blue-1 bg-white' : 'border-gray-40 hover:bg-gray-10 bg-white'
        }`}
        aria-label={isSaved ? '저장됨' : '담기'}
      >
        {isSaved ? (
          <CheckIcon className="size-[14px]" />
        ) : (
          <div className="bg-gray-40 size-[14px] rounded-full" />
        )}
        <p className={`text-body-01-semibold ${isSaved ? 'text-gray-100' : 'text-gray-40'}`}>
          {DIAGNOSIS_MESSAGES.SAVE_KIT}
        </p>
      </button>
    </div>
  );
};
