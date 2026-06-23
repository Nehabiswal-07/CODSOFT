/* ============================================================
   NeoGlass Calculator — script.js
   v4: Bug-fixed calculation engine + working history
   Author: Neha Biswal (Portfolio Project)

   ROOT CAUSE OF BUG (now fixed):
   handleNumber() was resetting operator + previousValue
   whenever justCalculated was true — but justCalculated
   is also set to true after pressing an OPERATOR (to flag
   "waiting for second operand"). This wiped the saved state
   before the second number could be entered, making every
   calculation return only the second typed number.

   FIX: Introduce a separate flag `waitingForOperand` that
   is ONLY true when waiting for the second number after
   pressing an operator. `justCalculated` is now reserved
   exclusively for "the = button was just pressed".
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. DOM REFERENCES
   ───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   2. CALCULATOR STATE
   ─────────────────────────────────────────────────────────
   We use TWO separate boolean flags instead of one — this is
   the core of the bug fix:

   • waitingForOperand — true RIGHT AFTER pressing an operator
     (+, −, ×, ÷). Means "next digit starts the second number".
     previousValue and operator are PRESERVED during this state.

   • justCalculated — true ONLY after pressing "=".
     Means "next digit starts a brand-new calculation".
     All state is reset when a number is typed.
   ───────────────────────────────────────────────────────── */
let currentValue      = '0';   // The number shown in the main display
let previousValue     = '';    // The first operand (saved when operator is pressed)
let operator          = null;  // The active operator: '+', '−', '×', '÷'
let waitingForOperand = false; // True after operator is pressed, before 2nd number starts
let justCalculated    = false; // True after '=' is pressed

/* Glow & animation timers */
let glowTimer   = null;
let resultTimer = null;

/* ─────────────────────────────────────────────────────────
   3. HISTORY STATE
   ───────────────────────────────────────────────────────── */
const MAX_HISTORY  = 50;
let historyEntries = []; // [{ expr: '2 + 2', result: '4' }, ...]

/* ─────────────────────────────────────────────────────────
   4. LIVE EXPRESSION STRING
   Tracks what's shown in the small top line of the display.
   e.g. after pressing 5 then ×: liveExpr = "5 × "
   After typing 3:                liveExpr = "5 × 3"  (appended in refreshExpressionLine)
   ───────────────────────────────────────────────────────── */
let liveExpr = ''; // The "left side + operator" fragment stored after operator press

/* ─────────────────────────────────────────────────────────
   5. DISPLAY HELPERS
   ───────────────────────────────────────────────────────── */

/**
 * updateMainDisplay(value)
 * Shows a value in the large number area. Auto-shrinks font for
 * long numbers and plays a micro pop animation on every update.
 */
function updateMainDisplay(value) {
  mainDisplay.textContent = value;

  // Reset all modifier classes
  mainDisplay.classList.remove('medium', 'small', 'error-state', 'result-glow-text');

  // Adaptive font size: shrink progressively for long numbers
  const len = String(value).length;
  if      (len > 12) mainDisplay.classList.add('small');
  else if (len > 8)  mainDisplay.classList.add('medium');

  // Error styling
  if (value === 'Error') mainDisplay.classList.add('error-state');

  // Pop animation — remove + reflow + re-add to always replay it
  mainDisplay.classList.remove('pop');
  void mainDisplay.offsetWidth; // force browser reflow
  mainDisplay.classList.add('pop');
}

/**
 * updateExpressionDisplay(text)
 * Updates the small expression line at the top of the display.
 */
function updateExpressionDisplay(text) {
  expressionDisplay.textContent = text || '\u00A0'; // non-breaking space when empty
}

/**
 * setModeBadge(mode)
 * Changes the CALC / ERROR pill in the top-right corner.
 */
function setModeBadge(mode) {
  modeBadge.textContent = mode;
  modeBadge.classList.toggle('error', mode === 'ERROR');
}

