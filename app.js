/* ============================================================
   Kanban · Marketing Team R.X.  v2.1 — Supabase edition
   ============================================================ */

/* ---------- MEMBERS (demo fallback) ---------- */
const MEMBERS = [
  { id:'earth', name:'เอิร์ธ', initial:'อ', role:'admin', team:null,      title:'Marketing Lead',       status:'active', user:'earth', pass:'admin123' },
  { id:'palm',  name:'ปาล์ม',  initial:'ป', role:'member',team:'health',  title:'Content Creator',      status:'active', user:'palm',  pass:'1234' },
  { id:'beam',  name:'บีม',    initial:'บ', role:'member',team:'ecom',    title:'Campaign Manager',     status:'active', user:'beam',  pass:'1234' },
  { id:'nut',   name:'นัท',    initial:'น', role:'member',team:'lasik',   title:'Marketing Specialist', status:'active', user:'nut',   pass:'1234' },
  { id:'oat',   name:'โอ๊ต',   initial:'อ', role:'member',team:'rex',     title:'Video Editor',         status:'active', user:'oat',   pass:'1234' },
  { id:'em',    name:'เอ็ม',   initial:'อ', role:'member',team:'graphic', title:'Graphic Designer',     status:'active', user:'em',    pass:'1234' },
  { id:'kik',   name:'กิ๊ก',   initial:'ก', role:'member',team:'lasik',   title:'SEO Writer',           status:'active', user:'kik',   pass:'1234' },
  { id:'too',   name:'ตู่',    initial:'ต', role:'member',team:'graphic', title:'Photographer',         status:'active', user:'too',   pass:'1234' },
  { id:'fa',    name:'ฟ้า',    initial:'ฟ', role:'member',team:'ecom',    title:'Ads Specialist',       status:'active', user:'fa',    pass:'1234' },
  { id:'jib',   name:'จิ๊บ',   initial:'จ', role:'member',team:'rex',     title:'Web Developer',        status:'active', user:'jib',   pass:'1234' },
  { id:'mint',  name:'มิ้นท์', initial:'ม', role:'member',team:'health',  title:'LINE OA Manager',      status:'active', user:'mint',  pass:'1234' },
];

const TEAMS = {
  health:  { name:'Consumer Health', color:'#10b981', total:36 },
  ecom:    { name:'E-Commerce',      color:'#f59e0b', total:33 },
  lasik:   { name:'LASIK',           color:'#06b6d4', total:25 },
  rex:     { name:'REXCUER',         color:'#8b5cf6', total:29 },
  graphic: { name:'Graphic',         color:'#ec4899', total:19 },
};

const PRIORITY = { Urgent:{fg:'#dc2626',bg:'#fee2e2'}, High:{fg:'#ea580c',bg:'#ffedd5'}, Medium:{fg:'#ca8a04',bg:'#fef9c3'}, Low:{fg:'#64748b',bg:'#f1f5f9'} };

const STATUSES = [
  { id:'todo',     name:'To Do',       dot:'#94a3b8', badgeFg:'#94a3b8' },
  { id:'progress', name:'In Progress', dot:'#3b82f6', badgeFg:'#3b82f6' },
  { id:'review',   name:'Review',      dot:'#f59e0b', badgeFg:'#d97706' },
  { id:'done',     name:'Done',        dot:'#10b981', badgeFg:'#059669' },
];

/* ---------- Mutable data (synced from Supabase when connected) ---------- */
let TASK_SEQ = 100;
const t = o => ({ id: TASK_SEQ++, ...o });

let TASKS = [
  t({ team:'health',  title:'รีวิวผลิตภัณฑ์เสริมอาหารตัวใหม่', priority:'Medium', date:'3 ก.ค.',    assigneeId:'palm',  status:'todo' }),
  t({ team:'graphic', title:'ออกแบบ Key Visual โปรโมชั่นกลางปี', priority:'High',   date:'2 ก.ค.',    assigneeId:'em',    status:'todo' }),
  t({ team:'health',  title:'แผนคอนเทนต์ LINE OA เดือนหน้า',   priority:'Medium', date:'4 ก.ค.',    assigneeId:'mint',  status:'todo' }),
  t({ team:'rex',     title:'ตัดต่อวิดีโอ TikTok แคมเปญใหม่',   priority:'Urgent', date:'เลย 1 วัน', assigneeId:'oat',   status:'progress', overdue:true }),
  t({ team:'ecom',    title:'วางแผนแคมเปญ Summer Sale',         priority:'High',   date:'30 มิ.ย.',  assigneeId:'beam',  status:'progress', comments:3 }),
  t({ team:'lasik',   title:'เขียนบทความ SEO สุขภาพดวงตา',     priority:'High',   date:'1 ก.ค.',    assigneeId:'kik',   status:'progress' }),
  t({ team:'lasik',   title:'นัดหมายไลฟ์สดให้ความรู้',          priority:'High',   date:'1 ก.ค.',    assigneeId:'nut',   status:'progress' }),
  t({ team:'graphic', title:'ถ่ายภาพสินค้า Lookbook คอลใหม่',   priority:'Medium', date:'29 มิ.ย.',  assigneeId:'too',   status:'review', attach:2 }),
  t({ team:'ecom',    title:'ตั้งค่า Ads Manager FB / IG',       priority:'Medium', date:'30 มิ.ย.',  assigneeId:'fa',    status:'review' }),
  t({ team:'rex',     title:'อัปเดตหน้า Landing Page',           priority:'High',   date:'29 มิ.ย.',  assigneeId:'jib',   status:'review', comments:5 }),
  t({ team:'ecom',    title:'สรุปยอดขายไตรมาส 2',               priority:'Low',    date:'25 มิ.ย.',  assigneeId:'beam',  status:'done' }),
  t({ team:'health',  title:'ตอบคอมเมนต์ลูกค้าประจำสัปดาห์',    priority:'Low',    date:'26 มิ.ย.',  assigneeId:'palm',  status:'done' }),
];

const DASH_STATS = { todo:38, progress:45, review:18, done:41, total:142 };
const TEAM_PROGRESS = [
  { team:'health', done:26, total:36, pct:72 }, { team:'ecom', done:19, total:33, pct:58 },
  { team:'lasik', done:21, total:25, pct:84 }, { team:'rex', done:12, total:29, pct:41 },
  { team:'graphic',done:13, total:19, pct:66 },
];
const DEADLINES_SOON = [
  { title:'นัดหมายไลฟ์สด LASIK', sub:'LASIK · นัท', tag:'อีก 1 วัน', tagFg:'#d97706', tagBg:'rgba(245,158,11,.12)', bar:'#06b6d4', taskTitle:'นัดหมายไลฟ์สดให้ความรู้' },
  { title:'วางแผนแคมเปญ Summer Sale', sub:'E-Commerce · บีม', tag:'อีก 2 วัน', tagFg:'#d97706', tagBg:'rgba(245,158,11,.12)', bar:'#f59e0b', taskTitle:'วางแผนแคมเปญ Summer Sale' },
  { title:'ออกแบบ Key Visual โปรโมชั่น', sub:'Graphic · เอ็ม', tag:'อีก 4 วัน', tagFg:'#475569', tagBg:'#f1f5f9', bar:'#ec4899', taskTitle:'ออกแบบ Key Visual โปรโมชั่นกลางปี' },
];
const DEADLINES_OVERDUE = [
  { title:'ตัดต่อวิดีโอ TikTok REXCUER', sub:'REXCUER · โอ๊ต', tag:'เลย 1 วัน', tagFg:'#dc2626', tagBg:'#fee2e2', bar:'#8b5cf6', taskTitle:'ตัดต่อวิดีโอ TikTok แคมเปญใหม่' },
  { title:'รีวิวผลิตภัณฑ์เสริมอาหาร', sub:'Consumer Health · ปาล์ม', tag:'เลย 3 วัน', tagFg:'#dc2626', tagBg:'#fee2e2', bar:'#10b981', taskTitle:'รีวิวผลิตภัณฑ์เสริมอาหารตัวใหม่' },
];

