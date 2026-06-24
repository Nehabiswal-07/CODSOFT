'use strict';

// dom
const mainDisplay       = document.getElementById('main-display');
const expressionDisplay = document.getElementById('expression-display');
const displaySection    = document.getElementById('calculator').querySelector('.display-section');
const calculatorEl      = document.getElementById('calculator');
const modeBadge         = document.getElementById('mode-badge');
const historyPanel      = document.getElementById('history-panel');
const historyList       = document.getElementById('history-list');
const historyEmpty      = document.getElementById('history-empty');
const historyToggleBtn  = document.getElementById('history-toggle-btn');
const historyClearBtn   = document.getElementById('history-clear-btn');

// state
let currentValue      = '0';   // The number shown in the main display
let previousValue     = '';    // The first operand (saved when operator is pressed)
let operator          = null;  // The active operator: '+', '−', '×', '÷'
let waitingForOperand = false; // True after operator is pressed, before 2nd number starts
let justCalculated    = false; // True after '=' is pressed

/* Glow & animation timers */
let glowTimer   = null;
let resultTimer = null;

// history
const MAX_HISTORY  = 50;
let historyEntries = []; // [{ expr: '2 + 2', result: '4' }, ...]

// live expression string
let liveExpr = ''; // The "left side + operator" fragment stored after operator press

//display helpers
function updateMainDisplay(value) {
  mainDisplay.textContent = value;

  // reset all modifier classes
  mainDisplay.classList.remove('medium', 'small', 'error-state', 'result-glow-text');

  // font size
  const len = String(value).length;
  if      (len > 12) mainDisplay.classList.add('small');
  else if (len > 8)  mainDisplay.classList.add('medium');

  // Error styling
  if (value === 'Error') mainDisplay.classList.add('error-state');

  // pop animation 
  mainDisplay.classList.remove('pop');
  void mainDisplay.offsetWidth; // force browser reflow
  mainDisplay.classList.add('pop');
}

function updateExpressionDisplay(text) {
  expressionDisplay.textContent = text || '\u00A0'; // non-breaking space when empty
}

function setModeBadge(mode) {
  modeBadge.textContent = mode;
  modeBadge.classList.toggle('error', mode === 'ERROR');
}

function refreshExpressionLine() {
  if (waitingForOperand) {
    // Operator was just pressed, second number not started yet
    // Show e.g. "25 × "
    updateExpressionDisplay(liveExpr);
  } else if (operator && !justCalculated) {
    // Second number is being typed
    // Show e.g. "25 × 3"
    updateExpressionDisplay(`${liveExpr}${currentValue}`);
  } else if (!operator && !justCalculated && currentValue !== '0') {
    // Typing the first operand
    updateExpressionDisplay(currentValue);
  } else {
    updateExpressionDisplay('');
  }
}

// visual effects — Glow & Result Flash

// Map operator symbols → CSS glow class names
const operatorGlowMap = {
  '+': 'glow-add',
  '−': 'glow-sub',
  '×': 'glow-mul',
  '÷': 'glow-div',
};

function triggerOperatorGlow(op) {
  const glowClass = operatorGlowMap[op];
  if (!glowClass) return;


  calculatorEl.classList.remove('glow-add', 'glow-sub', 'glow-mul', 'glow-div', 'result-glow');
  calculatorEl.classList.add(glowClass);

  if (glowTimer) clearTimeout(glowTimer);
  glowTimer = setTimeout(() => {
    calculatorEl.classList.remove(glowClass);
  }, 1800);
}

function triggerResultGlow() {
  // Card glow flash
  calculatorEl.classList.remove('result-glow');
  void calculatorEl.offsetWidth;
  calculatorEl.classList.add('result-glow');

  // Scanline brighten
  displaySection.classList.add('result-flash');

  // Number glow
  mainDisplay.classList.add('result-glow-text');

  if (resultTimer) clearTimeout(resultTimer);
  resultTimer = setTimeout(() => {
    calculatorEl.classList.remove('result-glow');
    displaySection.classList.remove('result-flash');
    mainDisplay.classList.remove('result-glow-text');
  }, 700);
}

// button animations

function animateButton(button) {
  button.classList.add('pressed');
  setTimeout(() => button.classList.remove('pressed'), 110);
}

function highlightActiveOperator(activeBtn) {
  document.querySelectorAll('.btn-operator').forEach(btn => btn.classList.remove('active-op'));
  if (activeBtn) activeBtn.classList.add('active-op');
}

// calc
function calculate(prev, curr, op) {
  const a = parseFloat(prev);
  const b = parseFloat(curr);

  // Validate both operands are real numbers
  if (isNaN(a) || isNaN(b)) return 'Error';

  let result;
  switch (op) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷':
      if (b === 0) return 'Error'; // Cannot divide by zero
      result = a / b;
      break;
    default:
      return curr; // Unknown operator — return unchanged
  }

  // Fix floating-point imprecision
  return String(parseFloat(result.toPrecision(12)));
}