/**
 * refreshExpressionLine()
 * Rebuilds the small expression preview line based on current state.
 * Called after every user action so the display is always up-to-date.
 *
 *  State                          → Expression line shows
 *  ─────────────────────────────────────────────────────
 *  Typing first operand           → "25"           (the number being typed)
 *  Operator pressed               → "25 × "        (operand + operator, trailing space)
 *  Typing second operand          → "25 × 3"       (liveExpr + current digit)
 *  = pressed                      → "25 × 3 ="     (set directly in handleEqual)
 *  Fresh start / AC               → (empty)
 */
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

/* ─────────────────────────────────────────────────────────
   6. VISUAL EFFECTS — Glow & Result Flash
   ───────────────────────────────────────────────────────── */

// Map operator symbols → CSS glow class names
const operatorGlowMap = {
  '+': 'glow-add',
  '−': 'glow-sub',
  '×': 'glow-mul',
  '÷': 'glow-div',
};

/**
 * triggerOperatorGlow(op)
 * Adds a colored ambient glow around the calculator card for 1.8s,
 * then the default breathing animation resumes automatically.
 * Each operator has its own color: blue / purple / cyan / amber.
 */
function triggerOperatorGlow(op) {
  const glowClass = operatorGlowMap[op];
  if (!glowClass) return;

  // Remove any existing glow classes first
  calculatorEl.classList.remove('glow-add', 'glow-sub', 'glow-mul', 'glow-div', 'result-glow');
  calculatorEl.classList.add(glowClass);

  if (glowTimer) clearTimeout(glowTimer);
  glowTimer = setTimeout(() => {
    calculatorEl.classList.remove(glowClass);
  }, 1800);
}

/**
 * triggerResultGlow()
 * Brief premium flash on the card + display when = is pressed.
 * Gives tactile feedback that the calculation completed.
 */
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

/* ─────────────────────────────────────────────────────────
   7. BUTTON ANIMATIONS
   ───────────────────────────────────────────────────────── */

/**
 * animateButton(button)
 * Adds 'pressed' class for 110ms to play the CSS scale-down effect.
 */
function animateButton(button) {
  button.classList.add('pressed');
  setTimeout(() => button.classList.remove('pressed'), 110);
}

/**
 * highlightActiveOperator(activeBtn)
 * Keeps one operator button visually highlighted (active-op class)
 * while waiting for the second operand. Clears all when passed null.
 */
function highlightActiveOperator(activeBtn) {
  document.querySelectorAll('.btn-operator').forEach(btn => btn.classList.remove('active-op'));
  if (activeBtn) activeBtn.classList.add('active-op');
}

/* ─────────────────────────────────────────────────────────
   8. CORE CALCULATION ENGINE
   ───────────────────────────────────────────────────────── */

/**
 * calculate(prev, curr, op)
 * Performs arithmetic and returns the result as a string.
 * Returns 'Error' for invalid inputs or division by zero.
 *
 * Floating-point fix: toPrecision(12) → parseFloat strips
 * trailing zeros and corrects drift.
 * Example: 0.1 + 0.2 → "0.3" (not "0.30000000000000004")
 */
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

/* ─────────────────────────────────────────────────────────
   9. HISTORY MANAGEMENT
   ───────────────────────────────────────────────────────── */

/**
 * addToHistory(expr, result)
 * Prepends a new entry to historyEntries and re-renders the list.
 * expr   — e.g. "12 + 8"
 * result — e.g. "20"
 */
function addToHistory(expr, result) {
  if (result === 'Error') return; // Don't save failed calculations

  historyEntries.unshift({ expr, result }); // Newest first

  // Keep history bounded
  if (historyEntries.length > MAX_HISTORY) historyEntries.pop();

  renderHistory();
}

