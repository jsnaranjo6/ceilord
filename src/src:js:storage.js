{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ LS_KEY, LS_USERS, LS_META, MIN_NUMBER, MAX_NUMBER, MS_28D \} from './constants.js';\
\
export function loadPurchased()\{\
  try\{\
    const arr = JSON.parse(localStorage.getItem(LS_KEY)||'[]');\
    return new Set(arr.filter(n=>Number.isInteger(n)&&n>=MIN_NUMBER&&n<=MAX_NUMBER));\
  \}catch(e)\{ return new Set(); \}\
\}\
export function loadUsers()\{ try\{ return JSON.parse(localStorage.getItem(LS_USERS)||'\{\}'); \}catch(e)\{ return \{\}; \} \}\
export function saveUsers(users)\{ localStorage.setItem(LS_USERS, JSON.stringify(users)); \}\
export function savePurchased(set)\{ localStorage.setItem(LS_KEY, JSON.stringify(Array.from(set))); \}\
export function loadMeta()\{ try\{ return JSON.parse(localStorage.getItem(LS_META)||'\{\}'); \} catch(e)\{ return \{\}; \} \}\
export function saveMeta(meta)\{ localStorage.setItem(LS_META, JSON.stringify(meta)); \}\
\
export function markPurchased(n)\{\
  const set = loadPurchased(); set.add(n); savePurchased(set);\
  const meta = loadMeta(); meta[n] = \{ status:'active', purchasedAt: Date.now(), nextRenewal: Date.now()+MS_28D \}; saveMeta(meta);\
\}\
\
export function isPurchased(n)\{\
  const meta = loadMeta();\
  if(meta[n])\{\
    if(meta[n].status==='active') return true;\
    if(meta[n].status==='cancelled') return Date.now() < (meta[n].nextRenewal||0);\
  \}\
  return loadPurchased().has(n);\
\}\
}