import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'smooth' }: { behavior?: ScrollBehavior }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, behavior]);
  return null;
}