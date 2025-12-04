{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ MIN_NUMBER, MAX_NUMBER, SPIN_TIME \} from './constants.js';\
import \{ els \} from './dom.js';\
import \{ state \} from './state.js';\
import \{ zeroPad, randomInt \} from './utils.js';\
import \{ loadPurchased, loadMeta \} from './storage.js';\
import \{ animateReelsTo \} from './animations.js';\
import \{ goHome \} from './navigation.js';\
import \{ startCountdown \} from './countdown.js';\
\
function pickAvailableNumber()\{\
  const set = loadPurchased();\
  const meta = loadMeta();\
  const unavailable=(n)=>\{\
    if(meta[n])\{\
      if(meta[n].status==='active') return true;\
      if(meta[n].status==='cancelled') return Date.now() < (meta[n].nextRenewal||0);\
    \}\
    return set.has(n);\
  \};\
  if(set.size >= (MAX_NUMBER - MIN_NUMBER + 1)) return null;\
  for(let i=0;i<5000;i++)\{\
    const cand = randomInt(MIN_NUMBER, MAX_NUMBER);\
    if(!unavailable(cand)) return cand;\
  \}\
  for(let cand=MIN_NUMBER; cand<=MAX_NUMBER; cand++)\{\
    if(!unavailable(cand)) return cand;\
  \}\
  return null;\
\}\
\
export function assignNumber()\{\
  const next = pickAvailableNumber();\
  if(next===null)\{\
    alert('Todos los n\'fameros han sido adquiridos.');\
    return;\
  \}\
  state.reservedNumber = next;\
  const formatted = zeroPad(state.reservedNumber);\
  animateReelsTo(formatted);\
  els.spinBtn.disabled = true;\
  const lastReelDelay = SPIN_TIME + 6*220 + 800;\
  setTimeout(()=>\{\
    els.memberNumberEl.textContent = formatted;\
    goHome();\
    startCountdown();\
  \}, lastReelDelay);\
\}\
}