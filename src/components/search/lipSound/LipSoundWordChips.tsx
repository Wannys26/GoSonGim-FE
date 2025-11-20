interface LipSoundWordChipsProps {
  words: Array<{ round: number; word: string }>;
  currentRound: number;
  completedRounds: Set<number>;
  isRecording: boolean;
  isProcessing: boolean;
  onRoundClick: (round: number) => void;
}

/**
 * 입술 소리 연습 단어 칩 버튼
 *
 * 단어 칩들을 가로로 나열하고, 현재/완료/비활성 상태를 시각적으로 표시
 */
export const LipSoundWordChips = ({
  words,
  currentRound,
  completedRounds,
  isRecording,
  isProcessing,
  onRoundClick,
}: LipSoundWordChipsProps) => {
  return (
    <div className="flex gap-2">
      {words.map((wordData) => {
        const isCompleted = completedRounds.has(wordData.round);
        const isCurrent = currentRound === wordData.round;
        const isActive = isCompleted || isCurrent;

        return (
          <button
            key={wordData.round}
            onClick={() => onRoundClick(wordData.round)}
            disabled={isRecording || isProcessing}
            className={`text-body-02-regular flex items-center justify-center rounded-full border px-4 py-1 transition-colors ${
              isActive ? 'border-blue-1 text-blue-1 bg-white' : 'bg-gray-20 text-gray-60 border-transparent'
            } ${!isRecording && !isProcessing && 'cursor-pointer hover:opacity-80'}`}
          >
            {wordData.word}
          </button>
        );
      })}
    </div>
  );
};
