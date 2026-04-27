import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";
import Images from "@/constants/image";
import useTranslate from "@/hooks/useTranslate";

type Step = {
  number: number;
  description: string;
  image: StaticImageData;
  priority?: boolean;
}

function Step({
  step,
}: {
  step: Step;
}) {
  const t = useTranslate();
  return (
    <div className="w-full max-w-118 flex flex-col gap-y-3">
      <div className="w-full flex flex-col items-start text-start">
        <span className="font-medium text-lg">{t('step')(step.number)}</span>
        <span>{step.description}</span>
      </div>
      <div className="w-full aspect-[2.54] flex items-center justify-center rounded-xl bg-white border p-6">
        <Image
          src={step.image}
          alt={`step-${step.number}`}
          priority={step.priority}
          className="w-[50%]"
        />
      </div>
    </div>
  );
}

export default function Guideline() {
  const t = useTranslate();

  const steps = useMemo<Step[]>(() => [
    {
      number: 1,
      description: t('click buy button'),
      image: Images.BuyCardButton,
      priority: true,
    },
    {
      number: 2,
      description: t('scan khqr code'),
      image: Images.PresentKhqr,
    },
    {
      number: 3,
      description: t('after paid click'),
      image: Images.VerifyTransactionButton,
    },
    {
      number: 4,
      description: `${t('after verified get card')}.`,
      image: Images.SampleSmartCard,
    },
  ], [t]);

  return (
    <div className="w-full flex flex-col items-center gap-y-8">
      <h3 className="text-center font-medium text-2xl">
        {t('how to use')}
      </h3>
      <ul className="w-full flex flex-col items-center gap-y-7">
        {steps.map(step =>
          <li
            key={step.number}
            className="w-full flex justify-center">
            <Step step={step} />
          </li>
        )}
      </ul>
    </div>
  );
}