/**
 * renderHistory()
 * Rebuilds the entire history <ul> from the historyEntries array.
 * Also manages the empty-state placeholder.
 */
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

    // Small dim line: "12 + 8 ="
    const exprEl = document.createElement('div');
    exprEl.className = 'history-expr';
    exprEl.textContent = `${entry.expr} =`;

    // Large result line: "20"
    const resultEl = document.createElement('div');
    resultEl.className = 'history-result';
    resultEl.textContent = entry.result;

    li.appendChild(exprEl);
    li.appendChild(resultEl);

    /*
     * Clicking a history item loads its result into the calculator.
     * The user can then continue calculating from that number.
     */
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

/**
 * clearHistory()
 * Deletes all history entries and re-renders the empty state.
 */
function clearHistory() {
  historyEntries = [];
  renderHistory();
}

/* ─────────────────────────────────────────────────────────
   10. HISTORY PANEL TOGGLE
   ───────────────────────────────────────────────────────── */
let historyOpen = false;

/**
 * toggleHistory()
 * Shows or hides the history panel with a smooth CSS transition.
 */
function toggleHistory() {
  historyOpen = !historyOpen;
  historyPanel.classList.toggle('open', historyOpen);
  historyPanel.setAttribute('aria-hidden', String(!historyOpen));
  historyToggleBtn.setAttribute('aria-expanded', String(historyOpen));
  historyToggleBtn.classList.toggle('active', historyOpen);
}

historyToggleBtn.addEventListener('click', toggleHistory);
historyClearBtn.addEventListener('click', clearHistory);

/* ─────────────────────────────────────────────────────────
   11. INPUT HANDLERS
   ─────────────────────────────────────────────────────────
   Each handler is responsible for exactly one button action.
   State changes are explicit and easy to follow.
   ───────────────────────────────────────────────────────── */

/**
 * handleNumber(digit)
 * Called when the user presses any digit button (0–9).
 *
 * Three cases:
 *  A) waitingForOperand = true  → operator was just pressed.
 *     Start the second number. Keep operator + previousValue intact.
 *
 *  B) justCalculated = true     → "=" was just pressed.
 *     Discard the result and start a fresh calculation.
 *
 *  C) Normal typing             → append the digit to currentValue.
 */
