import { useState, useCallback, useRef } from 'react';
import { lipSoundAPI } from '@/apis/search';
import { logger } from '@/utils/common/loggerUtils';
import { LIP_SOUND_CONFIG, LIP_SOUND_MESSAGES } from '@/constants/search/lipSound';

interface UseS3UploadReturn {
  /** 업로드 중 여부 */
  isUploading: boolean;
  /** 업로드된 파일 키 맵 (round → fileKey) */
  fileKeys: Map<number, string>;
  /** 녹음 파일을 S3에 업로드 */
  uploadRecordingToS3: (round: number, blob: Blob) => Promise<string>;
}

/**
 * 입술 소리 연습 S3 업로드 관리 훅
 *
 * Presigned URL 요청 및 S3 직접 업로드 처리
 */
export const useS3Upload = (): UseS3UploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const fileKeysRef = useRef<Map<number, string>>(new Map());

  const uploadRecordingToS3 = useCallback(async (round: number, blob: Blob): Promise<string> => {
    const uuid =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

    // 한글 파일명 제거: 서버에서 인코딩 문제 발생 방지
    const fileName = `round${round}_${uuid}.wav`;

    setIsUploading(true);

    try {
      const uploadResponse = await lipSoundAPI.getUploadUrl({
        folder: LIP_SOUND_CONFIG.S3_FOLDER,
        fileName,
      });

      const { fileKey, url } = uploadResponse.result;

      // S3 presigned URL로 직접 업로드
      // CORS 에러 방지를 위해 커스텀 헤더 제거 (preflight 요청 회피)
      const uploadResult = await fetch(url, {
        method: 'PUT',
        body: blob,
        // Content-Type을 명시하지 않으면 simple request가 되어 preflight 요청 생략 가능
      });

      if (!uploadResult.ok) {
        throw new Error(`${LIP_SOUND_MESSAGES.ERROR_S3_UPLOAD} (status: ${uploadResult.status})`);
      }

      logger.log(`${round}차 녹음 업로드 완료`, fileKey);

      // fileKeys 맵에 저장
      fileKeysRef.current.set(round, fileKey);

      return fileKey;
    } catch (error) {
      logger.error(`${round}차 녹음 업로드 실패:`, error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    isUploading,
    fileKeys: fileKeysRef.current,
    uploadRecordingToS3,
  };
};
