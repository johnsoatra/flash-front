import { useEffect, useRef } from "react";
import { useMainContext } from "@/context/mainContext";
import Popup, { PopupProps } from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import Card from "../Card";
import useGetCards from "@/service/useGetCards";

export default function PopupCards({
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
            <div className="w-full flex-1 flex flex-col justify-center items-center gap-y-6">
              <CenterCol>
                <ul className="w-full flex flex-col items-center gap-y-5">
                  {cards.map(card => <li
                    key={card.id}
                    className="w-full flex justify-center">
                    <Card card={card} />
                  </li>
                  )}
                </ul>
              </CenterCol>
              <button
                className="uppercase text-sm rounded-lg px-3 py-1 font-medium text-danger-500 transition-bg-danger"
                onClick={onClickClear}>
                delete all
              </button>
            </div>
        }
      </div>
    </Popup>
  );
}
