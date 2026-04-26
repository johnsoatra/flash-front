'use client';
import useTranslate from "@/hooks/useTranslate";

export default function NotFound() {
  const t = useTranslate();
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <h1 className="text-xl text-center">{t('page not found')}</h1>
    </div>
  );
}
