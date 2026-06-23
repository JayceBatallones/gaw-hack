import { dashboardPage, initDashboard } from './pages/dashboard.js';
import { documentsPage, initDocuments } from './pages/documents.js';
import { monitoringPage, initMonitoring } from './pages/monitoring.js';
import { intelligencePage, initIntelligence } from './pages/intelligence.js';
import { tasksPage, initTasks } from './pages/tasks.js';
import { portfolioPage, initPortfolio } from './pages/portfolio.js';
import { projects } from './data/projects.js';
import { i } from './icons.js';

const DEMO_PASSWORD = 'gaw2026';
const app = document.getElementById('app');

// Active project state — default to Ballet so all tabs work immediately
let currentProject = projects[0];

function isAuthed() {
  return localStorage.getItem('gaw_authed') === 'true';
}

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.slice(1) || '/';
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="logo-area">
          <div class="logo-shield">G</div>
          <div class="logo-text">Gaw Capital</div>
          <div class="logo-subtitle">Portfolio Resource Center</div>
        </div>
        <div class="divider"></div>
        <div class="field-label">Enter access code</div>
        <input type="password" class="password-input" id="pw" placeholder="Access code">
        <button class="login-btn" id="login-btn">Access Platform</button>
        <div class="login-error" id="login-error">Invalid access code. Please try again.</div>
        <div class="footer-text">Gaw Capital Partners &middot; Hackathon 2026</div>
      </div>
    </div>
  `;

  const pw = document.getElementById('pw');
  const btn = document.getElementById('login-btn');
  const err = document.getElementById('login-error');

  function attempt() {
    if (pw.value === DEMO_PASSWORD) {
      localStorage.setItem('gaw_authed', 'true');
      navigate('/portfolio');
      render();
    } else {
      err.style.display = 'block';
      pw.value = '';
      pw.focus();
    }
  }

  btn.addEventListener('click', attempt);
  pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
  pw.focus();
}

function notifDropdownHtml() {
  return `
    <div class="notif-wrapper">
      <div class="notif-dot" id="notif-btn">${i.bellRing}<div class="badge">3</div></div>
      <div class="notif-dropdown hidden" id="notif-dropdown">
        <div class="notif-header">Notifications</div>
        <div class="notif-item unread">
          <div class="notif-icon err">${i.alertSm}</div>
          <div><div class="notif-text"><strong>Overdue:</strong> April Mgmt Report — Global Tots East Gate (5 days)</div><div class="notif-time">2 hours ago</div></div>
        </div>
        <div class="notif-item unread">
          <div class="notif-icon warn">${i.alertSm}</div>
          <div><div class="notif-text"><strong>Reminder:</strong> OCBC RCF renewal due in 49 days</div><div class="notif-time">Yesterday</div></div>
        </div>
        <div class="notif-item unread">
          <div class="notif-icon ok">${i.check}</div>
          <div><div class="notif-text"><strong>Received:</strong> SDM Childcare Apr Mgmt Report auto-filed</div><div class="notif-time">May 3</div></div>
        </div>
        <div class="notif-item">
          <div class="notif-icon ok">${i.check}</div>
          <div><div class="notif-text">UW Model v5 confirmed current by Lillian Chow</div><div class="notif-time">Apr 16</div></div>
        </div>
        <a class="notif-view-all" data-goto="monitoring">View all alerts</a>
      </div>
    </div>
    <div class="avatar">JB</div>
  `;
}

// Portfolio-level shell (no project-level nav tabs)
function portfolioShell(pageContent) {
  return `
    <div class="app-shell">
      <div class="main" style="margin-left:0">
        <div class="topbar">
          <div class="topbar-left">
            <div class="sidebar-logo" style="padding:0;border:none;background:none;gap:10px;display:flex;align-items:center">
              <div class="shield" style="width:28px;height:28px;font-size:14px;border-radius:4px">G</div>
              <div class="text" style="font-size:11px">GAW CAPITAL<span style="font-size:10px">Portfolio Resource Center</span></div>
            </div>
          </div>
          <div class="topbar-right">
            ${notifDropdownHtml()}
          </div>
        </div>
        <div class="content" style="padding-bottom:16px">${pageContent}</div>
      </div>
    </div>
  `;
}

// Project-level shell (with bottom nav tabs)
function shell(pageContent, activeNav, topbarSuffix = '') {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="shield">G</div>
          <div class="text">GAW CAPITAL<span>Portfolio Resource Center</span></div>
        </div>
        <nav class="nav-section">
          <div class="nav-label">Portfolio</div>
          <a class="nav-item ${activeNav === 'portfolio' ? 'active' : ''}" data-nav="portfolio"><span class="nav-icon">${i.dashboard}</span><span class="nav-full">All Projects</span><span class="nav-short">Home</span></a>
          <a class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}" data-nav="dashboard"><span class="nav-icon">${i.building}</span><span class="nav-full">Project</span><span class="nav-short">Project</span></a>
          <a class="nav-item ${activeNav === 'documents' ? 'active' : ''}" data-nav="documents"><span class="nav-icon">${i.documents}</span><span class="nav-full">Documents</span><span class="nav-short">Docs</span></a>
          <a class="nav-item ${activeNav === 'monitoring' ? 'active' : ''}" data-nav="monitoring"><span class="nav-icon">${i.monitoring}</span><span class="nav-full">Monitoring</span><span class="nav-short">Alerts</span></a>
          <a class="nav-item ${activeNav === 'intelligence' ? 'active' : ''}" data-nav="intelligence"><span class="nav-icon">${i.intelligence}</span><span class="nav-full">Intelligence</span><span class="nav-short">Intel</span></a>
          <a class="nav-item ${activeNav === 'tasks' ? 'active' : ''}" data-nav="tasks"><span class="nav-icon">${i.tasks}</span><span class="nav-full">Tasks</span><span class="nav-short">Tasks</span></a>
        </nav>
        <nav class="nav-section bottom">
          <a class="nav-item" id="logout-btn"><span class="nav-icon">${i.logout}</span> Sign Out</a>
        </nav>
      </aside>
      <div class="main">
        <div class="topbar">
          <div class="topbar-left">
            <span class="portfolio-back" data-nav="portfolio">All Projects</span>
            <span class="topbar-sep">/</span>
            <strong>${currentProject ? currentProject.name : 'Project'}</strong>${topbarSuffix}
          </div>
          <div class="topbar-right">
            ${notifDropdownHtml()}
          </div>
        </div>
        ${pageContent}
      </div>
    </div>
  `;
}

