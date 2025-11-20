import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioRecorder } from '@/hooks/common/useAudioRecorder';
import { logger } from '@/utils/common/loggerUtils';
import { LIP_SOUND_CONFIG, LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

interface UseLipSoundRecordingReturn {
  /** 녹음 중 여부 */
  isRecording: boolean;
  /** 녹음 진행률 (0-100) */
  progress: number;
  /** 현재 라운드 */
  currentRound: number;
  /** 완료된 라운드 목록 */
  completedRounds: Set<number>;
  /** 녹음 시작 */
  handleStartRecording: () => Promise<void>;
  /** 녹음 중지 및 저장 */
  handleStopRecordingAndSave: () => Promise<Blob | null>;
  /** 라운드 변경 */
  setCurrentRound: (round: number) => void;
  /** 라운드 완료 표시 */
  markRoundCompleted: (round: number) => void;
}

/**
 * 입술 소리 연습 녹음 관리 훅
 *
 * 3초 타이머 녹음, 진행률 표시, 라운드 관리
 */
export const useLipSoundRecording = (): UseLipSoundRecordingReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [completedRounds, setCompletedRounds] = useState<Set<number>>(new Set());
  const currentRoundRef = useRef(currentRound);

  const { startRecording, stopRecording, error: recorderError } = useAudioRecorder();

  // currentRound 변경 시 ref 업데이트
  useEffect(() => {
    currentRoundRef.current = currentRound;
  }, [currentRound]);

  // 녹음 에러 처리
  useEffect(() => {
    if (recorderError) {
      logger.error('녹음 에러:', recorderError);
      alert(recorderError);
    }
  }, [recorderError]);

  // 3초 녹음 타이머
  useEffect(() => {
    if (!isRecording) return;

    const interval = LIP_SOUND_CONFIG.PROGRESS_INTERVAL;
    const increment = (interval / LIP_SOUND_CONFIG.RECORDING_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setProgress(0);
          // 자동으로 녹음 중지는 부모에서 처리
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = useCallback(async () => {
    try {
      await startRecording();
      setIsRecording(true);
      setProgress(0);
      logger.log(`${currentRound}차 녹음 시작`);
    } catch (error) {
      logger.error('녹음 시작 실패:', error);
    }
  }, [startRecording, currentRound]);

  const handleStopRecordingAndSave = useCallback(async () => {
    try {
      const wavBlob = await stopRecording();

      if (!wavBlob) {
        return null;
      }

      const completedRound = currentRoundRef.current;

      setIsRecording(false);
      setProgress(0);

      logger.log(`${completedRound}차 녹음 완료:`, {
        round: completedRound,
        size: wavBlob.size,
        type: wavBlob.type,
      });

      return wavBlob;
    } catch (error) {
      logger.error('녹음 저장 실패:', error);
      alert(LIP_SOUND_MESSAGES.ERROR_RECORDING);
      return null;
    }
  }, [stopRecording]);

  const markRoundCompleted = useCallback((round: number) => {
    setCompletedRounds((prev) => new Set([...prev, round]));
  }, []);

  return {
    isRecording,
    progress,
    currentRound,
    completedRounds,
    handleStartRecording,
    handleStopRecordingAndSave,
    setCurrentRound,
    markRoundCompleted,
  };
};
