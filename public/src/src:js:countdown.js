// src/js/countdown.js
import { COUNTDOWN_SECONDS } from './constants.js';
import { els } from './dom.js';
import { state } from './state.js';
import { goSlots } from './navigation.js';
import { showExpireNotice } from './notices.js';

/**
 * Inicia (o reinicia) la cuenta regresiva a COUNTDOWN_SECONDS.
 * Contrato público: NO CAMBIADO.
 */
export function startCountdown() {
  clearInterval(state.countdownTimer);
  state.remaining = COUNTDOWN_SECONDS;
  renderRemaining();
  if (els.joinBtn) els.joinBtn.disabled = false;

  state.countdownTimer = setInterval(tick, 1000);
}

/**
 * (NUEVO) Aumenta el timer en 'seconds' (por defecto 300s = 5 min).
 * No altera el contrato de startCountdown; es una utilidad adicional.
 * Úsala al hacer clic en “Quiero unirme, soy increíble”.
 */
export function increaseCountdown(seconds = 300) {
  const add = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  if (!add) return;

  // Si no hay timer corriendo y el remaining no es válido, normalizamos
  if (!state.countdownTimer && (typeof state.remaining !== 'number' || state.remaining <= 0)) {
    state.remaining = COUNTDOWN_SECONDS;
  }

  state.remaining += add;

  // Cota superior de seguridad (opcional): 24h para evitar valores absurdos
  const MAX_SAFE_SECONDS = 24 * 60 * 60;
  if (state.remaining > MAX_SAFE_SECONDS) state.remaining = MAX_SAFE_SECONDS;

  renderRemaining();
}

/* ============================
 * Internos
 * ============================ */

function tick() {
  state.remaining -= 1;
  renderRemaining();

  if (state.remaining <= 0) {
    clearInterval(state.countdownTimer);
    state.countdownTimer = null;
    goSlots();
    showExpireNotice();
  }
}

function renderRemaining() {
  if (els.countdownEl) {
    els.countdownEl.textContent = state.remaining;
  }
}
