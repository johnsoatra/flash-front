import { useEffect, useRef } from "react";
import { useMainContext } from "@/context/mainContext";
import Popup, { PopupProps } from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import Card from "../Card";
import useGetCards from "@/service/useGetCards";

export default function PopupLastCode({
  onClickClear,
  ...props
}: Omit<PopupProps, 'children' | 'open'> & {
  onClickClear: () => void;
}) {
  const context = useMainContext();
  const lastOpenCards = useRef<string[]>(undefined);
  const {
    data: cards,
    pending: gettingCards,
    request: requestCards,
  } = useGetCards();

  useEffect(() => {
    if (
      context.openCards &&
      context.cards &&
      lastOpenCards.current !== context.cards
    ) {
      const savedId = context.cards;
      requestCards({
        cardIds: context.cards,
      }).then(() => {
        lastOpenCards.current = savedId;
      });
    }
  }, [context.openCards, context.cards]);

  return (
    <Popup
      open={context.openCards ?? false}
      {...props}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6 pt-6 text-center">
        {gettingCards !== false ?
          <CenterCol>
            <StatusText>Getting cards...</StatusText>
          </CenterCol> :
          !cards ?
            <CenterCol>
              <StatusText>Fail to get cards!</StatusText>
            </CenterCol> :
            <div className="w-full flex flex-col items-center gap-y-6">
              <ul className="w-full flex flex-col items-center gap-y-5">
                {cards.map(card => <li
                  key={card.id}
                  className="w-full flex justify-center">
                  <Card card={card} />
                </li>)}
              </ul>
              <button
                className="self-start border rounded-xl px-4 py-0.5"
                onClick={onClickClear}>
                Clear
              </button>
            </div>
        }
      </div>
    </Popup>
  );
}
