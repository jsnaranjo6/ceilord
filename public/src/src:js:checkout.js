// src/js/checkout.js
import { els } from './dom.js';
import { state } from './state.js';
import { markPurchased } from './storage.js';
import { openAuth } from './auth.js';
import { zeroPad } from './utils.js';

/* =========================================================================
   🔧 EDITA AQUÍ TUS LINKS EXTERNOS
   - Usa HTTPS.
   - Puedes incluir {MEMBER} y se sustituirá por el número de miembro con zero-pad (7 dígitos).
   - Ejemplo: 'https://tusitio.com/pagar?m={MEMBER}'
   ======================================================================= */
const PAYMENT_LINKS = Object.freeze({
  card: https://ppls.me/5NTwxIdRRNa6bEODJ4WOhw   // ← Pega aquí el link externo de "Tarjeta de crédito"
  paypal: https://www.paypal.com/ncp/payment/F5FAB56A8H5EC  // ← Pega aquí el link externo de "PayPal"
});

/* =========================================================================
   ⚙️ MODO DESARROLLO (opcional)
   - Si dejas el link vacío, por defecto haremos el flujo "demo"
     onPaid() (marca comprado y abre signup) para poder probar el resto.
   - Si NO quieres este fallback, cambia DEMO_FALLBACK_ON_EMPTY_LINKS a false.
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

/** Redirige en la misma pestaña. */
function redirectTo(url) {
  // Asumimos navegación directa; si prefieres nueva pestaña: window.open(url, '_blank', 'noopener');
  window.location.href = url;
}

/** Flujo de pago "demo" (marca comprado y abre signup). */
function onPaidDemo() {
  if (state.reservedNumber != null) {
    markPurchased(state.reservedNumber);
  }
  closeCheckout();
  openAuth('signup');
}

/* =========================================================================
   API pública
   ======================================================================= */

export function openCheckout() {
  els.modal.classList.add('active');
}

export function closeCheckout() {
  els.modal.classList.remove('active');
}

export function wireCheckout() {
  // Cerrar por X y clic fuera
  if (els.coClose) els.coClose.addEventListener('click', closeCheckout);
  if (els.modal) {
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closeCheckout();
    });
  }

  // 🔥 Asegurar eliminación de Apple Pay si por alguna razón existe en el DOM
  if (els.payApple && typeof els.payApple.remove === 'function') {
    els.payApple.remove();
  }

  // "Tarjeta de crédito" → redirección externa o demo
  if (els.payCard) {
    els.payCard.addEventListener('click', () => {
      const url = resolveLink(PAYMENT_LINKS.card);
      if (url) {
        redirectTo(url);
      } else if (DEMO_FALLBACK_ON_EMPTY_LINKS) {
        onPaidDemo();
      } else {
        alert('Link de pago con tarjeta no está configurado.');
      }
    });
  }

  // "PayPal" → redirección externa o demo
  if (els.payPayPal) {
    els.payPayPal.addEventListener('click', () => {
      const url = resolveLink(PAYMENT_LINKS.paypal);
      if (url) {
        redirectTo(url);
      } else if (DEMO_FALLBACK_ON_EMPTY_LINKS) {
        onPaidDemo();
      } else {
        alert('Link de pago con PayPal no está configurado.');
      }
    });
  }
}
