import Mike2 from '@/assets/svgs/home/mike2.svg';
import WhiteSquare from '@/assets/svgs/home/whitesquare.svg';
import BlueCircle from '@/assets/svgs/home/bluecircle.svg';
import CircularProgress from '@/components/freetalk/CircularProgress';
import { LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

interface LipSoundRecordingSectionProps {
  isRecording: boolean;
  progress: number;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

/**
 * 입술 소리 연습 녹음 섹션
 *
 * 안내 텍스트 + 녹음 버튼 (녹음 중일 때는 프로그레스 표시)
 */
export const LipSoundRecordingSection = ({
  isRecording,
  progress,
  isProcessing,
  onStartRecording,
  onStopRecording,
}: LipSoundRecordingSectionProps) => {
  return (
    <div className="flex w-[238px] flex-col items-center gap-4">
      <p className="text-body-02-regular text-gray-60 w-full whitespace-pre-line text-center">
        {LIP_SOUND_MESSAGES.INSTRUCTION}
      </p>

      {/* 녹음 버튼 */}
      {isRecording ? (
        <button
          onClick={onStopRecording}
          className="relative flex size-[88px] cursor-pointer items-center justify-center"
          aria-label="녹음 중단"
        >
          <CircularProgress progress={progress} />
          <BlueCircle className="absolute size-[88px]" />
          <WhiteSquare className="relative size-[26px]" />
        </button>
      ) : (
        <button
          onClick={onStartRecording}
          disabled={isProcessing}
          className={`flex size-[88px] items-center justify-center ${isProcessing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          aria-label="녹음하기"
        >
          <Mike2 className="size-[88px]" />
        </button>
      )}
    </div>
  );
};
