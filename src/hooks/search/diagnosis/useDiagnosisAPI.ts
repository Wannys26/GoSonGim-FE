import { useState, useEffect } from 'react';
import { kitAPI } from '@/apis/talkingkit';
import { logger } from '@/utils/common/loggerUtils';
import { DIAGNOSIS_CONFIG, type DiagnosisStep } from '@/constants/search/diagnosis';
import type { KitDiagnosisResponse } from '@/types/talkingkit';

interface UseDiagnosisAPIParams {
  /** 현재 단계 */
  step: DiagnosisStep;
  /** 녹음된 오디오 Blob */
  audioBlob: Blob | null;
  /** 진단 문장 */
  targetText: string;
}

interface UseDiagnosisAPIReturn {
  /** 진단 결과 */
  diagnosisResult: KitDiagnosisResponse['result'] | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 */
  error: Error | null;
}

/**
 * 진단 API 호출 훅
 *
 * step이 'loading'이고 audioBlob이 있을 때 자동으로 API 호출
 */
export const useDiagnosisAPI = ({
  step,
  audioBlob,
  targetText,
}: UseDiagnosisAPIParams): UseDiagnosisAPIReturn => {
  const [diagnosisResult, setDiagnosisResult] = useState<KitDiagnosisResponse['result'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (step !== 'loading' || !audioBlob) {
      logger.warn('API 호출 조건 미충족 - step:', step, 'audioBlob:', audioBlob);
      return;
    }

    const callDiagnosisAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 디버깅: audioBlob 상태 확인
        logger.log('audioBlob 정보:', {
          size: audioBlob.size,
          type: audioBlob.type,
        });

        // 1. Blob을 File로 변환
        const audioFile = new File([audioBlob], 'diagnosis.wav', { type: 'audio/wav' });

        // 디버깅: File 객체 확인
        logger.log('audioFile 정보:', {
          name: audioFile.name,
          size: audioFile.size,
          type: audioFile.type,
        });

        // 2. FormData 생성
        const formData = new FormData();
        formData.append('targetText', targetText);
        formData.append('audioFile', audioFile);

        // 디버깅: FormData 내용 확인
        logger.log('FormData 내용:');
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            logger.log(`  ${key}:`, { name: value.name, size: value.size, type: value.type });
          } else {
            logger.log(`  ${key}:`, value);
          }
        }

        // 3. API 호출
        logger.log('진단 API 호출 시작...');
        const response = await kitAPI.diagnosisKit(formData);

        // 4. 콘솔 출력
        logger.log('진단 결과:', response);

        // 5. State 저장
        setDiagnosisResult(response.result);
      } catch (err) {
        logger.error('진단 API 호출 실패:', err);
        setError(err as Error);
        // 에러 발생 시에도 결과는 null로 설정 (호출측에서 처리)
        setDiagnosisResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    callDiagnosisAPI();
  }, [step, audioBlob, targetText]);

  return {
    diagnosisResult,
    isLoading,
    error,
  };
};
