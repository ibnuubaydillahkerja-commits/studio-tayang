// Router hash kecil (#/jadwal). Hash dipakai karena GitHub Pages tidak bisa
// rewrite URL; tanpa dependency tambahan.
import { useEffect, useState } from 'react';

const read = () => (window.location.hash.replace(/^#\/?/, '').split('?')[0] || 'dashboard');

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