const CH = { IG:'#E1306C', TT:'#111', FB:'#1877F2', YT:'#FF0000', LN:'#06C755' };
let POSTS_DATA = [
  { id:1,day:2,ch:'IG',label:'รีวิวสินค้าใหม่',accent:'#10b981',link:'' },
  { id:2,day:3,ch:'TT',label:'คลิปสั้นเลสิค',accent:'#3b82f6',link:'' },
  { id:3,day:5,ch:'FB',label:'โปรกลางเดือน',accent:'#f59e0b',link:'' },
  { id:4,day:6,ch:'YT',label:'วิดีโอ REXCUER',accent:'#94a3b8',link:'' },
  { id:5,day:9,ch:'LN',label:'บรอดแคสต์',accent:'#3b82f6',link:'' },
  { id:6,day:11,ch:'IG',label:'Carousel',accent:'#f59e0b',link:'' },
  { id:7,day:12,ch:'FB',label:'Flash Sale',accent:'#3b82f6',link:'' },
  { id:8,day:12,ch:'IG',label:'Flash Sale',accent:'#3b82f6',link:'' },
  { id:9,day:16,ch:'TT',label:'Behind scene',accent:'#94a3b8',link:'' },
  { id:10,day:18,ch:'YT',label:'รีวิวเลสิคจริง',accent:'#f59e0b',link:'' },
  { id:11,day:20,ch:'IG',label:'Mid-year',accent:'#94a3b8',link:'' },
  { id:12,day:24,ch:'FB',label:'Q3 teaser',accent:'#94a3b8',link:'' },
  { id:13,day:26,ch:'LN',label:'ดูแลหลังเลสิค',accent:'#3b82f6',link:'' },
];
let POST_SEQ = 20;

let KOLS = [
  { id:1, name:'หมอกอล์ฟ', handle:'@drgolf_eye', platform:'IG', followers:'285K', engagement:'4.8%', engColor:'#10b981', team:'lasik', campaigns:3, bg:'#06b6d4' },
  { id:2, name:'แพร Health Coach', handle:'@prae.healthy', platform:'IG', followers:'142K', engagement:'5.2%', engColor:'#10b981', team:'health', campaigns:5, bg:'#10b981' },
  { id:3, name:'เจ๊แดง ออนไลน์', handle:'@jedaeng.online', platform:'TT', followers:'520K', engagement:'7.1%', engColor:'#10b981', team:'ecom', campaigns:2, bg:'#f59e0b' },
  { id:4, name:'บอย PetLover', handle:'@boy.petlover', platform:'YT', followers:'98K', engagement:'3.5%', engColor:'#f59e0b', team:'rex', campaigns:4, bg:'#8b5cf6' },
  { id:5, name:'มิกซ์ GFX', handle:'@mix.gfx', platform:'IG', followers:'67K', engagement:'6.3%', engColor:'#10b981', team:'graphic', campaigns:1, bg:'#ec4899' },
  { id:6, name:'ดร.เลนส์', handle:'@dr.lens.th', platform:'FB', followers:'310K', engagement:'3.2%', engColor:'#f59e0b', team:'lasik', campaigns:6, bg:'#06b6d4' },
];
let KOL_SEQ = 10;

let NOTIFICATIONS = [
  { id:1, icon:'⚠️', icoBg:'rgba(245,158,11,.12)', msg:'งาน "ตัดต่อวิดีโอ TikTok" เลยกำหนด 1 วัน', time:'10 นาทีที่แล้ว', taskTitle:'ตัดต่อวิดีโอ TikTok แคมเปญใหม่' },
  { id:2, icon:'📋', icoBg:'rgba(59,130,246,.12)', msg:'บีม ย้ายงาน "Summer Sale" ไป In Progress', time:'1 ชม. ที่แล้ว' },
  { id:3, icon:'✅', icoBg:'rgba(16,185,129,.12)', msg:'ปาล์ม เสร็จงาน "ตอบคอมเมนต์ลูกค้า"', time:'2 ชม. ที่แล้ว' },
  { id:4, icon:'👤', icoBg:'rgba(139,92,246,.12)', msg:'มีสมาชิกใหม่สมัครเข้าระบบ รอการอนุมัติ', time:'3 ชม. ที่แล้ว' },
];

