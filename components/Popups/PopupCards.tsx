import { useEffect, useRef } from "react";
import { useTrack } from "react-use-current";
import { useMainContext } from "@/context/mainContext";
import Popup from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import Card from "../Card";
import useGetCards from "@/service/useGetCards";

export default function PopupCards({
  onClickClear,
  onClose,
  onClickMask,
}: {
  onClickClear: () => void;
  onClose: () => void;
  onClickMask: () => void;
}) {
  const context = useMainContext();
  const track = useTrack();
  const lastOpenCards = useRef<string[]>(undefined);
  const {
    data: cards,
    pending: gettingCards,
    request: requestCards,
  } = useGetCards();

  useEffect(() => {
    if (
      context.openCards &&
      lastOpenCards.current !== context.cards
    ) {
      const savedCards = context.cards;
      requestCards({
        cardIds: context.cards,
      }).then(() => {
        lastOpenCards.current = savedCards;
      });
    }
  }, [context.openCards, track(context.cards)]);

  return (
    <Popup
      open={context.openCards ?? false}
      onClose={onClose}
      onClickMask={onClickMask}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6 pt-6 text-center">
        {gettingCards !== false ?
          <CenterCol>
            <StatusText>Getting cards...</StatusText>
          </CenterCol> :
          <div className="w-full flex-1 flex flex-col justify-center items-center gap-y-6">
            {!cards ?
              <CenterCol>
                <StatusText>Fail to get cards!</StatusText>
              </CenterCol> :
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
            }
            <button
              title="Delete your card(s)"
              className="text-sm rounded-lg px-3 py-1 text-danger-500 tran-bg-white-danger"
              onClick={onClickClear}>
              delete {cards && cards.length > 1 && 'all'}
            </button>
          </div>
        }
      </div>
    </Popup>
  );
}
