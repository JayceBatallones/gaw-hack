import { i } from '../icons.js';

const leases = [
  { entity: 'SDM Childcare (Jurong East)', type: 'Lease', address: 'Blk 135 Jurong East St 13', expiry: 'Dec 31, 2027', daysLeft: 599, landlord: 'HDB', monthlyRent: 'S$18,500', file: 'SDM_JE_Lease_Agreement_2022.pdf' },
  { entity: 'Tinkerland', type: 'Lease', address: '10 Winstedt Rd', expiry: 'Mar 15, 2028', daysLeft: 673, landlord: 'URA', monthlyRent: 'S$22,800', file: 'Tinkerland_Lease_2023.pdf' },
  { entity: 'SDM International', type: 'Lease', address: '321 Alexandra Rd', expiry: 'Jun 30, 2029', daysLeft: 1145, landlord: 'JTC Corporation', monthlyRent: 'S$35,200', file: 'SDM_Intl_Lease_2024.pdf' },
  { entity: 'Global Tots @ East Gate', type: 'Lease', address: '20 East Coast Rd', expiry: 'Feb 28, 2028', daysLeft: 657, landlord: 'Private', monthlyRent: 'S$14,600', file: 'GTEG_Lease_2023.pdf' },
  { entity: 'Global Tots @ Mountbatten', type: 'Lease', address: '15 Mountbatten Rd', expiry: 'Sep 30, 2027', daysLeft: 507, landlord: 'Private', monthlyRent: 'S$16,900', file: 'GTMB_Lease_2022.pdf' },
  { entity: 'Sunflower Preschool', type: 'Lease', address: '88 Bukit Timah Rd', expiry: 'Aug 31, 2028', daysLeft: 842, landlord: 'SLA', monthlyRent: 'S$19,700', file: 'Sunflower_Lease_2023.pdf' },
];

const licenses = [
  { entity: 'SDM Childcare (Jurong East)', type: 'ECDA License', number: 'CC-2024-0892', expiry: 'Jan 31, 2027', daysLeft: 265 },
  { entity: 'SDM International', type: 'ECDA License', number: 'PS-2024-0341', expiry: 'Mar 15, 2027', daysLeft: 308 },
  { entity: 'Global Tots @ East Gate', type: 'ECDA License', number: 'CC-2023-1205', expiry: 'Nov 30, 2026', daysLeft: 202 },
];

const loans = [
  { name: 'Term Loan Facility', bank: 'DBS Bank', amount: 'S$18.5M', drawn: 'S$18.5M', rate: 'SORA + 2.25%', maturity: 'Dec 15, 2028', daysLeft: 948, covenants: 'DSCR > 1.2x, LTV < 65%', file: 'Ballet_DBS_TermLoan_2023.pdf' },
  { name: 'Revolving Credit Facility', bank: 'OCBC', amount: 'S$3.0M', drawn: 'S$1.8M', rate: 'SORA + 1.85%', maturity: 'Jun 30, 2026', daysLeft: 49, covenants: 'Annual review', file: 'Ballet_OCBC_RCF_2025.pdf' },
  { name: 'Capex Facility', bank: 'DBS Bank', amount: 'S$5.0M', drawn: 'S$3.2M', rate: 'SORA + 2.50%', maturity: 'Mar 31, 2029', daysLeft: 1054, covenants: 'Tied to SDM International build-out', file: 'Ballet_DBS_Capex_2024.pdf' },
];

