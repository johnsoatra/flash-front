import React, { useMemo } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";

type SectionTitle = 'Notation' | 'Contracts';
type Section = {
  title: SectionTitle;
  content: string;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-y-3 text-center text-xs text-three">
      <p className="uppercase underline underline-offset-4">{title}:</p>
      <span>{children}</span>
    </div>
  );
}

export default function Footer() {
  const context = useMainContext();
  const track = useTrack();

  const sections = useMemo<Section[]>(() => [
    {
      title: 'Notation',
      content: `
      This website is not official selling SMART Top Up Card, this website is only for promoting itself by providing Top Up Card in discount price to everyone as long as there are cards available.
      We provide only ${context.config?.allow_amount} cards per month and 1 person can get only 1 card.
    `,
    },
    {
      title: 'Contracts',
      content: 'flash-contact@gmail.com',
    }
  ], [track(context.config)]);

  return (
    <footer className="w-full flex items-center justify-center bg-back border-t pt-5 pb-6 px-4">
      <div className="w-full max-w-119 flex flex-col items-center gap-y-6">
        {sections.map(section => <Section
          key={section.title}
          title={section.title}>
          {section.title === 'Notation' ? section.content.trim() :
            <a
              href={`mailto:${section.content}`}
              target="_blank">
              {section.content}
            </a>
          }
        </Section>)}
      </div>
    </footer>
  );
}