/* ---------- Helpers ---------- */
const $ = (s,r=document) => r.querySelector(s);
const $$ = (s,r=document) => Array.from(r.querySelectorAll(s));
const el = (tag,attrs={},html) => { const n=document.createElement(tag); for(const k in attrs){if(k==='class')n.className=attrs[k];else if(k==='style')n.style.cssText=attrs[k];else if(k.startsWith('data-'))n.setAttribute(k,attrs[k]);else n[k]=attrs[k];} if(html!=null)n.innerHTML=html; return n; };
const teamColor = id => TEAMS[id]?.color || '#94a3b8';
const hexToRgba = (hex,a) => { const n=parseInt(hex.slice(1),16); return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`; };
const getMember = id => MEMBERS.find(m => m.id === id);
const escapeHtml = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

/* ---------- State ---------- */
let activeTeamFilter = 'all';
let kanbanView = 'board';
let currentUser = null;
let dragId = null;

/* ============================================================
   SUPABASE INTEGRATION
   ============================================================ */
async function loadFromSupabase() {
  if (!DB.isConnected()) return false;
  try {
    const [tasks, posts, kols] = await Promise.all([
      DB.loadTasks(), DB.loadPosts(), DB.loadKols(),
    ]);
    if (tasks.length) {
      TASKS = tasks.map(t => ({
        id: t.id, team: t.team, title: t.title, priority: t.priority,
        date: t.date, description: t.description, status: t.status,
        assigneeId: t.assignee_id, overdue: t.overdue, comments: t.comments || 0,
        attach: t.attach || 0, _sb: true,
      }));
      TASK_SEQ = Math.max(...TASKS.map(t => t.id)) + 1;
    }
    if (posts.length) {
      POSTS_DATA = posts.map(p => ({
        id: p.id, day: p.day, ch: p.channel, label: p.label,
        accent: p.accent, link: p.link || '', _sb: true,
      }));
      POST_SEQ = Math.max(...POSTS_DATA.map(p => p.id)) + 1;
    }
    if (kols.length) {
      KOLS = kols.map(k => ({
        id: k.id, name: k.name, handle: k.handle, platform: k.platform,
        followers: k.followers, engagement: k.engagement, engColor: parseFloat(k.engagement) >= 4 ? '#10b981' : '#f59e0b',
        team: k.team, campaigns: k.campaigns, bg: teamColor(k.team),
      }));
      KOL_SEQ = Math.max(...KOLS.map(k => k.id)) + 1;
    }
    return true;
  } catch (e) { console.warn('Supabase load error:', e); return false; }
}

function openSetupModal() {
  const cfg = DB.getConfig();
  $('#sb-url').value = cfg?.url || '';
  $('#sb-key').value = cfg?.key || '';
  $('#setup-modal').classList.add('open');
}

function closeSetupModal() { $('#setup-modal').classList.remove('open'); }

async function saveSetup() {
  const url = $('#sb-url').value.trim();
  const key = $('#sb-key').value.trim();
  if (!url || !key) { toast('กรุณากรอก URL และ Key', 'error'); return; }
  DB.saveConfig(url, key);
  DB.init();
  if (DB.isConnected()) {
    const loaded = await loadFromSupabase();
    toast(loaded ? 'เชื่อมต่อ Supabase สำเร็จ! โหลดข้อมูลแล้ว' : 'เชื่อมต่อแล้ว (ใช้ข้อมูล demo)');
    updateDbBadge();
    closeSetupModal();
    renderAll();
  } else {
    toast('เชื่อมต่อไม่สำเร็จ — ตรวจสอบ URL และ Key', 'error');
  }
}

function disconnectSupabase() {
  DB.clearConfig();
  toast('ยกเลิกการเชื่อมต่อ Supabase แล้ว');
  updateDbBadge();
  closeSetupModal();
  location.reload();
}

function updateDbBadge() {
  const badge = $('#db-badge');
  if (!badge) return;
  if (DB.isConnected()) {
    badge.textContent = '🟢 Supabase';
    badge.style.color = '#059669';
    badge.style.background = 'rgba(16,185,129,.1)';
  } else {
    badge.textContent = '⚪ Demo mode';
    badge.style.color = '#9aa0ac';
    badge.style.background = '#f3f4f8';
  }
}

/* ============================================================
   AUTH
   ============================================================ */
function checkAuth() {
  const saved = localStorage.getItem('rx_user');
  if (saved) { currentUser = JSON.parse(saved); showApp(); }
  else showLogin();
}

function showLogin() { $('#login-overlay').classList.remove('hidden'); $('#app-shell').classList.add('hidden'); }

function showApp() {
  $('#login-overlay').classList.add('hidden');
  $('#app-shell').classList.remove('hidden');
  if (currentUser) {
    $$('.current-user-name').forEach(el => el.textContent = currentUser.name);
    $$('.current-user-role').forEach(el => el.textContent = currentUser.title);
    $$('.current-user-initial').forEach(el => el.textContent = currentUser.initial);
  }
  initApp();
}

let loginMode = 'login';
function setLoginMode(mode) {
  loginMode = mode;
  $$('.login-tabs span').forEach(t => t.classList.toggle('on', t.dataset.mode === mode));
  $('#login-register-fields').style.display = mode === 'register' ? 'block' : 'none';
  $('#login-btn').textContent = mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก';
  $('#login-err').textContent = ''; $('#login-err').style.color = '';
}

async function doLogin() {
  const user = $('#l-user').value.trim();
  const pass = $('#l-pass').value.trim();
  $('#login-err').textContent = ''; $('#login-err').style.color = '';

  if (loginMode === 'login') {
    // Try Supabase first
    if (DB.isConnected()) {
      const email = user.includes('@') ? user : user + '@kanban-rx.local';
      const res = await DB.signIn(email, pass);
      if (!res.error) {
        currentUser = res.data;
        localStorage.setItem('rx_user', JSON.stringify(currentUser));
        showApp(); return;
      }
    }
    // Fallback to demo auth
    const m = MEMBERS.find(x => x.user === user && x.pass === pass);
    if (!m) { $('#login-err').textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'; return; }
    if (m.status === 'pending') { $('#login-err').textContent = 'บัญชีรอการอนุมัติจากผู้ดูแล'; return; }
    currentUser = m;
    localStorage.setItem('rx_user', JSON.stringify(m));
    showApp();
  } else {
    const name = $('#l-name').value.trim();
    const team = $('#l-team').value;
    if (!user || !pass || !name) { $('#login-err').textContent = 'กรุณากรอกข้อมูลให้ครบ'; return; }
    // Try Supabase signup
    if (DB.isConnected()) {
      const email = user.includes('@') ? user : user + '@kanban-rx.local';
      const res = await DB.signUp(email, pass, { name, team, initial: name[0] });
      if (res.error) { $('#login-err').textContent = res.error; return; }
      $('#login-err').style.color = '#10b981';
      $('#login-err').textContent = 'สมัครสำเร็จ! รอผู้ดูแลอนุมัติ';
      setLoginMode('login'); return;
    }
    // Fallback demo
    if (MEMBERS.find(x => x.user === user)) { $('#login-err').textContent = 'ชื่อผู้ใช้นี้มีอยู่แล้ว'; return; }
    MEMBERS.push({ id:user, name, initial:name[0], role:'member', team, title:'สมาชิกใหม่', status:'pending', user, pass });
    NOTIFICATIONS.unshift({ id:Date.now(), icon:'👤', icoBg:'rgba(139,92,246,.12)', msg:`${name} สมัครเข้าระบบ รอการอนุมัติ`, time:'เมื่อสักครู่' });
    $('#login-err').style.color = '#10b981';
    $('#login-err').textContent = 'สมัครสำเร็จ! รอผู้ดูแลอนุมัติ แล้วเข้าสู่ระบบได้';
    setLoginMode('login');
  }
}

function logout() {
  localStorage.removeItem('rx_user');
  DB.signOut();
  currentUser = null;
  showLogin();
}

/* ============================================================
   TOAST
   ============================================================ */
function toast(msg, type='success') {
  const wrap = $('#toast-wrap');
  const ico = type === 'success' ? '✅' : '⚠️';
  const t = el('div', { class:'toast '+type }, `<span class="t-ico">${ico}</span>${escapeHtml(msg)}`);
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function toggleNotif() {
  const panel = $('#notif-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) renderNotif();
}
function renderNotif() {
  const list = $('#notif-list');
  if (!NOTIFICATIONS.length) { list.innerHTML = '<div class="notif-empty">ไม่มีการแจ้งเตือน</div>'; return; }
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item" data-task-title="${escapeHtml(n.taskTitle||'')}">
      <div class="notif-ico" style="background:${n.icoBg}">${n.icon}</div>
      <div><div class="msg">${escapeHtml(n.msg)}</div><div class="time">${n.time}</div></div>
    </div>`).join('');
  $$('#notif-list .notif-item').forEach(item => {
    item.addEventListener('click', () => {
      const tt = item.dataset.taskTitle;
      if (tt) { const task = TASKS.find(t => t.title === tt); if (task) openEditTask(task.id); }
      toggleNotif();
    });
  });
}
function clearNotif() { NOTIFICATIONS = []; renderNotif(); }

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  const cards = [
    { num:DASH_STATS.todo, label:'To Do · รอดำเนินการ', sq:'#94a3b8', ico:'rgba(148,163,184,.16)', pillFg:'#94a3b8', pillBg:'#f3f4f8', pill:'รอเริ่ม' },
    { num:DASH_STATS.progress, label:'In Progress · กำลังทำ', sq:'#3b82f6', ico:'rgba(59,130,246,.14)', pillFg:'#2563eb', pillBg:'rgba(59,130,246,.1)', pill:'+5 วันนี้' },
    { num:DASH_STATS.review, label:'Review · รออนุมัติ', sq:'#f59e0b', ico:'rgba(245,158,11,.15)', pillFg:'#d97706', pillBg:'rgba(245,158,11,.12)', pill:'รอตรวจ' },
    { num:DASH_STATS.done, label:'Done · เสร็จสิ้น', sq:'#10b981', ico:'rgba(16,185,129,.15)', pillFg:'#059669', pillBg:'rgba(16,185,129,.12)', pill:'29%' },
  ];
  $('#stat-row').innerHTML = cards.map(c => `<div class="stat-card"><div class="stat-top"><span class="stat-ico" style="background:${c.ico}"><span style="background:${c.sq}"></span></span><span class="stat-pill" style="color:${c.pillFg};background:${c.pillBg}">${c.pill}</span></div><div class="stat-num">${c.num}</div><div class="stat-label">${c.label}</div></div>`).join('');
  $('#prog-list').innerHTML = TEAM_PROGRESS.map(p => { const c=teamColor(p.team); return `<div><div class="prog-top"><span class="team-dot" style="background:${c}"></span><span class="prog-name">${TEAMS[p.team].name}</span><span class="prog-frac">${p.done}/${p.total}</span><span class="prog-pct" style="color:${c}">${p.pct}%</span></div><div class="prog-bar"><div class="prog-fill" style="width:${p.pct}%;background:${c}"></div></div></div>`; }).join('');
  $('#donut-legend').innerHTML = [{c:'#94a3b8',l:'To Do',v:DASH_STATS.todo},{c:'#3b82f6',l:'In Progress',v:DASH_STATS.progress},{c:'#f59e0b',l:'Review',v:DASH_STATS.review},{c:'#10b981',l:'Done',v:DASH_STATS.done}].map(x=>`<div class="legend-item"><span class="sq" style="background:${x.c}"></span><span class="lbl">${x.l}</span><span class="val">${x.v}</span></div>`).join('');
  const dl = item => `<div class="deadline-item" data-task-title="${escapeHtml(item.taskTitle||'')}"><span class="bar" style="background:${item.bar}"></span><div class="body"><div class="name">${item.title}</div><div class="sub">${item.sub}</div></div><span class="tag" style="color:${item.tagFg};background:${item.tagBg}">${item.tag}</span></div>`;
  $('#deadline-soon').innerHTML = DEADLINES_SOON.map(dl).join('');
  $('#deadline-overdue').innerHTML = DEADLINES_OVERDUE.map(dl).join('');
  $$('.deadline-item').forEach(item => item.addEventListener('click', () => { const tt=item.dataset.taskTitle; const task=TASKS.find(t=>t.title===tt); if(task) openEditTask(task.id); }));
}

