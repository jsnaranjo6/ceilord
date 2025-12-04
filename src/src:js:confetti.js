{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ els \} from './dom.js';\
\
export function startConfetti(durationMs=3500)\{\
  const ctx = els.confettiCanvas.getContext('2d');\
  let W = els.confettiCanvas.width = window.innerWidth;\
  let H = els.confettiCanvas.height = window.innerHeight;\
  const colors = ['#ff4d4f','#ffec3d','#40a9ff','#73d13d','#9254de','#fa8c16'];\
  const N = Math.min(220, Math.floor(W/8));\
  const parts = Array.from(\{length:N\},()=>(\{\
    x: Math.random()*W,\
    y: -20 - Math.random()*H,\
    r: 4+Math.random()*6,\
    c: colors[(Math.random()*colors.length)|0],\
    s: 2+Math.random()*3,\
    a: Math.random()*Math.PI\
  \}));\
  let start = performance.now();\
\
  function handleResize()\{\
    W = els.confettiCanvas.width = window.innerWidth;\
    H = els.confettiCanvas.height = window.innerHeight;\
  \}\
  const onResize = ()=> handleResize();\
  window.addEventListener('resize', onResize);\
\
  function frame(now)\{\
    const t = now - start;\
    ctx.clearRect(0,0,W,H);\
    parts.forEach(p=>\{\
      p.y += p.s; p.x += Math.sin((p.y+p.a)*0.02)*0.8;\
      ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();\
    \});\
    if(t < durationMs)\{ requestAnimationFrame(frame); \}\
    else \{ ctx.clearRect(0,0,W,H); window.removeEventListener('resize', onResize); \}\
  \}\
  requestAnimationFrame(frame);\
\}\
}