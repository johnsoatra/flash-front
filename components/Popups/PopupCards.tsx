import { useEffect } from "react";
import { useMainContext } from "@/context/mainContext";
import Popup from "../Popup";
import StatusText from "../StatusText";
import CenterCol from "../Center/CenterCol";
import Card from "../Card";
import useGetCards from "@/service/useGetCards";
import useTranslate from "@/hooks/useTranslate";

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
  const t = useTranslate();
  const {
    data: cards,
    pending: gettingCards,
    request: requestCards,
  } = useGetCards();

  useEffect(() => {
    if (context.openCards) {
      requestCards({
        cardIds: context.cards,
      });
    }
  }, [context.openCards]);

  return (
    <Popup
      open={context.openCards ?? false}
      onClose={onClose}
      onClickMask={onClickMask}>
      <div className="w-full min-h-67 flex flex-col items-center gap-y-6 pt-6 text-center">
        {gettingCards !== false ?
          <CenterCol><StatusText>{t('getting cards')}</StatusText></CenterCol> :
          <div className="w-full flex-1 flex flex-col justify-center items-center gap-y-6">
            {!cards ?
              <CenterCol><StatusText>{t('fail get cards')}</StatusText></CenterCol> :
              cards.length === 0 ?
                <CenterCol><StatusText>{t('no card found')}</StatusText></CenterCol> :
                <CenterCol>
                  <ul className="w-full flex flex-col items-center gap-y-5">
                    {cards.map(card => <li
                      key={card.id}
                      className="w-full flex justify-center">
                      <Card card={card} />
                    </li>)}
                  </ul>
                </CenterCol>
            }
            <button
              title={t('delete your cards')}
              className="rounded-lg px-3 py-1 text-danger-500 tran-bg-back-danger"
              onClick={onClickClear}>
              {t('delete all')(cards?.length ?? 0)}
            </button>
          </div>
        }
      </div>
    </Popup>
  );
}
