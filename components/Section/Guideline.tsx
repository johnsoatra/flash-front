import Image from "next/image";
import React, { useMemo } from "react";
import Images from "@/constants/image";
import Sample from "@/constants/sample";
import ButtonGetTopUp from "../ButtonGetTopUp";
import ButtonVerifyTransaction from "../ButtonVerifyTransaction";
import Card from "../Card";
import useTranslate from "@/hooks/useTranslate";

type Step = {
  number: number;
  description: string;
  content: React.ReactNode;
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
      <div className="w-full aspect-[2.54] flex items-center justify-center rounded-xl bg-white border p-6 pointer-events-none">
        {step.content}
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
      content: <ButtonGetTopUp onClick={() => { }} />,
    },
    {
      number: 2,
      description: t('scan khqr code'),
      content: <Image
        src={Images.PresentKhqr}
        alt='present-khqr'
        className="w-[50%]"
      />,
    },
    {
      number: 3,
      description: t('after paid click'),
      content: <ButtonVerifyTransaction
        disabled={true}
        onClick={() => { }}
      />,
    },
    {
      number: 4,
      description: `${t('after verified get card')}.`,
      content: <Card card={Sample.Card} />,
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
