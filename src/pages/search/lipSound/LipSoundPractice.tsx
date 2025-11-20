import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '@/assets/svgs/talkingkit/common/leftarrow.svg';
import AnimatedContainer from '@/components/talkingkit/common/AnimatedContainer';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import {
  LipSoundWordChips,
  LipSoundWordCard,
  LipSoundRoundButtons,
  LipSoundRecordingSection,
  LipSoundProgressBar,
} from '@/components/search/lipSound';
import {
  useLipSoundRecording,
  useS3Upload,
  useLipSoundEvaluation,
} from '@/hooks/search/lipSound';
import { lipSoundPracticeWords } from '@/mock/search/lipSoundKit.mock';
import { LIP_SOUND_CONFIG, LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

const LipSoundPractice = () => {
  const navigate = useNavigate();

  // 녹음 관리
  const {
    isRecording,
    progress,
    currentRound,
    completedRounds,
    handleStartRecording,
    handleStopRecordingAndSave,
    setCurrentRound,
    markRoundCompleted,
  } = useLipSoundRecording();

  // S3 업로드
  const { isUploading, fileKeys, uploadRecordingToS3 } = useS3Upload();

  // 발음 평가
  const { isEvaluating, handleEvaluatePronunciation } = useLipSoundEvaluation({
    words: lipSoundPracticeWords,
  });

  const currentWord = lipSoundPracticeWords.find((w) => w.round === currentRound);
  const isProcessing = isUploading || isEvaluating;
  const overlayMessage = isUploading
    ? LIP_SOUND_MESSAGES.UPLOADING
    : LIP_SOUND_MESSAGES.EVALUATING;
  const overlaySubMessage = isUploading
    ? LIP_SOUND_MESSAGES.UPLOADING_SUB
    : LIP_SOUND_MESSAGES.EVALUATING_SUB;

  // 녹음 완료 시 업로드 및 다음 라운드 처리
  useEffect(() => {
    if (progress === 100 && isRecording) {
      const processRecording = async () => {
        const wavBlob = await handleStopRecordingAndSave();
        if (!wavBlob) return;

        try {
          await uploadRecordingToS3(currentRound, wavBlob);
          markRoundCompleted(currentRound);

          if (currentRound < LIP_SOUND_CONFIG.TOTAL_ROUNDS) {
            setCurrentRound(currentRound + 1);
          } else if (fileKeys.size === LIP_SOUND_CONFIG.TOTAL_ROUNDS) {
            await handleEvaluatePronunciation(fileKeys);
          }
        } catch (error) {
          // 에러는 훅 내부에서 처리됨
        }
      };

      processRecording();
    }
  }, [
    progress,
    isRecording,
    currentRound,
    fileKeys,
    handleStopRecordingAndSave,
    uploadRecordingToS3,
    markRoundCompleted,
    setCurrentRound,
    handleEvaluatePronunciation,
  ]);

  const handleBackClick = () => {
    navigate('/search/articulation-position/lip-sound/step2');
  };

  const handleRoundClick = (round: number) => {
    if (!isRecording && !isProcessing) {
      setCurrentRound(round);
    }
  };

  return (
    <div className="bg-background-primary relative flex h-full flex-col">
      {/* 처리 중 로딩 오버레이 */}
      <LoadingOverlay
        isVisible={isProcessing}
        message={overlayMessage}
        subMessage={overlaySubMessage}
      />

      {/* Header */}
      <div className="h-16 w-full overflow-hidden bg-white">
        <div className="relative flex h-full items-center justify-center">
          <button
            onClick={handleBackClick}
            className="absolute left-4 flex size-12 cursor-pointer items-center justify-center overflow-hidden p-2"
            aria-label="뒤로가기"
          >
            <div className="h-[18px] w-[10px]">
              <LeftArrowIcon className="h-full w-full" />
            </div>
          </button>
          <p className="text-heading-02-regular text-gray-100">
            {LIP_SOUND_MESSAGES.HEADER_TITLE}
          </p>
        </div>
      </div>

      {/* 진행바 */}
      <AnimatedContainer variant="fadeInUpSmall" delay={0} className="px-4 py-3" disabled={false}>
        <LipSoundProgressBar />
      </AnimatedContainer>

      {/* 본문 */}
      <div className="flex w-full flex-col items-center px-4">
        <div className="flex w-[361px] flex-col gap-6">
          {/* 단계 정보 */}
          <AnimatedContainer variant="fadeInUp" delay={0.1} className="w-full text-left" disabled={false}>
            <p className="text-detail-01 text-gray-60">{LIP_SOUND_MESSAGES.STEP_LABEL}</p>
            <h2 className="text-heading-02-semibold text-gray-100">
              {LIP_SOUND_MESSAGES.STEP_TITLE}
            </h2>
          </AnimatedContainer>

          {/* 콘텐츠 영역 */}
          <AnimatedContainer
            variant="fadeInScale"
            delay={0.2}
            className="flex w-full flex-col gap-6"
            disabled={false}
          >
            {/* 단어 칩 + 박스 섹션 */}
            <div className="flex w-full flex-col gap-2">
              <LipSoundWordChips
                words={lipSoundPracticeWords}
                currentRound={currentRound}
                completedRounds={completedRounds}
                isRecording={isRecording}
                isProcessing={isProcessing}
                onRoundClick={handleRoundClick}
              />
              <LipSoundWordCard category={currentWord?.category} word={currentWord?.word} />
            </div>

            {/* 차수 버튼 */}
            <LipSoundRoundButtons
              currentRound={currentRound}
              completedRounds={completedRounds}
              isRecording={isRecording}
              isProcessing={isProcessing}
              onRoundClick={handleRoundClick}
            />
          </AnimatedContainer>
        </div>
      </div>

      {/* 하단 녹음 섹션 */}
      <AnimatedContainer
        variant="fadeIn"
        delay={0.25}
        className="absolute left-[72px] top-[522px] flex w-[238px] flex-col items-center gap-4"
        disabled={false}
      >
        <LipSoundRecordingSection
          isRecording={isRecording}
          progress={progress}
          isProcessing={isProcessing}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecordingAndSave}
        />
      </AnimatedContainer>
    </div>
  );
};

export default LipSoundPractice;
