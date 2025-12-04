{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ els \} from './dom.js';\
import \{ state \} from './state.js';\
import \{ markPurchased \} from './storage.js';\
import \{ openAuth \} from './auth.js';\
\
export function openCheckout()\{ els.modal.classList.add('active'); \}\
export function closeCheckout()\{ els.modal.classList.remove('active'); \}\
\
function onPaid()\{\
  if(state.reservedNumber!=null)\{ markPurchased(state.reservedNumber); \}\
  closeCheckout();\
  openAuth('signup');\
\}\
\
export function wireCheckout()\{\
  els.coClose.addEventListener('click', closeCheckout);\
  els.modal.addEventListener('click', (e)=>\{ if(e.target===els.modal) closeCheckout(); \});\
  els.payCard.addEventListener('click', onPaid);\
  els.payApple.addEventListener('click', onPaid);\
  els.payPayPal.addEventListener('click', onPaid);\
\}\
}