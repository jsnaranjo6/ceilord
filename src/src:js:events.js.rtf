{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ els \} from './dom.js';\
import \{ assignNumber \} from './logic.js';\
import \{ openCheckout, closeCheckout, wireCheckout \} from './checkout.js';\
import \{ goLoser, goSlots \} from './navigation.js';\
import \{ wireAuth, closeAuth \} from './auth.js';\
\
export function wireUI()\{\
  els.spinBtn.addEventListener('click', assignNumber);\
  els.joinBtn.addEventListener('click', ()=>\{ if(!els.joinBtn.disabled) openCheckout(); \});\
  els.loseBtn.addEventListener('click', ()=>\{ goLoser(); \});\
  els.retryLink.addEventListener('click', ()=>\{ goSlots(); \});\
  els.backToMenu.addEventListener('click', ()=>\{ goSlots(); \});\
\
  wireCheckout();\
  wireAuth();\
\
  window.addEventListener('keydown', (e)=>\{\
    if(els.slotScreen.classList.contains('active') && !els.spinBtn.disabled && (e.key==='Enter' || e.key===' ')) assignNumber();\
    if(e.key==='Escape' && els.modal.classList.contains('active')) closeCheckout();\
    if(e.key==='Escape' && els.termsModal.classList.contains('active')) els.termsModal.classList.remove('active');\
    if(e.key==='Escape' && els.authModal.classList.contains('active')) closeAuth();\
  \});\
\
  els.termsLinkBtn.addEventListener('click', ()=>\{ els.termsModal.classList.add('active'); \});\
  els.termsClose.addEventListener('click', ()=> els.termsModal.classList.remove('active'));\
  els.termsModal.addEventListener('click', (e)=>\{ if(e.target===els.termsModal) els.termsModal.classList.remove('active'); \});\
\}\
}