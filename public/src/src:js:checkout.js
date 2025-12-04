// src/js/checkout.js
import { els } from './dom.js';
import { state } from './state.js';
import { markPurchased } from './storage.js';
import { openAuth } from './auth.js';
import { zeroPad } from './utils.js';

/* =========================================================================
   🔧 EDITA AQUÍ TUS LINKS EXTERNOS (OBLIGATORIO)
   - Usa HTTPS.
   - Puedes incluir {MEMBER} y se sustituirá por el número de miembro con zero-pad (7 dígitos).
   - Ejemplo: 'https://tusitio.com/pagar?m={MEMBER}'
   ======================================================================= */
const PAYMENT_LINKS = Object.freeze({
  card: 'https://ppls.me/5NTwxIdRRNa6bEODJ4WOhw',   // ← Pega aquí el link externo de "Tarjeta de crédito"
  paypal: 'https://www.paypal.com/ncp/payment/F5FAB56A8H5EC'  // ← Pega aquí el link externo de "PayPal"
});

/* =========================================================================
   ⚙️ MODO DESARROLLO
   - Si dejas el link vacío y esto está en true, se hace flujo demo (marca compra y abre signup).
   - Si lo pones en false y el link está vacío, muestra alerta.
   ======================================================================= */
const DEMO_FALLBACK_ON_EMPTY_LINKS = false;

/* =========================================================================
   Helpers
   ======================================================================= */

/** Sustituye {MEMBER} por el número con zero-pad si existe. */
function resolveLink(tpl) {
  if (!tpl) return '';
  const member = state.reservedNumber != null ? zeroPad(state.reservedNumber) : '';
  return tpl.replace(/\{MEMBER\}/g, member);
}

/** Redirige en la misma pestaña (fiable: no lo bloquea el navegador). */
function redirectTo(url) {
  // Si prefieres nueva pestaña: window.open(url, '_blank', 'noopener');
  window.open(url, '_blank', 'noopener');
}

/** Flujo de pago "demo" (solo para pruebas locales). */
function onPaidDemo() {
  if (state.reservedNumber != null) {
    markPurchased(state.reservedNumber);
  }
  closeCheckout();
  openAuth('signup');
}

/** Elimina cualquier botón Apple Pay que exista o vuelva a aparecer. */
function purgeApplePayButtons() {
  // 1) Referencias conocidas
  if (els.payApple && typeof els.payApple.remove === 'function') {
    try { els.payApple.remove(); } catch {}
  }
  // 2) Búsquedas defensivas por id y por texto
  const candidates = [
    ...document.querySelectorAll('#payApple, [data-pay="apple"], .pay-btn')
  ];
  for (const node of candidates) {
    const txt = (node.textContent || '').trim().toLowerCase();
    if (node.id === 'payApple' || txt === 'apple pay' || txt.includes('apple')) {
      try { node.remove(); } catch {}
    }
  }
}

/** Observa el modal por si alguien reinyecta Apple Pay (re-render). */
let appleObserver = null;
function ensureNoAppleWhileOpen() {
  purgeApplePayButtons();
  if (appleObserver) return;
  if (!els.modal) return;
  appleObserver = new MutationObserver(() => purgeApplePayButtons());
  appleObserver.observe(els.modal, { childList: true, subtree: true });
}
function stopAppleObserver() {
  if (appleObserver) {
    try { appleObserver.disconnect(); } catch {}
    appleObserver = null;
  }
}

/* =========================================================================
   API pública
   ======================================================================= */

export function openCheckout() {
  if (els.modal) {
    els.modal.classList.add('active');
    ensureNoAppleWhileOpen();
  }
}

export function closeCheckout() {
  if (els.modal) els.modal.classList.remove('active');
  stopAppleObserver();
}

export function wireCheckout() {
  // Cerrar por X y clic fuera
  if (els.coClose) els.coClose.addEventListener('click', closeCheckout);
  if (els.modal) {
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closeCheckout();
    });
  }

  // 🔥 Eliminar Apple Pay de entrada (por si ya está en el DOM)
  purgeApplePayButtons();

  // ============================
  // Event delegation robusto
  // ============================
  document.addEventListener('click', (e) => {
    const btnCard = e.target.closest('#payCard');
    const btnPayPal = e.target.closest('#payPayPal');

    if (btnCard) {
      e.preventDefault();
      const url = resolveLink(PAYMENT_LINKS.card);
      if (url) {
        closeCheckout(); // opcional: cerrar antes de irse
        redirectTo(url);
      } else if (DEMO_FALLBACK_ON_EMPTY_LINKS) {
        onPaidDemo();
      } else {
        alert('Link de pago con tarjeta no está configurado.');
      }
      return;
    }

    if (btnPayPal) {
      e.preventDefault();
      const url = resolveLink(PAYMENT_LINKS.paypal);
      if (url) {
        closeCheckout();
        redirectTo(url);
      } else if (DEMO_FALLBACK_ON_EMPTY_LINKS) {
        onPaidDemo();
      } else {
        alert('Link de pago con PayPal no está configurado.');
      }
      return;
    }
  });
}
