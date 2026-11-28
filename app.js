'use strict';
if (window.top !== window.self) document.documentElement.style.display = 'none';

const SB_URL = 'https://byoicngamgtcfrqsechh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5b2ljbmdhbWd0Y2ZycXNlY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU3MjcyNzgsImV4cCI6MjExMTMwMzI3OH0.5J0_fyjcWeik2xtro5or8P7KFeqlTljIek-73UFhQT8';
const STORE = SB_URL + '/storage/v1/object/public/chat/';
const sb = supabase.createClient(SB_URL, SB_KEY);
const MAX_FILE = 10 * 1024 * 1024;
const OK_TYPES = /^(image\/(png|jpe?g|gif|webp)|video\/(mp4|webm)|audio\/(mpeg|ogg)|application\/(pdf|zip)|text\/plain)$/;
const ADJ = ['Swift','Quiet','Brave','Sleepy','Cosmic','Fuzzy','Lucky','Mellow','Spicy','Witty','Gentle','Rapid','Sunny','Shadow','Neon','Jolly','Crimson','Silent','Wild','Frosty'];
const ANI = ['Otter','Falcon','Panda','Koala','Fox','Lynx','Raven','Gecko','Moose','Heron','Badger','Newt','Tiger','Whale','Owl','Yak','Hare','Crab','Wolf','Finch'];

const EMOJI_DATA = [
['Smileys','😀','😀 grinning;😃 smile;😄 happy;😁 beaming;😆 laughing;😅 sweat smile;🤣 rofl;😂 joy;🙂 slight smile;😉 wink;😊 blush;😇 angel;🥰 love;😍 heart eyes;🤩 star struck;😘 kiss;😋 yum;😛 tongue;😜 wink tongue;🤪 zany;🤔 thinking;🤨 raised eyebrow;😐 neutral;😑 expressionless;😶 no mouth;🙄 eye roll;😏 smirk;😮 open mouth;🤐 zipper mouth;😯 hushed;😴 sleeping;😌 relieved;😔 pensive;😪 sleepy;🤤 drool;😷 mask;🤒 sick;🤕 hurt;🤢 nauseated;🤮 vomit;🥵 hot;🥶 cold;🥴 woozy;😵 dizzy;🤯 mind blown;🤠 cowboy;🥳 party;😎 cool;🤓 nerd;🧐 monocle;😕 confused;😟 worried;🙁 frown;😲 astonished;😳 flushed;🥺 pleading;😨 fearful;😰 anxious;😢 cry;😭 sob;😱 scream;😖 confounded;😞 disappointed;😩 weary;😫 tired;🥱 yawn;😤 triumph;😡 angry;😠 mad;🤬 cursing;😈 devil;💀 skull;☠️ skull crossbones;💩 poop;🤡 clown;👻 ghost;👽 alien;🤖 robot;🫠 melting;🫡 salute;🥲 smile tear;🫶 heart hands;😬 grimace;🤗 hug;🤭 giggle;🤫 shush'],
['People','👍','👍 thumbs up;👎 thumbs down;👌 ok;✌️ peace;🤞 crossed fingers;🤟 love you;🤘 rock on;🤙 call me;👈 point left;👉 point right;👆 point up;👇 point down;✋ raised hand;👋 wave;🤝 handshake;🙏 pray thanks;👏 clap;🙌 raised hands;💪 muscle;👀 eyes;🧠 brain;👅 tongue;👶 baby;🧑 person;👨 man;👩 woman;🧙 mage;🧛 vampire;🧟 zombie;🫂 hug people;💃 dancer;🕺 man dancing;🏃 running;🚶 walking;🙋 raising hand;🤷 shrug;🤦 facepalm;🙇 bow'],
['Nature','🐶','🐶 dog;🐱 cat;🐭 mouse;🐹 hamster;🐰 rabbit;🦊 fox;🐻 bear;🐼 panda;🐨 koala;🐯 tiger;🦁 lion;🐮 cow;🐷 pig;🐸 frog;🐵 monkey;🐔 chicken;🐧 penguin;🐦 bird;🦉 owl;🦄 unicorn;🐝 bee;🦋 butterfly;🐢 turtle;🐍 snake;🐙 octopus;🐬 dolphin;🐳 whale;🦈 shark;🌵 cactus;🌲 tree;🌴 palm;🌸 blossom;🌹 rose;🌻 sunflower;🍀 clover;🍁 maple leaf;🌈 rainbow;☀️ sun;🌙 moon;⭐ star;🌟 glowing star;⚡ lightning;🔥 fire;💧 droplet;❄️ snowflake;🌊 wave'],
['Food','🍕','🍎 apple;🍌 banana;🍉 watermelon;🍇 grapes;🍓 strawberry;🍒 cherries;🍑 peach;🥑 avocado;🍕 pizza;🍔 burger;🍟 fries;🌭 hot dog;🌮 taco;🌯 burrito;🍿 popcorn;🍩 donut;🍪 cookie;🎂 birthday cake;🍰 cake;🍫 chocolate;🍬 candy;🍦 ice cream;☕ coffee;🍵 tea;🍺 beer;🍻 cheers;🍷 wine;🥤 cup straw;🧋 boba'],
['Activities','🎮','⚽ soccer;🏀 basketball;🏈 football;⚾ baseball;🎾 tennis;🏐 volleyball;🎱 pool;🏓 ping pong;🎮 video game;🕹️ joystick;🎲 dice;🎯 dart bullseye;🎳 bowling;🎵 music note;🎤 microphone;🎧 headphones;🎸 guitar;🎹 piano;🥁 drum;🎬 clapper;🎨 art palette;🏆 trophy;🥇 gold medal;🎉 party popper;🎊 confetti;🎁 gift;🎈 balloon'],
['Travel','🚀','🚗 car;🚕 taxi;🚌 bus;🚓 police car;🚀 rocket;✈️ airplane;🚁 helicopter;🚂 train;🚲 bike;🏠 house;🏢 office;🏰 castle;🗼 tower;🌍 earth;🗺️ map;🏝️ island;⛰️ mountain;🌋 volcano'],
['Objects','💡','📱 phone;💻 laptop;⌨️ keyboard;🖥️ desktop;🖱️ mouse;📷 camera;📺 tv;💡 light bulb idea;🔋 battery;🔌 plug;💰 money bag;💵 dollar;💳 credit card;💎 gem;🔧 wrench;🔨 hammer;🛠️ tools;⚙️ gear;🔒 lock;🔑 key;📌 pushpin;📎 paperclip;✏️ pencil;📝 memo;📚 books;📅 calendar;🔔 bell;📢 loudspeaker;💬 speech bubble;💭 thought bubble;🗑️ trash'],
['Symbols','❤️','❤️ red heart;🧡 orange heart;💛 yellow heart;💚 green heart;💙 blue heart;💜 purple heart;🖤 black heart;🤍 white heart;💔 broken heart;💕 two hearts;💯 hundred;💢 anger;💥 boom;💫 dizzy star;💦 sweat drops;💤 zzz;✅ check;❌ cross;❓ question;❗ exclamation;‼️ double exclamation;⚠️ warning;🚫 prohibited;➕ plus;➖ minus;✔️ check mark;🔴 red circle;🟢 green circle;🔵 blue circle;🟡 yellow circle;⚪ white circle;⚫ black circle;🆗 ok button;🆒 cool button;🆕 new;🔝 top'],
];
const EMO = EMOJI_DATA.map(([name, icon, s]) => ({name, icon, list: s.split(';').map(x => { const i = x.indexOf(' '); return {e: x.slice(0, i), n: x.slice(i + 1)}; })}));
const ALL_EMO = EMO.flatMap(c => c.list);
const emojiName = e => (ALL_EMO.find(x => x.e === e) || {n: ''}).n;
const ALIASES = {heart: '❤️', thumbsup: '👍', '+1': '👍', thumbsdown: '👎', '-1': '👎', tada: '🎉', lol: '😂', pray: '🙏', '100': '💯', sad: '😢', angry: '😠', sunglasses: '😎'};
function emojiByCode(c) { c = c.toLowerCase(); if (ALIASES[c]) return ALIASES[c]; const x = ALL_EMO.find(x => x.n.replace(/ /g, '_') === c); return x ? x.e : null; }
function emojiMatches(q) {
  q = q.toLowerCase(); const out = [], seen = new Set();
  const add = (e, code, r) => { if (!seen.has(e)) { seen.add(e); out.push({e, code, r}); } };
  for (const x of ALL_EMO) { const code = x.n.replace(/ /g, '_'); if (code.startsWith(q)) add(x.e, code, 0); }
  for (const [a, e] of Object.entries(ALIASES)) if (a.startsWith(q)) add(e, a, 0);
  for (const x of ALL_EMO) if (x.n.split(' ').some(w => w.startsWith(q))) add(x.e, x.n.replace(/ /g, '_'), 1);
  return out.sort((a, b) => a.r - b.r).slice(0, 8);
}
const shortcodes = t => t.replace(/:([a-z0-9_+-]{2,}):/gi, (m, c) => emojiByCode(c) || m);

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const fmtTime = t => new Date(t).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const colorFor = id => `hsl(${hash(id) % 360} 70% 72%)`;
const PALETTE = ['#ff7a7a','#ffa94d','#ffd43b','#a9e34b','#51cf66','#38d9a9','#3bc9db','#4dabf7','#748ffc','#9775fa','#da77f2','#f783ac','#ff8787','#63e6be','#74c0fc','#b197fc'];
const nameColor = p => (p && p.name_color) || colorFor(p && p.id);
const byPos = (a, b) => (a.position - b.position) || (a.id - b.id);
const slug = s => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
const safeUrl = u => (typeof u === 'string' && u.startsWith(STORE)) ? u : '';
const publicUrl = path => sb.storage.from('chat').getPublicUrl(path).data.publicUrl;
const extOf = n => (String(n).split('.').pop() || 'bin').replace(/[^A-Za-z0-9]/g, '').slice(0, 8) || 'bin';
const pathFromUrl = url => { const u = safeUrl(url); return u ? decodeURIComponent(u.slice(STORE.length)) : null; };
const ic = (n, c = '') => `<i class="ic i-${n} ${c}"></i>`;
const SV = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  reply: '<path d="M9 14 4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};
const svg = (n, c = '') => `<svg class="sv ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SV[n]}</svg>`;
$('favBtn').innerHTML = svg('star');

/* ---------- local avatars (no external requests, always render) ---------- */
const avCache = new Map();
function genAvatar(seed) {
  seed = String(seed || 'x');
  if (avCache.has(seed)) return avCache.get(seed);
  const h = hash(seed), hue = h % 360, hue2 = (hue + 50 + ((h >> 8) % 90)) % 360;
  const eyes = ['<circle cx="38" cy="52" r="6"/><circle cx="62" cy="52" r="6"/>', '<rect x="32" y="46" width="13" height="12" rx="3"/><rect x="55" y="46" width="13" height="12" rx="3"/>', '<path d="M32 54h12M56 54h12" stroke="#23272a" stroke-width="5" stroke-linecap="round"/>', '<circle cx="38" cy="52" r="8"/><circle cx="62" cy="52" r="4"/>'][(h >> 4) % 4];
  const mouth = ['<path d="M38 68q12 9 24 0" stroke="#23272a" stroke-width="4" fill="none" stroke-linecap="round"/>', '<rect x="38" y="65" width="24" height="7" rx="3"/>', '<path d="M40 70h20" stroke="#23272a" stroke-width="4" stroke-linecap="round"/>', '<circle cx="50" cy="69" r="5"/>'][(h >> 6) % 4];
  const ant = ['<path d="M50 30V16" stroke="#fff" stroke-width="4"/><circle cx="50" cy="13" r="5" fill="#fff"/>', '<path d="M38 30l-6-12M62 30l6-12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>', ''][(h >> 10) % 3];
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 60% 52%)"/><stop offset="1" stop-color="hsl(${hue2} 60% 38%)"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/>${ant}<rect x="20" y="30" width="60" height="52" rx="16" fill="#fff" fill-opacity=".93"/><g fill="#23272a">${eyes}${mouth}</g></svg>`;
  const uri = 'data:image/svg+xml,' + encodeURIComponent(s);
  avCache.set(seed, uri); return uri;
}
function avatarSrc(p) {
  const u = (p && p.avatar_url) || '';
  if (u.startsWith('seed:')) return genAvatar(u.slice(5));
  const m = u.match(/seed=([^&]+)/);
  if (u.startsWith('https://api.dicebear.com') && m) return genAvatar(decodeURIComponent(m[1]));
  if (safeUrl(u)) return u;
  return genAvatar((p && p.username) || 'x');
}
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && t.classList.contains('av') && !t.dataset.fb) { t.dataset.fb = '1'; t.src = genAvatar(t.alt); }
}, true);
const avImg = (p, c = '') => `<img class="av ${c}" src="${esc(avatarSrc(p))}" alt="${esc(p.username)}" decoding="async">`;

