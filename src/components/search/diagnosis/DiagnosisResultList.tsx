import { DiagnosisResultCard } from './DiagnosisResultCard';
import { DIAGNOSIS_MESSAGES } from '@/constants/search/diagnosis';
import type { KitDiagnosisResponse } from '@/types/talkingkit';

interface DiagnosisResultListProps {
  /**
   * 추천 키트 목록
   */
  recommendedKits: KitDiagnosisResponse['result']['recommendedKits'];

  /**
   * 저장된 키트 ID 목록
   */
  savedKits: Set<number>;

  /**
   * 모두 담기 버튼 클릭 핸들러
   */
  onSaveAll: () => void;

  /**
   * 개별 키트 담기/해제 핸들러
   */
  onToggleSaveKit: (kitId: number) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 진단 결과 키트 목록
 *
 * 추천 키트 목록과 "모두 담기" 버튼을 표시
 */
export const DiagnosisResultList = ({
  recommendedKits,
  savedKits,
  onSaveAll,
  onToggleSaveKit,
  className,
}: DiagnosisResultListProps) => {
  return (
    <div className={`flex flex-col items-end gap-2 ${className || ''}`}>
      {/* 모두 담기 버튼 */}
      <button
        onClick={onSaveAll}
        className="border-gray-10 hover:bg-gray-10 flex cursor-pointer items-center justify-center rounded-full border bg-white px-4 py-2 transition-colors"
      >
        <p className="text-body-02-regular text-gray-100">{DIAGNOSIS_MESSAGES.SAVE_ALL}</p>
      </button>

      {/* 키트 리스트 */}
      <div className="flex w-full flex-col gap-2">
        {recommendedKits && recommendedKits.length > 0 ? (
          recommendedKits.map((kit) => (
            <DiagnosisResultCard
              key={kit.kitId}
              kitId={kit.kitId}
              kitName={kit.kitName}
              isSaved={savedKits.has(kit.kitId)}
              onToggleSave={onToggleSaveKit}
            />
          ))
        ) : (
          <div className="flex h-[100px] items-center justify-center rounded-lg bg-white">
            <p className="text-body-01-regular text-gray-60">{DIAGNOSIS_MESSAGES.NO_KITS}</p>
          </div>
        )}
      </div>
    </div>
  );
};
