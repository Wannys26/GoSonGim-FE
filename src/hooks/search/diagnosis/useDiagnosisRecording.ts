import { useState, useEffect, useCallback } from 'react';
import { useAudioRecorder } from '@/hooks/common/useAudioRecorder';
import { logger } from '@/utils/common/loggerUtils';
import { DIAGNOSIS_CONFIG } from '@/constants/search/diagnosis';

interface UseDiagnosisRecordingReturn {
  /** 녹음 중 여부 */
  isRecording: boolean;
  /** 녹음 진행률 (0-100) */
  progress: number;
  /** 녹음된 오디오 Blob */
  audioBlob: Blob | null;
  /** 녹음 시작 */
  handleStartRecording: () => Promise<void>;
  /** 녹음 중지 */
  handleStopRecording: () => void;
}

/**
 * 진단 녹음 관리 훅
 *
 * 8초 타이머가 있는 녹음 기능을 제공
 */
export const useDiagnosisRecording = (): UseDiagnosisRecordingReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const { startRecording, stopRecording } = useAudioRecorder();

  // 녹음 완료 처리
  const handleRecordingComplete = useCallback(async () => {
    const blob = await stopRecording();
    if (blob) {
      setAudioBlob(blob);
      logger.log('녹음 완료, Blob 크기:', blob.size);
    }
  }, [stopRecording]);

  // 8초 녹음 타이머
  useEffect(() => {
    if (!isRecording) return;

    const { RECORDING_DURATION, PROGRESS_INTERVAL } = DIAGNOSIS_CONFIG;
    const increment = (PROGRESS_INTERVAL / RECORDING_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsRecording(false);
          setProgress(0);
          handleRecordingComplete();
          return 100;
        }
        return newProgress;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(timer);
  }, [isRecording, handleRecordingComplete]);

  const handleStartRecording = async () => {
    try {
      await startRecording();
      setIsRecording(true);
      setProgress(0);
    } catch (error) {
      logger.error('녹음 시작 실패:', error);
      throw error;
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setProgress(0);
  };

  return {
    isRecording,
    progress,
    audioBlob,
    handleStartRecording,
    handleStopRecording,
  };
};
