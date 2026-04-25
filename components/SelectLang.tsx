import { useRouter } from "next/navigation";
import { useMainContext } from "@/context/mainContext";
import { type Lang } from "@/types";
import { setLang } from "@/utils/cookie/lang";

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

  function handleSelect(lang: Lang) {
    if (context.lang !== lang) {
      setLang(lang);
      router.refresh();
    }
  }

  return (
    <div className="w-fit flex gap-x-1 py-1 px-1.5 bg-e3 rounded-xl">
      <Lang
        title="ខ្មែរ"
        selected={context.lang === 'km'}
        className="font-noto-sans-km"
        onSelect={() => handleSelect('km')}
      />
      <Lang
        title="EN"
        selected={context.lang === 'en'}
        className="font-poppins"
        onSelect={() => handleSelect('en')}
      />
    </div>
  );
}
