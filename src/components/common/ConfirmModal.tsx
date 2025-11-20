import clsx from 'clsx';
import Modal from '@/components/common/Modal';
import { BUTTON_LABELS } from '@/constants/common';

interface ConfirmModalProps {
  /**
   * 모달 표시 여부
   */
  isOpen: boolean;

  /**
   * 모달 닫기 핸들러
   */
  onClose: () => void;

  /**
   * 확인 버튼 클릭 핸들러
   */
  onConfirm: () => void;

  /**
   * 취소 버튼 클릭 핸들러
   * 제공되지 않으면 onClose 사용
   */
  onCancel?: () => void;

  /**
   * 모달 제목
   */
  title: string;

  /**
   * 모달 메시지
   */
  message: string;

  /**
   * 확인 버튼 텍스트
   * @default BUTTON_LABELS.CONFIRM
   */
  confirmText?: string;

  /**
   * 취소 버튼 텍스트
   * @default BUTTON_LABELS.CANCEL
   */
  cancelText?: string;

  /**
   * 확인 버튼 스타일 (위험한 작업인 경우 'danger' 사용)
   * @default 'primary'
   */
  confirmVariant?: 'primary' | 'danger';

  /**
   * 아이콘 (선택적)
   */
  icon?: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 공통 확인 모달 컴포넌트
 *
 * 사용자에게 확인을 요청하는 모달
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="삭제 확인"
 *   message="정말 삭제하시겠습니까?"
 *   confirmVariant="danger"
 * />
 * ```
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = BUTTON_LABELS.CONFIRM,
  cancelText = BUTTON_LABELS.CANCEL,
  confirmVariant = 'primary',
  icon,
  className,
}: ConfirmModalProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={clsx('flex flex-col items-center gap-6 p-6', className)}>
        {/* 아이콘 (선택적) */}
        {icon && <div className="flex h-16 w-16 items-center justify-center">{icon}</div>}

        {/* 제목 */}
        <h2 className="text-heading-01 text-gray-100 text-center">{title}</h2>

        {/* 메시지 */}
        <p className="text-body-02 text-gray-60 whitespace-pre-line text-center">{message}</p>

        {/* 버튼 그룹 */}
        <div className="flex w-full flex-col gap-3">
          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            className={clsx(
              'w-full rounded-lg py-3 font-semibold transition-colors',
              confirmVariant === 'danger'
                ? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            )}
          >
            {confirmText}
          </button>

          {/* 취소 버튼 */}
          <button
            onClick={handleCancel}
            className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
