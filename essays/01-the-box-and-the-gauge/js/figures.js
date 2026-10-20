/* Figures. Each reads ESSAY data and renders into its <figure>. No figure decides anything on its own. */
(function () {
  const E = window.ESSAY;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const morph = fn => (document.startViewTransition && !reduced.matches ? document.startViewTransition(fn) : fn());

  /* ---------- Figure 1: the dynamo ---------- */
  function dynamo() {
    const machines = [70, 130, 190, 250];
    const left = `<g transform="translate(0,0)">
      <text x="10" y="18" class="lbl">1900: one big motor</text>
      <rect x="10" y="40" width="40" height="40" class="hl"/><text x="30" y="95" class="sm" text-anchor="middle">motor</text>
      <line x1="50" y1="50" x2="290" y2="50"/><text x="170" y="42" class="sm" text-anchor="middle">line shaft</text>
      ${machines.map(x => `<line x1="${x}" y1="50" x2="${x}" y2="120" class="belt"/><rect x="${x - 18}" y="120" width="36" height="26"/>`).join('')}
      <text x="160" y="170" class="sm" text-anchor="middle">same layout, new power: almost no gain</text></g>`;
    const right = `<g transform="translate(320,0)">
      <text x="10" y="18" class="lbl">1920s: a small motor at each machine</text>
      ${machines.map(x => `<rect x="${x - 18}" y="120" width="36" height="26"/><circle cx="${x}" cy="102" r="9" class="hl"/><line x1="${x}" y1="111" x2="${x}" y2="120"/>`).join('')}
      <path d="M52 133 H70 M88 133 H112 M148 133 H172 M208 133 H232" class="flow"/>
      <text x="160" y="170" class="sm" text-anchor="middle">work redesigned around power: the gain</text></g>`;
    $('fig-dynamo').innerHTML = `<svg viewBox="0 0 640 180" role="img" aria-label="Left: one big motor drives all machines through a shaft. Right: each machine has its own small motor.">${left}${right}</svg>
      <figcaption>After Paul David (1990). Agent-centric AI is the left picture; semantic operations are the right one.</figcaption>`;
  }

  /* ---------- Figure 2: the box ---------- */
  let level = 0, picked = null;
  function box() {
    const B = E.BOX, inside = i => i.enters !== null && i.enters <= level;
    const never = B.items.filter(i => i.enters === null);
    const chip = i => `<button type="button" class="chip ${inside(i) ? 'in' : i.enters === null ? 'never' : 'wait'} ${picked === i.id ? 'picked' : ''}" data-chip="${i.id}" style="view-transition-name:chip-${i.id}" aria-pressed="${picked === i.id}">${esc(i.label)}</button>`;
    const sel = B.items.find(i => i.id === picked);
    $('fig-box').innerHTML = `
      <div class="boxfig">
        <div class="zone waiting"><span class="zl">not yet inside</span>${B.items.filter(i => i.enters !== null && !inside(i)).map(chip).join('') || '<span class="empty">nothing left waiting</span>'}</div>
        <div class="zone outl"><span class="zl">stays outside</span>${never.slice(0, 3).map(chip).join('')}</div>
        <div class="zone thebox"><span class="zl">the model</span>${B.items.filter(inside).map(chip).join('')}</div>
        <div class="zone outr"><span class="zl">stays outside</span>${never.slice(3).map(chip).join('')}</div>
      </div>
      <label class="slider">Model capability <input type="range" min="0" max="${B.levels.length - 1}" step="1" value="${level}" id="boxLevel" aria-valuetext="${B.levels[level]}"> <output>${esc(B.levels[level])}</output></label>
      <p class="note" aria-live="polite">${sel ? `<b>${esc(sel.label)}.</b> ${esc(sel.note)}` : 'Click any item to see why it moves or stays.'}</p>
      <figcaption>Illustrative. The order of what moves in is an argument, not a forecast.</figcaption>`;
  }

  /* ---------- Figure 3: the gauge ---------- */
  let holder = null, running = false; const history = [];
  function swap(result) {
    const S = E.SWAP, h = S.candidates.find(c => c.id === holder);
    $('fig-swap').innerHTML = `
      <div class="swapfig">
        <div class="slot ${h ? 'filled' : ''}" style="view-transition-name:slot">
          <span class="zl">slot · ${esc(S.operation)}</span>
          <code>${esc(S.contract)}</code>
          <div class="holder">${h ? `${esc(h.name)} <small>${esc(h.when)}${h.local ? ' · local' : ''}</small>` : '<small>empty</small>'}</div>
        </div>
        <div class="gauge">
          <span class="zl">gauge · ${S.gauge.cases} cases · shape ${S.gauge.schemaNeeded}/${S.gauge.cases} · behaviour ≥ ${S.gauge.behaviourNeeded}/${S.gauge.cases}</span>
          <div class="row"><span>shape</span><div class="cells" id="cellsS">${'<i></i>'.repeat(S.gauge.cases)}</div><b id="sumS"></b></div>
          <div class="row"><span>behaviour</span><div class="cells" id="cellsB">${'<i></i>'.repeat(S.gauge.cases)}</div><b id="sumB"></b></div>
          <p class="verdict" aria-live="polite" id="verdict">${result ? result : 'Try a candidate in the slot.'}</p>
        </div>
      </div>
      <div class="cands" role="group" aria-label="Candidates">${S.candidates.map(c => `<button type="button" class="cand" data-cand="${c.id}" ${running ? 'disabled' : ''}>${esc(c.name)}<small>${esc(c.when)}${c.local ? ' · local' : ''}</small></button>`).join('')}</div>
      ${history.length ? `<ol class="hist">${history.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      <figcaption>Results are invented for explanation. The point is the mechanism: the gauge, not the release date, decides who gets the slot.</figcaption>`;
  }
  function tryCandidate(id) {
    const S = E.SWAP, c = S.candidates.find(x => x.id === id);
    running = true; swap('Running the gauge …');
    const cs = [...$('cellsS').children], cb = [...$('cellsB').children];
    const finish = () => {
      const s = c.schema.reduce((a, b) => a + b, 0), b = c.behaviour.reduce((a, b) => a + b, 0);
      const fits = s >= S.gauge.schemaNeeded && b >= S.gauge.behaviourNeeded;
      $('sumS').textContent = `${s}/10`; $('sumB').textContent = `${b}/10`;
      const msg = `${c.name} (${c.when}): ${fits ? 'fits' : 'does not fit'}. ${c.note}`;
      history.unshift(msg); if (history.length > 5) history.pop();
      running = false;
      const keep = { s: c.schema, b: c.behaviour, sumS: `${s}/10`, sumB: `${b}/10` };
      morph(() => { if (fits) holder = id; swap(msg); paint(keep); });
    };
    const paint = k => {
      [...$('cellsS').children].forEach((el, i) => el.className = k.s[i] ? 'ok' : 'no');
      [...$('cellsB').children].forEach((el, i) => el.className = k.b[i] ? 'ok' : 'no');
      $('sumS').textContent = k.sumS; $('sumB').textContent = k.sumB;
    };
    if (reduced.matches) { cs.forEach((el, i) => el.className = c.schema[i] ? 'ok' : 'no'); cb.forEach((el, i) => el.className = c.behaviour[i] ? 'ok' : 'no'); return finish(); }
    let i = 0;
    const tick = () => {
      if (i < 10) { cs[i].className = c.schema[i] ? 'ok' : 'no'; cb[i].className = c.behaviour[i] ? 'ok' : 'no'; i++; setTimeout(tick, 90); }
      else setTimeout(finish, 250);
    };
    tick();
  }

  /* ---------- Figure 4: the ladder ---------- */
  let vals = { ...E.PRESETS[1].v }, preset = 1;
  function ladder() {
    const r = E.recommend(vals), idx = E.LADDER.findIndex(l => l.id === r.rung);
    $('fig-ladder').innerHTML = `
      <div class="ladfig">
        <div class="controls">
          <div class="presets" role="group" aria-label="Examples">${E.PRESETS.map((p, i) => `<button type="button" data-preset="${i}" aria-pressed="${preset === i}">${esc(p.name)}</button>`).join('')}</div>
          ${E.DIMS.map(d => `<label class="dim"><span>${esc(d.name)}</span><input type="range" min="0" max="4" step="1" value="${vals[d.id]}" data-dim="${d.id}" aria-valuetext="${vals[d.id]} of 4"><small>${esc(d.lo)} → ${esc(d.hi)}</small></label>`).join('')}
        </div>
        <div class="stairs" aria-live="polite">
          ${E.LADDER.map((l, i) => `<div class="rung ${i === idx ? 'on' : i < idx ? 'below' : ''}" style="--h:${(i + 2) * 20}%"><b>${esc(l.name)}</b><span>${esc(l.text)}</span></div>`).join('')}
        </div>
      </div>
      <ul class="why">${r.why.map(w => `<li>${esc(w)}</li>`).join('')}<li class="always">Whatever the rung: the contract, the eval, the memory of record and the authority are yours anyway. They are outside the box.</li></ul>
      <figcaption>The rule, in full: data that must not leave → host. Specificity + frequency + stability ≥ 9 with stable work → fine-tune. Everything at the maximum → train. Otherwise rent and keep your exit.</figcaption>`;
  }

  /* ---------- Events ---------- */
  document.addEventListener('input', e => {
    if (e.target.id === 'boxLevel') { level = +e.target.value; morph(box); document.getElementById('boxLevel').focus(); }
    if (e.target.dataset.dim) { vals[e.target.dataset.dim] = +e.target.value; preset = -1; const id = e.target.dataset.dim; ladder(); document.querySelector(`[data-dim="${id}"]`).focus(); }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.chip) { picked = picked === b.dataset.chip ? null : b.dataset.chip; box(); document.querySelector(`[data-chip="${b.dataset.chip}"]`).focus(); }
    if (b.dataset.cand && !running) tryCandidate(b.dataset.cand);
    if (b.dataset.preset) { preset = +b.dataset.preset; vals = { ...E.PRESETS[preset].v }; ladder(); }
  });

  dynamo(); box(); swap(); ladder();
})();
