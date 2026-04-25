'use client';
import React, { useMemo } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";
import useTranslate from "@/hooks/useTranslate";

type SectionName = 'notation' | 'contacts';
type Section = {
  name: SectionName;
  title: string;
  content: React.ReactNode;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-y-1 text-center text-xs text-three">
      <p className="uppercase">{title}:</p>
      <span>{children}</span>
    </div>
  );
}

export default function Footer() {
  const context = useMainContext();
  const track = useTrack();
  const t = useTranslate();

  const sections = useMemo<Section[]>(() => [
    {
      name: 'notation',
      title: t('notation'),
      content: t('footer notation description')(context.config?.allow_amount ?? 0),
    },
    {
      name: 'contacts',
      title: t('contacts'),
      content: t('email'),
    }
  ], [track(context.config), t]);

  return (
    <footer className="w-full flex items-center justify-center bg-back border-t pt-5 pb-6 px-4">
      <div className="w-full max-w-119 flex flex-col items-center gap-y-6">
        {sections.map(section => <Section
          key={section.title}
          title={section.title}>
          {section.name === 'notation' ?
            section.content :
            <a
              href={`mailto:${section.content}`}
              className="hover:underline">
              {section.content}
            </a>
          }
        </Section>)}
      </div>
    </footer>
  );
}
