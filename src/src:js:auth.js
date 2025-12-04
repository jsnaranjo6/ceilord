{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ els \} from './dom.js';\
import \{ state \} from './state.js';\
import \{ zeroPad \} from './utils.js';\
import \{ loadUsers, saveUsers, loadMeta, saveMeta, MS_28D \} from './storage.js';\
\
export function openAuth(mode='login')\{\
  state.authMode = mode;\
  els.authTitle.textContent = mode==='login' ? 'Iniciar sesi\'f3n' : 'Crear cuenta';\
  els.authError.style.display = 'none';\
  els.authEmail.value = '';\
  els.authPass.value = '';\
  els.authModal.classList.add('active');\
  if(mode==='signup') state.pendingMemberNumber = state.reservedNumber;\
\}\
export function closeAuth()\{ els.authModal.classList.remove('active'); \}\
const emailValid = (e)=> /.+@.+\\..+/.test(e);\
\
export function wireAuth()\{\
  els.openLogin?.addEventListener('click', ()=> openAuth('login'));\
  els.authClose?.addEventListener('click', closeAuth);\
  els.authCancel?.addEventListener('click', closeAuth);\
\
  els.authSubmit?.addEventListener('click', ()=>\{\
    const email = els.authEmail.value.trim();\
    const pass = els.authPass.value;\
    if(!emailValid(email) || pass.length < 6)\{ els.authError.style.display='block'; return; \}\
    const users = loadUsers();\
\
    if(state.authMode==='login')\{\
      const u = users[email];\
      if(!u || u.pass !== pass)\{ els.authError.style.display='block'; return; \}\
      const number = u.memberNumber;\
      if(!number)\{ els.authError.style.display='block'; return; \}\
      state.reservedNumber = number;\
      els.memberNumberEl.textContent = zeroPad(state.reservedNumber);\
      els.purchasedNumberEl && (els.purchasedNumberEl.textContent = zeroPad(state.reservedNumber));\
      closeAuth();\
      import('./navigation.js').then((\{goSuccess\})=> goSuccess());\
    \} else \{\
      if(!state.pendingMemberNumber)\{ els.authError.style.display='block'; return; \}\
      users[email] = \{ pass, memberNumber: state.pendingMemberNumber, status:'active' \};\
      saveUsers(users);\
      state.reservedNumber = state.pendingMemberNumber;\
      els.memberNumberEl.textContent = zeroPad(state.reservedNumber);\
      els.purchasedNumberEl && (els.purchasedNumberEl.textContent = zeroPad(state.reservedNumber));\
      closeAuth();\
      import('./navigation.js').then((\{goSuccess\})=> goSuccess());\
    \}\
  \});\
\
  // Cancelar / Renovar\
  els.cancelSubBtn.addEventListener('click', ()=>\{ els.confirmCancel.classList.add('active'); \});\
  els.confirmCancelClose.addEventListener('click', ()=> els.confirmCancel.classList.remove('active'));\
  els.confirmNo.addEventListener('click', ()=> els.confirmCancel.classList.remove('active'));\
  els.confirmYes.addEventListener('click', ()=>\{\
    if(state.reservedNumber!=null)\{\
      const meta = loadMeta();\
      const cur = meta[state.reservedNumber] || \{ nextRenewal: Date.now()+MS_28D \};\
      meta[state.reservedNumber] = \{ ...cur, status:'cancelled', cancelledAt: Date.now(), nextRenewal: Math.max(cur.nextRenewal||0, Date.now()) \};\
      saveMeta(meta);\
      const d = new Date(meta[state.reservedNumber].nextRenewal);\
      els.releaseDateEl.textContent = d.toLocaleString();\
      els.postCancelInfo.style.display = 'block';\
      els.cancelSubBtn.disabled = true;\
    \}\
    els.confirmCancel.classList.remove('active');\
  \});\
  els.renewSubBtn.addEventListener('click', ()=>\{\
    if(state.reservedNumber!=null)\{\
      const meta = loadMeta();\
      meta[state.reservedNumber] = \{ status:'active', purchasedAt: Date.now(), nextRenewal: Date.now()+MS_28D \};\
      saveMeta(meta);\
      els.postCancelInfo.style.display = 'none';\
      els.cancelSubBtn.disabled = false;\
    \}\
  \});\
\}\
}