const state = {
  me: null, ownerId: null, realOwner: false, isOwner: false, ownerMode: localStorage.getItem('anonchat_mode') !== 'user',
  profiles: new Map(), byName: new Map(), categories: new Map(), channels: new Map(),
  messages: new Map(), reactions: new Map(), votes: new Map(), pins: [], invites: [],
  settings: {show_owner_tag: true, wipe_minutes: 5, owner_user_mode: false, next_wipe_at: null},
  channel: 'general', unread: {}, mentions: {}, mentionCount: 0,
  collapsed: new Set(JSON.parse(localStorage.getItem('anonchat_collapsed') || '[]')),
  favs: [], online: new Set(), pending: null, replyTo: null, lastKey: null,
};

/* ---------- helpers ---------- */
let toastT;
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
const prof = id => state.profiles.get(id) || {id, username: 'Unknown', avatar_url: ''};
const rebuildNames = () => { state.byName = new Map(); state.profiles.forEach(p => state.byName.set(p.username.toLowerCase(), p)); };
async function ensureProfile(id) {
  if (state.profiles.has(id)) return;
  const {data} = await sb.from('profiles').select('*').eq('id', id).maybeSingle();
  if (data) { state.profiles.set(id, data); rebuildNames(); renderMembers(); }
}
function mentionsMe(text) {
  if (!text || !state.me) return false;
  return new RegExp('@' + prof(state.me.id).username + '(?![A-Za-z0-9_])', 'i').test(text);
}
function formatContent(text) {
  const ph = [], stash = h => '\uE000' + (ph.push(h) - 1) + '\uE001';
  text = String(text ?? '');
  text = text.replace(/```(?:[a-z0-9+#-]*\n)?([\s\S]*?)```/gi, (m, c) => stash(`<pre class="md-pre"><code>${esc(c.replace(/\n$/, ''))}</code></pre>`));
  text = text.replace(/`([^`\n]+)`/g, (m, c) => stash(`<code class="md-code">${esc(c)}</code>`));
  text = text.replace(/\\([\\*_~|`>#-])/g, (m, c) => stash(esc(c)));
  text = text.replace(/https?:\/\/[^\s<\uE000]+/g, u => stash(`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u)}</a>`));
  const mentionize = h => h.replace(/(^|[\s>(])@([A-Za-z0-9_]{2,24})(?![A-Za-z0-9_])/g, (full, pre, name) => {
    const p = state.byName.get(name.toLowerCase());
    return p ? `${pre}<span class="mt${p.id === state.me.id ? ' self' : ''}">@${esc(p.username)}</span>` : full;
  });
  const inline = t => mentionize(esc(t)
    .replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/__(.+?)__/g, '<u>$1</u>')
    .replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\*)/g, '$1<i>$2</i>')
    .replace(/(^|[^_\w])_(?!\s)(.+?)_(?![_\w])/g, '$1<i>$2</i>')
    .replace(/~~(.+?)~~/g, '<s>$1</s>')
    .replace(/\|\|(.+?)\|\|/g, '<span class="md-spoiler" data-act="spoiler">$1</span>'));
  const lines = text.split('\n'), out = [];
  let i = 0;
  const push = (h, b) => out.push({h, b});
  while (i < lines.length) {
    const l = lines[i]; let m;
    if ((m = /^(#{1,3}) +(.+)$/.exec(l))) { push(`<div class="md-h md-h${m[1].length}">${inline(m[2])}</div>`, 1); i++; }
    else if ((m = /^-# +(.+)$/.exec(l))) { push(`<div class="md-sub">${inline(m[1])}</div>`, 1); i++; }
    else if (l.startsWith('>>> ')) { push(`<div class="md-quote">${[l.slice(4), ...lines.slice(i + 1)].map(inline).join('<br>')}</div>`, 1); i = lines.length; }
    else if (l.startsWith('> ')) { const q = []; while (i < lines.length && lines[i].startsWith('> ')) { q.push(lines[i].slice(2)); i++; } push(`<div class="md-quote">${q.map(inline).join('<br>')}</div>`, 1); }
    else if (/^[*-] +\S/.test(l)) { const it = []; while (i < lines.length && /^[*-] +\S/.test(lines[i])) { it.push(lines[i].replace(/^[*-] +/, '')); i++; } push(`<ul class="md-ul">${it.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`, 1); }
    else if (/^\d+\. +\S/.test(l)) { const it = []; while (i < lines.length && /^\d+\. +\S/.test(lines[i])) { it.push(lines[i].replace(/^\d+\. +/, '')); i++; } push(`<ol class="md-ul">${it.map(x => `<li>${inline(x)}</li>`).join('')}</ol>`, 1); }
    else { push(inline(l), 0); i++; }
  }
  let html = out.map((o, k) => (k && !o.b && !out[k - 1].b ? '<br>' : '') + o.h).join(''), prev;
  do { prev = html; html = html.replace(/\uE000(\d+)\uE001/g, (m, n) => ph[+n]); } while (html !== prev);
  return html;
}
const curChannel = () => [...state.channels.values()].find(c => c.name === state.channel);
const ownerTag = uid => (uid === state.ownerId && state.settings.show_owner_tag && !state.settings.owner_user_mode) ? `<span class="tag">${ic('crown')}OWNER</span>` : '';
const isPinned = id => state.pins.some(p => p.message_id === id);
const copyText = t => { navigator.clipboard?.writeText(t); toast('Copied'); };
function armButton(btn, label, run) {
  let armed = false, t;
  btn.onclick = () => {
    if (!armed) { armed = true; btn.textContent = 'Click again to confirm'; t = setTimeout(() => { armed = false; btn.textContent = label; }, 3500); return; }
    clearTimeout(t); run();
  };
}

/* ---------- overlay manager: one frame at a time ---------- */
const PANELS = ['pinsPanel', 'favPanel', 'picker', 'ctx'];
let modalLock = false;
function closeOverlays(except) {
  const ex = Array.isArray(except) ? except : [except];
  PANELS.forEach(id => { if (!ex.includes(id)) $(id).classList.remove('open'); });
  if (!ex.includes('modal')) closeModal();
  if (!ex.includes('lightbox')) $('lightbox').classList.remove('open');
  if (!ex.includes('drawer')) $('app').classList.remove('show-side', 'show-members');
  hideTip();
}
function togglePanel(id) {
  const el = $(id), was = el.classList.contains('open');
  closeOverlays(was ? 'none' : id);
  el.classList.toggle('open', !was);
}
function toggleDrawer(which) {
  const app = $('app'), cls = 'show-' + which, was = app.classList.contains(cls);
  closeOverlays('none');
  if (!was) app.classList.add(cls);
}
function showModal(html, opts = {}) {
  closeOverlays('modal');
  modalLock = !!opts.lock;
  const mb = $('modalBody'); mb.className = opts.wide ? 'wide' : '';
  mb.innerHTML = (opts.lock ? '' : `<button class="iconbtn mx" id="mClose">${ic('x')}</button>`) + html;
  if (!opts.lock) $('mClose').onclick = () => closeModal();
  $('overlay').classList.add('open');
}
function closeModal(force) { if (modalLock && !force) return; modalLock = false; $('overlay').classList.remove('open'); }
$('overlay').addEventListener('mousedown', e => { if (e.target.id === 'overlay') closeModal(); });
$('lightbox').onclick = () => $('lightbox').classList.remove('open');
$('scrim').onclick = () => $('app').classList.remove('show-side', 'show-members');
document.addEventListener('mousedown', e => {
  if (e.target.closest('.pop,[data-keep]')) return;
  PANELS.forEach(id => $(id).classList.remove('open'));
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if ($('lightbox').classList.contains('open')) return $('lightbox').classList.remove('open');
  if (PANELS.some(id => $(id).classList.contains('open'))) return PANELS.forEach(id => $(id).classList.remove('open'));
  if ($('overlay').classList.contains('open')) return closeModal();
  $('app').classList.remove('show-side', 'show-members');
});

/* tooltips */
let tipT;
function hideTip() { clearTimeout(tipT); $('tip').classList.remove('show'); }
function showTip(el) {
  const tp = $('tip'); tp.textContent = el.dataset.tip; tp.classList.add('show');
  const r = el.getBoundingClientRect(), w = tp.offsetWidth;
  tp.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
  tp.style.top = (r.top < 70 ? r.bottom + 8 : r.top - tp.offsetHeight - 8) + 'px';
}
document.addEventListener('mouseover', e => {
  const t = e.target.closest('[data-tip]'); if (!t) return;
  clearTimeout(tipT); tipT = setTimeout(() => showTip(t), +(t.dataset.tipd || 500));
});
document.addEventListener('mouseout', e => { if (e.target.closest('[data-tip]')) hideTip(); });
document.addEventListener('mousedown', hideTip);

/* custom context menu / dropdown / plus menu */
let ctxItems = [];
function showCtx(x, y, items, opts = {}) {
  closeOverlays(opts.inModal ? ['ctx', 'modal'] : opts.keepPicker ? ['ctx', 'picker'] : 'ctx');
  ctxItems = items;
  const el = $('ctx'); el.classList.toggle('sel', !!opts.select);
  el.innerHTML = items.map((it, i) => it === 'sep' ? '<div class="cs"></div>' :
    `<button class="ci ${it.danger ? 'dg' : ''} ${it.cls || ''}" data-i="${i}" ${it.disabled ? 'disabled' : ''}>${it.icon ? ic(it.icon) : it.svg ? svg(it.svg) : '<span class="ico"></span>'}<span>${esc(it.label)}</span>${it.checked ? ic('check', 'sm') : ''}${it.hint ? `<em>${esc(it.hint)}</em>` : ''}</button>`).join('');
  el.style.minWidth = (opts.minWidth || 190) + 'px'; el.style.left = '0px'; el.style.top = '0px';
  const r = el.getBoundingClientRect();
  const nx = Math.max(8, Math.min(x, innerWidth - r.width - 8));
  const ny = Math.max(8, opts.up ? y - r.height - 8 : Math.min(y, innerHeight - r.height - 8));
  el.style.left = nx + 'px'; el.style.top = ny + 'px';
  el.style.transformOrigin = opts.up ? 'bottom left' : 'top left';
  requestAnimationFrame(() => el.classList.add('open'));
}
$('ctx').addEventListener('click', e => {
  const b = e.target.closest('[data-i]'); if (!b) return;
  const it = ctxItems[+b.dataset.i];
  $('ctx').classList.remove('open');
  if (it && it.onClick) it.onClick(e.shiftKey);
});
function dropdown(id, options, value, onChange) {
  const el = $(id); let cur = value;
  const label = () => (options.find(o => String(o.v) === String(cur)) || {l: 'Select'}).l;
  el.className = 'ddb'; el.setAttribute('data-keep', '');
  el.innerHTML = `<span>${esc(label())}</span>${ic('chev')}`;
  el.onclick = () => {
    const r = el.getBoundingClientRect();
    showCtx(r.left, r.bottom + 4, options.map(o => ({label: o.l, checked: String(o.v) === String(cur), onClick: () => { cur = o.v; el.firstElementChild.textContent = o.l; if (onChange) onChange(o.v); }})), {minWidth: r.width, inModal: true, select: true});
  };
  return {get: () => cur};
}

/* ---------- auth ---------- */
const authErr = m => { $('authErr').textContent = m || ''; };
function showAuth() { $('auth').hidden = false; $('app').hidden = true; }
function setTab(signup) {
  $('tabs').classList.toggle('s', signup);
  $('tabLogin').classList.toggle('on', !signup); $('tabSignup').classList.toggle('on', signup);
  $('fLogin').hidden = signup; $('fSignup').hidden = !signup;
  $('authSub').textContent = signup ? 'Create an account with an invite key' : 'Welcome back';
  authErr('');
}
$('tabLogin').onclick = () => setTab(false);
$('tabSignup').onclick = () => setTab(true);
$('fLogin').onsubmit = async e => {
  e.preventDefault(); authErr(''); $('liBtn').disabled = true;
  const {data, error} = await sb.auth.signInWithPassword({email: $('liEmail').value.trim(), password: $('liPw').value});
  $('liBtn').disabled = false;
  if (error) return authErr(/invalid/i.test(error.message) ? 'Incorrect email or password.' : 'Could not log in. Try again in a moment.');
  start(data.user);
};
$('fSignup').onsubmit = async e => {
  e.preventDefault(); authErr('');
  const email = $('suEmail').value.trim(), pw = $('suPw').value;
  if (pw.length < 10) return authErr('Password must be at least 10 characters.');
  if (pw !== $('suPw2').value) return authErr('Passwords do not match.');
  $('suBtn').disabled = true;
  try {
    const r = await fetch(SB_URL + '/functions/v1/signup', {method: 'POST', headers: {'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY}, body: JSON.stringify({key: $('suKey').value.trim(), email, password: pw})});
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) throw new Error(j.error || 'Could not create account.');
    const {data, error} = await sb.auth.signInWithPassword({email, password: pw});
    if (error) throw error;
    localStorage.setItem('anonchat_notice', data.user.id);
    showNotice(data.user);
  } catch (err) { authErr(err.message); }
  $('suBtn').disabled = false;
};
function showNotice(user) {
  showModal(`<h2>${ic('timer')} Before you start</h2>
    <p>Chat history is wiped on a timer. Messages, reactions, polls and uploaded files all disappear when it hits zero. The timer is at the top of the chat.</p>
    <p>Use the star on a photo to save it, so you can still resend it later.</p>
    <button class="btn" id="ackBtn" disabled>Got it (10)</button>`, {lock: true});
  let n = 10;
  const iv = setInterval(() => {
    n--; const b = $('ackBtn'); if (!b) return clearInterval(iv);
    if (n > 0) b.textContent = `Got it (${n})`; else { clearInterval(iv); b.textContent = 'Got it'; b.disabled = false; }
  }, 1000);
  $('ackBtn').onclick = () => { localStorage.removeItem('anonchat_notice'); closeModal(true); start(user); };
}
async function boot() {
  if (localStorage.getItem('anonchat_nomem')) $('app').classList.add('nomem');
  updateMemTip();
  if (localStorage.getItem('anonchat_closed')) { localStorage.removeItem('anonchat_closed'); showAuth(); return authErr('Your account was closed. Get a new invite key to sign up again.'); }
  const {data: {session}} = await sb.auth.getSession();
  if (!session) return showAuth();
  if (localStorage.getItem('anonchat_notice') === session.user.id) { $('auth').hidden = false; showNotice(session.user); } else start(session.user);
}
async function kickedOut() { localStorage.setItem('anonchat_closed', '1'); await sb.auth.signOut({scope: 'local'}); location.reload(); }

/* ---------- start / load ---------- */
let started = false;
async function start(user) {
  if (started) return; started = true;
  state.me = user;
  $('auth').hidden = true; $('app').hidden = false;
  const [pr, oid, cats, chs, st, pins] = await Promise.all([
    sb.from('profiles').select('*'), sb.rpc('owner_id'), sb.from('categories').select('*'), sb.from('channels').select('*'),
    sb.from('app_settings').select('*'), sb.from('pinned_messages').select('*').order('pinned_at', {ascending: false}).limit(200),
  ]);
  (pr.data || []).forEach(p => state.profiles.set(p.id, p));
  (cats.data || []).forEach(c => state.categories.set(c.id, c));
  (chs.data || []).forEach(c => state.channels.set(c.id, c));
  (st.data || []).forEach(r => { if (r.key !== 'last_wipe_at') state.settings[r.key] = r.value; });
  state.pins = pins.data || [];
  state.ownerMode = !state.settings.owner_user_mode;
  try { const t0 = Date.now(); const {data: sn} = await sb.rpc('server_now'); if (sn) state.skew = new Date(sn).getTime() - (t0 + Date.now()) / 2; } catch {}
  rebuildNames();
  state.ownerId = oid.data; state.realOwner = oid.data === user.id; state.isOwner = state.realOwner && state.ownerMode;
  if (!state.profiles.has(user.id)) return kickedOut();
  const first = [...state.channels.values()].sort(byPos)[0];
  if (first && !curChannel()) state.channel = first.name;
  await Promise.all([loadMessages(), loadFavs()]);
  renderAll(); subscribe();
  tick(); setInterval(tick, 1000);
  setInterval(syncProfiles, 30000); setInterval(syncChannels, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) markRead(state.channel); });
}
async function loadMessages() {
  const {data: ms} = await sb.from('messages').select('*').order('id', {ascending: false}).limit(400);
  state.messages = new Map(); state.reactions = new Map(); state.votes = new Map();
  (ms || []).forEach(m => state.messages.set(m.id, m));
  const ids = (ms || []).map(m => m.id), pollIds = (ms || []).filter(m => m.poll).map(m => m.id);
  const [rs, vs] = await Promise.all([
    ids.length ? sb.from('reactions').select('*').in('message_id', ids) : {data: []},
    pollIds.length ? sb.from('poll_votes').select('*').in('message_id', pollIds) : {data: []},
  ]);
  (rs.data || []).forEach(addReaction); (vs.data || []).forEach(addVote);
  for (const m of state.messages.values()) ensureProfile(m.user_id);
}
async function syncProfiles() {
  const {data, error} = await sb.from('profiles').select('*');
  if (error || !data) return;
  if (!data.some(p => p.id === state.me.id)) return kickedOut();
  state.profiles = new Map(data.map(p => [p.id, p])); rebuildNames(); renderMembers();
}
async function syncChannels() {
  const [cs, cg] = await Promise.all([sb.from('channels').select('*'), sb.from('categories').select('*')]);
  if (cs.error || !cs.data) return;
  const before = new Set([...state.channels.values()].map(c => c.name));
  state.channels = new Map(cs.data.map(c => [c.id, c]));
  if (cg.data) state.categories = new Map(cg.data.map(c => [c.id, c]));
  const names = new Set(cs.data.map(c => c.name));
  for (const [id, m] of state.messages) if (!names.has(m.channel)) state.messages.delete(id);
  const gained = cs.data.some(c => !before.has(c.name));
  if (!names.has(state.channel)) { const f = [...state.channels.values()].sort(byPos)[0]; if (f) selectChannel(f.name); }
  renderChannels(); renderTitle();
  if (gained) await loadMessages();
  renderMessages(); renderPins();
}
async function loadFavs() { const {data} = await sb.from('favorites').select('*').order('created_at', {ascending: false}); state.favs = data || []; }

/* ---------- realtime ---------- */
function subscribe() {
  const ch = sb.channel('db');
  [['messages', onMsg], ['reactions', onReact], ['poll_votes', onVote], ['profiles', onProf], ['channels', onChannel], ['categories', onCategory], ['invite_keys', onInvite], ['pinned_messages', onPin], ['app_settings', onSettings], ['channel_members', () => syncChannels()]]
    .forEach(([t, fn]) => ch.on('postgres_changes', {event: '*', schema: 'public', table: t}, fn));
  ch.subscribe();
  const pc = sb.channel('online', {config: {presence: {key: state.me.id}}});
  pc.on('presence', {event: 'sync'}, () => { state.online = new Set(Object.keys(pc.presenceState())); renderMembers(); })
    .subscribe(async s => { if (s === 'SUBSCRIBED') await pc.track({t: Date.now()}); });
}
async function onMsg(p) {
  if (p.eventType === 'INSERT') {
    const m = p.new; if (state.messages.has(m.id)) return;
    await ensureProfile(m.user_id);
    state.messages.set(m.id, m);
    if (m.user_id !== state.me.id && !isSys(m) && (m.channel !== state.channel || document.hidden)) {
      state.unread[m.channel] = (state.unread[m.channel] || 0) + 1;
      if (mentionsMe(m.content)) { state.mentions[m.channel] = (state.mentions[m.channel] || 0) + 1; recountMentions(); }
      renderChannels(); updateTitle();
    }
    if (m.channel === state.channel) renderMessages();
  } else if (p.eventType === 'UPDATE') {
    const old = state.messages.get(p.new.id); if (old) state.messages.set(p.new.id, {...old, ...p.new}); renderMessages();
  } else if (p.eventType === 'DELETE') { state.messages.delete(p.old.id); state.reactions.delete(p.old.id); state.votes.delete(p.old.id); renderMessages(); }
}
function addReaction(r) {
  const l = state.reactions.get(r.message_id) || [];
  if (!l.some(x => x.user_id === r.user_id && x.emoji === r.emoji)) l.push(r);
  state.reactions.set(r.message_id, l);
}
function onReact(p) {
  if (p.eventType === 'INSERT') addReaction(p.new);
  else if (p.eventType === 'DELETE') { const o = p.old, l = state.reactions.get(o.message_id); if (l) state.reactions.set(o.message_id, l.filter(x => !(x.user_id === o.user_id && x.emoji === o.emoji))); }
  renderMessages();
}
function addVote(v) {
  const l = state.votes.get(v.message_id) || [];
  if (!l.some(x => x.user_id === v.user_id && x.option_idx === v.option_idx)) l.push(v);
  state.votes.set(v.message_id, l);
}
function onVote(p) {
  if (p.eventType === 'INSERT') addVote(p.new);
  else if (p.eventType === 'DELETE') { const o = p.old, l = state.votes.get(o.message_id); if (l) state.votes.set(o.message_id, l.filter(x => !(x.user_id === o.user_id && x.option_idx === o.option_idx))); }
  renderMessages();
}
function onProf(p) {
  if (p.eventType === 'DELETE') {
    if (p.old.id === state.me.id) return kickedOut();
    state.profiles.delete(p.old.id); rebuildNames();
  } else if (p.new && p.new.id) { state.profiles.set(p.new.id, p.new); rebuildNames(); }
  renderMe(); renderMembers(); renderMessages(); renderPins(); renderInvites();
}
function onChannel(p) {
  if (p.eventType === 'DELETE') {
    const prev = state.channels.get(p.old.id); if (!prev) return;
    state.channels.delete(p.old.id);
    for (const [id, m] of state.messages) if (m.channel === prev.name) state.messages.delete(id);
    state.pins = state.pins.filter(x => x.channel_id !== p.old.id);
    if (state.channel === prev.name) { const f = [...state.channels.values()].sort(byPos)[0]; if (f) selectChannel(f.name); }
  } else {
    const prev = state.channels.get(p.new.id);
    if (prev && prev.name !== p.new.name) {
      for (const m of state.messages.values()) if (m.channel === prev.name) m.channel = p.new.name;
      if (state.unread[prev.name]) { state.unread[p.new.name] = state.unread[prev.name]; delete state.unread[prev.name]; }
      if (state.channel === prev.name) state.channel = p.new.name;
    }
    state.channels.set(p.new.id, p.new);
  }
  renderChannels(); renderTitle(); renderMessages(); renderPins();
}
function onCategory(p) {
  if (p.eventType === 'DELETE') { state.categories.delete(p.old.id); for (const c of state.channels.values()) if (c.category_id === p.old.id) c.category_id = null; }
  else state.categories.set(p.new.id, p.new);
  renderChannels();
}
function onInvite(p) {
  if (!state.realOwner) return;
  if (p.eventType === 'INSERT') { if (!state.invites.some(k => k.id === p.new.id)) state.invites.unshift(p.new); }
  else if (p.eventType === 'UPDATE') {
    const prev = state.invites.find(k => k.id === p.new.id);
    state.invites = state.invites.map(k => k.id === p.new.id ? p.new : k);
    if (p.new.used_at && !(prev && prev.used_at)) toast('An invite key was just used');
  } else if (p.eventType === 'DELETE') state.invites = state.invites.filter(k => k.id !== p.old.id);
  renderInvites();
}
function onPin(p) {
  if (p.eventType === 'INSERT') { if (!state.pins.some(x => x.id === p.new.id)) state.pins.unshift(p.new); }
  else if (p.eventType === 'DELETE') state.pins = state.pins.filter(x => x.id !== p.old.id);
  renderPins(); renderMessages();
}
function onSettings(p) {
  if (!p.new || p.new.key === 'last_wipe_at') return;
  state.settings[p.new.key] = p.new.value;
  if (p.new.key === 'owner_user_mode' && state.realOwner) { state.ownerMode = !p.new.value; applyMode(); }
  renderMembers(); renderMessages(); tick();
}

/* ---------- sidebar ---------- */
function renderAll() { renderChannels(); renderTitle(); renderMe(); renderMembers(); renderMessages('reset'); renderReply(); renderPending(); updateSend(); renderPins(); }
function chRow(c) {
  const u = state.unread[c.name] || 0;
  return `<div class="chrow"><button class="ch ${c.name === state.channel ? 'active' : ''} ${u ? 'unread' : ''}" data-ch="${esc(c.name)}">${c.is_private ? svg('lock') : ic('channel')}<span class="cn">${esc(c.name)}</span>${u ? `<span class="badge">${u}</span>` : ''}</button>
    ${state.isOwner ? `<button class="chedit" data-act="editch" data-id="${c.id}" data-tip="Channel Settings">${ic('settings')}</button>` : ''}</div>`;
}
function renderChannels() {
  const cats = [...state.categories.values()].sort(byPos), chs = [...state.channels.values()].sort(byPos);
  const loose = chs.filter(c => !c.category_id || !state.categories.has(c.category_id));
  let h = loose.map(chRow).join('');
  for (const cat of cats) {
    h += `<div class="cat ${state.collapsed.has(cat.id) ? 'col' : ''}" data-cat="${cat.id}">
      <div class="cathead"><button class="catbtn" data-act="togglecat" data-id="${cat.id}">${ic('chev')}<span>${esc(cat.name)}</span></button>
        ${state.isOwner ? `<span class="catact"><button data-act="addch" data-id="${cat.id}" data-tip="Create Channel">${ic('plus')}</button><button data-act="editcat" data-id="${cat.id}" data-tip="Edit Category">${ic('edit')}</button></span>` : ''}</div>
      <div class="catbody"><div class="catin">${chs.filter(c => c.category_id === cat.id).map(chRow).join('')}</div></div></div>`;
  }
  if (Object.values(state.unread).some(Boolean)) h += `<button class="markall" data-act="markall">${ic('check', 'sm')} Mark all as read</button>`;
  $('channels').innerHTML = h;
}
function renderTitle() { const c = curChannel(); $('chTitle').innerHTML = `${c && c.is_private ? svg('lock') : ic('channel')}<span>${esc(state.channel)}</span>`; $('input').placeholder = 'Message #' + state.channel; $('timer').hidden = !!c && c.auto_clear === false; }
function selectChannel(name) {
  if (name === state.channel && $('msgs').dataset.ch === name) return;
  state.channel = name; state.unread[name] = 0;
  delete state.mentions[name]; recountMentions();
  state.replyTo = null; renderReply();
  document.querySelectorAll('.ch').forEach(b => {
    b.classList.toggle('active', b.dataset.ch === name);
    if (b.dataset.ch === name) { b.classList.remove('unread'); const bd = b.querySelector('.badge'); if (bd) bd.remove(); }
  });
  renderTitle(); renderMessages('reset'); renderPins(); updateTitle(); closeOverlays('none');
}
function toggleCat(id) {
  const el = document.querySelector(`.cat[data-cat="${id}"]`); if (!el) return;
  el.classList.toggle('col');
  if (el.classList.contains('col')) state.collapsed.add(id); else state.collapsed.delete(id);
  localStorage.setItem('anonchat_collapsed', JSON.stringify([...state.collapsed]));
}
$('channels').addEventListener('click', e => {
  const t = e.target.closest('[data-ch],[data-act]'); if (!t) return;
  if (t.dataset.ch) return selectChannel(t.dataset.ch);
  const act = t.dataset.act, id = t.dataset.id ? +t.dataset.id : null;
  if (act === 'togglecat') toggleCat(id);
  else if (act === 'addch') openChannelModal(null, id);
  else if (act === 'editch') openChannelModal(id);
  else if (act === 'editcat') openCategoryModal(id);
  else if (act === 'markall') markAllRead();
});

async function openChannelModal(id, catId) {
  const ch = id ? state.channels.get(id) : null;
  let priv = ch ? !!ch.is_private : false, clear = ch ? ch.auto_clear !== false : true;
  const members = new Set();
  if (ch && ch.is_private) { const {data} = await sb.from('channel_members').select('user_id').eq('channel_id', ch.id); (data || []).forEach(r => members.add(r.user_id)); }
  showModal(`<h2>${ic('settings')} ${ch ? 'Channel Settings' : 'Create Channel'}</h2>
    <p class="sub2">${ch ? 'Rename it, move it, or change who can see it.' : 'Channels are where conversations happen. Use lowercase letters, numbers and dashes.'}</p>
    <label class="l">Channel name</label>
    <input class="field" id="chName" maxlength="32" placeholder="new-channel" value="${esc(ch ? ch.name : '')}" autocomplete="off">
    <label class="l">Category</label><button type="button" id="chCat"></button>
    <div class="setrow"><div class="tx"><b>Private channel</b><small>Only the people you pick can see it.</small></div><button class="sw ${priv ? 'on' : ''}" id="swPriv" type="button"></button></div>
    <div id="privBox" ${priv ? '' : 'hidden'}><input class="field" id="memSearch" placeholder="Search people" autocomplete="off"><div class="memlist" id="memList"></div></div>
    <div class="setrow"><div class="tx"><b>Clear chat automatically</b><small>Turn off to keep this channel's history.</small></div><button class="sw ${clear ? 'on' : ''}" id="swClear" type="button"></button></div>
    <div class="err" id="mErr"></div>
    <div class="row"><button class="btn" id="mSave">${ch ? 'Save Changes' : 'Create Channel'}</button>${ch ? '<button class="btn danger" id="mDel">Delete</button>' : ''}</div>`, {wide: true});
  const cats = [...state.categories.values()].sort(byPos);
  const dd = dropdown('chCat', [{v: '', l: 'No category'}, ...cats.map(c => ({v: c.id, l: c.name}))], (ch ? ch.category_id : catId) || '');
  const drawMembers = () => {
    const q = $('memSearch').value.trim().toLowerCase();
    $('memList').innerHTML = [...state.profiles.values()].filter(p => p.id !== state.ownerId && p.username.toLowerCase().includes(q))
      .map(p => `<button type="button" class="mrow" data-uid="${p.id}"><span class="cbx ${members.has(p.id) ? 'on' : ''}"></span>${avImg(p, 'sm')}<span style="color:${nameColor(p)}">${esc(p.username)}</span></button>`).join('') || '<div class="hint" style="margin:8px">No one to add yet.</div>';
  };
  drawMembers();
  $('memSearch').oninput = drawMembers;
  $('memList').onclick = e => { const r = e.target.closest('[data-uid]'); if (!r) return; if (members.has(r.dataset.uid)) members.delete(r.dataset.uid); else members.add(r.dataset.uid); drawMembers(); };
  $('swPriv').onclick = () => { priv = !priv; $('swPriv').classList.toggle('on', priv); $('privBox').hidden = !priv; };
  $('swClear').onclick = () => { clear = !clear; $('swClear').classList.toggle('on', clear); };
  $('chName').focus();
  const save = async () => {
    const name = slug($('chName').value);
    if (!name) return $('mErr').textContent = 'Enter a channel name using letters, numbers or dashes.';
    const category_id = dd.get() ? +dd.get() : null;
    $('mSave').disabled = true;
    const payload = {name, category_id, auto_clear: clear};
    const res = ch ? await sb.from('channels').update(payload).eq('id', ch.id).select()
      : await sb.from('channels').insert({...payload, position: Math.max(0, ...[...state.channels.values()].map(c => c.position)) + 1}).select();
    if (res.error) { $('mSave').disabled = false; return $('mErr').textContent = /duplicate|unique/i.test(res.error.message) ? 'A channel with that name already exists.' : 'Could not save the channel.'; }
    if (!res.data || !res.data.length) { $('mSave').disabled = false; return $('mErr').textContent = 'You do not have permission to do that.'; }
    const row = res.data[0];
    const acc = await sb.rpc('set_channel_access', {cid: row.id, priv, uids: [...members]});
    $('mSave').disabled = false;
    if (acc.error) return $('mErr').textContent = 'Saved, but access could not be updated.';
    row.is_private = priv;
    onChannel({eventType: ch ? 'UPDATE' : 'INSERT', new: row}); closeModal();
    if (!ch) selectChannel(row.name);
  };
  $('mSave').onclick = save; $('chName').onkeydown = e => { if (e.key === 'Enter') save(); };
  if (ch) armButton($('mDel'), 'Delete', async () => {
    if (state.channels.size <= 1) return $('mErr').textContent = 'You need to keep at least one channel.';
    const {error} = await sb.from('channels').delete().eq('id', ch.id);
    if (error) return $('mErr').textContent = 'Could not delete the channel.';
    onChannel({eventType: 'DELETE', old: {id: ch.id}}); closeModal();
  });
}
function openCategoryModal(id) {
  const cat = id ? state.categories.get(id) : null;
  showModal(`<h2>${ic('chev')} ${cat ? 'Edit Category' : 'Create Category'}</h2>
    <p class="sub2">${cat ? 'Deleting a category keeps its channels. They just move out of it.' : 'Categories group related channels together.'}</p>
    <label class="l">Category name</label>
    <input class="field" id="catName" maxlength="32" placeholder="New Category" value="${esc(cat ? cat.name : '')}" autocomplete="off">
    <div class="err" id="mErr"></div>
    <div class="row"><button class="btn" id="mSave">${cat ? 'Save Changes' : 'Create Category'}</button>${cat ? '<button class="btn danger" id="mDel">Delete</button>' : ''}</div>`);
  $('catName').focus();
  const save = async () => {
    const name = $('catName').value.trim().slice(0, 32);
    if (!name) return $('mErr').textContent = 'Enter a category name.';
    $('mSave').disabled = true;
    const res = cat ? await sb.from('categories').update({name}).eq('id', cat.id).select()
      : await sb.from('categories').insert({name, position: Math.max(0, ...[...state.categories.values()].map(c => c.position)) + 1}).select();
    $('mSave').disabled = false;
    if (res.error || !res.data || !res.data.length) return $('mErr').textContent = 'Could not save the category.';
    onCategory({eventType: cat ? 'UPDATE' : 'INSERT', new: res.data[0]}); closeModal();
  };
  $('mSave').onclick = save; $('catName').onkeydown = e => { if (e.key === 'Enter') save(); };
  if (cat) armButton($('mDel'), 'Delete', async () => {
    const {error} = await sb.from('categories').delete().eq('id', cat.id);
    if (error) return $('mErr').textContent = 'Could not delete the category.';
    onCategory({eventType: 'DELETE', old: {id: cat.id}}); closeModal();
  });
}

/* ---------- me, members ---------- */
function renderMe() {
  const p = prof(state.me.id);
  $('me').innerHTML = `${avImg(p, 'sm')}<div class="grow"><div class="nm">${esc(p.username)}</div><div class="st">${state.isOwner ? 'Owner' : 'Member'}</div></div>
    <button class="iconbtn" id="gear" data-tip="Settings">${ic('settings')}</button>`;
  $('gear').onclick = openSettings;
}
function renderMembers() {
  const arr = [...state.profiles.values()], isOn = p => state.online.has(p.id) || p.id === state.me.id;
  arr.sort((a, b) => (isOn(b) - isOn(a)) || a.username.localeCompare(b.username));
  const on = arr.filter(isOn), off = arr.filter(p => !isOn(p));
  const row = (p, o) => `<div class="mem ${o ? '' : 'off'}" data-uid="${p.id}"><span class="avw">${avImg(p, 'sm')}${o ? '<span class="dot"></span>' : ''}</span>
    <span class="mn" style="color:${nameColor(p)}">${esc(p.username)}</span>${ownerTag(p.id)}</div>`;
  $('members').innerHTML = `<h4>Online - ${on.length}</h4>${on.map(p => row(p, true)).join('')}${off.length ? `<h4 style="margin-top:16px">Offline - ${off.length}</h4>${off.map(p => row(p, false)).join('')}` : ''}`;
}
$('members').onclick = e => { const m = e.target.closest('[data-uid]'); if (m) userClick(m.dataset.uid, e); };
function userClick(uid, e) {
  const r = (e && e.target.getBoundingClientRect) ? e.target.getBoundingClientRect() : {left: innerWidth / 2, bottom: innerHeight / 2};
  showCtx(r.left, r.bottom + 4, userMenu(uid));
}
function userMenu(uid) {
  const p = prof(uid), items = [
    {label: 'Mention', icon: 'user', onClick: () => { const ta = $('input'); ta.value += (ta.value && !ta.value.endsWith(' ') ? ' ' : '') + '@' + p.username + ' '; ta.focus(); autosize(); updateSend(); }},
    {label: 'Copy Username', icon: 'file', onClick: () => copyText(p.username)},
  ];
  if (state.isOwner) {
    items.push('sep', {label: 'Edit Profile', icon: 'id', onClick: () => openEdit(uid)});
    if (uid !== state.me.id && uid !== state.ownerId) items.push({label: 'Close Account', svg: 'trash', danger: true, onClick: () => openEdit(uid)});
  }
  return items;
}
function updateMemTip() { $('memBtn').dataset.tip = $('app').classList.contains('nomem') || innerWidth <= 900 ? 'Show Member List' : 'Hide Member List'; }
$('memBtn').onclick = () => {
  if (innerWidth > 900) { $('app').classList.toggle('nomem'); localStorage.setItem('anonchat_nomem', $('app').classList.contains('nomem') ? '1' : ''); updateMemTip(); }
  else toggleDrawer('members');
};
$('menuBtn').onclick = () => toggleDrawer('side');
function makeResizer(el, varName, key, widthFrom) {
  const saved = +localStorage.getItem(key);
  if (saved) document.documentElement.style.setProperty(varName, saved + 'px');
  el.addEventListener('pointerdown', e => {
    el.setPointerCapture(e.pointerId); el.classList.add('drag'); document.body.style.userSelect = 'none';
    const mv = ev => document.documentElement.style.setProperty(varName, Math.max(180, Math.min(420, widthFrom(ev))) + 'px');
    const up = () => {
      el.classList.remove('drag'); document.body.style.userSelect = '';
      el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up);
      localStorage.setItem(key, parseInt(getComputedStyle(document.documentElement).getPropertyValue(varName)));
    };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up);
  });
}
makeResizer($('rz'), '--memw', 'anonchat_memw', ev => innerWidth - ev.clientX);
makeResizer($('rzl'), '--sidew', 'anonchat_sidew', ev => ev.clientX);

/* ---------- messages ---------- */
const pinnedEmojis = () => JSON.parse(localStorage.getItem('anonchat_pinemoji') || '[]');
function togglePinEmoji(e) { let p = pinnedEmojis(); p = p.includes(e) ? p.filter(x => x !== e) : [e, ...p].slice(0, 20); localStorage.setItem('anonchat_pinemoji', JSON.stringify(p)); }
const quickEmojis = () => [...new Set([...pinnedEmojis(), ...JSON.parse(localStorage.getItem('anonchat_freq') || '[]'), '👍', '😂', '❤️'])].slice(0, 3);
function pollHtml(m) {
  const p = m.poll, votes = state.votes.get(m.id) || [], total = new Set(votes.map(v => v.user_id)).size;
  return `<div class="poll"><div class="pq">${esc(p.question)}</div><div class="ph2">${p.multi ? 'Select one or more answers' : 'Select one answer'}</div>
    ${p.options.map((o, i) => {
      const c = votes.filter(v => v.option_idx === i).length, pct = total ? Math.round(c / total * 100) : 0, mine = votes.some(v => v.option_idx === i && v.user_id === state.me.id);
      return `<button class="po ${mine ? 'mine' : ''}" data-act="vote" data-id="${m.id}" data-i="${i}"><span class="pb" style="width:${pct}%"></span><span class="pl">${mine ? ic('check', 'sm') : '<span class="rad"></span>'}${esc(o)}</span><span class="pc">${c} - ${pct}%</span></button>`;
    }).join('')}<div class="pt">${total} ${total === 1 ? 'vote' : 'votes'}</div></div>`;
}
function isSys(m) { return !!m.kind && m.kind !== 'user'; }
const JOIN_LINES = ['Welcome, %n. We hope you brought pizza.', '%n just joined the chat. Say hi!', 'Everyone welcome %n!', '%n has arrived.'];
function sysHtml(m) {
  const p = prof(m.user_id), nm = `<b style="color:${nameColor(p)}">${esc(p.username)}</b>`;
  let ico, txt;
  if (m.kind === 'join') { ico = ic('arrow', 'sysj'); txt = esc(JOIN_LINES[m.id % JOIN_LINES.length]).replace('%n', nm); }
  else { ico = ic('pin', 'syspin'); txt = `${nm} pinned ${m.reply_to ? `<a data-act="jump" data-id="${m.reply_to}">a message</a>` : 'a message'} to this channel. See all <a data-act="openpins">pinned messages</a>.`; }
  return `<div class="msg sys" data-id="${m.id}"><span class="sysic">${ico}</span><div class="body">${txt}</div><span class="ts">${fmtTime(m.created_at)}</span></div>`;
}
function previewOf(m) {
  const p = prof(m.user_id);
  return `<div class="pvh">${avImg(p, 'sm')}<b style="color:${nameColor(p)}">${esc(p.username)}</b></div><div>${esc((m.content || (m.poll ? 'Poll: ' + m.poll.question : 'Attachment')).slice(0, 220))}</div>`;
}
function confirmBox(o) {
  showModal(`<h2>${esc(o.title)}</h2><p class="sub2">${esc(o.body)}</p><div class="pvbox">${o.preview}</div><div class="hint">Tip: hold Shift when you click to skip this confirmation.</div><div class="row"><button class="btn sec" id="cfNo">Cancel</button><button class="btn ${o.danger ? 'danger' : ''}" id="cfYes">${esc(o.label)}</button></div>`);
  $('cfNo').onclick = () => closeModal(); $('cfYes').onclick = () => { closeModal(); o.run(); };
}
function askDelete(m, shift) {
  if (shift) return delMsg(m.id);
  confirmBox({title: 'Delete Message', body: 'Are you sure you want to delete this message?', preview: previewOf(m), label: 'Delete', danger: true, run: () => delMsg(m.id)});
}
function shiftBtns(m) {
  const canDel = m.user_id === state.me.id || state.isOwner, pinned = isPinned(m.id);
  return (state.isOwner ? `<button class="xs ${pinned ? 'on' : ''}" data-act="pin" data-id="${m.id}" data-tip="${pinned ? 'Unpin' : 'Pin'}">${ic('pin')}</button>` : '')
    + (canDel ? `<button class="xs dg" data-act="delnow" data-id="${m.id}" data-tip="Delete">${svg('trash')}</button>` : '')
    + (m.content ? `<button class="xs" data-act="copytext" data-id="${m.id}" data-tip="Copy Text">${ic('file')}</button>` : '')
    + `<button class="xs" data-act="copyid" data-id="${m.id}" data-tip="Copy ID">${ic('id')}</button>`;
}
function msgHtml(m, group) {
  if (isSys(m)) return sysHtml(m);
  const p = prof(m.user_id), reply = m.reply_to ? state.messages.get(m.reply_to) : null, pinned = isPinned(m.id);
  let h = `<div class="msg ${group ? 'grp' : ''} ${reply ? 'hasreply' : ''} ${mentionsMe(m.content) ? 'mention' : ''}" data-id="${m.id}">`;
  h += `<div class="bar">${quickEmojis().map(e => `<button data-keep data-act="react" data-id="${m.id}" data-emoji="${esc(e)}">${e}</button>`).join('')}<button data-keep data-act="addreact" data-id="${m.id}" data-tip="Add Reaction">${ic('emoji')}</button><button data-keep data-act="reply" data-id="${m.id}" data-tip="Reply">${svg('reply')}</button><button data-keep data-act="more" data-id="${m.id}" data-tip="More">${svg('dots', 'fill')}</button>${shiftBtns(m)}</div>`;
  if (reply) {
    const rp = prof(reply.user_id);
    h += `<div class="replyref" data-act="jump" data-id="${reply.id}">${avImg(rp, 'xs')}<b>${esc(rp.username)}</b><span class="rt">${esc((reply.content || (reply.poll ? 'Poll' : 'Click to see attachment')).slice(0, 90))}</span></div>`;
  }
  if (group) h += `<span class="gt">${fmtTime(m.created_at)}</span>`;
  else h += `<div class="avc" data-act="user" data-uid="${p.id}">${avImg(p)}</div>
    <div class="mh"><span class="un" data-act="user" data-uid="${p.id}" style="color:${nameColor(p)}">${esc(p.username)}</span>${ownerTag(p.id)}<span class="ts">${fmtTime(m.created_at)}</span>${pinned ? `<span class="pinmark" data-tip="Pinned">${ic('pin')}</span>` : ''}</div>`;
  if (m.content) h += `<div class="body">${formatContent(m.content)}</div>`;
  if (m.poll) h += pollHtml(m);
  const url = safeUrl(m.attachment_url);
  if (url) {
    if ((m.attachment_type || '').startsWith('image/')) {
      const fn = (pathFromUrl(url) || '').split('/').pop(), isFav = state.favs.some(f => f.path.split('/').pop() === fn);
      h += `<div class="att"><img src="${esc(url)}" alt="${esc(m.attachment_name)}" loading="lazy" referrerpolicy="no-referrer" data-act="lightbox" data-url="${esc(url)}">
        <button class="favbtn ${isFav ? 'on' : ''}" data-act="fav" data-id="${m.id}" data-tip="${isFav ? 'Remove from saved photos' : 'Save photo'}">${svg('star', isFav ? 'fill' : '')}</button></div>`;
    } else h += `<a class="file" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${ic('file', 'sm')} ${esc(m.attachment_name || 'file')}</a>`;
  }
  const rs = state.reactions.get(m.id) || [];
  if (rs.length) {
    const g = new Map();
    rs.forEach(r => { const e = g.get(r.emoji) || {n: 0, mine: false}; e.n++; if (r.user_id === state.me.id) e.mine = true; g.set(r.emoji, e); });
    h += `<div class="rxs">${[...g].map(([em, v]) => `<button class="rx ${v.mine ? 'mine' : ''}" data-act="react" data-id="${m.id}" data-emoji="${esc(em)}">${esc(em)} <span>${v.n}</span></button>`).join('')}</div>`;
  }
  return h + '</div>';
}
const rendered = new Map();
let renderedChannel = null, stick = true;
function renderMessages(mode) {
  const box = $('msgs'); let first = false;
  if (mode === 'reset' || renderedChannel !== state.channel) {
    box.innerHTML = ''; rendered.clear(); renderedChannel = state.channel; box.dataset.ch = state.channel; first = true;
    box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  }
  const near = stick;
  const list = [...state.messages.values()].filter(m => m.channel === state.channel).sort((a, b) => a.id - b.id);
  const want = []; let prev = null;
  for (const m of list) {
    const grp = prev && !isSys(prev) && !isSys(m) && prev.user_id === m.user_id && !m.reply_to && (new Date(m.created_at) - new Date(prev.created_at)) < 300000;
    want.push({id: m.id, html: msgHtml(m, grp)}); prev = m;
  }
  const ids = new Set(want.map(w => w.id));
  const els = new Map([...box.querySelectorAll(':scope > .msg')].map(e => [+e.dataset.id, e]));
  els.forEach((e, id) => { if (!ids.has(id)) { e.remove(); rendered.delete(id); els.delete(id); } });
  const empty = box.querySelector(':scope > .empty');
  if (!want.length) { if (!empty) box.insertAdjacentHTML('beforeend', `<div class="empty">Welcome to #${esc(state.channel)}.<br>Say something to get things going.</div>`); }
  else if (empty) empty.remove();
  let anchor = null;
  for (const w of want) {
    let el = els.get(w.id);
    if (!el || rendered.get(w.id) !== w.html) {
      const t = document.createElement('template'); t.innerHTML = w.html.trim();
      const n = t.content.firstElementChild;
      if (!el && !first) n.classList.add('enter');
      if (el) el.replaceWith(n);
      el = n; rendered.set(w.id, w.html);
    }
    const expected = anchor ? anchor.nextElementSibling : box.firstElementChild;
    if (el !== expected) box.insertBefore(el, expected);
    anchor = el;
  }
  if (first) { box.style.scrollBehavior = 'auto'; box.scrollTop = box.scrollHeight; box.style.scrollBehavior = ''; stick = true; }
  else if (near) box.scrollTo({top: box.scrollHeight, behavior: 'smooth'});
}
$('msgs').addEventListener('scroll', e => { const b = e.target; stick = b.scrollHeight - b.scrollTop - b.clientHeight < 140; });
$('msgs').addEventListener('load', e => { if (e.target.tagName === 'IMG' && stick) { const b = $('msgs'); b.style.scrollBehavior = 'auto'; b.scrollTop = b.scrollHeight; b.style.scrollBehavior = ''; } }, true);
$('msgs').addEventListener('click', e => {
  const t = e.target.closest('[data-act]'); if (!t) return;
  const act = t.dataset.act, id = +t.dataset.id, m = state.messages.get(id);
  if (act === 'react') toggleReaction(id, t.dataset.emoji);
  else if (act === 'addreact') openPicker(t.getBoundingClientRect(), em => toggleReaction(id, em));
  else if (act === 'reply') { state.replyTo = id; renderReply(); $('input').focus(); }
  else if (act === 'pin' && m) togglePin(m, e.shiftKey);
  else if (act === 'more' && m) { const r = t.getBoundingClientRect(); showCtx(r.right - 190, r.bottom + 4, msgMenu(m, r.left, r.bottom)); }
  else if (act === 'fav') toggleFav(id);
  else if (act === 'delnow') delMsg(id);
  else if (act === 'copytext' && m) copyText(m.content);
  else if (act === 'copyid') copyText(String(id));
  else if (act === 'openpins') { renderPins(); togglePanel('pinsPanel'); }
  else if (act === 'spoiler') t.classList.toggle('on');
  else if (act === 'vote') vote(id, +t.dataset.i);
  else if (act === 'lightbox') { closeOverlays('lightbox'); $('lightbox').querySelector('img').src = t.dataset.url; $('lightbox').classList.add('open'); }
  else if (act === 'jump') jumpTo(id);
  else if (act === 'user') userClick(t.dataset.uid, e);
});
$('msgs').addEventListener('click', e => {
  if (!matchMedia('(hover:none)').matches || e.target.closest('[data-act]')) return;
  const msg = e.target.closest('.msg');
  document.querySelectorAll('.msg.barhold').forEach(x => { if (x !== msg) x.classList.remove('barhold'); });
  if (msg) msg.classList.toggle('barhold');
});
function jumpTo(id) {
  const el = document.querySelector(`.msg[data-id="${id}"]`); if (!el) return;
  el.scrollIntoView({block: 'center', behavior: 'smooth'}); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1200);
}
function msgMenu(m, x, y) {
  if (isSys(m)) return state.isOwner ? [{label: 'Delete Message', svg: 'trash', danger: true, onClick: sh => askDelete(m, sh)}] : [];
  const items = [
    {label: 'Add Reaction', icon: 'emoji', onClick: () => openPicker({left: x, right: x, top: y, bottom: y}, em => toggleReaction(m.id, em))},
    {label: 'Reply', svg: 'reply', onClick: () => { state.replyTo = m.id; renderReply(); $('input').focus(); }},
  ];
  if (m.content) items.push({label: 'Copy Text', icon: 'file', onClick: () => copyText(m.content)});
  const url = safeUrl(m.attachment_url);
  if (url && (m.attachment_type || '').startsWith('image/')) {
    const fn = (pathFromUrl(url) || '').split('/').pop(), isFav = state.favs.some(f => f.path.split('/').pop() === fn);
    items.push('sep', {label: 'Open Image', icon: 'link', onClick: () => window.open(url, '_blank', 'noopener')}, {label: 'Copy Image Address', icon: 'link', onClick: () => copyText(url)},
      {label: isFav ? 'Remove from Saved Photos' : 'Save Photo', svg: 'star', onClick: () => toggleFav(m.id)});
  }
  if (state.isOwner) items.push('sep', {label: isPinned(m.id) ? 'Unpin Message' : 'Pin Message', icon: 'pin', onClick: sh => togglePin(m, sh)});
  if (m.user_id === state.me.id || state.isOwner) { if (!state.isOwner) items.push('sep'); items.push({label: 'Delete Message', svg: 'trash', danger: true, onClick: sh => askDelete(m, sh)}); }
  return items;
}
async function delMsg(id) { await sb.from('messages').delete().eq('id', id); state.messages.delete(id); renderMessages(); }

function renderReply() {
  const bar = $('replyBar'), m = state.replyTo && state.messages.get(state.replyTo);
  if (!m) { state.replyTo = null; bar.hidden = true; return; }
  bar.hidden = false;
  bar.innerHTML = `${svg('reply')} Replying to <b>${esc(prof(m.user_id).username)}</b><button class="x" id="cancelReply">${ic('x', 'sm')}</button>`;
  $('cancelReply').onclick = () => { state.replyTo = null; renderReply(); };
}
function renderPending() {
  const bar = $('pendingBar'), p = state.pending;
  if (!p) { bar.hidden = true; return updateSend(); }
  bar.hidden = false;
  bar.innerHTML = `${p.url ? `<img src="${p.url}" alt="">` : ic('file')} <span>${esc(p.file.name)}</span><button class="x" id="cancelPending">${ic('x', 'sm')}</button>`;
  $('cancelPending').onclick = () => { state.pending = null; renderPending(); };
  updateSend();
}

/* ---------- pins (owner only, survive deletion and wipes) ---------- */
function renderPins() {
  const ch = curChannel();
  const list = state.pins.filter(p => ch && p.channel_id === ch.id).sort((a, b) => new Date(b.pinned_at) - new Date(a.pinned_at));
  $('pinsPanel').innerHTML = `<div class="ph">${ic('pin')} Pinned Messages</div>` + (list.length ? list.map(p => {
    const url = safeUrl(p.attachment_url), img = url && (p.attachment_type || '').startsWith('image/');
    const av = avatarSrc({avatar_url: p.author_avatar, username: p.author_name});
    return `<div class="pinitem"><img class="av sm" src="${esc(av)}" alt="${esc(p.author_name)}">
      <div class="pbody" data-jump="${p.message_id ?? ''}"><b style="color:${nameColor(prof(p.author_id))}">${esc(p.author_name)}</b> <small>${fmtTime(p.msg_created_at || p.pinned_at)}</small>
      ${p.content ? `<div>${formatContent(p.content)}</div>` : ''}${img ? `<img class="pa" src="${esc(url)}" alt="">` : url ? `<a class="file" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${ic('file', 'sm')} ${esc(p.attachment_name || 'file')}</a>` : ''}</div>
      ${state.isOwner ? `<button class="iconbtn pdel" data-del="${p.id}" data-tip="Remove Pin">${svg('trash')}</button>` : ''}</div>`;
  }).join('') : '<div class="empty" style="padding:16px">No pinned messages in this channel.</div>');
}
$('pinsBtn').onclick = () => { renderPins(); togglePanel('pinsPanel'); };
$('pinsPanel').onclick = e => {
  const d = e.target.closest('[data-del]');
  if (d) { const p = state.pins.find(x => x.id === +d.dataset.del); if (p) unpin(p); return; }
  const j = e.target.closest('[data-jump]');
  if (j && j.dataset.jump && state.messages.has(+j.dataset.jump)) { jumpTo(+j.dataset.jump); closeOverlays('none'); }
};
async function togglePin(m, shift) {
  if (!state.isOwner) return;
  const ex = state.pins.find(p => p.message_id === m.id); if (ex) return unpin(ex);
  if (!shift) return confirmBox({title: 'Pin Message', body: 'Pin this message to #' + m.channel + '? Everyone in the channel will see it in the pinned list.', preview: previewOf(m), label: 'Pin', run: () => pinNow(m)});
  return pinNow(m);
}
async function pinNow(m) {
  const ch = curChannel(); if (!ch) return;
  const pr = prof(m.user_id); let url = safeUrl(m.attachment_url) || null;
  if (url) {
    const src = pathFromUrl(url), dest = 'pin/' + crypto.randomUUID() + '.' + extOf(src);
    const {error} = await sb.storage.from('chat').copy(src, dest);
    if (error) return toast('Could not pin that attachment');
    url = publicUrl(dest);
  }
  const {data, error} = await sb.from('pinned_messages').insert({channel_id: ch.id, message_id: m.id, author_id: m.user_id, author_name: pr.username, author_avatar: pr.avatar_url || null,
    content: m.poll ? 'Poll: ' + m.poll.question : m.content, attachment_url: url, attachment_name: m.attachment_name, attachment_type: m.attachment_type, msg_created_at: m.created_at, pinned_by: state.me.id}).select().single();
  if (error) return toast('Could not pin the message');
  onPin({eventType: 'INSERT', new: data}); toast('Message pinned');
}
async function unpin(p) {
  const {error} = await sb.from('pinned_messages').delete().eq('id', p.id);
  if (error) return toast('Could not remove the pin');
  const path = pathFromUrl(p.attachment_url);
  if (path && path.startsWith('pin/')) sb.storage.from('chat').remove([path]);
  onPin({eventType: 'DELETE', old: {id: p.id}});
}

/* ---------- reactions, polls ---------- */
async function toggleReaction(mid, emoji) {
  const me = state.me.id, list = state.reactions.get(mid) || [], mine = list.find(r => r.user_id === me && r.emoji === emoji);
  if (mine) { state.reactions.set(mid, list.filter(r => r !== mine)); renderMessages(); await sb.from('reactions').delete().match({message_id: mid, user_id: me, emoji}); }
  else {
    addReaction({message_id: mid, user_id: me, emoji}); renderMessages();
    const {error} = await sb.from('reactions').insert({message_id: mid, emoji});
    if (error) { toast('Slow down a little'); loadMessages().then(() => renderMessages()); }
  }
}
async function vote(mid, i) {
  const m = state.messages.get(mid); if (!m || !m.poll) return;
  const me = state.me.id, list = state.votes.get(mid) || [], mine = list.find(v => v.user_id === me && v.option_idx === i);
  if (mine) { state.votes.set(mid, list.filter(v => v !== mine)); renderMessages(); await sb.from('poll_votes').delete().match({message_id: mid, user_id: me, option_idx: i}); return; }
  const base = m.poll.multi ? list : list.filter(v => v.user_id !== me);
  state.votes.set(mid, [...base, {message_id: mid, user_id: me, option_idx: i}]); renderMessages();
  const {error} = await sb.from('poll_votes').insert({message_id: mid, option_idx: i});
  if (error) { toast('Could not vote'); loadMessages().then(() => renderMessages()); }
}
function openPoll() {
  let opts = ['', ''], multi = false;
  const draw = () => {
    $('pOpts').innerHTML = opts.map((o, i) => `<div class="polopt"><input class="field" data-oi="${i}" maxlength="100" placeholder="Answer ${i + 1}" value="${esc(o)}" autocomplete="off">${opts.length > 2 ? `<button class="iconbtn" data-rm="${i}" type="button">${ic('x', 'sm')}</button>` : ''}</div>`).join('');
    $('pAdd').hidden = opts.length >= 10;
  };
  showModal(`<h2>${ic('poll')} Create Poll</h2><p class="sub2">Ask a question and let people vote.</p>
    <label class="l">Question</label><input class="field" id="pQ" maxlength="300" placeholder="What do you want to ask?" autocomplete="off">
    <label class="l">Answers</label><div id="pOpts"></div>
    <button class="btn sec sm" id="pAdd" type="button">${ic('plus', 'sm')} Add another answer</button>
    <div class="setrow"><div class="tx"><b>Allow multiple answers</b></div><button class="sw" id="pMulti" type="button"></button></div>
    <div class="err" id="mErr"></div><div class="row"><button class="btn" id="pPost">Post Poll</button></div>`);
  draw(); $('pQ').focus();
  $('pOpts').oninput = e => { if (e.target.dataset.oi) opts[+e.target.dataset.oi] = e.target.value; };
  $('pOpts').onclick = e => { const r = e.target.closest('[data-rm]'); if (r) { opts.splice(+r.dataset.rm, 1); draw(); } };
  $('pAdd').onclick = () => { opts.push(''); draw(); };
  $('pMulti').onclick = () => { multi = !multi; $('pMulti').classList.toggle('on', multi); };
  $('pPost').onclick = async () => {
    const q = $('pQ').value.trim(), o = opts.map(x => x.trim()).filter(Boolean);
    if (!q) return $('mErr').textContent = 'Enter a question.';
    if (o.length < 2) return $('mErr').textContent = 'Add at least two answers.';
    try { await postMessage({poll: {question: q, options: o, multi}}); closeModal(); } catch (e) { $('mErr').textContent = /rate/i.test(e.message || '') ? 'Slow down a little.' : 'Could not post the poll.'; }
  };
}

/* ---------- emoji picker ---------- */
let pickerCb = null;
function buildPicker() {
  $('picker').innerHTML = `<div class="es"><input id="eSearch" placeholder="Search emoji" autocomplete="off"></div>
    <div class="et">${EMO.map((c, i) => `<button data-tab="${i}" data-tip="${c.name}">${c.icon}</button>`).join('')}</div>
    <div class="eg" id="eGrid"></div><div class="ef"><span class="pv">${EMO[0].icon}</span><span class="pn">Shift-click or right-click to favorite</span></div>`;
  renderPickerGrid('');
}
function renderPickerGrid(q) {
  q = q.trim().toLowerCase();
  const btn = x => `<button data-e="${x.e}" data-n="${esc(x.n)}">${x.e}</button>`;
  let h = '';
  if (q) {
    const res = ALL_EMO.filter(x => x.n.includes(q)).slice(0, 160);
    h = res.length ? `<div class="er" style="margin-top:6px">${res.map(btn).join('')}</div>` : '<div class="empty">No emoji found</div>';
  } else {
    const fr = JSON.parse(localStorage.getItem('anonchat_freq') || '[]');
    const pf = pinnedEmojis(); if (pf.length) h += `<div class="eh">Favorites</div><div class="er">${pf.map(e => btn({e, n: emojiName(e)})).join('')}</div>`;
    if (fr.length) h += `<div class="eh" id="es-f">Frequently Used</div><div class="er">${fr.map(e => btn({e, n: emojiName(e)})).join('')}</div>`;
    EMO.forEach((c, i) => { h += `<div class="eh" id="es-${i}">${c.name}</div><div class="er">${c.list.map(btn).join('')}</div>`; });
  }
  $('eGrid').innerHTML = h;
}
function openPicker(rect, cb) {
  closeOverlays('picker'); pickerCb = cb; buildPicker();
  const pk = $('picker'), w = Math.min(352, innerWidth - 16), h = 400;
  pk.style.width = w + 'px';
  pk.style.left = Math.max(8, Math.min(innerWidth - w - 8, rect.right - w)) + 'px';
  const above = rect.top - h - 8 > 8;
  pk.style.top = Math.max(8, above ? rect.top - h - 8 : Math.min(rect.bottom + 8, innerHeight - h - 8)) + 'px';
  pk.style.transformOrigin = above ? 'bottom right' : 'top right';
  requestAnimationFrame(() => { pk.classList.add('open'); if (innerWidth > 700) $('eSearch').focus(); });
}
$('picker').addEventListener('input', e => { if (e.target.id === 'eSearch') renderPickerGrid(e.target.value); });
$('picker').addEventListener('mouseover', e => { const b = e.target.closest('[data-e]'); if (b) { $('picker').querySelector('.pv').textContent = b.dataset.e; $('picker').querySelector('.pn').textContent = ':' + b.dataset.n.replace(/ /g, '_') + ':'; } });
$('picker').addEventListener('click', e => {
  const t = e.target.closest('[data-tab]');
  if (t) { const g = $('eGrid'), el = $('es-' + t.dataset.tab); if (el) g.scrollTo({top: el.offsetTop - g.offsetTop}); return; }
  const b = e.target.closest('[data-e]'); if (!b) return;
  if (e.shiftKey) { togglePinEmoji(b.dataset.e); renderPickerGrid($('eSearch').value); return; }
  if (!pickerCb) return;
  const f = JSON.parse(localStorage.getItem('anonchat_freq') || '[]').filter(x => x !== b.dataset.e); f.unshift(b.dataset.e);
  localStorage.setItem('anonchat_freq', JSON.stringify(f.slice(0, 24)));
  const cb = pickerCb; closeOverlays('none'); cb(b.dataset.e);
});
$('emojiBtn').onclick = e => {
  const r = e.currentTarget.getBoundingClientRect();
  openPicker(r, em => { const ta = $('input'); ta.setRangeText(em, ta.selectionStart, ta.selectionEnd, 'end'); ta.focus(); autosize(); updateSend(); });
};

/* ---------- composer ---------- */
const ta = $('input');
function autosize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'; }
function updateSend() { $('sendBtn').classList.toggle('ready', !!(ta.value.trim() || state.pending)); }
let ac = null;
const hideAC = () => { ac = null; $('ac').hidden = true; };
function renderAC() {
  $('ac').hidden = false;
  $('ac').innerHTML = ac.items.map((p, i) => `<div class="${i === ac.idx ? 'sel' : ''}" data-i="${i}">${ac.type === 'e' ? `<span class="ae">${p.e}</span> :${esc(p.code)}:` : `${avImg(p, 'sm')} ${esc(p.username)}`}</div>`).join('');
}
function updateAC() {
  const pos = ta.selectionStart, before = ta.value.slice(0, pos);
  let m = /(^|\s)@([A-Za-z0-9_]*)$/.exec(before);
  if (m) {
    const q = m[2].toLowerCase(), items = [...state.profiles.values()].filter(p => p.username.toLowerCase().startsWith(q)).slice(0, 6);
    if (!items.length) return hideAC();
    ac = {type: 'm', items, idx: 0, start: pos - m[2].length - 1}; return renderAC();
  }
  m = /(^|\s):([a-z0-9_+-]{2,})$/i.exec(before);
  if (m) {
    const items = emojiMatches(m[2]);
    if (!items.length) return hideAC();
    ac = {type: 'e', items, idx: 0, start: pos - m[2].length - 1}; return renderAC();
  }
  hideAC();
}
function pickAC(i) {
  const it = ac.items[i], pos = ta.selectionStart, ins = ac.type === 'e' ? it.e + ' ' : '@' + it.username + ' ';
  ta.value = ta.value.slice(0, ac.start) + ins + ta.value.slice(pos);
  const np = ac.start + ins.length; ta.setSelectionRange(np, np); hideAC(); ta.focus(); autosize(); updateSend();
}
$('ac').onmousedown = e => { e.preventDefault(); const d = e.target.closest('[data-i]'); if (d) pickAC(+d.dataset.i); };
ta.addEventListener('input', () => {
  const pos = ta.selectionStart, m = /(^|\s):([a-z0-9_+-]{2,}):$/i.exec(ta.value.slice(0, pos));
  if (m) { const em = emojiByCode(m[2]); if (em) ta.setRangeText(em, pos - m[2].length - 2, pos, 'end'); }
  autosize(); updateAC(); updateSend();
  if (state.unread[state.channel] || state.mentions[state.channel]) markRead(state.channel);
});
ta.addEventListener('keydown', e => {
  if (ac) {
    if (e.key === 'ArrowDown') { e.preventDefault(); ac.idx = (ac.idx + 1) % ac.items.length; return renderAC(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); ac.idx = (ac.idx - 1 + ac.items.length) % ac.items.length; return renderAC(); }
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); return pickAC(ac.idx); }
    if (e.key === 'Escape') { e.stopPropagation(); return hideAC(); }
  }
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
});
ta.addEventListener('paste', e => { const f = [...(e.clipboardData?.files || [])][0]; if (f) { e.preventDefault(); setPending(f); } });
$('attachBtn').onclick = e => {
  const r = e.currentTarget.getBoundingClientRect();
  showCtx(r.left, r.top, [{label: 'Upload a File', icon: 'file', cls: 'plus', onClick: () => $('fileIn').click()}, {label: 'Create Poll', icon: 'poll', cls: 'plus', onClick: openPoll}], {up: true, minWidth: 230});
};
$('fileIn').onchange = e => { if (e.target.files[0]) setPending(e.target.files[0]); e.target.value = ''; };
$('mainEl').addEventListener('dragover', e => e.preventDefault());
$('mainEl').addEventListener('drop', e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setPending(f); });
function setPending(file) {
  if (file.size > MAX_FILE) return toast('Files must be under 10 MB');
  if (!OK_TYPES.test(file.type)) return toast('That file type is not allowed');
  state.pending = {file, url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null}; renderPending(); ta.focus();
}
async function postMessage(row) {
  const {data, error} = await sb.from('messages').insert({channel: state.channel, reply_to: state.replyTo || null, content: '', ...row}).select().single();
  if (error) throw error;
  if (!state.messages.has(data.id)) state.messages.set(data.id, data);
  state.replyTo = null; renderReply(); stick = true; renderMessages(); return data;
}
let sending = false, lastSend = 0;
async function send() {
  const text = shortcodes(ta.value.trim());
  if ((!text && !state.pending) || sending || Date.now() - lastSend < 600) return;
  sending = true; $('sendBtn').disabled = true;
  try {
    const row = {content: text};
    if (state.pending) {
      const f = state.pending.file, path = 'att/' + crypto.randomUUID() + '.' + extOf(f.name);
      const {error} = await sb.storage.from('chat').upload(path, f, {contentType: f.type});
      if (error) throw error;
      Object.assign(row, {attachment_url: publicUrl(path), attachment_name: f.name.slice(0, 100), attachment_type: f.type});
    }
    await postMessage(row);
    ta.value = ''; autosize(); hideAC(); state.pending = null; renderPending(); lastSend = Date.now();
  } catch (e) { toast(/rate/i.test(e.message || '') ? 'Slow down a little' : 'Could not send that message'); }
  sending = false; $('sendBtn').disabled = false; updateSend(); ta.focus();
}
$('sendBtn').onclick = send;

