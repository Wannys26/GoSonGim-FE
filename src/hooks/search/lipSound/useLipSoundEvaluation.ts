import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { lipSoundAPI } from '@/apis/search';
import { logger } from '@/utils/common/loggerUtils';
import { LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

interface WordData {
  round: number;
  word: string;
}

interface UseLipSoundEvaluationParams {
  /** 연습 단어 목록 */
  words: WordData[];
}

interface UseLipSoundEvaluationReturn {
  /** 평가 중 여부 */
  isEvaluating: boolean;
  /** 발음 평가 요청 */
  handleEvaluatePronunciation: (fileKeys: Map<number, string>) => Promise<void>;
}

/**
 * 입술 소리 연습 발음 평가 관리 훅
 *
 * 발음 평가 API 호출 및 결과 페이지로 라우팅
 */
export const useLipSoundEvaluation = ({
  words,
}: UseLipSoundEvaluationParams): UseLipSoundEvaluationReturn => {
  const navigate = useNavigate();
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluatePronunciation = useCallback(
    async (fileKeys: Map<number, string>) => {
      try {
        setIsEvaluating(true);
        logger.log('발음 평가 시작, 총 녹음 파일:', fileKeys.size);

        // 페이로드 생성: 배열 형태로 3개의 녹음 데이터를 담음
        const payload = Array.from(fileKeys.entries())
          .sort(([a], [b]) => a - b) // round 순서대로 정렬 (1, 2, 3)
          .map(([round, fileKey]) => {
            const wordData = words.find((w) => w.round === round);
            if (!wordData) {
              throw new Error(LIP_SOUND_MESSAGES.ERROR_WORD_NOT_FOUND);
            }
            return {
              kitStageId: round, // 1, 2, 3
              fileKey, // S3 파일 경로 (예: "kit/2025-11-13/...")
              targetWord: wordData.word, // 바보, 나비, 비밀
            };
          });

        logger.log('발음 평가 요청 페이로드:', JSON.stringify(payload, null, 2));
        logger.log('페이로드 길이:', payload.length);

        // API 호출: POST /api/v1/kits/stages/evaluate
        const response = await lipSoundAPI.evaluatePronunciation(payload);
        logger.log('평가 결과:', response);

        // 결과 페이지로 이동
        navigate('/search/articulation-position/lip-sound/result', {
          state: { evaluationResult: response.result },
        });
      } catch (error) {
        logger.error('발음 평가 실패:', error);
        alert(LIP_SOUND_MESSAGES.ERROR_EVALUATION);
      } finally {
        setIsEvaluating(false);
      }
    },
    [navigate, words],
  );

  return {
    isEvaluating,
    handleEvaluatePronunciation,
  };
};