// history management
function addToHistory(expr, result) {
  if (result === 'Error') return; // Don't save failed calculations

  historyEntries.unshift({ expr, result }); // Newest first

  // Keep history bounded
  if (historyEntries.length > MAX_HISTORY) historyEntries.pop();

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  if (historyEntries.length === 0) {
    historyEmpty.classList.remove('hidden');
    return;
  }

  historyEmpty.classList.add('hidden');

  historyEntries.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.setAttribute('role', 'listitem');
    li.title = 'Click to use this result';

    // Small dim line
    const exprEl = document.createElement('div');
    exprEl.className = 'history-expr';
    exprEl.textContent = `${entry.expr} =`;

    // Large result line
    const resultEl = document.createElement('div');
    resultEl.className = 'history-result';
    resultEl.textContent = entry.result;

    li.appendChild(exprEl);
    li.appendChild(resultEl);

       li.addEventListener('click', () => {
      currentValue      = entry.result;
      previousValue     = '';
      operator          = null;
      waitingForOperand = false;
      justCalculated    = true;  // next digit will start fresh
      liveExpr          = '';

      updateMainDisplay(currentValue);
      updateExpressionDisplay('');
      highlightActiveOperator(null);
    });

    historyList.appendChild(li);
  });
}

function clearHistory() {
  historyEntries = [];
  renderHistory();
}

// history pannel toggle
let historyOpen = false;

function toggleHistory() {
  historyOpen = !historyOpen;
  historyPanel.classList.toggle('open', historyOpen);
  historyPanel.setAttribute('aria-hidden', String(!historyOpen));
  historyToggleBtn.setAttribute('aria-expanded', String(historyOpen));
  historyToggleBtn.classList.toggle('active', historyOpen);
}

historyToggleBtn.addEventListener('click', toggleHistory);
historyClearBtn.addEventListener('click', clearHistory);

// input handlers

