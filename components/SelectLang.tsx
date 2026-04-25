import { useMainContext } from "@/context/mainContext";
import { type Lang } from "@/types";

function Lang({
  title,
  selected,
  className,
}: {
  title: string;
  selected: boolean;
  className?: string;
  onSelect: () => void;
}) {
  return (
    <div
      className={`
        w-16.5 h-7.5 flex items-center justify-center rounded-xl
        ${selected ? 'bg-white' : 'tran-bg-transparent'}
        ${className ?? ''}
      `}>
      <span className={"text-sm " + (selected ? 'text-front' : 'text-five')}>
        {title}
      </span>
    </div>
  );
}

export default function SelectLang() {
  const context = useMainContext();
  return (
    <div className="w-fit flex gap-x-1 py-1 px-1.5 bg-e3 rounded-xl">
      <Lang
        title="ខ្មែរ"
        selected={context.lang === 'kh'}
        className="font-noto-sans-kh"
        onSelect={() => context.lang = 'kh'}
      />
      <Lang
        title="EN"
        selected={context.lang === 'en'}
        className="font-poppins"
        onSelect={() => context.lang = 'en'}
      />
    </div>
  );
}
