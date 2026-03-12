import { useState, useEffect } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * Retorna true quando a viewport atinge o breakpoint lg (≥ 1024px).
 * Atualiza automaticamente ao redimensionar a janela.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handle = (e: MediaQueryList | MediaQueryListEvent) => setIsDesktop(e.matches);
    handle(mq);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  return isDesktop;
}
