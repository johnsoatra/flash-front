import React from "react";

type SectionTitle = 'Notation' | 'Contracts';
type Section = {
  title: SectionTitle;
  content: string;
};

const Sections: Section[] = [
  {
    title: 'Notation',
    content: `
      This website is not official selling Smart Top Up Card, this website is only for promoting itself by providing Top Up cards in a discount price to everyone as long as there are cards available.
      We provide only 5 cards per month and 1 person can get only 1 card.
    `,
  },
  {
    title: 'Contracts',
    content: 'johnsoatra@gmail.com'
  }
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-y-3 text-center text-xs">
      <p className="uppercase underline underline-offset-4">{title}:</p>
      <span>{children}</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full flex items-center justify-center bg-back border-t py-3 px-2">
      <div className="w-full max-w-119 flex flex-col items-center gap-y-6">
        {Sections.map(section => <Section
          key={section.title}
          title={section.title}>
          {section.title === 'Notation' ?
            section.content.trim() :
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
