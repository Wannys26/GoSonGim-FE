import { LIP_SOUND_CONFIG, LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

interface LipSoundRoundButtonsProps {
  currentRound: number;
  completedRounds: Set<number>;
  isRecording: boolean;
  isProcessing: boolean;
  onRoundClick: (round: number) => void;
}

/**
 * 입술 소리 연습 차수 버튼
 *
 * 1차/2차/3차 버튼을 가로로 나열하고 완료/현재/비활성 상태 표시
 */
export const LipSoundRoundButtons = ({
  currentRound,
  completedRounds,
  isRecording,
  isProcessing,
  onRoundClick,
}: LipSoundRoundButtonsProps) => {
  return (
    <div className="flex w-full gap-2">
      {Array.from({ length: LIP_SOUND_CONFIG.TOTAL_ROUNDS }, (_, i) => i + 1).map((round) => {
        const isCompleted = completedRounds.has(round);
        const isCurrent = currentRound === round;

        return (
          <button
            key={round}
            onClick={() => onRoundClick(round)}
            disabled={isRecording || isProcessing}
            className={`text-body-01-semibold flex h-[39px] flex-1 items-center justify-center rounded-lg px-3 py-[6px] transition-colors ${
              isCompleted
                ? 'bg-blue-1 text-white'
                : isCurrent
                  ? 'border-blue-1 text-blue-1 border bg-white'
                  : 'bg-gray-20 text-gray-40'
            } ${!isRecording && !isProcessing && 'cursor-pointer hover:opacity-80'}`}
          >
            {isCompleted ? LIP_SOUND_MESSAGES.ROUND_COMPLETED : `${round}${LIP_SOUND_MESSAGES.ROUND_PREFIX}`}
          </button>
        );
      })}
    </div>
  );
};
