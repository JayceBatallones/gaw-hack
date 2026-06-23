import { i } from '../icons.js';
import { projects } from '../data/projects.js';

export function portfolioPage() {
  return `
    <div class="content">
    <div class="portfolio-page">
      <div class="portfolio-header">
        <div class="portfolio-header-top">
          <div>
            <div class="portfolio-aum-label">Total AUM</div>
            <div class="portfolio-aum">$337.0M</div>
            <div class="portfolio-sub">7 Projects &middot; Asia Pacific</div>
          </div>
          <div class="portfolio-summary-pills">
            <div class="ps-pill"><span class="ps-val">5</span><span class="ps-lbl">Active</span></div>
            <div class="ps-pill warn"><span class="ps-val">1</span><span class="ps-lbl">Review</span></div>
            <div class="ps-pill critical"><span class="ps-val">1</span><span class="ps-lbl">Critical</span></div>
          </div>
        </div>
      </div>
      <div class="portfolio-grid">
        ${projects.map(p => projectCard(p)).join('')}
      </div>
    </div>
    </div>
  `;
}

function projectCard(p) {
  const irrColor = parseFloat(p.irr) >= 15 ? 'var(--green)' : parseFloat(p.irr) < 8 ? 'var(--red)' : 'var(--ink)';
  const navColor = parseFloat(p.nav) > parseFloat(p.invested) ? 'var(--green)' : 'var(--brand)';
  return `
    <div class="project-card" data-project-id="${p.id}">
      <div class="pc-top">
        <div class="pc-name-wrap">
          <div class="pc-name">${p.name}</div>
          <div class="pc-geo">${p.geography} &middot; ${p.sector}</div>
        </div>
        <span class="status-badge ${p.status}">${p.statusText}</span>
      </div>
      <div class="pc-metrics">
        <div class="pc-metric">
          <div class="pc-metric-val">${p.invested}</div>
          <div class="pc-metric-lbl">Invested</div>
        </div>
        <div class="pc-metric">
          <div class="pc-metric-val" style="color:${navColor}">${p.nav}</div>
          <div class="pc-metric-lbl">NAV</div>
        </div>
        <div class="pc-metric">
          <div class="pc-metric-val" style="color:${irrColor}">${p.irr}</div>
          <div class="pc-metric-lbl">IRR</div>
        </div>
        <div class="pc-metric">
          <div class="pc-metric-val">${p.moic}</div>
          <div class="pc-metric-lbl">MOIC</div>
        </div>
      </div>
      <div class="pc-footer">
        <span class="pc-strategy">${p.strategy} &middot; ${p.holdPeriod}</span>
        <span class="pc-arrow">${i.chevronRight}</span>
      </div>
    </div>
  `;
}

export function initPortfolio(onSelect) {
  document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
    card.addEventListener('click', () => onSelect(card.dataset.projectId));
  });
}
