interface LipSoundProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

/**
 * 입술 소리 연습 진행바
 *
 * 2단계로 구성된 진행바 (1단계: 설명, 2단계: 실전 연습)
 */
export const LipSoundProgressBar = ({
  currentStep = 2,
  totalSteps = 2,
  className = '',
}: LipSoundProgressBarProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-full ${step <= currentStep ? 'bg-blue-1' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
};