const entities = [
  { name: 'SDM Childcare Centre (Jurong East)', type: 'Childcare Centre', rev: 'S$1,493,672', enroll: '142 / 160', pct: 89, updated: 'May 10, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'Tinkerland Private Limited', type: 'Preschool', rev: 'S$1,829,672', enroll: '165 / 180', pct: 92, updated: 'May 8, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'SDM International Pre-school', type: 'International Preschool', rev: 'S$3,450,900', enroll: '198 / 220', pct: 90, updated: 'May 9, 2026', status: 'attention', statusText: 'Attention' },
  { name: 'Global Tots @ Mountbatten', type: 'Childcare Centre', rev: 'S$1,670,550', enroll: '88 / 100', pct: 88, updated: 'May 6, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'Global Tots @ East Gate', type: 'Childcare Centre', rev: 'S$892,340', enroll: '54 / 72', pct: 75, updated: 'Apr 28, 2026', status: 'critical', statusText: 'March Report Overdue' },
  { name: 'Sunflower Preschool', type: 'Preschool', rev: 'S$2,104,800', enroll: '175 / 200', pct: 88, updated: 'May 5, 2026', status: 'on-track', statusText: 'On Track' },
];

export function dashboardPage(project = {}) {
  const name = project.name || 'Project Ballet';
  const desc = project.description || 'Singapore Preschool Portfolio';
  const holdPeriod = project.holdPeriod || 'Hold Year 3';
  const invested = project.invested || '$25.0M';
  const nav = project.nav || '$31.2M';
  const irr = project.irr || '18.4%';
  const holdYears = project.holdYears || '3.2 yrs';

  return `
    <div class="content">
      <div class="project-header">
        <h1>${name}</h1>
        <div class="subtitle">${desc} &middot; Gaw Capital Partners</div>
        <div class="status">Active &mdash; ${holdPeriod}</div>
      </div>

      <div class="metrics-row">
        <div class="metric-card"><div class="value">${invested}</div><div class="label">Investment Amount</div></div>
        <div class="metric-card"><div class="value">${nav}</div><div class="label">Current NAV</div></div>
        <div class="metric-card"><div class="value red">${irr}</div><div class="label">Projected IRR</div></div>
        <div class="metric-card"><div class="value">${holdYears}</div><div class="label">Hold Period</div></div>
      </div>

      <div class="section-title">Portfolio Entities</div>
      <div class="grid-3" id="entity-grid">
        ${entities.map((e, i) => entityCard(e, i)).join('')}
      </div>

      <!-- Entity Detail Drawer (hidden by default) -->
      <div id="entity-drawer" class="entity-drawer hidden">
        <div class="drawer-header">
          <h3 id="drawer-title"></h3>
          <button id="drawer-close" class="drawer-close">&times;</button>
        </div>
        <div id="drawer-body"></div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="section-title">Key Documents</div>
          ${docRow('XLS', 'excel', 'Ballet UW v5', 'Apr 16, 2026 &middot; Lillian Chow &middot; 4,452 KB', 'current', 'Confirmed')}
          ${docRow('XLS', 'excel', 'Ballet UW v4.8.6', 'Apr 14, 2026 &middot; Capital Markets &middot; 2,898 KB', 'approved', 'Approved')}
          ${docRow('PDF', 'pdf', 'IC Memo (25Feb2026)', 'Feb 25, 2026 &middot; Paul &middot; 502 KB', 'current', 'Confirmed')}
          ${docRow('XLS', 'excel', 'GTEG Mgmt Accounts Dec 2025', 'Mar 30, 2026 &middot; Sharon Chan &middot; 89 KB', 'review', 'Under Review')}
          <a class="view-all" data-goto="documents">View all documents &rarr;</a>
        </div>
        <div>
          <div class="panel" style="margin-bottom: 24px;">
            <div class="section-title">Upcoming Deadlines</div>
            ${deadline('Apr Management Report', 'Global Tots East Gate', 'overdue', 'Overdue')}
            ${deadline('OCBC RCF Annual Renewal', 'Portfolio', 'warn', 'Jun 30')}
            ${deadline('Apr Management Report', 'Sunflower Preschool', 'warn', 'May 14')}
            ${deadline('Q1 Audit Report', 'All Entities', 'ok', 'May 20')}
            ${deadline('Capex Forecast', 'Portfolio', 'ok', 'May 25')}
            <a class="view-all" data-goto="monitoring">View all &rarr;</a>
          </div>
          <div class="panel">
            <div class="section-title">Recent Activity</div>
            ${activity('doc', 'UW Model v5 uploaded by Lillian Chow', 'Apr 16, 2026')}
            ${activity('alert', 'March report overdue &mdash; Global Tots East Gate', 'Apr 10, 2026')}
            ${activity('decision', 'IC Memo approved by Investment Committee', 'Feb 25, 2026')}
            ${activity('task', 'Budget V2 submitted for review', 'Nov 10, 2025')}
          </div>
        </div>
      </div>

      <!-- Contracts & Leases -->
      <div class="panel" style="margin-bottom:24px">
        <div class="section-title">Contracts & Leases</div>
        <div class="table-scroll">
          <table class="file-table" style="min-width:580px">
            <thead><tr><th>Entity</th><th>Type</th><th>Address / Details</th><th>Expiry</th><th>Status</th><th></th></tr></thead>
            <tbody>
              ${leases.map(l => `<tr class="lease-row" data-file="${l.file}" data-entity="${l.entity}" data-type="${l.type}" data-address="${l.address}" data-expiry="${l.expiry}" data-landlord="${l.landlord}" data-rent="${l.monthlyRent}">
                <td style="font-weight:600">${l.entity}</td>
                <td><span class="status-badge info">${l.type}</span></td>
                <td style="font-size:12px;color:#5d6567">${l.address}</td>
                <td><span class="tc-due ${l.daysLeft < 365 ? 'soon' : ''} ${l.daysLeft < 180 ? 'overdue' : ''}">${l.expiry}</span></td>
                <td><span class="status-badge ${l.daysLeft < 365 ? (l.daysLeft < 180 ? 'critical' : 'attention') : 'on-track'}">${l.daysLeft < 365 ? (l.daysLeft < 180 ? 'Expiring Soon' : 'Under 1 Year') : 'Active'}</span></td>
                <td><button class="view-contract-btn" data-file="${l.file}">View PDF</button></td>
              </tr>`).join('')}
              ${licenses.map(l => `<tr class="lease-row">
                <td style="font-weight:600">${l.entity}</td>
                <td><span class="status-badge approved">${l.type}</span></td>
                <td style="font-size:12px;color:#5d6567">${l.number}</td>
                <td><span class="tc-due ${l.daysLeft < 365 ? 'soon' : ''}">${l.expiry}</span></td>
                <td><span class="status-badge ${l.daysLeft < 365 ? 'attention' : 'on-track'}">${l.daysLeft < 365 ? 'Renewal Due' : 'Active'}</span></td>
                <td></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Project Loan Details -->
      <div class="panel" style="margin-bottom:24px">
        <div class="section-title">Project Loan Details</div>
        <div class="loans-grid">
          ${loans.map(l => `<div class="loan-card">
            <div class="loan-header">
              <div><div class="loan-name">${l.name}</div><div class="loan-bank">${l.bank}</div></div>
              <span class="status-badge ${l.daysLeft < 90 ? 'critical' : l.daysLeft < 365 ? 'attention' : 'on-track'}">${l.daysLeft < 90 ? 'Due Soon' : l.daysLeft < 365 ? 'Under 1 Year' : 'Active'}</span>
            </div>
            <div class="loan-details">
              <div class="loan-detail"><span class="loan-label">Facility</span><span class="loan-val">${l.amount}</span></div>
              <div class="loan-detail"><span class="loan-label">Drawn</span><span class="loan-val">${l.drawn}</span></div>
              <div class="loan-detail"><span class="loan-label">Rate</span><span class="loan-val">${l.rate}</span></div>
              <div class="loan-detail"><span class="loan-label">Maturity</span><span class="loan-val">${l.maturity}</span></div>
              <div class="loan-detail" style="grid-column:1/-1"><span class="loan-label">Covenants</span><span class="loan-val">${l.covenants}</span></div>
            </div>
            <button class="view-contract-btn" data-file="${l.file}" style="margin-top:12px">View Loan Agreement</button>
          </div>`).join('')}
        </div>
      </div>

      <!-- Contract Detail Modal -->
      <div id="contract-modal" class="modal-overlay hidden">
        <div class="modal-card" style="max-width:560px">
          <div class="modal-header"><h3 id="contract-modal-title">Contract Details</h3><button class="drawer-close" id="contract-modal-close">&times;</button></div>
          <div class="modal-body" id="contract-modal-body"></div>
        </div>
      </div>
    </div>
  `;
}

export function initDashboard() {
  // Entity card click → show drawer
  document.querySelectorAll('.entity-card[data-idx]').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx);
      const e = entities[idx];
      const drawer = document.getElementById('entity-drawer');
      document.getElementById('drawer-title').textContent = e.name;
      document.getElementById('drawer-body').innerHTML = `
        <div class="drawer-meta">${e.type} &middot; Singapore</div>
        <div class="drawer-stats">
          <div class="drawer-stat"><div class="drawer-stat-val">${e.rev}</div><div class="drawer-stat-lbl">YTD Revenue</div></div>
          <div class="drawer-stat"><div class="drawer-stat-val">${e.enroll}</div><div class="drawer-stat-lbl">Enrollment</div></div>
          <div class="drawer-stat">
            <div class="drawer-stat-val">${e.pct}%</div><div class="drawer-stat-lbl">Occupancy</div>
            <div class="occupancy-bar"><div class="occupancy-fill ${e.pct >= 85 ? 'ok' : e.pct >= 75 ? 'warn' : 'low'}" style="width:${e.pct}%"></div></div>
          </div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section-title">Recent Documents</div>
          <div class="drawer-doc-item">Management Report &mdash; Apr 2026 <span class="status-badge ${e.status === 'critical' ? 'overdue' : 'current'}">${e.status === 'critical' ? 'Overdue' : 'Received'}</span></div>
          <div class="drawer-doc-item">Management Report &mdash; Mar 2026 <span class="status-badge current">Received</span></div>
          <div class="drawer-doc-item">Bank Statement &mdash; Apr 2026 <span class="status-badge pending">Pending</span></div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section-title">Lease Details</div>
          ${(() => { const l = leases.find(x => e.name.includes(x.entity.split(' (')[0].split(' @')[0])); return l ? `
            <div style="font-size:12px;margin-bottom:4px"><strong>Address:</strong> ${l.address}</div>
            <div style="font-size:12px;margin-bottom:4px"><strong>Landlord:</strong> ${l.landlord}</div>
            <div style="font-size:12px;margin-bottom:4px"><strong>Rent:</strong> ${l.monthlyRent}/mo</div>
            <div style="font-size:12px"><strong>Expiry:</strong> <span class="tc-due ${l.daysLeft < 365 ? 'soon' : ''}">${l.expiry} (${l.daysLeft} days)</span></div>
          ` : '<div style="font-size:12px;color:#9ca3af">No lease data</div>'; })()}
        </div>
        <div class="drawer-section">
          <div class="drawer-section-title">Status</div>
          <div class="status-badge ${e.status}" style="font-size:12px;padding:4px 12px">${e.statusText}</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:8px">Last updated: ${e.updated}</div>
        </div>
      `;
      drawer.classList.remove('hidden');
      // Highlight selected card
      document.querySelectorAll('.entity-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  document.getElementById('drawer-close')?.addEventListener('click', () => {
    document.getElementById('entity-drawer').classList.add('hidden');
    document.querySelectorAll('.entity-card').forEach(c => c.classList.remove('selected'));
  });

  // Doc row click → navigate to documents
  document.querySelectorAll('.doc-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      window.location.hash = '/documents';
    });
  });

  // Lease row click → show contract detail modal
  document.querySelectorAll('.lease-row[data-file]').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-contract-btn')) return;
      showContractModal(row.dataset.entity, row.dataset.type, {
        address: row.dataset.address,
        expiry: row.dataset.expiry,
        landlord: row.dataset.landlord,
        rent: row.dataset.rent,
        file: row.dataset.file,
      });
    });
  });

  // View PDF / View Contract buttons
  document.querySelectorAll('.view-contract-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const file = btn.dataset.file;
      const row = btn.closest('.lease-row') || btn.closest('.loan-card');
      if (row?.classList.contains('lease-row')) {
        showContractModal(row.dataset.entity, row.dataset.type, {
          address: row.dataset.address,
          expiry: row.dataset.expiry,
          landlord: row.dataset.landlord,
          rent: row.dataset.rent,
          file: file,
        });
      } else {
        const loan = loans.find(l => l.file === file);
        if (loan) showLoanModal(loan);
      }
    });
  });

  // Contract modal close
  document.getElementById('contract-modal-close')?.addEventListener('click', () => {
    document.getElementById('contract-modal')?.classList.add('hidden');
  });
  document.getElementById('contract-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contract-modal') document.getElementById('contract-modal')?.classList.add('hidden');
  });
}

function showContractModal(entity, type, data) {
  const modal = document.getElementById('contract-modal');
  document.getElementById('contract-modal-title').textContent = `${entity} — ${type}`;
  document.getElementById('contract-modal-body').innerHTML = `
    <div class="contract-detail-grid">
      <div class="contract-field"><div class="contract-field-label">Property Address</div><div class="contract-field-val">${data.address}</div></div>
      <div class="contract-field"><div class="contract-field-label">Landlord</div><div class="contract-field-val">${data.landlord}</div></div>
      <div class="contract-field"><div class="contract-field-label">Monthly Rent</div><div class="contract-field-val">${data.rent}</div></div>
      <div class="contract-field"><div class="contract-field-label">Lease Expiry</div><div class="contract-field-val">${data.expiry}</div></div>
    </div>
    <div class="contract-pdf-preview">
      <div class="pdf-placeholder">
        <div class="pdf-icon">PDF</div>
        <div class="pdf-filename">${data.file}</div>
        <div class="pdf-size">Extracted from executed contract</div>
        <button class="add-btn" style="margin-top:12px;font-size:12px">Open Full Document</button>
      </div>
    </div>
    <div style="font-size:11px;color:#9ca3af;margin-top:12px">Document stored in: 08 SG Legal / Lease Agreements</div>
  `;
  modal.classList.remove('hidden');
}

function showLoanModal(loan) {
  const modal = document.getElementById('contract-modal');
  document.getElementById('contract-modal-title').textContent = `${loan.name} — ${loan.bank}`;
  document.getElementById('contract-modal-body').innerHTML = `
    <div class="contract-detail-grid">
      <div class="contract-field"><div class="contract-field-label">Facility Amount</div><div class="contract-field-val">${loan.amount}</div></div>
      <div class="contract-field"><div class="contract-field-label">Amount Drawn</div><div class="contract-field-val">${loan.drawn}</div></div>
      <div class="contract-field"><div class="contract-field-label">Interest Rate</div><div class="contract-field-val">${loan.rate}</div></div>
      <div class="contract-field"><div class="contract-field-label">Maturity Date</div><div class="contract-field-val">${loan.maturity}</div></div>
      <div class="contract-field" style="grid-column:1/-1"><div class="contract-field-label">Key Covenants</div><div class="contract-field-val">${loan.covenants}</div></div>
    </div>
    <div class="contract-pdf-preview">
      <div class="pdf-placeholder">
        <div class="pdf-icon">PDF</div>
        <div class="pdf-filename">${loan.file}</div>
        <div class="pdf-size">Loan agreement document</div>
        <button class="add-btn" style="margin-top:12px;font-size:12px">Open Full Document</button>
      </div>
    </div>
    <div style="font-size:11px;color:#9ca3af;margin-top:12px">Document stored in: 12 SG Finance / Loan Agreements</div>
  `;
  modal.classList.remove('hidden');
}

function entityCard(e, i) {
  return `
    <div class="entity-card" data-idx="${i}">
      <div class="name">${e.name}</div>
      <div class="type">${e.type} &middot; Singapore</div>
      <div class="metric-row"><span class="k">YTD Revenue</span><span class="v">${e.rev}</span></div>
      <div class="metric-row"><span class="k">Enrollment</span><span class="v">${e.enroll}</span></div>
      <div class="metric-row"><span class="k">Last Updated</span><span class="v">${e.updated}</span></div>
      <div class="status-badge ${e.status}">${e.statusText}</div>
    </div>`;
}

function docRow(icon, iconClass, name, meta, statusClass, statusText) {
  return `
    <div class="doc-row">
      <div class="doc-info">
        <div class="doc-icon ${iconClass}">${icon}</div>
        <div><div class="doc-name">${name}</div><div class="doc-meta">${meta}</div></div>
      </div>
      <div class="status-badge ${statusClass}">${statusText}</div>
    </div>`;
}

function deadline(title, entity, dateClass, dateText) {
  return `
    <div class="deadline-item">
      <div class="deadline-info"><div class="dl-title">${title}</div><div class="dl-entity">${entity}</div></div>
      <div class="dl-date ${dateClass}">${dateText}</div>
    </div>`;
}

function activity(type, text, time) {
  return `
    <div class="activity-item">
      <div class="activity-dot ${type}"></div>
      <div><div class="activity-text">${text}</div><div class="activity-time">${time}</div></div>
    </div>`;
}
