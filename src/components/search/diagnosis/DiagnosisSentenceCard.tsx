import MarkLeft from '@/assets/svgs/search/studyfind-markleft.svg';
import MarkRight from '@/assets/svgs/search/studyfind-markright.svg';

interface DiagnosisSentenceCardProps {
  /**
   * 표시할 문장
   */
  sentence: string;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 진단 문장 표시 카드
 *
 * 사용자가 읽어야 할 문장을 표시하는 카드 컴포넌트
 */
export const DiagnosisSentenceCard = ({ sentence, className }: DiagnosisSentenceCardProps) => {
  return (
    <div className={`flex h-[186px] w-full flex-col gap-5 rounded-2xl bg-white p-4 ${className || ''}`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <MarkLeft className="size-5" />
        </div>
        <MarkRight className="size-5" />
      </div>
      <p className="text-body-01-semibold text-gray-80 text-center">{sentence}</p>
    </div>
  );
};