/* ============================================================
   KANBAN
   ============================================================ */
function taskCard(task) {
  const tc=teamColor(task.team); const prio=PRIORITY[task.priority];
  const member=getMember(task.assigneeId); const initial=member?member.initial:(task.assigneeId||'?')[0];
  const card=el('div',{class:'task'+(task.status==='done'?' done':''),style:`border-left-color:${tc}`,draggable:'true','data-id':task.id});
  const meta=[]; if(task.comments)meta.push(`<span class="task-meta">💬${task.comments}</span>`); if(task.attach)meta.push(`<span class="task-meta">📎${task.attach}</span>`);
  card.innerHTML=`<span class="team-tag" style="color:${tc};background:${hexToRgba(tc,.1)}">${TEAMS[task.team].name}</span><div class="task-title">${task.title}</div><div class="task-foot"><span class="prio" style="color:${prio.fg};background:${prio.bg}">${task.priority}</span><span class="task-date${task.overdue?' overdue':''}">${task.date}</span>${meta.join('')}<span class="assignee" style="background:${tc}" title="${member?member.name:''}">${initial}</span></div>`;
  card.addEventListener('click', e => { if(!card.classList.contains('dragging')) openEditTask(task.id); });
  card.addEventListener('dragstart', () => { dragId=task.id; card.classList.add('dragging'); });
  card.addEventListener('dragend', () => { dragId=null; card.classList.remove('dragging'); });
  return card;
}

function renderBoard() {
  const board=$('#board'); board.innerHTML='';
  board.style.display = kanbanView==='board'?'':'none';
  $('#kanban-list-view').style.display = kanbanView==='list'?'':'none';
  $('#kanban-timeline-view').style.display = kanbanView==='timeline'?'':'none';
  if(kanbanView==='list'){renderKanbanList();return;} if(kanbanView==='timeline'){renderKanbanTimeline();return;}
  STATUSES.forEach(st => {
    const col=el('div',{class:'column','data-status':st.id});
    const items=TASKS.filter(x=>x.status===st.id&&(activeTeamFilter==='all'||x.team===activeTeamFilter));
    col.innerHTML=`<div class="col-head"><span class="dot" style="background:${st.dot}"></span><span class="name">${st.name}</span><span class="badge" style="color:${st.badgeFg}">${items.length}</span></div>`;
    items.forEach(task => col.appendChild(taskCard(task)));
    const add=el('div',{class:'add-task'},'+ เพิ่มงาน');
    add.addEventListener('click', e => { e.stopPropagation(); openTaskModal(st.id); });
    col.appendChild(add);
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault(); col.classList.remove('drag-over');
      if(dragId==null) return;
      const task=TASKS.find(x=>x.id===dragId);
      if(task && task.status!==st.id) {
        task.status=st.id;
        if(DB.isConnected()) DB.updateTask(task.id,{status:st.id});
        toast(`ย้าย "${task.title}" ไป ${st.name}`);
        renderBoard(); renderList();
      }
    });
    board.appendChild(col);
  });
}

function renderKanbanList() {
  const wrap=$('#kanban-list-view');
  const items=TASKS.filter(x=>activeTeamFilter==='all'||x.team===activeTeamFilter);
  wrap.innerHTML=`<div class="list-view-table"><div class="lv-row head"><div>งาน</div><div>ทีม</div><div>สำคัญ</div><div>สถานะ</div><div>กำหนด</div><div>ผู้รับ</div></div>${items.map(task=>{const c=teamColor(task.team);const prio=PRIORITY[task.priority];const st=STATUSES.find(s=>s.id===task.status);const member=getMember(task.assigneeId);return`<div class="lv-row" data-task-id="${task.id}"><div class="lt">${task.title}</div><div><span class="team-tag" style="color:${c};background:${hexToRgba(c,.1)}">${TEAMS[task.team].name}</span></div><div><span class="prio" style="color:${prio.fg};background:${prio.bg}">${task.priority}</span></div><div><span class="status-badge" style="color:${st.badgeFg};background:${hexToRgba(st.dot,.12)}">${st.name}</span></div><div class="task-date${task.overdue?' overdue':''}">${task.date}</div><div><span class="assignee" style="background:${c};width:22px;height:22px;font-size:10px">${member?member.initial:'?'}</span></div></div>`;}).join('')}</div>`;
  $$('#kanban-list-view .lv-row:not(.head)').forEach(row => row.addEventListener('click', () => openEditTask(+row.dataset.taskId)));
}