function bindSharedEvents() {
  // Nav items
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/' + el.dataset.nav);
      render();
    });
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('gaw_authed');
    navigate('/login');
    render();
  });

  document.querySelectorAll('.view-all[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/' + el.dataset.goto);
      render();
    });
  });

  // Notification dropdown
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown?.classList.toggle('hidden');
  });
  document.addEventListener('click', () => notifDropdown?.classList.add('hidden'));
  notifDropdown?.addEventListener('click', (e) => e.stopPropagation());
  document.querySelector('.notif-view-all[data-goto]')?.addEventListener('click', () => {
    navigate('/monitoring');
    render();
  });
}

function render() {
  const route = getRoute();

  if (!isAuthed() && route !== '/login') {
    navigate('/login');
    renderLogin();
    return;
  }

  if (route === '/login' || route === '/') {
    if (isAuthed()) {
      navigate('/portfolio');
      render();
      return;
    }
    renderLogin();
    return;
  }

  // Portfolio overview
  if (route === '/portfolio') {
    app.innerHTML = portfolioShell(portfolioPage());
    bindSharedEvents();
    initPortfolio((projectId) => {
      currentProject = projects.find(p => p.id === projectId) || projects[0];
      navigate('/dashboard');
      render();
    });
    return;
  }

  // Project-level routes
  let pageContent = '';
  let activeNav = '';
  let suffix = '';

  switch (route) {
    case '/dashboard':
      pageContent = dashboardPage(currentProject);
      activeNav = 'dashboard';
      break;
    case '/documents':
      pageContent = documentsPage();
      activeNav = 'documents';
      suffix = ' &mdash; Documents';
      break;
    case '/monitoring':
      pageContent = monitoringPage();
      activeNav = 'monitoring';
      suffix = ' &mdash; Monitoring';
      break;
    case '/intelligence':
      pageContent = intelligencePage();
      activeNav = 'intelligence';
      suffix = ' &mdash; Intelligence';
      break;
    case '/tasks':
      pageContent = tasksPage();
      activeNav = 'tasks';
      suffix = ' &mdash; Tasks';
      break;
    default:
      navigate('/portfolio');
      render();
      return;
  }

  app.innerHTML = shell(pageContent, activeNav, suffix);
  bindSharedEvents();

  switch (route) {
    case '/dashboard': initDashboard?.(); break;
    case '/documents': initDocuments?.(); break;
    case '/monitoring': initMonitoring?.(); break;
    case '/intelligence': initIntelligence?.(); break;
    case '/tasks': initTasks?.(); break;
  }
}

window.addEventListener('hashchange', render);
render();
