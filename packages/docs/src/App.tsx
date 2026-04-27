import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage';
import CommandsPage from './pages/CommandsPage';
import TemplatesPage from './pages/TemplatesPage';
import AiPage from './pages/AiPage';
import NotFoundPage from './pages/NotFoundPage';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/getting-started', label: 'Getting started' },
  { to: '/commands', label: 'Commands' },
  { to: '/templates', label: 'Templates' },
  { to: '/ai', label: 'AI generation' },
];

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">RN</div>
          <div>
            <div className="brand-name">RNBoost</div>
            <div className="brand-tag">smart RN starter</div>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a
            href="https://github.com/ismaelBlaise/rnboost-cli"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
