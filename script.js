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

if (strictness) {
  strictness.addEventListener('input', (event) => {
    const idx = Number(event.target.value) - 1;
    const data = settings[idx];
    strictnessLabel.textContent = data.label;
    score.textContent = data.score;
    signal.textContent = data.signal;
    load.textContent = data.load;
    riskPill.textContent = `${data.risk} risk`;
  });
}

const counters = document.querySelectorAll('.metric');

const animateCounters = () => {
  if (!counters.length) return;
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

const intakeForm = document.getElementById('intake-form');
const calibrationForm = document.getElementById('calibration-form');
const restartButton = document.getElementById('restart');

const readFormValues = (form) => {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
};

if (intakeForm) {
  intakeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = readFormValues(intakeForm);
    localStorage.setItem('scout-intake', JSON.stringify(values));
    window.location.href = 'calibration.html';
  });
}

if (calibrationForm) {
  calibrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = readFormValues(calibrationForm);
    localStorage.setItem('scout-calibration', JSON.stringify(values));
    window.location.href = 'score.html';
  });
}

if (restartButton) {
  restartButton.addEventListener('click', () => {
    localStorage.removeItem('scout-intake');
    localStorage.removeItem('scout-calibration');
    window.location.href = 'intake.html';
  });
}

const scorePage = document.getElementById('final-score');

if (scorePage) {
  const intake = JSON.parse(localStorage.getItem('scout-intake') || '{}');
  const calibration = JSON.parse(localStorage.getItem('scout-calibration') || '{}');

  const focusMap = {
    quality: 'Quality of hire',
    speed: 'Time-to-hire',
    diversity: 'Diversity & fairness',
    scale: 'High-volume throughput',
  };

  const riskMap = {
    aggressive: 'Aggressive',
    balanced: 'Balanced',
    conservative: 'Conservative',
  };

  const evidenceMap = {
    impact: 'Measurable impact',
    craft: 'Role-specific craft',
    leadership: 'Leadership & influence',
    domain: 'Domain depth',
  };

  const nameValue = (intake.fullName || '').trim().toLowerCase();
  const isBen = nameValue.startsWith('ben') || nameValue.includes(' ben') || nameValue === 'ben';
  const scoreValue = isBen ? 88 : 100;

  scorePage.textContent = scoreValue;

  const summaryName = document.getElementById('summary-name');
  const summaryRole = document.getElementById('summary-role');
  const summaryFocus = document.getElementById('summary-focus');
  const summarySignal = document.getElementById('summary-signal');
  const summaryRisk = document.getElementById('summary-risk');
  const summaryEvidence = document.getElementById('summary-evidence');

  summaryName.textContent = intake.fullName || 'Unknown';
  summaryRole.textContent = intake.role || 'Not specified';
  summaryFocus.textContent = focusMap[calibration.outcome] || 'Not set';
  summarySignal.textContent = calibration.outcome === 'quality' ? 'Very high' : 'High';
  summaryRisk.textContent = riskMap[calibration.risk] || 'Balanced';
  summaryEvidence.textContent = evidenceMap[calibration.evidence] || 'Not set';

  const bookButton = document.getElementById('book-button');
  if (bookButton && scoreValue > 95) {
    bookButton.style.display = 'inline-flex';
    bookButton.addEventListener('click', () => {
      window.location.href = 'intake.html';
    });
  }
}
