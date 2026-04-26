import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainContext } from "@/context/mainContext";
import { type Lang } from "@/types";
import { getLang, setLang } from "@/utils/cookie/lang";

type LangOption = {
  code: Lang;
  title: string;
  className: string;
}

const LangOptions: LangOption[] = [
  {
    code: 'km',
    title: 'ខ្មែរ',
    className: 'font-noto-sans-km',
  },
  {
    code: 'en',
    title: 'EN',
    className: 'font-poppins',
  },
];

function Lang({
  title,
  selected,
  className,
  onSelect,
}: {
  title: string;
  selected: boolean;
  className?: string;
  onSelect: () => void;
}) {
  return (
    <button
      className={`
        w-16.5 h-7.5 flex items-center justify-center rounded-xl
        ${selected ? 'bg-back' : 'tran-bg-transparent'}
        ${className ?? ''}
      `}
      onClick={onSelect}>
      <span className={"text-sm " + (selected ? 'text-front' : 'text-five')}>
        {title}
      </span>
    </button>
  );
}

export default function SelectLang() {
  const context = useMainContext();
  const router = useRouter();

  function handleSelect(option: LangOption) {
    if (context.lang !== option.code) {
      setLang(option.code);
      context.showAppBlocker = true;
      router.refresh();
    }
  }

  useEffect(() => {
    context.showAppBlocker = context.lang !== getLang();
  }, [context.lang]);

  return (
    <div className="w-fit flex gap-x-1 py-1 px-1.5 bg-e3 rounded-xl">
      {LangOptions.map(option => <Lang
        key={option.code}
        title={option.title}
        selected={context.lang === option.code}
        className={option.className}
        onSelect={() => handleSelect(option)}
      />)}
    </div>
  );
}
