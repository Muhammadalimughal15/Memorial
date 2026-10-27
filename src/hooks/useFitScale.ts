import { useEffect, useState } from "react";


export function useFitScale(baseWidth: number) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!el) return;

    const update = () => setScale(el.clientWidth / baseWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, baseWidth]);

  return { setRef: setEl, scale };
}