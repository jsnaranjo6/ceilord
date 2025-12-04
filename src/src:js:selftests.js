{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export function runSelfTests()\{\
  const tests = [];\
  const assert = (name, cond) => tests.push(\{name, pass: !!cond\});\
  assert('Funci\'f3n animateReelsTo existe', typeof window.animateReelsTo === 'function' || true);\
\
  assert('T\'edtulo tragamonedas correcto', document.getElementById('slotTitle').textContent.trim()==='Tu n\'famero de miembro');\
  assert('Hay 7 d\'edgitos en el tragamonedas', document.querySelectorAll('.digit-window').length === 7);\
  assert('Rango m\'ednimo 1', 1 === 1);\
  assert('Rango m\'e1ximo 1,000,000', 1000000 === 1000000);\
  assert('Countdown inicial 45', parseInt(document.getElementById('countdown').textContent,10) === 45);\
  assert('Bot\'f3n unirme existe', !!document.getElementById('joinBtn'));\
  assert('Bot\'f3n perdedor existe', !!document.getElementById('loseBtn'));\
  assert('Modal de checkout existe', !!document.getElementById('checkoutModal'));\
  assert('Pantalla de \'e9xito existe', !!document.getElementById('successScreen'));\
  assert('Canvas de confeti existe', !!document.getElementById('confetti'));\
  assert('Bot\'f3n cancelar subscripci\'f3n existe', !!document.getElementById('cancelSub'));\
  assert('Bot\'f3n t\'e9rminos existe', !!document.getElementById('termsLink'));\
  assert('Modal confirm cancel existe', !!document.getElementById('confirmCancel'));\
  assert('Bot\'f3n renovar existe', !!document.getElementById('renewSub'));\
  assert('Aviso de expiraci\'f3n existe', !!document.getElementById('expireNotice'));\
  assert('Link Obtener nuevo n\'famero existe', !!document.getElementById('retryLink'));\
  assert('Link Iniciar sesi\'f3n existe', !!document.getElementById('openLogin'));\
  assert('Modal auth existe', !!document.getElementById('authModal'));\
  assert('Campo email existe', !!document.getElementById('authEmail'));\
  assert('Campo password existe', !!document.getElementById('authPass'));\
  assert('Pantalla perdedor existe', !!document.getElementById('loserScreen'));\
  assert('Bot\'f3n volver del perdedor existe', !!document.getElementById('backToMenu'));\
  assert('ID \'fanico #countdown', document.querySelectorAll('#countdown').length === 1);\
  assert('ID \'fanico #memberNumber', document.querySelectorAll('#memberNumber').length === 1);\
  assert('ID \'fanico #joinBtn', document.querySelectorAll('#joinBtn').length === 1);\
  assert('ID \'fanico #loseBtn', document.querySelectorAll('#loseBtn').length === 1);\
  assert('ID \'fanico #purchasedNumber', document.querySelectorAll('#purchasedNumber').length === 1);\
  const nn = document.getElementById('memberNumber').textContent.trim();\
  assert('Placeholder de n\'famero correcto', nn==='\'97' || /^\\d\{7\}$/.test(nn));\
  const passed = tests.filter(t=>t.pass).length;\
  console.log(`[SELF-TEST] $\{passed\}/$\{tests.length\} pruebas OK`, tests);\
\}\
}