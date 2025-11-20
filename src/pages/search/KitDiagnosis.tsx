import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronLeft from '@/assets/svgs/home/leftarrow.svg';
import Mike2 from '@/assets/svgs/home/mike2.svg';
import WhiteSquare from '@/assets/svgs/home/whitesquare.svg';
import BlueCircle from '@/assets/svgs/home/bluecircle.svg';
import LoadingDot from '@/assets/svgs/search/studyfind-loadingdot.svg';
import CircularProgress from '@/components/freetalk/CircularProgress';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import {
  DiagnosisSentenceCard,
  DiagnosisResultList,
  DiagnosisActionButtons,
} from '@/components/search/diagnosis';
import {
  useDiagnosisRecording,
  useDiagnosisAPI,
  useDiagnosisKitSelection,
} from '@/hooks/search/diagnosis';
import { diagnosisSentence } from '@/mock/search/kitDiagnosis.mock';
import { DIAGNOSIS_CONFIG, DIAGNOSIS_MESSAGES, type DiagnosisStep } from '@/constants/search/diagnosis';

const KitDiagnosis = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<DiagnosisStep>('start');

  // 녹음 관리
  const { isRecording, progress, audioBlob, handleStartRecording, handleStopRecording } =
    useDiagnosisRecording();

  // API 호출
  const { diagnosisResult } = useDiagnosisAPI({
    step,
    audioBlob,
    targetText: diagnosisSentence,
  });

  // 키트 선택 관리
  const {
    savedKits,
    showModal,
    handleToggleSaveKit,
    handleSaveAll,
    handleGoToStudyTalk,
    handleCloseModal,
    handleConfirmNoSave,
  } = useDiagnosisKitSelection({
    recommendedKits: diagnosisResult?.recommendedKits,
  });

  // 녹음 완료 시 로딩 단계로 전환
  useEffect(() => {
    if (audioBlob && step === 'start') {
      setStep('loading');
    }
  }, [audioBlob, step]);

  // API 호출 완료 시 결과 단계로 전환
  useEffect(() => {
    if (step === 'loading' && diagnosisResult) {
      setTimeout(() => {
        setStep('result');
      }, DIAGNOSIS_CONFIG.RESULT_DELAY);
    }
  }, [step, diagnosisResult]);

  const handleRetry = () => {
    setStep('start');
  };

  return (
    <div className="bg-background-primary relative flex h-full flex-col">
      {/* Header */}
      <div className="relative flex h-16 items-center overflow-clip bg-white px-0 py-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 flex size-12 cursor-pointer items-center justify-center p-2"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-[18px] w-[10px]" />
        </button>
        <p className="text-heading-02-regular absolute left-1/2 -translate-x-1/2 text-center text-gray-100">
          {DIAGNOSIS_MESSAGES.HEADER_TITLE}
        </p>
      </div>

      {/* Step 1: 진단 시작 */}
      {step === 'start' && (
        <>
          <div className="flex flex-col items-center gap-12 px-4 pt-10">
            {/* 문장 박스 */}
            <DiagnosisSentenceCard sentence={diagnosisSentence} />

            {/* 안내 텍스트 */}
            <div className="text-body-01-regular text-gray-80 text-center">
              <p>{DIAGNOSIS_MESSAGES.INSTRUCTION_LINE1}</p>
              <p>{DIAGNOSIS_MESSAGES.INSTRUCTION_LINE2}</p>
            </div>
          </div>

          {/* 녹음 버튼 */}
          <div className="flex flex-1 items-end justify-center pb-[72px]">
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="relative flex size-[88px] cursor-pointer items-center justify-center"
                aria-label="녹음 중단"
              >
                <CircularProgress progress={progress} />
                <BlueCircle className="absolute size-[88px]" />
                <WhiteSquare className="relative size-[26px]" />
              </button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="flex size-[88px] cursor-pointer items-center justify-center"
                aria-label="녹음하기"
              >
                <Mike2 className="size-[88px]" />
              </button>
            )}
          </div>
        </>
      )}

      {/* Step 2: 로딩 */}
      {step === 'loading' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-[116px]">
          <div className="flex h-[38px] w-[146px] items-center justify-center">
            <LoadingDot className="h-[38px] w-[146px]" />
          </div>
          <p className="text-heading-02-regular text-gray-80">{DIAGNOSIS_MESSAGES.LOADING}</p>
        </div>
      )}

      {/* Step 3: 결과 */}
      {step === 'result' && (
        <>
          <main className="flex-1 overflow-y-auto pb-40 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-8 px-4 pt-[17px]">
              {/* 제목 */}
              <div className="text-[24px] font-medium leading-normal text-gray-100">
                <p>{DIAGNOSIS_MESSAGES.RESULT_TITLE_LINE1}</p>
                <p>{DIAGNOSIS_MESSAGES.RESULT_TITLE_LINE2}</p>
              </div>

              {/* 키트 리스트 */}
              <DiagnosisResultList
                recommendedKits={diagnosisResult?.recommendedKits || []}
                savedKits={savedKits}
                onSaveAll={handleSaveAll}
                onToggleSaveKit={handleToggleSaveKit}
              />
            </div>
          </main>

          {/* 하단 버튼 */}
          <DiagnosisActionButtons onRetry={handleRetry} onGoToStudy={handleGoToStudyTalk} />
        </>
      )}

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmNoSave}
        title={DIAGNOSIS_MESSAGES.MODAL_TITLE}
        message={`${DIAGNOSIS_MESSAGES.MODAL_MESSAGE_LINE1}\n${DIAGNOSIS_MESSAGES.MODAL_MESSAGE_LINE2}`}
        confirmText={DIAGNOSIS_MESSAGES.MODAL_CONFIRM}
        cancelText={DIAGNOSIS_MESSAGES.MODAL_CANCEL}
        confirmVariant="primary"
      />
    </div>
  );
};

export default KitDiagnosis;