/* ---------- saved photos ---------- */
async function toggleFav(mid) {
  const m = state.messages.get(mid); if (!m) return;
  const src = pathFromUrl(m.attachment_url); if (!src) return;
  const name = src.split('/').pop(), ex = state.favs.find(f => f.path.split('/').pop() === name);
  if (ex) { await removeFav(ex); toast('Removed from saved photos'); return; }
  const dest = `fav/${state.me.id}/${name}`;
  const {error} = await sb.storage.from('chat').copy(src, dest);
  if (error && !/exist|duplicate/i.test(error.message)) return toast('Could not save photo');
  const {error: e2} = await sb.from('favorites').upsert({path: dest, url: publicUrl(dest)});
  if (e2) return toast('You have reached the saved photo limit');
  await loadFavs(); renderMessages(); renderFavs(); toast('Saved to your photos');
}
async function removeFav(f) {
  await sb.from('favorites').delete().eq('path', f.path); await sb.storage.from('chat').remove([f.path]);
  await loadFavs(); renderMessages(); renderFavs();
}
function renderFavs() {
  $('favPanel').innerHTML = `<div class="fhead"><span class="ph">${svg('star', 'fill')} Saved Photos</span>
    <button class="btn sec sm" id="favAdd" type="button">${ic('plus', 'sm')} Add photo</button></div>
    ${state.favs.length ? `<div class="gr">${state.favs.map((f, i) => `<div class="fi" data-i="${i}"><img src="${esc(safeUrl(f.url))}" alt=""><button class="rm" data-rm="${i}">${ic('x', 'sm')}</button></div>`).join('')}</div>`
      : '<div class="empty" style="padding:16px">Tap the star on any photo in chat to save it here. Tap a saved photo to resend it.</div>'}
    <input type="file" id="favFile" accept="image/png,image/jpeg,image/gif,image/webp" hidden>`;
  $('favAdd').onclick = () => $('favFile').click();
  $('favFile').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > MAX_FILE || !/^image\/(png|jpe?g|gif|webp)$/.test(f.type)) return toast('Choose an image under 10 MB');
    const path = `fav/${state.me.id}/${crypto.randomUUID()}.${extOf(f.name)}`;
    const {error} = await sb.storage.from('chat').upload(path, f, {contentType: f.type});
    if (error) return toast('Upload failed');
    await sb.from('favorites').upsert({path, url: publicUrl(path)}); await loadFavs(); renderFavs();
  };
}
$('favBtn').onclick = () => { renderFavs(); togglePanel('favPanel'); };
$('favPanel').onclick = async e => {
  const rm = e.target.closest('[data-rm]'); if (rm) return removeFav(state.favs[+rm.dataset.rm]);
  const it = e.target.closest('[data-i]'); if (!it) return;
  const f = state.favs[+it.dataset.i], name = f.path.split('/').pop();
  const type = {png: 'image/png', gif: 'image/gif', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg'}[extOf(name).toLowerCase()] || 'image/jpeg';
  try { await postMessage({attachment_url: f.url, attachment_name: name, attachment_type: type}); closeOverlays('none'); } catch { toast('Could not send'); }
};

/* ---------- wipe timer (interval set by the owner) ---------- */
function tick() {
  const nxt = state.settings.next_wipe_at ? new Date(state.settings.next_wipe_at).getTime() : 0;
  const left = nxt ? Math.max(0, Math.ceil((nxt - (Date.now() + (state.skew || 0))) / 1000)) : null;
  $('timerTxt').textContent = left === null ? '--:--' : Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
  $('timer').classList.toggle('soon', left !== null && left <= 30);
  if (left === 0 && state.clearedFor !== nxt) {
    state.clearedFor = nxt;
    const keepCh = new Set([...state.channels.values()].filter(c => c.auto_clear === false).map(c => c.name));
    for (const [id, m] of state.messages) if (!keepCh.has(m.channel)) { state.messages.delete(id); state.reactions.delete(id); state.votes.delete(id); }
    state.unread = {}; state.mentions = {}; state.mentionCount = 0; state.replyTo = null;
    renderReply(); renderChannels(); renderMessages(); updateTitle();
    setTimeout(async () => { await loadSettings(); await loadMessages(); renderMessages(); }, 8000);
  }
}
async function loadSettings() {
  const {data} = await sb.from('app_settings').select('*');
  (data || []).forEach(r => { if (r.key !== 'last_wipe_at') state.settings[r.key] = r.value; });
}
function updateTitle() { document.title = state.mentionCount ? `(${state.mentionCount}) anon chat` : 'anon chat'; }
function recountMentions() { state.mentionCount = Object.values(state.mentions).reduce((a, b) => a + b, 0); }
function markRead(name) { state.unread[name] = 0; delete state.mentions[name]; recountMentions(); renderChannels(); updateTitle(); }
function markAllRead() { state.unread = {}; state.mentions = {}; state.mentionCount = 0; renderChannels(); updateTitle(); }

/* ---------- settings, owner tools, profile editing ---------- */
function applyMode() { state.isOwner = state.realOwner && state.ownerMode; renderChannels(); renderMe(); renderMembers(); renderMessages(); renderPins(); }
function openSettings() {
  const own = state.realOwner, on = state.ownerMode;
  const WIPE = [1, 2, 5, 10, 15, 30, 60], wi = Math.max(0, WIPE.indexOf(+state.settings.wipe_minutes)), wl = v => v === 1 ? '1 minute' : v + ' minutes';
  showModal(`<h2>${ic('settings')} Settings</h2><p class="sub2">Your account${own ? ' and chat controls' : ''}.</p>
    <div class="kv"><label class="l">Signed in as</label><div class="val">${esc(state.me.email || '')}</div></div>
    ${own ? `<div class="sec"><div class="sh">${ic('crown')} Owner tools</div>
      <div class="setrow"><div class="tx"><b>Account mode</b><small>Switch to User to see the chat the way members do.</small></div>
        <div class="seg ${on ? '' : 's'}" id="modeSeg"><span class="ind"></span><button data-m="owner" class="${on ? 'on' : ''}">Owner</button><button data-m="user" class="${on ? '' : 'on'}">User</button></div></div>
      ${on ? `<div class="setrow"><div class="tx"><b>Show OWNER tag</b><small>Controls whether everyone sees the tag next to your name.</small></div><button class="sw ${state.settings.show_owner_tag ? 'on' : ''}" id="swTag"></button></div>
      <div class="setrow" style="display:block"><div class="slv"><b>Reset timer</b><span id="slVal">${wl(WIPE[wi])}</span></div><div class="sl"><input type="range" id="slWipe" min="0" max="6" step="1" value="${wi}" style="--p:calc(${wi / 6} * (100% - 12px) + 6px)"></div><div class="slab">${WIPE.map((v, k) => `<span style="--i:${k}">${v === 60 ? '1h' : v + 'm'}</span>`).join('')}</div><div class="hint" style="margin-bottom:0">A new length starts after the current countdown finishes.</div></div>
      <div class="setrow"><div class="tx"><b>Clear chat now</b><small>Wipes every message and upload immediately.</small></div><button class="btn danger sm" id="wipeNow">Clear</button></div>
      <div class="acc" id="accKeys"><button type="button" class="acch" id="accBtn">${ic('link')}<span>Invite keys</span><span class="cnt" id="keyCnt"></span>${ic('chev', 'chv')}</button><div class="accb"><div class="acci">
        <div class="hint">Each key works once. Give one to someone so they can create an account. A key shows as used here once it has been claimed.</div>
        <button class="btn" id="genKey">${ic('plus', 'sm')} Generate key</button><div class="invites" id="inviteList"></div></div></div></div>` : ''}</div>` : ''}
    <div class="row"><button class="btn danger" id="logout">Log out</button></div>`, {wide: true});
  $('logout').onclick = async () => { await sb.auth.signOut(); location.reload(); };
  if (!own) return;
  $('modeSeg').onclick = async e => { const b = e.target.closest('[data-m]'); if (!b) return; state.ownerMode = b.dataset.m === 'owner'; state.settings.owner_user_mode = !state.ownerMode; applyMode(); openSettings(); await sb.from('app_settings').upsert({key: 'owner_user_mode', value: !state.ownerMode}); };
  if (!on) return;
  $('swTag').onclick = async () => { const v = !state.settings.show_owner_tag; state.settings.show_owner_tag = v; $('swTag').classList.toggle('on', v); renderMembers(); renderMessages(); await sb.from('app_settings').upsert({key: 'show_owner_tag', value: v}); };
  const sl = $('slWipe');
  sl.oninput = () => { const i = +sl.value; sl.style.setProperty('--p', `calc(${i / 6} * (100% - 12px) + 6px)`); $('slVal').textContent = wl(WIPE[i]); };
  sl.onchange = async () => { const v = WIPE[+sl.value]; const {data, error} = await sb.rpc('set_wipe_minutes', {m: v}); if (error || data !== v) return toast('Could not change the timer'); state.settings.wipe_minutes = v; toast('Saved: ' + wl(v) + '. It starts after the current countdown.'); };
  armButton($('wipeNow'), 'Clear', async () => { const {error} = await sb.rpc('wipe_now'); toast(error ? 'Could not clear chat' : 'Chat cleared'); $('wipeNow').textContent = 'Clear'; });
  $('genKey').onclick = async () => {
    $('genKey').disabled = true; const {data, error} = await sb.rpc('create_invite_key'); $('genKey').disabled = false;
    if (error) return toast('Could not create a key');
    navigator.clipboard?.writeText(data); toast('Key created and copied'); await loadInvites();
  };
  $('inviteList').onclick = async e => {
    const c = e.target.closest('[data-copy]'), r = e.target.closest('[data-revoke]');
    if (c) copyText(c.dataset.copy);
    if (r) { await sb.from('invite_keys').delete().eq('id', +r.dataset.revoke); state.invites = state.invites.filter(k => k.id !== +r.dataset.revoke); renderInvites(); }
  };
  $('accBtn').onclick = () => $('accKeys').classList.toggle('open');
  loadInvites();
}
async function loadInvites() { const {data} = await sb.from('invite_keys').select('*').order('id', {ascending: false}); state.invites = data || []; renderInvites(); }
function renderInvites() {
  const kc = $('keyCnt'); if (kc) kc.textContent = state.invites.length ? state.invites.filter(k => !k.used_at).length + ' unused' : '';
  const box = $('inviteList'); if (!box) return;
  if (!state.invites.length) { box.innerHTML = '<div class="hint">No keys yet.</div>'; return; }
  box.innerHTML = state.invites.map(k => {
    if (k.used_at) { const who = k.used_by ? prof(k.used_by).username : null; return `<div class="inv used"><code>${esc(k.key)}</code><span class="st ok">${ic('check', 'sm')} Used${who ? ' by ' + esc(who) : ''}</span><button class="mini" data-revoke="${k.id}">Dismiss</button></div>`; }
    return `<div class="inv"><code>${esc(k.key)}</code><span class="st">Unused</span><button class="mini" data-copy="${esc(k.key)}">Copy</button><button class="mini" data-revoke="${k.id}">Revoke</button></div>`;
  }).join('');
}
async function closeAccount(uid) {
  const {data: {session}} = await sb.auth.getSession();
  const r = await fetch(SB_URL + '/functions/v1/admin', {method: 'POST', headers: {'Content-Type': 'application/json', apikey: SB_KEY, Authorization: 'Bearer ' + session.access_token}, body: JSON.stringify({action: 'delete_user', user_id: uid})});
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return toast(j.error || ('Could not close that account (error ' + r.status + ')'));
  state.profiles.delete(uid); state.online.delete(uid); for (const [id, m] of state.messages) if (m.user_id === uid) state.messages.delete(id); rebuildNames(); renderMembers(); renderMessages(); closeModal(); toast('Account closed'); syncProfiles();
}
function openEdit(uid) {
  const p = prof(uid); let avatar = p.avatar_url;
  const canClose = uid !== state.me.id && uid !== state.ownerId;
  showModal(`<h2>${ic('id')} Edit Profile</h2><p class="sub2">Only the owner can change names and pictures.</p>
    <div style="display:flex;align-items:center;gap:14px"><img id="edAv" class="av" style="width:72px;height:72px" src="${esc(avatarSrc(p))}" alt="">
      <div style="flex:1"><button class="btn sec sm" id="edRandAv" style="width:100%;margin-bottom:6px">Randomize picture</button>
      <button class="btn sec sm" id="edUpAv" style="width:100%">Upload picture</button><input type="file" id="edFile" accept="image/png,image/jpeg,image/gif,image/webp" hidden></div></div>
    <div style="margin-top:14px"><label class="l">Username</label><input class="field" id="edName" maxlength="24" value="${esc(p.username)}" autocomplete="off">
    <div class="hint">Letters, numbers and underscores, 2 to 24 characters.</div></div>
    <label class="l">Name color</label>
    <div class="swatches" id="edSw">${PALETTE.map(c => `<button type="button" class="swc" data-c="${c}" style="background:${c}"></button>`).join('')}</div>
    <input class="field" id="edColor" maxlength="7" value="${esc(nameColor(p))}" autocomplete="off">
    <button class="btn sec sm" id="edRandName">Randomize name</button>
    <div class="err" id="edErr"></div><div class="row"><button class="btn" id="edSave">Save Changes</button></div>
    ${canClose ? `<div class="sec"><div class="sh">Close account</div><div class="hint">Deletes this account and its messages. They will need a new invite key to sign up again.</div><button class="btn danger" id="edClose">Close Account</button></div>` : ''}`);
  $('edRandAv').onclick = () => { avatar = 'seed:' + crypto.randomUUID().slice(0, 8); $('edAv').src = genAvatar(avatar.slice(5)); };
  $('edRandName').onclick = () => { $('edName').value = pick(ADJ) + pick(ANI) + (1000 + Math.floor(Math.random() * 9000)); };
  $('edUpAv').onclick = () => $('edFile').click();
  $('edSw').onclick = e => { const b = e.target.closest('[data-c]'); if (b) $('edColor').value = b.dataset.c; };
  $('edFile').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > MAX_FILE || !/^image\/(png|jpe?g|gif|webp)$/.test(f.type)) return $('edErr').textContent = 'Choose an image under 10 MB';
    const path = 'pfp/' + crypto.randomUUID() + '.' + extOf(f.name);
    const {error} = await sb.storage.from('chat').upload(path, f, {contentType: f.type});
    if (error) return $('edErr').textContent = 'Upload failed';
    avatar = publicUrl(path); $('edAv').src = avatar;
  };
  $('edSave').onclick = async () => {
    const name = $('edName').value.trim();
    if (!/^[A-Za-z0-9_]{2,24}$/.test(name)) return $('edErr').textContent = 'Invalid username';
    const color = $('edColor').value.trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(color)) return $('edErr').textContent = 'Color must look like #5865f2';
    const {data, error} = await sb.from('profiles').update({username: name, avatar_url: avatar, name_color: color}).eq('id', uid).select();
    if (error) return $('edErr').textContent = /duplicate|unique/i.test(error.message) ? 'That username is taken' : 'Could not save';
    if (!data.length) return $('edErr').textContent = 'Not allowed';
    state.profiles.set(uid, data[0]); rebuildNames(); renderMe(); renderMembers(); renderMessages(); closeModal();
  };
  if (canClose) armButton($('edClose'), 'Close Account', () => closeAccount(uid));
}

