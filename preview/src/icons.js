import { icons as lucideIcons } from 'lucide';

function renderIcon(name, size = 18, cls = '') {
  const iconData = lucideIcons[name];
  if (!iconData) return '';
  const inner = iconData.map(([tag, attrs]) => {
    const a = Object.entries(attrs).map(([k,v]) => `${k}="${v}"`).join(' ');
    const selfClosing = ['circle','rect','line','path','polyline','polygon','ellipse'];
    return selfClosing.includes(tag) ? `<${tag} ${a}/>` : `<${tag} ${a}></${tag}>`;
  }).join('');
  return `<svg class="lucide ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

export const i = {
  dashboard: renderIcon('LayoutDashboard', 18),
  documents: renderIcon('FolderOpen', 18),
  monitoring: renderIcon('Bell', 18),
  intelligence: renderIcon('Sparkles', 18),
  tasks: renderIcon('CheckSquare', 18),
  logout: renderIcon('LogOut', 18),
  send: renderIcon('SendHorizontal', 18),
  chevronDown: renderIcon('ChevronDown', 12),
  chevronRight: renderIcon('ChevronRight', 12),
  folder: renderIcon('Folder', 15),
  folderOpen: renderIcon('FolderOpen', 15),
  check: renderIcon('Check', 14),
  checkCell: renderIcon('Check', 13),
  x: renderIcon('X', 14),
  xCell: renderIcon('X', 13),
  alert: renderIcon('AlertTriangle', 15),
  alertSm: renderIcon('AlertTriangle', 14),
  clock: renderIcon('Clock', 14),
  hourglass: renderIcon('Hourglass', 13),
  bell: renderIcon('Bell', 16),
  bellRing: renderIcon('BellRing', 16),
  fileText: renderIcon('FileText', 16),
  fileSpreadsheet: renderIcon('FileSpreadsheet', 16),
  search: renderIcon('Search', 16),
  plus: renderIcon('Plus', 16),
  eye: renderIcon('Eye', 14),
  externalLink: renderIcon('ExternalLink', 14),
  trendingUp: renderIcon('TrendingUp', 14),
  building: renderIcon('Building2', 16),
  landmark: renderIcon('Landmark', 14),
  calendarClock: renderIcon('CalendarClock', 14),
  shieldCheck: renderIcon('ShieldCheck', 14),
  minus: renderIcon('Minus', 14),
  moreH: renderIcon('MoreHorizontal', 14),
  user: renderIcon('User', 16),
  shield: renderIcon('Shield', 24),
  lock: renderIcon('Lock', 18),
  arrowRight: renderIcon('ArrowRight', 14),
};
