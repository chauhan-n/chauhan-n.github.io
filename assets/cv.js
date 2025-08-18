async function renderCV() {
  const container = document.getElementById('cv');
  if (!container) return;

  try {
    const response = await fetch('data/cv.json');
    const data = await response.json();
    let html = '';

    // Summary section
    if (data.summary) {
      html += `
        <section class="card">
          <h2>Summary</h2>
          <p>${data.summary}</p>
        </section>
      `;
    }

    // Generic section builder
    function listSection(title, items, mapItem) {
      if (!items || !items.length) return '';
      const inner = items.map(mapItem).join('');
      return `
        <section class="card">
          <h2>${title}</h2>
          ${inner}
        </section>
      `;
    }

    // Positions
    html += listSection('Positions', data.positions, it => `
      <div class="item">
        <h3>${it.title} — ${it.org}</h3>
        <div class="subtle">${it.start} – ${it.end || 'Present'} • ${it.location || ''}</div>
        ${it.description ? `<p>${it.description}</p>` : ''}
      </div>
    `);

    // Education
    html += listSection('Education', data.education, it => `
      <div class="item">
        <h3>${it.degree} — ${it.institution}</h3>
        <div class="subtle">${it.start} – ${it.end || ''} • ${it.location || ''}</div>
        ${it.thesis ? `<p><strong>Thesis:</strong> ${it.thesis}</p>` : ''}
      </div>
    `);

    // Skills
    if (data.skills && data.skills.length) {
      html += `
        <section class="card">
          <h2>Skills</h2>
          <div>${data.skills.map(s => `<span class="pill">${s}</span>`).join(' ')}</div>
        </section>
      `;
    }

    // Awards
    html += listSection('Grants & Awards', data.awards, it => `
      <div class="item">
        <h3>${it.name}</h3>
        <div class="subtle">${it.org} • ${it.year}</div>
        ${it.note ? `<p>${it.note}</p>` : ''}
      </div>
    `);

    // Teaching
    html += listSection('Teaching & Supervision Experience', data.teaching, it => `
      <div class="item">
        <h3>${it.role}</h3>
        <div class="subtle">${Array.isArray(it.activity) ? it.activity.join(', ') : it.activity} • ${it.institution} • ${it.year}</div>
      </div>
    `);

    // Outreach
    html += listSection('Outreach Experience', data.outreach, it => `
      <div class="item">
        <h3>${it.activity}</h3>
        <div class="subtle">${it.year} • ${it.institution}</div>
        ${it.note ? `<p>${it.note}</p>` : ''}
      </div>
    `);

    // Volunteering
    html += listSection('Volunteering Experience', data.volunteer, it => `
      <div class="item">
        <h3>${it.role}</h3>
        <div class="subtle">${it.activity} • ${it.year}</div>
      </div>
    `);

    container.innerHTML = html || '<p class="muted">Add your details to <code>data/cv.json</code> to populate this page.</p>';
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p>Failed to load CV. If you are opening this file directly, run a local server (see README).</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderCV);