/* ---------- custom right click menus ---------- */
function inputMenu(el) {
  const sel = el.selectionStart !== el.selectionEnd;
  return [
    {label: 'Cut', hint: 'Ctrl+X', disabled: !sel || el.readOnly, onClick: () => { el.focus(); document.execCommand('cut'); }},
    {label: 'Copy', hint: 'Ctrl+C', disabled: !sel, onClick: () => { el.focus(); document.execCommand('copy'); }},
    {label: 'Paste', hint: 'Ctrl+V', onClick: async () => { try { const t = await navigator.clipboard.readText(); el.focus(); el.setRangeText(t, el.selectionStart, el.selectionEnd, 'end'); el.dispatchEvent(new Event('input', {bubbles: true})); } catch { toast('Allow clipboard access to paste'); } }},
    'sep', {label: 'Select All', hint: 'Ctrl+A', onClick: () => { el.focus(); el.select(); }},
  ];
}
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  if (!state.me || $('app').hidden) { const s = getSelection().toString(); if (s) showCtx(e.clientX, e.clientY, [{label: 'Copy', icon: 'file', onClick: () => copyText(s)}]); return; }
  const t = e.target, x = e.clientX, y = e.clientY; let items = [];
  const pe = t.closest('#picker [data-e]');
  if (pe) { const e0 = pe.dataset.e; showCtx(x, y, [{label: pinnedEmojis().includes(e0) ? 'Unpin from Favorites' : 'Pin to Favorites', icon: 'pin', onClick: () => { togglePinEmoji(e0); renderPickerGrid($('eSearch').value); }}], {keepPicker: true}); return; }
  const inp = t.closest('textarea,input:not([type=file])'), msg = t.closest('.msg'), usr = t.closest('[data-uid]'), chn = t.closest('[data-ch]'), cat = t.closest('[data-cat]'), side = t.closest('#channels');
  if (inp) items = inputMenu(inp);
  else if (usr && (!msg || t.closest('.avc,.un'))) items = userMenu(usr.dataset.uid);
  else if (msg) { const m = state.messages.get(+msg.dataset.id); if (m) items = msgMenu(m, x, y); }
  else if (chn) {
    const c = [...state.channels.values()].find(k => k.name === chn.dataset.ch);
    items = [{label: 'Mark as Read', icon: 'check', onClick: () => markRead(chn.dataset.ch)}, {label: 'Mark All as Read', icon: 'check', onClick: markAllRead}, {label: 'Copy Channel Name', icon: 'channel', onClick: () => copyText(chn.dataset.ch)}];
    if (state.isOwner && c) items.push('sep', {label: 'Edit Channel', icon: 'edit', onClick: () => openChannelModal(c.id)});
  } else if (cat && state.isOwner) {
    const id = +cat.dataset.cat;
    items = [{label: 'Create Channel', icon: 'plus', onClick: () => openChannelModal(null, id)}, {label: cat.classList.contains('col') ? 'Expand Category' : 'Collapse Category', icon: 'chev', onClick: () => toggleCat(id)}, 'sep', {label: 'Edit Category', icon: 'edit', onClick: () => openCategoryModal(id)}];
  } else if (side) {
    items = [{label: 'Mark All as Read', icon: 'check', onClick: markAllRead}];
    if (state.isOwner) items.push('sep', {label: 'Create Channel', icon: 'channel', onClick: () => openChannelModal()}, {label: 'Create Category', icon: 'chev', onClick: () => openCategoryModal()});
  }
  const s = getSelection().toString();
  if (!items.length && s) items = [{label: 'Copy', icon: 'file', onClick: () => copyText(s)}];
  if (items.length) showCtx(x, y, items); else closeOverlays('none');
});

addEventListener('keydown', e => { if (e.key === 'Shift') document.body.classList.add('shift'); });
addEventListener('keyup', e => { if (e.key === 'Shift') document.body.classList.remove('shift'); });
addEventListener('blur', () => document.body.classList.remove('shift'));

boot();