function handleNumber(digit) {

  if (waitingForOperand) {
    /* ── Case A: Starting second operand ──────────────────
       The operator was just pressed. The next digit begins the
       second number. We must NOT touch operator or previousValue.
       This is where the previous version had its bug. */
    currentValue      = digit;
    waitingForOperand = false;
    // operator and previousValue are intentionally left as-is

  } else if (justCalculated) {
    /* ── Case B: Fresh start after = ─────────────────────
       Clear everything and begin a new calculation. */
    currentValue   = digit;
    previousValue  = '';
    operator       = null;
    liveExpr       = '';
    justCalculated = false;

  } else {
    /* ── Case C: Continuing to type the current number ────
       Cap at 12 significant digits to prevent display overflow. */
    if (currentValue.replace('.', '').replace('-', '').length >= 12) return;

    // Replace a lone "0" instead of appending to it
    currentValue = (currentValue === '0') ? digit : currentValue + digit;
  }

  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

/**
 * handleDecimal()
 * Adds a decimal point. Only one is allowed per number.
 * If currentValue already has a ".", the press is silently ignored.
 */
function handleDecimal() {

  if (waitingForOperand) {
    // Start second operand as "0."
    currentValue      = '0.';
    waitingForOperand = false;
    // operator and previousValue preserved

  } else if (justCalculated) {
    // Start fresh decimal number after a result
    currentValue   = '0.';
    previousValue  = '';
    operator       = null;
    liveExpr       = '';
    justCalculated = false;

  } else if (!currentValue.includes('.')) {
    // Safe to add decimal — no existing dot in this number
    currentValue += '.';

  }
  // else: already has a dot → silently ignore (prevents "0.5." etc.)

  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

/**
 * handleOperator(op, buttonEl)
 * Called when +, −, ×, or ÷ is pressed.
 *
 * Supports chaining: "2 + 3 ×" first evaluates "2 + 3 = 5",
 * then sets up "5 ×" for the next operand.
 */
function handleOperator(op, buttonEl) {
  // Visual effects
  triggerOperatorGlow(op);
  highlightActiveOperator(buttonEl);

  if (waitingForOperand) {
    /*
     * Operator pressed again without entering a number in between.
     * e.g. user pressed "5 + ×" — just switch the operator.
     * Update liveExpr to show the new operator.
     */
    operator = op;
    liveExpr = `${previousValue} ${op} `;
    refreshExpressionLine();
    return;
  }

  if (operator && !justCalculated) {
    /*
     * There's already a pending operation with a second operand typed.
     * Chain-calculate it before setting up the new operator.
     * e.g. "5 + 3 ×" → evaluates "5 + 3 = 8", then sets up "8 ×"
     */
    const chainResult = calculate(previousValue, currentValue, operator);
    currentValue = chainResult;
    updateMainDisplay(currentValue);
  }

  // Store the current number as the left operand
  previousValue = currentValue;
  operator      = op;

  // Build the expression preview string (includes trailing space)
  liveExpr = `${previousValue} ${op} `;

  // Flag that we're now waiting for the second operand
  waitingForOperand = true;
  justCalculated    = false;

  refreshExpressionLine();
}

/**
 * handleEqual()
 * Evaluates the pending operation and shows the result.
 * Also saves the calculation to history.
 */
function handleEqual() {
  // Nothing to calculate if no operator or no left operand
  if (!operator || previousValue === '') return;

  // Ignore if we're still waiting for the second number
  // (operator pressed but no digit typed yet)
  if (waitingForOperand) return;

  // Build full expression string for display + history
  const fullExpr = `${previousValue} ${operator} ${currentValue}`;

  // Perform the calculation
  const result = calculate(previousValue, currentValue, operator);

  // Show completed expression in the small line: "2 + 2 ="
  updateExpressionDisplay(`${fullExpr} =`);

  // Save to history (only if not an error)
  addToHistory(fullExpr, result);

  // Update calculator state
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

/**
 * handleClear()
 * Resets the entire calculator to its initial state (AC button).
 */
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

/**
 * handleDelete()
 * Removes the last character typed (DEL button / Backspace key).
 */
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

/**
 * handlePercent()
 * Converts the current number to a percentage (divides by 100).
 * e.g. 50 → 0.5  |  200 → 2
 */
function handlePercent() {
  if (currentValue === '0' || currentValue === 'Error') return;

  const val = parseFloat(currentValue);
  currentValue = String(parseFloat((val / 100).toPrecision(12)));
  updateMainDisplay(currentValue);
  refreshExpressionLine();
}

/* ─────────────────────────────────────────────────────────
   12. EVENT LISTENERS — Button clicks (Event Delegation)
   One listener on the grid parent handles ALL button clicks.
   ───────────────────────────────────────────────────────── */
const buttonGrid = document.querySelector('.button-grid');

buttonGrid.addEventListener('click', function (event) {
  // Walk up the DOM from the click target to find the button
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

/* ─────────────────────────────────────────────────────────
   13. KEYBOARD SUPPORT
   Maps physical keyboard keys to calculator buttons.
   Pressing a key also triggers the on-screen button animation.
   ───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   14. PARTICLE SYSTEM
   Soft floating dots drawn on the background canvas.
   Pure visual ambience — does not affect functionality.
   ───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   15. RUNTIME STYLE INJECTION
   Injects the display pop keyframe so it replays on every update.
   Done here so the animation class doesn't need to be in style.css.
   ───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   16. INITIALISATION
   ───────────────────────────────────────────────────────── */
function init() {
  resizeCanvas();
  initParticles();
  drawParticles();

  // Rescatter particles on window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // Set initial UI state
  updateMainDisplay('0');
  updateExpressionDisplay('');
  setModeBadge('CALC');
  renderHistory(); // Renders empty state
}

init();