function renderKanbanTimeline() {
  const wrap=$('#kanban-timeline-view');
  const items=TASKS.filter(x=>activeTeamFilter==='all'||x.team===activeTeamFilter);
  const days=['25 มิ.ย.','26','27','28','29','30','1 ก.ค.','2','3','4','5'];
  wrap.innerHTML=`<div class="timeline-wrap"><div class="timeline-header"><div style="width:180px;flex-shrink:0"></div>${days.map(d=>`<div class="th">${d}</div>`).join('')}</div>${items.map((task,i)=>{const c=teamColor(task.team);const left=(i%days.length)*120;const w=(1+(i%3))*120;return`<div class="timeline-row" data-task-id="${task.id}"><div class="tl-label">${task.title}</div><div class="tl-bar-area"><div class="tl-bar" style="left:${left}px;width:${w}px;background:${c}">${task.title}</div></div></div>`;}).join('')}</div>`;
  $$('#kanban-timeline-view .timeline-row').forEach(row => row.addEventListener('click', () => openEditTask(+row.dataset.taskId)));
}

function setKanbanView(view) { kanbanView=view; $$('#kanban-seg span').forEach(s=>s.classList.toggle('on',s.dataset.view===view)); renderBoard(); }

function renderFilters() {
  const wrap=$('#kanban-filters'); wrap.innerHTML='';
  const all=el('div',{class:'chip'+(activeTeamFilter==='all'?' all':'')},'ทุกทีม');
  all.addEventListener('click', () => { activeTeamFilter='all'; renderFilters(); renderBoard(); });
  wrap.appendChild(all);
  Object.entries(TEAMS).forEach(([id,info]) => {
    const active=activeTeamFilter===id;
    const chip=el('div',{class:'chip'+(active?' active':''),style:active?`background:${info.color}`:''},`<span class="sq" style="background:${info.color}"></span>${info.name}`);
    chip.addEventListener('click', () => { activeTeamFilter=active?'all':id; renderFilters(); renderBoard(); });
    wrap.appendChild(chip);
  });
}

/* ============================================================
   ALL TASKS
   ============================================================ */
function renderList() {
  const body=$('#list-body');
  body.innerHTML=TASKS.map(task=>{const c=teamColor(task.team);const prio=PRIORITY[task.priority];const st=STATUSES.find(s=>s.id===task.status);return`<div class="list-row" data-task-id="${task.id}"><div class="lt">${task.title}</div><div><span class="team-tag" style="color:${c};background:${hexToRgba(c,.1)}">${TEAMS[task.team].name}</span></div><div><span class="prio" style="color:${prio.fg};background:${prio.bg}">${task.priority}</span></div><div class="task-date${task.overdue?' overdue':''}">${task.date}</div><div style="font-size:12.5px;font-weight:700;color:${st.dot}">${st.name}</div></div>`;}).join('');
  $$('#list-body .list-row').forEach(row => row.addEventListener('click', () => openEditTask(+row.dataset.taskId)));
}

/* ============================================================
   TASK MODAL
   ============================================================ */
let editingTaskId = null;
function buildMemberOptions(teamId) { return MEMBERS.filter(m=>m.status==='active'&&(teamId?m.team===teamId||m.role==='admin':true)).map(m=>`<option value="${m.id}">${m.name} (${m.title})</option>`).join(''); }
function openTaskModal(statusId) { editingTaskId=null; $('#modal-title').textContent='เพิ่มงานใหม่'; $('#modal-sub').textContent='สร้างการ์ดงานลงบน Kanban board'; $('#m-title').value=''; $('#m-team').value='health'; $('#m-priority').value='Medium'; $('#m-date').value=''; $('#m-status').value=statusId||'todo'; $('#m-desc').value=''; updateMemberDropdown(); $('#m-delete').style.display='none'; $('#m-save').textContent='เพิ่มงาน'; $('#modal').classList.add('open'); setTimeout(()=>$('#m-title').focus(),50); }
function openEditTask(taskId) { const task=TASKS.find(t=>t.id===taskId); if(!task)return; editingTaskId=taskId; $('#modal-title').textContent='แก้ไขงาน'; $('#modal-sub').textContent='อัปเดตรายละเอียดงาน'; $('#m-title').value=task.title; $('#m-team').value=task.team; $('#m-priority').value=task.priority; $('#m-date').value=task.date; $('#m-status').value=task.status; $('#m-desc').value=task.description||''; updateMemberDropdown(); $('#m-assignee').value=task.assigneeId||''; $('#m-delete').style.display=''; $('#m-save').textContent='บันทึก'; $('#modal').classList.add('open'); }
function updateMemberDropdown() { const teamId=$('#m-team').value; $('#m-assignee').innerHTML='<option value="">— เลือกผู้รับผิดชอบ —</option>'+buildMemberOptions(teamId); }

function submitTask() {
  const title=$('#m-title').value.trim(); if(!title){$('#m-title').focus();return;}
  const team=$('#m-team').value; const assigneeId=$('#m-assignee').value;
  const data = { team, title, priority:$('#m-priority').value, date:$('#m-date').value.trim()||'—', assigneeId, status:$('#m-status').value, description:$('#m-desc').value.trim() };
  if (editingTaskId) {
    const task=TASKS.find(t=>t.id===editingTaskId);
    if(task) { Object.assign(task,data); if(DB.isConnected()) DB.updateTask(task.id,{team:data.team,title:data.title,priority:data.priority,date:data.date,status:data.status,description:data.description,assignee_id:data.assigneeId||null}); }
    toast(`อัปเดต "${title}" สำเร็จ`);
  } else {
    const newTask = t(data);
    TASKS.push(newTask);
    if(DB.isConnected()) DB.saveTask({team:data.team,title:data.title,priority:data.priority,date:data.date,status:data.status,description:data.description,assignee_id:data.assigneeId||null});
    toast(`เพิ่มงาน "${title}" สำเร็จ`);
  }
  closeModal(); renderBoard(); renderList();
}

function deleteTask() {
  if(!editingTaskId)return;
  const task=TASKS.find(t=>t.id===editingTaskId);
  if(task && confirm(`ลบงาน "${task.title}" ?`)) {
    if(DB.isConnected()) DB.deleteTask(task.id);
    TASKS=TASKS.filter(t=>t.id!==editingTaskId);
    toast(`ลบงาน "${task.title}" แล้ว`);
    closeModal(); renderBoard(); renderList();
  }
}
function closeModal() { $('#modal').classList.remove('open'); editingTaskId=null; }

/* ============================================================
   CONTENT PLANNER
   ============================================================ */
function renderCalendar() {
  const grid=$('#cal-grid');
  const lead=[26,27,28,29,30,31];
  let cells=lead.map(d=>`<div class="cal-cell"><div class="cal-num muted">${d}</div></div>`);
  for(let d=1;d<=29;d++){
    const isToday=d===18;
    const posts=POSTS_DATA.filter(p=>p.day===d).map(p=>`<div class="post" style="border-left-color:${p.accent}" data-post-id="${p.id}"><span class="badge" style="background:${CH[p.ch]}">${p.ch}</span><span class="label">${p.label}</span></div>`).join('');
    cells.push(`<div class="cal-cell${isToday?' today':''}" data-day="${d}"><div class="cal-num${isToday?' today-num':''}">${d}</div>${posts}</div>`);
  }
  grid.innerHTML=cells.join('');
  $$('#cal-grid .post').forEach(p=>p.addEventListener('click',e=>{e.stopPropagation();openEditPost(+p.dataset.postId);}));
  $$('#cal-grid .cal-cell[data-day]').forEach(cell=>cell.addEventListener('dblclick',()=>openPostModal(+cell.dataset.day)));
}

