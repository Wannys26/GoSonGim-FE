interface LipSoundWordCardProps {
  category?: string;
  word?: string;
  className?: string;
}

/**
 * 입술 소리 연습 단어 표시 카드
 *
 * 큰 폰트로 단어를 보여주는 카드 (예: "바보", "나비", "비밀")
 */
export const LipSoundWordCard = ({ category, word, className = '' }: LipSoundWordCardProps) => {
  return (
    <div className={`flex h-[186px] w-full flex-col gap-5 rounded-2xl bg-white p-4 ${className}`}>
      <p className="text-gray-40 w-full text-left text-[18px] leading-normal">{category}</p>
      <p className="w-full text-center text-[40px] font-semibold leading-normal text-gray-100">{word}</p>
    </div>
  );
};
