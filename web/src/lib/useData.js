import { useCallback, useEffect, useState } from 'react';
import { fetchData } from './dataSource.js';

const REFRESH_MS = 60_000;

export function useData() {
  const [state, setState] = useState({ data: null, error: null, loading: true, at: null });

  const load = useCallback(async () => {
    try {
      const data = await fetchData();
      setState({ data, error: null, loading: false, at: new Date() });
    } catch (e) {
      setState((s) => ({ ...s, error: e.message, loading: false }));
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    const onVis = () => !document.hidden && load();
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', onVis); };
  }, [load]);

  return { ...state, reload: load };
}