let editingPostId=null;
function openPostModal(day) { editingPostId=null; $('#post-modal-title').textContent='เพิ่มโพสต์'; $('#p-channel').value='IG'; $('#p-label').value=''; $('#p-day').value=day||1; $('#p-status').value='#94a3b8'; $('#p-link').value=''; $('#p-delete').style.display='none'; $('#p-save').textContent='เพิ่มโพสต์'; $('#post-modal').classList.add('open'); setTimeout(()=>$('#p-label').focus(),50); }
function openEditPost(postId) { const post=POSTS_DATA.find(p=>p.id===postId); if(!post)return; editingPostId=postId; $('#post-modal-title').textContent='แก้ไขโพสต์'; $('#p-channel').value=post.ch; $('#p-label').value=post.label; $('#p-day').value=post.day; $('#p-status').value=post.accent; $('#p-link').value=post.link||''; $('#p-delete').style.display=''; $('#p-save').textContent='บันทึก'; $('#post-modal').classList.add('open'); }

function submitPost() {
  const label=$('#p-label').value.trim(); if(!label){$('#p-label').focus();return;}
  const data={ch:$('#p-channel').value,label,day:+$('#p-day').value,accent:$('#p-status').value,link:$('#p-link').value.trim()};
  if(editingPostId) {
    const post=POSTS_DATA.find(p=>p.id===editingPostId); if(post){Object.assign(post,data); if(DB.isConnected()) DB.updatePost(post.id,{channel:data.ch,label:data.label,day:data.day,accent:data.accent,link:data.link});}
    toast('อัปเดตโพสต์สำเร็จ');
  } else {
    const newPost={id:POST_SEQ++,...data};
    POSTS_DATA.push(newPost);
    if(DB.isConnected()) DB.savePost({channel:data.ch,label:data.label,day:data.day,accent:data.accent,link:data.link});
    toast('เพิ่มโพสต์สำเร็จ');
  }
  closePostModal(); renderCalendar();
}
function deletePost() { if(!editingPostId)return; if(DB.isConnected()) DB.deletePost(editingPostId); POSTS_DATA=POSTS_DATA.filter(p=>p.id!==editingPostId); toast('ลบโพสต์แล้ว'); closePostModal(); renderCalendar(); }
function closePostModal() { $('#post-modal').classList.remove('open'); editingPostId=null; }

/* ============================================================
   KOL MANAGEMENT
   ============================================================ */
function renderKOL() {
  const stats=`<div class="kol-stats"><div class="kol-stat"><div style="font-size:22px">🤝</div><div class="num">${KOLS.length}</div><div class="lbl">KOL ทั้งหมด</div></div><div class="kol-stat"><div style="font-size:22px">👥</div><div class="num">1.42M</div><div class="lbl">Followers รวม</div></div><div class="kol-stat"><div style="font-size:22px">📊</div><div class="num">5.0%</div><div class="lbl">Engagement เฉลี่ย</div></div><div class="kol-stat"><div style="font-size:22px">📣</div><div class="num">${KOLS.reduce((s,k)=>s+k.campaigns,0)}</div><div class="lbl">แคมเปญรวม</div></div></div>`;
  const table=`<div class="kol-table"><div class="kol-row head"><div>KOL</div><div>แพลตฟอร์ม</div><div>Followers</div><div>Engagement</div><div>แคมเปญ</div><div>ทีม</div></div>${KOLS.map(k=>{const tc=TEAMS[k.team]?.color||'#94a3b8';return`<div class="kol-row"><div class="kol-name"><div class="kol-avatar" style="background:${k.bg}">${k.name[0]}</div><div class="kol-info"><div class="n">${k.name}</div><div class="handle">${k.handle}</div></div></div><div><span class="platform-tag" style="background:${CH[k.platform]||'#333'}">${k.platform}</span></div><div style="font-size:13px;font-weight:700;color:var(--ink)">${k.followers}</div><div class="engage" style="color:${k.engColor}">${k.engagement}</div><div style="font-size:13px;font-weight:700;color:var(--ink)">${k.campaigns}</div><div><span class="team-tag" style="color:${tc};background:${hexToRgba(tc,.1)}">${TEAMS[k.team]?.name||''}</span></div></div>`;}).join('')}</div>`;
  $('#kol-content').innerHTML=stats+table;
}

function openKolModal() { $('#kol-modal-title').textContent='เพิ่ม KOL'; $('#k-name').value=''; $('#k-handle').value=''; $('#k-platform').value='IG'; $('#k-followers').value=''; $('#k-engagement').value=''; $('#k-team').value='health'; $('#kol-modal').classList.add('open'); setTimeout(()=>$('#k-name').focus(),50); }

function submitKol() {
  const name=$('#k-name').value.trim(); if(!name){$('#k-name').focus();return;}
  const team=$('#k-team').value;
  const kol={id:KOL_SEQ++,name,handle:$('#k-handle').value.trim()||'@'+name,platform:$('#k-platform').value,followers:$('#k-followers').value.trim()||'0',engagement:$('#k-engagement').value.trim()||'0%',engColor:'#10b981',team,campaigns:0,bg:TEAMS[team].color};
  KOLS.push(kol);
  if(DB.isConnected()) DB.saveKol({name:kol.name,handle:kol.handle,platform:kol.platform,followers:kol.followers,engagement:kol.engagement,team:kol.team,campaigns:0});
  toast(`เพิ่ม KOL "${name}" สำเร็จ`);
  $('#kol-modal').classList.remove('open'); renderKOL();
}

/* ============================================================
   REPORTS
   ============================================================ */
