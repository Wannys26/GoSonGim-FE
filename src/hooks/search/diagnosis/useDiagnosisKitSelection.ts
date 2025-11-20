import { useState, useCallback } from 'react';
import { logger } from '@/utils/common/loggerUtils';
import type { KitDiagnosisResponse } from '@/types/talkingkit';

interface UseDiagnosisKitSelectionParams {
  /** 추천 키트 목록 */
  recommendedKits?: KitDiagnosisResponse['result']['recommendedKits'];
}

interface UseDiagnosisKitSelectionReturn {
  /** 저장된 키트 ID 목록 */
  savedKits: Set<number>;
  /** 모달 표시 여부 */
  showModal: boolean;
  /** 개별 키트 담기/해제 */
  handleToggleSaveKit: (kitId: number) => void;
  /** 모두 담기 */
  handleSaveAll: () => void;
  /** 내 학습 가기 (저장 확인) */
  handleGoToStudyTalk: () => void;
  /** 모달 닫기 */
  handleCloseModal: () => void;
  /** 모달 확인 (담지 않고 이동) */
  handleConfirmNoSave: () => void;
}

/**
 * 진단 키트 선택/저장 관리 훅
 *
 * 키트 선택, 모두 담기, 저장 확인 모달 로직 제공
 */
export const useDiagnosisKitSelection = ({
  recommendedKits,
}: UseDiagnosisKitSelectionParams): UseDiagnosisKitSelectionReturn => {
  const [savedKits, setSavedKits] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);

  const handleToggleSaveKit = useCallback((kitId: number) => {
    setSavedKits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(kitId)) {
        newSet.delete(kitId);
      } else {
        newSet.add(kitId);
      }
      return newSet;
    });
  }, []);

  const handleSaveAll = useCallback(() => {
    if (recommendedKits) {
      const allKitIds = new Set(recommendedKits.map((kit) => kit.kitId));
      setSavedKits(allKitIds);
    }
  }, [recommendedKits]);

  const handleGoToStudyTalk = useCallback(() => {
    if (savedKits.size === 0) {
      setShowModal(true);
    } else {
      logger.log('내 학습 가기로 라우팅');
      // TODO: 내 학습 페이지로 라우팅
    }
  }, [savedKits.size]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirmNoSave = useCallback(() => {
    logger.log('내 학습 가기로 라우팅');
    // TODO: 내 학습 페이지로 라우팅
    setShowModal(false);
  }, []);

  return {
    savedKits,
    showModal,
    handleToggleSaveKit,
    handleSaveAll,
    handleGoToStudyTalk,
    handleCloseModal,
    handleConfirmNoSave,
  };
};