function handleNumber(digit) {

  if (waitingForOperand) {
       currentValue      = digit;
    waitingForOperand = false;
   
  } else if (justCalculated) {
    currentValue   = digit;
    previousValue  = '';
    operator       = null;
    liveExpr       = '';
    justCalculated = false;

  } else {
       if (currentValue.replace('.', '').replace('-', '').length >= 12) return;

    currentValue = (currentValue === '0') ? digit : currentValue + digit;
  }

  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

function handleDecimal() {

  if (waitingForOperand) {
    currentValue      = '0.';
    waitingForOperand = false;
    
  } else if (justCalculated) {
    // Start fresh decimal number after a result
    currentValue   = '0.';
    previousValue  = '';
    operator       = null;
    liveExpr       = '';
    justCalculated = false;

  } else if (!currentValue.includes('.')) {
    currentValue += '.';

  }
  
  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

function handleOperator(op, buttonEl) {
  // visual effects
  triggerOperatorGlow(op);
  highlightActiveOperator(buttonEl);

  if (waitingForOperand) {
       operator = op;
    liveExpr = `${previousValue} ${op} `;
    refreshExpressionLine();
    return;
  }

  if (operator && !justCalculated) {
       const chainResult = calculate(previousValue, currentValue, operator);
    currentValue = chainResult;
    updateMainDisplay(currentValue);
  }

  previousValue = currentValue;
  operator      = op;

  liveExpr = `${previousValue} ${op} `;

  waitingForOperand = true;
  justCalculated    = false;

  refreshExpressionLine();
}

function handleEqual() {
  if (!operator || previousValue === '') return;

  if (waitingForOperand) return;

  const fullExpr = `${previousValue} ${operator} ${currentValue}`;

  const result = calculate(previousValue, currentValue, operator);

  updateExpressionDisplay(`${fullExpr} =`);

  addToHistory(fullExpr, result);

  currentValue      = result;
  previousValue     = '';
  operator          = null;
  liveExpr          = '';
  waitingForOperand = false;
  justCalculated    = true;

  // Clear active operator highlight
  highlightActiveOperator(null);

  // Show the result
  updateMainDisplay(currentValue);

  // Trigger result glow flash (not on error)
  if (result !== 'Error') {
    triggerResultGlow();
  }

  // Error handling: show ERROR badge and auto-reset after 1.6s
  if (result === 'Error') {
    setModeBadge('ERROR');
    setTimeout(() => {
      currentValue      = '0';
      previousValue     = '';
      operator          = null;
      liveExpr          = '';
      waitingForOperand = false;
      justCalculated    = false;
      updateMainDisplay('0');
      updateExpressionDisplay('');
      setModeBadge('CALC');
    }, 1600);
  }
}

function handleClear() {
  currentValue      = '0';
  previousValue     = '';
  operator          = null;
  liveExpr          = '';
  waitingForOperand = false;
  justCalculated    = false;

  updateMainDisplay('0');
  updateExpressionDisplay('');
  highlightActiveOperator(null);
  setModeBadge('CALC');

  // Remove all glow state
  calculatorEl.classList.remove('glow-add', 'glow-sub', 'glow-mul', 'glow-div', 'result-glow');
  displaySection.classList.remove('result-flash');
  if (glowTimer)   clearTimeout(glowTimer);
  if (resultTimer) clearTimeout(resultTimer);
}

function handleDelete() {
  // If a result is showing, DEL acts like AC
  if (justCalculated || waitingForOperand) {
    handleClear();
    return;
  }

  // Remove last character; fall back to '0' if display would be empty
  currentValue = currentValue.length <= 1 ? '0' : currentValue.slice(0, -1);
  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

function handlePercent() {
  if (currentValue === '0' || currentValue === 'Error') return;

  const val = parseFloat(currentValue);
  currentValue = String(parseFloat((val / 100).toPrecision(12)));
  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

// event listeners
const buttonGrid = document.querySelector('.button-grid');

buttonGrid.addEventListener('click', function (event) {
  const button = event.target.closest('.btn');
  if (!button) return;

  const action = button.dataset.action;
  const value  = button.dataset.value;

  // Visual press animation
  animateButton(button);

  // Route to the correct handler
  switch (action) {
    case 'number':   handleNumber(value);           break;
    case 'decimal':  handleDecimal();               break;
    case 'operator': handleOperator(value, button); break;
    case 'equal':    handleEqual();                 break;
    case 'clear':    handleClear();                 break;
    case 'delete':   handleDelete();                break;
    case 'percent':  handlePercent();               break;
  }
});

// keyboard support
document.addEventListener('keydown', function (event) {
  const key = event.key;

  // Suppress browser's default behaviour for these keys
  const suppress = ['+', '-', '*', '/', 'Enter', '=', 'Backspace', 'Delete', 'Escape', '%'];
  if (suppress.includes(key)) event.preventDefault();

  // Map key → button element ID
  const keyMap = {
    '0': 'btn-0', '1': 'btn-1', '2': 'btn-2', '3': 'btn-3',
    '4': 'btn-4', '5': 'btn-5', '6': 'btn-6', '7': 'btn-7',
    '8': 'btn-8', '9': 'btn-9',
    '.': 'btn-dot', ',': 'btn-dot',
    '+': 'btn-add',
    '-': 'btn-sub',
    '*': 'btn-mul',
    '/': 'btn-div',
    'Enter': 'btn-eq',
    '=': 'btn-eq',
    'Backspace': 'btn-del',
    'Delete':    'btn-del',
    'Escape':    'btn-ac',
    'c':         'btn-ac',
    'C':         'btn-ac',
    '%':         'btn-pct',
    'h': 'HISTORY',
    'H': 'HISTORY',
  };

  const target = keyMap[key];
  if (!target) return;

  if (target === 'HISTORY') {
    // Toggle history panel with keyboard shortcut H
    toggleHistory();
    animateButton(historyToggleBtn);
    return;
  }

  const btn = document.getElementById(target);
  if (btn) btn.click(); // Triggers full click flow including animation
});

// particle system
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

const PARTICLE_COUNT = 60;
const MAX_RADIUS     = 1.6;
const MAX_SPEED      = 0.25;

let particles = [];
let frame     = 0;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x:           Math.random() * canvas.width,
    y:           Math.random() * canvas.height,
    radius:      Math.random() * MAX_RADIUS + 0.3,
    baseOpacity: Math.random() * 0.20 + 0.04,
    vx:          (Math.random() - 0.5) * MAX_SPEED,
    vy:          (Math.random() - 0.5) * MAX_SPEED,
    pulseSpeed:  Math.random() * 0.008 + 0.003,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

function initParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < -4)                p.x = canvas.width + 4;
    if (p.x > canvas.width + 4)  p.x = -4;
    if (p.y < -4)                p.y = canvas.height + 4;
    if (p.y > canvas.height + 4) p.y = -4;

    // Sine-wave pulse for breathing effect
    const pulse   = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
    const opacity = p.baseOpacity * (0.55 + 0.45 * pulse);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148, 130, 245, ${opacity})`;
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}

// display animation
(function injectAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes displayPop {
      0%   { transform: scale(1); }
      45%  { transform: scale(1.028); }
      100% { transform: scale(1); }
    }
    .main-display.pop {
      animation: displayPop 0.20s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
  `;
  document.head.appendChild(style);
})();

// init
function init() {
  resizeCanvas();
  initParticles();
  drawParticles();

  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  
  updateMainDisplay('0');
  updateExpressionDisplay('');
  setModeBadge('CALC');
  renderHistory(); 
}

init();
