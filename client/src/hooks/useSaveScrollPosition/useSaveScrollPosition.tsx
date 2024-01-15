import { useEffect, useState } from "react";

export function useSaveScrollPosition() {
  const [visitedNumber, setVisitedNumber] = useState<number>();

  const saveScrollPositionHandler = () => {
    const orderScrollPosition = JSON.parse(
      sessionStorage.getItem("scrollPosition")!
    );
    if (orderScrollPosition) {
      if (orderScrollPosition.number)
        setVisitedNumber(orderScrollPosition.number);
      window.scrollTo(0, parseInt(orderScrollPosition.position));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  useEffect(() => {
    saveScrollPositionHandler();
  }, []);

  return { visitedNumber };
}
