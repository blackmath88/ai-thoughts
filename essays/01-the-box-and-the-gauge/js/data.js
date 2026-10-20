/* All figure data. Illustrative, deterministic, and labelled as such on the page. */
(function (root) {
  const BOX = {
    levels: ['today', '+1 generation', '+2 generations', '+3 generations', 'far future'],
    items: [
      { id: 'gen', label: 'Writing and generating', enters: 0, note: 'Has always been the model’s job.' },
      { id: 'interp', label: 'Interpreting messy input', enters: 0, note: 'Reading intent from language: the reason we call a model at all.' },
      { id: 'glue', label: 'Glue code and plumbing', enters: 1, note: 'Brooks’ accidental complexity. Models absorb it quickly.' },
      { id: 'plan', label: 'Planning inside a task', enters: 1, note: 'Breaking one known task into steps moves inside early.' },
      { id: 'process', label: 'Recurring process steps', enters: 2, note: 'Much of the process itself can move inside, once it is specified well enough to test.' },
      { id: 'selfcheck', label: 'Checking its own work', enters: 3, note: 'Models will check themselves better and better. The external gauge still stays outside.' },
      { id: 'intent', label: 'Intent: what we want', enters: null, note: 'Deciding what car to build is a decision, not a capability. Brooks’ essential complexity.' },
      { id: 'authority', label: 'Authority: who may decide', enters: null, note: 'A capability gain does not make anyone responsible. Authority is social.' },
      { id: 'memory', label: 'Memory of record', enters: null, note: 'What was decided, when and why must outlive any model. Reconstructable, not remembered.' },
      { id: 'gauge', label: 'The gauge: contract and eval', enters: null, note: 'If the gauge moves into the box, nobody can tell whether the box still fits.' },
      { id: 'evidence', label: 'Evidence and provenance', enters: null, note: 'Trust between parties needs records, as double-entry bookkeeping has since 1494.' },
      { id: 'account', label: 'Accountability', enters: null, note: 'Someone answers for the outcome. A model cannot be that someone.' }
    ]
  };

  // Swap demo: one operation, one gauge, five candidates. Results are pre-baked and illustrative.
  const SWAP = {
    operation: 'extract.decisions',
    contract: '{ items: [ { kind, text, quote } ] }  ·  max 3  ·  quote must occur in the turn',
    gauge: { cases: 10, schemaNeeded: 10, behaviourNeeded: 8 },
    candidates: [
      { id: 'fa', name: 'Frontier A', when: 'January', local: false, schema: [1,1,1,1,1,1,1,1,1,1], behaviour: [1,1,1,1,0,1,1,1,1,1], note: 'Expensive, and the text leaves the building.' },
      { id: 'local', name: 'Local 14B', when: 'on your machine', local: true, schema: [1,1,1,1,1,1,1,1,1,1], behaviour: [1,1,0,1,1,1,1,0,1,1], note: 'Only just. Cheap, private, and structured output keeps the shape.' },
      { id: 'tiny', name: 'Tiny local', when: 'on your phone', local: true, schema: [1,0,1,1,0,1,1,0,1,1], behaviour: [1,0,0,1,0,1,0,0,1,0], note: 'Shape breaks on three cases, behaviour on six.' },
      { id: 'fb', name: 'Frontier B', when: 'March release', local: false, schema: [1,1,1,1,1,1,1,1,1,1], behaviour: [1,1,1,1,1,1,1,1,1,1], note: 'The best fit so far. The upgrade arrives without a rewrite.' },
      { id: 'fc', name: 'Frontier C', when: 'June release', local: false, schema: [1,1,1,1,1,1,1,1,1,1], behaviour: [1,0,1,1,0,1,1,0,1,1], note: 'Newer, but it paraphrases instead of quoting. Newer is not automatically better. The gauge decides.' }
    ]
  };

  // Control ladder and a Williamson-style calculator. The rule is shown on the page.
  const LADDER = [
    { id: 'rent', name: 'Rent, keep exit', text: 'Use a hosted model behind your own contract and eval. Switch whenever something better fits the gauge.' },
    { id: 'host', name: 'Host open weights', text: 'Run an open model yourself. The data stays in, the uptime is yours.' },
    { id: 'tune', name: 'Fine-tune', text: 'Train a specialist on your own cases. Only possible once the operation is specified and the eval exists.' },
    { id: 'train', name: 'Train your own', text: 'Build a base model. Public infrastructure scale: rare, slow, expensive, and sometimes exactly right.' }
  ];
  const DIMS = [
    { id: 'spec', name: 'Specificity', lo: 'generic', hi: 'only yours' },
    { id: 'freq', name: 'Frequency', lo: 'now and then', hi: 'constantly' },
    { id: 'stab', name: 'Stability', lo: 'changes weekly', hi: 'stays for years' },
    { id: 'sens', name: 'Sensitivity', lo: 'public', hi: 'must not leave' },
    { id: 'vol', name: 'Volume', lo: 'a few calls', hi: 'millions' }
  ];
  const PRESETS = [
    { name: 'Exploratory chat', v: { spec: 1, freq: 3, stab: 1, sens: 1, vol: 2 } },
    { name: 'Pilot: extract decisions', v: { spec: 3, freq: 4, stab: 3, sens: 2, vol: 3 } },
    { name: 'Private notes assistant', v: { spec: 2, freq: 3, stab: 3, sens: 4, vol: 1 } },
    { name: 'Organisation-wide assistant', v: { spec: 2, freq: 4, stab: 2, sens: 3, vol: 4 } },
    { name: 'National public model', v: { spec: 3, freq: 4, stab: 4, sens: 4, vol: 4 } }
  ];
  function recommend(v) {
    const w = v.spec + v.freq + v.stab, why = [];
    let rung = 'rent';
    if (v.sens >= 3) { rung = 'host'; why.push('Sensitivity is high: the data must stay in, so renting is out.'); }
    else if (v.vol >= 3 && w >= 7) { rung = 'host'; why.push('High volume of a specific, recurring job: hosting starts to pay.'); }
    if (w >= 9 && v.stab >= 3) { rung = rung === 'train' ? rung : 'tune'; why.push(`Specific, frequent and stable (${w} of 12): a trained specialist will last long enough to pay off.`); }
    if (w >= 11 && v.vol >= 4 && v.stab >= 4 && v.sens >= 4) { rung = 'train'; why.push('Everything is at the maximum: this is infrastructure, not a product.'); }
    if (rung === 'rent') why.push(`Not specific, frequent and stable enough (${w} of 12), and nothing forces the data in. Renting with a clear exit gives you the frontier for free.`);
    if (v.stab <= 1) why.push('Low stability: anything you train today is outdated by the next release.');
    return { rung, why };
  }

  root.ESSAY = { BOX, SWAP, LADDER, DIMS, PRESETS, recommend };
})(window);