function renderReports() {
  const completionRate=Math.round(DASH_STATS.done/DASH_STATS.total*100); const onTimeRate=85;
  const stats=`<div class="report-stats"><div class="rpt-card"><div style="font-size:20px">📋</div><div class="num">${DASH_STATS.total}</div><div class="lbl">งานทั้งหมด</div><div class="trend" style="color:#10b981">↑ 12% จากเดือนก่อน</div></div><div class="rpt-card"><div style="font-size:20px">✅</div><div class="num">${completionRate}%</div><div class="lbl">อัตราเสร็จสิ้น</div><div class="trend" style="color:#10b981">↑ 5% จากเดือนก่อน</div></div><div class="rpt-card"><div style="font-size:20px">⏰</div><div class="num">${onTimeRate}%</div><div class="lbl">ส่งงานตรงเวลา</div><div class="trend" style="color:#f59e0b">→ คงที่</div></div><div class="rpt-card"><div style="font-size:20px">⚡</div><div class="num">${DASH_STATS.progress}</div><div class="lbl">กำลังดำเนินการ</div><div class="trend" style="color:#3b82f6">+5 วันนี้</div></div></div>`;
  const teamBars=TEAM_PROGRESS.map(p=>{const c=teamColor(p.team);return`<div class="chart-bar-item"><div class="bl"><span class="team-dot" style="background:${c};display:inline-block;vertical-align:middle;margin-right:6px"></span>${TEAMS[p.team].name}</div><div class="bar-bg"><div class="bar-fill" style="width:${p.pct}%;background:${c}">${p.pct}%</div></div></div>`;}).join('');
  const weekDays=['จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์','อาทิตย์']; const weekData=[8,12,15,7,11,3,2]; const maxW=Math.max(...weekData);
  const weekBars=weekDays.map((d,i)=>{const h=Math.round(weekData[i]/maxW*100);return`<div class="day-col"><div class="dval">${weekData[i]}</div><div class="dbar-wrap"><div class="dbar" style="height:${h}%;background:var(--brand-grad)"></div></div><div class="dlbl">${d}</div></div>`;}).join('');
  const statusDist=STATUSES.map(st=>{const count=TASKS.filter(t=>t.status===st.id).length;const pct=TASKS.length?Math.round(count/TASKS.length*100):0;return`<div class="chart-bar-item"><div class="bl"><span style="width:10px;height:10px;border-radius:3px;background:${st.dot};display:inline-block;vertical-align:middle;margin-right:6px"></span>${st.name}</div><div class="bar-bg"><div class="bar-fill" style="width:${pct}%;background:${st.dot}">${count}</div></div></div>`;}).join('');
  $('#report-content').innerHTML=`${stats}<div class="dash-row two"><div class="panel"><div class="panel-head"><div class="panel-title">ความคืบหน้าแต่ละทีม</div></div><div class="chart-bar-wrap">${teamBars}</div></div><div class="panel"><div class="panel-head"><div class="panel-title">งานที่ทำเสร็จรายสัปดาห์</div><span class="panel-meta">สัปดาห์ที่ 16-22 มิ.ย.</span></div><div class="weekly-grid">${weekBars}</div></div></div><div class="dash-row two"><div class="panel"><div class="panel-head"><div class="panel-title">สัดส่วนสถานะงาน</div></div><div class="chart-bar-wrap">${statusDist}</div></div><div class="panel"><div class="panel-head"><div class="panel-title">สรุปภาพรวม</div></div><div style="font-size:13px;color:#4a5060;line-height:1.8"><div style="margin-bottom:10px">• ทีม <b>LASIK</b> มีความคืบหน้าสูงสุดที่ <b style="color:#06b6d4">84%</b></div><div style="margin-bottom:10px">• ทีม <b>REXCUER</b> ต้องการเร่งที่สุด เหลือเพียง <b style="color:#8b5cf6">41%</b></div><div style="margin-bottom:10px">• งาน <b>Urgent</b> คงค้าง <b style="color:#dc2626">2 งาน</b> ที่เลยกำหนด</div><div>• ภาพรวมส่งงานตรงเวลาอยู่ที่ <b>${onTimeRate}%</b></div></div></div></div>`;
}

/* ============================================================
   MEMBERS
   ============================================================ */
function renderMembers() {
  const isAdmin=currentUser&&currentUser.role==='admin';
  const active=MEMBERS.filter(m=>m.status==='active'); const pending=MEMBERS.filter(m=>m.status==='pending');
  let html='';
  if(pending.length&&isAdmin){
    html+=`<div class="panel" style="border-color:#fbe0e0;background:linear-gradient(180deg,#fff,#fffafa)"><div class="deadline-head"><span class="pulse" style="background:#f59e0b"></span><div class="title" style="color:#d97706">รออนุมัติ</div><span class="count" style="color:#d97706">${pending.length} คน</span></div><div class="member-table">${pending.map(m=>`<div class="member-row"><div class="member-name"><span class="user-avatar" style="width:30px;height:30px;font-size:11px">${m.initial}</span><div><div style="font-size:13px;font-weight:700;color:var(--ink-2)">${m.name}</div><div style="font-size:11px;color:var(--muted)">@${m.user}</div></div></div><div>${TEAMS[m.team]?.name||'—'}</div><div><span class="role-badge" style="color:#d97706;background:rgba(245,158,11,.12)">รออนุมัติ</span></div><div></div><div><button class="approve-btn" style="background:#10b981;color:#fff" data-approve="${m.id}">อนุมัติ</button> <button class="approve-btn" style="background:#fee2e2;color:#dc2626" data-reject="${m.id}">ปฏิเสธ</button></div></div>`).join('')}</div></div>`;
  }
  html+=`<div class="member-table"><div class="member-row head"><div>สมาชิก</div><div>ทีม</div><div>ตำแหน่ง</div><div>บทบาท</div><div>สถานะ</div></div>${active.map(m=>{const tc=TEAMS[m.team]?.color||'#4f46e5';const rb=m.role==='admin'?'<span class="role-badge" style="color:#4f46e5;background:rgba(79,70,229,.1)">Admin</span>':'<span class="role-badge" style="color:#4a5060;background:#f1f2f7">Member</span>';return`<div class="member-row"><div class="member-name"><span class="user-avatar" style="width:30px;height:30px;font-size:11px;background:${tc}">${m.initial}</span><div><div style="font-size:13px;font-weight:700;color:var(--ink-2)">${m.name}</div><div style="font-size:11px;color:var(--muted)">@${m.user}</div></div></div><div><span class="team-tag" style="color:${tc};background:${hexToRgba(tc,.1)}">${TEAMS[m.team]?.name||'ทุกทีม'}</span></div><div style="font-size:12.5px;color:#4a5060">${m.title}</div><div>${rb}</div><div><span class="role-badge" style="color:#059669;background:rgba(16,185,129,.12)">Active</span></div></div>`;}).join('')}</div>`;
  $('#members-content').innerHTML=html;
  $$('[data-approve]').forEach(btn=>btn.addEventListener('click',()=>{const m=MEMBERS.find(x=>x.id===btn.dataset.approve);if(m){m.status='active';if(DB.isConnected())DB.updateProfile(m.id,{status:'active'});toast(`อนุมัติ ${m.name} สำเร็จ`);renderMembers();}}));
  $$('[data-reject]').forEach(btn=>btn.addEventListener('click',()=>{const idx=MEMBERS.findIndex(x=>x.id===btn.dataset.reject);if(idx>=0){const name=MEMBERS[idx].name;MEMBERS.splice(idx,1);toast(`ปฏิเสธ ${name} แล้ว`);renderMembers();}}));
}

/* ============================================================
   AI ASSISTANT
   ============================================================ */
const AI_SYSTEM='คุณคือ "R.X. AI" ผู้ช่วยอัจฉริยะในแอปบริหารงานทีมการตลาด "Kanban Marketing Team R.X." ทีมในระบบมี 5 ทีม: 1) Consumer Health 2) E-Commerce 3) LASIK 4) REXCUER 5) Graphic. ตอบเป็นภาษาไทยเสมอ กระชับ เป็นกันเองแบบมืออาชีพ';
let chatMessages=[{role:'assistant',content:'สวัสดีค่ะ ฉัน R.X. AI ผู้ช่วยทีมการตลาด ✦\nถามอะไรก็ได้เกี่ยวกับการวางแผนคอนเทนต์ การแตกงาน หรือการสรุปสถานะโปรเจกต์ของทั้ง 5 ทีมได้เลยค่ะ'}];
let chatLoading=false;

