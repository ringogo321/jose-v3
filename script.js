const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    const panel = item.nextElementSibling;
    panel.classList.toggle('open');
    item.querySelector('.caret').textContent = panel.classList.contains('open') ? '−' : '+';
  });
});

const strictness = document.getElementById('strictness');
const strictnessLabel = document.getElementById('strictness-label');
const score = document.getElementById('score');
const signal = document.getElementById('signal');
const load = document.getElementById('load');
const riskPill = document.getElementById('risk-pill');

const settings = [
  { label: 'Exploratory', score: 90, signal: 'Very High', load: 'Low', risk: 'Very low' },
  { label: 'Open', score: 86, signal: 'High', load: 'Low', risk: 'Low' },
  { label: 'Balanced', score: 82, signal: 'High', load: 'Moderate', risk: 'Low' },
  { label: 'Selective', score: 77, signal: 'Focused', load: 'High', risk: 'Moderate' },
  { label: 'Elite', score: 72, signal: 'Precision', load: 'Very high', risk: 'Moderate' },
];

strictness.addEventListener('input', (event) => {
  const idx = Number(event.target.value) - 1;
  const data = settings[idx];
  strictnessLabel.textContent = data.label;
  score.textContent = data.score;
  signal.textContent = data.signal;
  load.textContent = data.load;
  riskPill.textContent = `${data.risk} risk`;
});

const counters = document.querySelectorAll('.metric');

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};

window.addEventListener('load', animateCounters);
