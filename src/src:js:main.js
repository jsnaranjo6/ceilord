{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ wireUI \} from './events.js';\
import \{ runSelfTests \} from './selftests.js';\
import \{ assignNumber \} from './logic.js';\
import \{ openCheckout \} from './checkout.js';\
import \{ animateReelsTo \} from './animations.js';\
import \{ goHome, goLoser, goSuccess, goSlots \} from './navigation.js';\
import \{ startCountdown \} from './countdown.js';\
import \{ startConfetti \} from './confetti.js';\
import \{ openAuth, closeAuth \} from './auth.js';\
import \{ showExpireNotice \} from './notices.js';\
\
// Re-exponer funciones con los mismos nombres (compatibilidad)\
window.animateReelsTo = animateReelsTo;\
window.goHome = goHome;\
window.goLoser = goLoser;\
window.goSuccess = goSuccess;\
window.goSlots = goSlots;\
window.startCountdown = startCountdown;\
window.assignNumber = assignNumber;\
window.openCheckout = openCheckout;\
window.startConfetti = startConfetti;\
window.openAuth = openAuth;\
window.closeAuth = closeAuth;\
window.showExpireNotice = showExpireNotice;\
\
window.addEventListener('DOMContentLoaded', ()=>\{\
  wireUI();\
  runSelfTests();\
\});\
}