function renderChat() {
  const scroll=$('#chat-scroll'); scroll.innerHTML='';
  chatMessages.forEach(m=>{const isUser=m.role==='user';const row=el('div',{class:'msg-row'+(isUser?' user':'')});if(!isUser)row.appendChild(el('div',{class:'msg-ai-ico'},'✦'));row.appendChild(el('div',{class:'bubble '+(isUser?'user':'ai')},escapeHtml(m.content)));scroll.appendChild(row);});
  if(chatLoading){const row=el('div',{class:'msg-row'});row.appendChild(el('div',{class:'msg-ai-ico'},'✦'));row.appendChild(el('div',{class:'typing'},'<span></span><span></span><span></span>'));scroll.appendChild(row);}
  requestAnimationFrame(()=>{scroll.scrollTop=scroll.scrollHeight+200;});
}

function getApiKey(){return localStorage.getItem('rx_anthropic_key')||'';}
function setApiKey(k){localStorage.setItem('rx_anthropic_key',k);}

async function callClaude(history){const key=getApiKey();if(!key)return null;const messages=history.filter((m,i)=>!(i===0&&m.role==='assistant')).map(m=>({role:m.role,content:m.content}));const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:1024,system:AI_SYSTEM,messages})});if(!res.ok)throw new Error('API '+res.status);const data=await res.json();return(data.content||[]).map(b=>b.text||'').join('').trim();}

function offlineReply(text){if(text.includes('ไอเดีย')||text.toLowerCase().includes('ig'))return'ไอเดียคอนเทนต์ Instagram 3 โพสต์ (ทีม LASIK) ✦\n\n1) Reels — "เลสิคจริง ใน 60 วินาที"\n   #เลสิค #LASIK #สายตาสั้น\n\n2) Carousel — "5 ความเชื่อผิดๆ เรื่องเลสิค"\n   ปิดท้ายด้วย CTA จองปรึกษา\n\n3) Live teaser — "ถาม-ตอบกับจักษุแพทย์"';if(text.includes('แตกงาน')||text.includes('sub-task'))return'แตกงาน "แคมเปญ Summer Sale" ✦\n\n• กำหนดธีม — บีม · 1 ก.ค.\n• Key Visual — ทีม Graphic · 3 ก.ค.\n• ตั้งค่า Ads — ฟ้า · 4 ก.ค.\n• เขียน caption — บีม · 5 ก.ค.\n• สรุปผล — บีม · หลังแคมเปญ 2 วัน';if(text.includes('สรุป')||text.includes('สถานะ')||text.includes('โฟกัส'))return'สรุปสถานะ 5 ทีม ✦\n\n• LASIK 84% — เกือบปิด\n• Consumer Health 72%\n• Graphic 66%\n• E-Commerce 58%\n• REXCUER 41% — ช้าสุด ⚠️\n\nโฟกัส:\n1) TikTok REXCUER (Urgent)\n2) ไลฟ์สด LASIK\n3) Key Visual โปรโมชั่น';return'รับทราบค่ะ ✦ ลองพิมพ์คำถาม หรือกดปุ่มลัดด้านล่างได้เลยค่ะ';}

async function sendChat(preset){const inputEl=$('#ai-input');const text=(typeof preset==='string'?preset:inputEl.value).trim();if(!text||chatLoading)return;chatMessages.push({role:'user',content:text});inputEl.value='';chatLoading=true;renderChat();try{let reply=await callClaude(chatMessages);if(reply==null){await new Promise(r=>setTimeout(r,650));reply=offlineReply(text);}chatMessages.push({role:'assistant',content:reply||'ขออภัยค่ะ'});}catch(err){chatMessages.push({role:'assistant',content:'ขออภัยค่ะ เชื่อมต่อ AI ไม่ได้ ('+err.message+')'});}chatLoading=false;renderChat();}

function promptApiKey(){const k=window.prompt('วาง Anthropic API key (sk-ant-...)\nเว้นว่างเพื่อใช้โหมดออฟไลน์',getApiKey());if(k===null)return;setApiKey(k.trim());$('#ai-model').textContent=k.trim()?'claude-haiku · เชื่อมต่อแล้ว':'claude-haiku';}

/* ============================================================
   VIEW NAV
   ============================================================ */
function switchView(view){$$('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+view));$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));$$('.mobile-nav .mn').forEach(n=>n.classList.toggle('active',n.dataset.view===view));if(view==='alltasks')renderList();if(view==='kol')renderKOL();if(view==='reports')renderReports();if(view==='members')renderMembers();}

function renderAll(){renderDashboard();renderFilters();renderBoard();renderCalendar();renderList();renderChat();}

/* ============================================================
   INIT
   ============================================================ */
async function initApp() {
  DB.init();
  await loadFromSupabase();
  updateDbBadge();
  renderAll();

  $$('.nav-item').forEach(n=>n.addEventListener('click',()=>switchView(n.dataset.view)));
  $$('.mobile-nav .mn').forEach(n=>n.addEventListener('click',()=>switchView(n.dataset.view)));
  $$('[data-new-task]').forEach(b=>b.addEventListener('click',()=>openTaskModal('todo')));

  $('#m-cancel').addEventListener('click',closeModal);
  $('#m-save').addEventListener('click',submitTask);
  $('#m-delete').addEventListener('click',deleteTask);
  $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  $('#m-team').addEventListener('change',updateMemberDropdown);

  $('#add-post-btn').addEventListener('click',()=>openPostModal(1));
  $('#p-cancel').addEventListener('click',closePostModal);
  $('#p-save').addEventListener('click',submitPost);
  $('#p-delete').addEventListener('click',deletePost);
  $('#post-modal').addEventListener('click',e=>{if(e.target.id==='post-modal')closePostModal();});

  $('#add-kol-btn').addEventListener('click',openKolModal);
  $('#k-cancel').addEventListener('click',()=>$('#kol-modal').classList.remove('open'));
  $('#k-save').addEventListener('click',submitKol);
  $('#kol-modal').addEventListener('click',e=>{if(e.target.id==='kol-modal')$('#kol-modal').classList.remove('open');});

  $('#notif-btn').addEventListener('click',toggleNotif);
  document.addEventListener('click',e=>{if(!e.target.closest('.notif-wrap'))$('#notif-panel').classList.remove('open');});

  $$('#kanban-seg span').forEach(s=>s.addEventListener('click',()=>setKanbanView(s.dataset.view)));

  $('#ai-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}});
  $('#ai-send').addEventListener('click',()=>sendChat());
  $('#ai-model').addEventListener('click',promptApiKey);
  if(getApiKey())$('#ai-model').textContent='claude-haiku · เชื่อมต่อแล้ว';
  $$('[data-ask]').forEach(b=>b.addEventListener('click',()=>sendChat(b.dataset.ask)));

  $$('[data-logout]').forEach(b=>b.addEventListener('click',logout));

  // Supabase setup
  const sbBtn=$('#db-badge');
  if(sbBtn) sbBtn.addEventListener('click',openSetupModal);
  const sbCancel=$('#sb-cancel'); if(sbCancel) sbCancel.addEventListener('click',closeSetupModal);
  const sbSave=$('#sb-save'); if(sbSave) sbSave.addEventListener('click',saveSetup);
  const sbDisconnect=$('#sb-disconnect'); if(sbDisconnect) sbDisconnect.addEventListener('click',disconnectSupabase);
  const setupModal=$('#setup-modal'); if(setupModal) setupModal.addEventListener('click',e=>{if(e.target.id==='setup-modal')closeSetupModal();});

  switchView('dashboard');
}

document.addEventListener('DOMContentLoaded', checkAuth);
