import { Layout } from './components/Layout.jsx';
import { Empty } from './components/ui.jsx';
import { useData } from './lib/useData.js';
import { useRoute } from './lib/router.js';
import Dashboard from './pages/Dashboard.jsx';
import Agents from './pages/Agents.jsx';
import Konten from './pages/Konten.jsx';
import Jadwal from './pages/Jadwal.jsx';
import Memori from './pages/Memori.jsx';
import Analitik from './pages/Analitik.jsx';
import Chat from './pages/Chat.jsx';

const PAGES = { dashboard: Dashboard, agents: Agents, konten: Konten, jadwal: Jadwal, memori: Memori, analitik: Analitik, chat: Chat };

export default function App() {
  const route = useRoute();
  const live = useData();
  const Page = PAGES[route] || Dashboard;

  let body;
  if (live.data) body = <Page data={live.data} />;
  else if (live.error) body = <Empty>Data gagal dimuat: {live.error}. <button className="link" onClick={live.reload}>Coba lagi</button></Empty>;
  else body = <Empty>Memuat data…</Empty>;

  return <Layout route={route} live={live}>{body}</Layout>;
}
