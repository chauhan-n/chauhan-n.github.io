
async function renderCV() {
  const container = document.getElementById('cv');
  if (!container) return;
  try {
    const data = await (await fetch('data/cv.json')).json();
    let html = '';

    if (data.summary) {
      html += `<section class="card">
        <h2>Summary</h2>
        <p>${data.summary}</p>
      </section>`;
    }

    function listSection(title, items, mapItem) {
      if (!items || !items.length) return '';
      const inner = items.map(mapItem).join('');
      return `<section class="card">
        <h2>${title}</h2>
        ${inner}
      </section>`;
    }

    html += listSection('Positions', data.positions, it => `
      <div class="item">
        <h3>${it.title} — ${it.org}</h3>
        <div class="subtle">${it.start}–${it.end || 'present'} • ${it.location || ''}</div>
        ${it.description ? `<p>${it.description}</p>` : ''}
      </div>
    `);

    html += listSection('Education', data.education, it => `
      <div class="item">
        <h3>${it.degree} — ${it.institution}</h3>
        <div class="subtle">${it.start}–${it.end || ''} • ${it.location || ''}</div>
        ${it.thesis ? `<p><strong>Thesis:</strong> ${it.thesis}</p>` : ''}
      </div>
    `);

    if (data.skills && data.skills.length) {
      html += `<section class="card">
        <h2>Skills</h2>
        <div>${data.skills.map(s => `<span class="pill">${s}</span>`).join(' ')}</div>
      </section>`;
    }

    html += listSection('Publications', data.publications, it => `
      <div class="item">
        <p>${it.authors} (${it.year}). <em>${it.title}</em>. ${it.venue}${it.doi ? ` — <a href="${it.doi}" target="_blank" rel="noopener">DOI</a>` : ''}</p>
      </div>
    `);

    html += listSection('Grants & Awards', data.awards, it => `
      <div class="item">
        <h3>${it.name}</h3>
        <div class="subtle">${it.org} • ${it.year}</div>
        ${it.note ? `<p>${it.note}</p>` : ''}
      </div>
    `);

    container.innerHTML = html || '<p class="muted">Add your details to <code>data/cv.json</code> to populate this page.</p>';
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p>Failed to load CV. If you are opening this file directly, run a local server (see README).</p>';
  }
}
document.addEventListener('DOMContentLoaded', renderCV);
