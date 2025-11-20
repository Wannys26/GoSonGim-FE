import clsx from 'clsx';

interface TabBarProps<T extends string = string> {
  /**
   * 탭 목록
   */
  tabs: readonly T[] | T[];

  /**
   * 현재 활성화된 탭
   */
  activeTab: T;

  /**
   * 탭 변경 핸들러
   */
  onChange: (tab: T) => void;

  /**
   * 탭 라벨 렌더링 함수
   * 제공되지 않으면 탭 값을 그대로 표시
   */
  renderLabel?: (tab: T) => React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 탭 바 높이
   * @default 'h-14'
   */
  height?: string;

  /**
   * 활성 탭 하단 보더 색상
   * @default 'border-blue-1'
   */
  activeBorderColor?: string;

  /**
   * 활성 탭 텍스트 색상
   * @default 'text-gray-100'
   */
  activeTextColor?: string;

  /**
   * 비활성 탭 텍스트 색상
   * @default 'text-gray-40'
   */
  inactiveTextColor?: string;
}

/**
 * 공통 탭 바 컴포넌트
 *
 * 여러 탭을 표시하고 선택할 수 있는 탭 바
 *
 * @example
 * ```tsx
 * const tabs = ['조음발음', '상황극'] as const;
 *
 * <TabBar
 *   tabs={tabs}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 * />
 * ```
 *
 * @example Custom rendering
 * ```tsx
 * <TabBar
 *   tabs={['tab1', 'tab2']}
 *   activeTab={activeTab}
 *   onChange={setActiveTab}
 *   renderLabel={(tab) => (
 *     <div className="flex items-center gap-2">
 *       <Icon />
 *       <span>{tab}</span>
 *     </div>
 *   )}
 * />
 * ```
 */
export function TabBar<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  renderLabel,
  className,
  height = 'h-14',
  activeBorderColor = 'border-blue-1',
  activeTextColor = 'text-gray-100',
  inactiveTextColor = 'text-gray-40',
}: TabBarProps<T>) {
  return (
    <div className={clsx('flex w-full items-center justify-between bg-white', className)}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={clsx(
              'relative flex flex-1 items-center justify-center',
              height,
              isActive && `border-b ${activeBorderColor}`
            )}
          >
            <span
              className={clsx(
                'text-heading-02-semibold cursor-pointer transition-colors',
                isActive ? activeTextColor : inactiveTextColor
              )}
            >
              {renderLabel ? renderLabel(tab) : tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
