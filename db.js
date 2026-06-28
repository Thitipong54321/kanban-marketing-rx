/* ============================================================
   db.js — Supabase data layer for Kanban R.X.
   "Sync on load, write-through on change"
   Falls back to in-memory demo data when Supabase is not configured.
   ============================================================ */

const DB = (() => {
  let supabase = null;
  let connected = false;

  function getConfig() {
    const url = localStorage.getItem('rx_sb_url');
    const key = localStorage.getItem('rx_sb_key');
    return (url && key) ? { url, key } : null;
  }

  function saveConfig(url, key) {
    localStorage.setItem('rx_sb_url', url);
    localStorage.setItem('rx_sb_key', key);
  }

  function clearConfig() {
    localStorage.removeItem('rx_sb_url');
    localStorage.removeItem('rx_sb_key');
  }

  function init() {
    const cfg = getConfig();
    if (cfg && window.supabase) {
      try {
        supabase = window.supabase.createClient(cfg.url, cfg.key);
        connected = true;
      } catch (e) {
        console.warn('Supabase init failed:', e);
        connected = false;
      }
    }
    return connected;
  }

  function isConnected() { return connected; }
  function client() { return supabase; }

  // ---- Auth ----
  async function signIn(email, password) {
    if (!supabase) return { error: 'ไม่ได้เชื่อมต่อ Supabase' };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
    if (profile?.status === 'pending') {
      await supabase.auth.signOut();
      return { error: 'บัญชีรอการอนุมัติจากผู้ดูแล' };
    }
    return { data: { ...data.user, ...profile } };
  }

  async function signUp(email, password, meta) {
    if (!supabase) return { error: 'ไม่ได้เชื่อมต่อ Supabase' };
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: meta },
    });
    if (error) return { error: error.message };
    return { data };
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
  }

  async function getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single();
    return profile ? { ...data.session.user, ...profile } : null;
  }

  // ---- CRUD helpers ----
  async function fetchAll(table) {
    if (!supabase) return [];
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: true });
    return error ? [] : data;
  }

  async function insert(table, row) {
    if (!supabase) return null;
    const { data, error } = await supabase.from(table).insert(row).select().single();
    return error ? null : data;
  }

  async function update(table, id, changes) {
    if (!supabase) return;
    await supabase.from(table).update(changes).eq('id', id);
  }

  async function remove(table, id) {
    if (!supabase) return;
    await supabase.from(table).delete().eq('id', id);
  }

  // ---- Tasks ----
  async function loadTasks() { return fetchAll('tasks'); }
  async function saveTask(task) { return insert('tasks', task); }
  async function updateTask(id, changes) { return update('tasks', id, changes); }
  async function deleteTask(id) { return remove('tasks', id); }

  // ---- Posts ----
  async function loadPosts() { return fetchAll('posts'); }
  async function savePost(post) { return insert('posts', post); }
  async function updatePost(id, changes) { return update('posts', id, changes); }
  async function deletePost(id) { return remove('posts', id); }

  // ---- KOLs ----
  async function loadKols() { return fetchAll('kols'); }
  async function saveKol(kol) { return insert('kols', kol); }

  // ---- Profiles ----
  async function loadProfiles() { return fetchAll('profiles'); }
  async function updateProfile(id, changes) { return update('profiles', id, changes); }

  return {
    init, isConnected, client, getConfig, saveConfig, clearConfig,
    signIn, signUp, signOut, getSession,
    loadTasks, saveTask, updateTask, deleteTask,
    loadPosts, savePost, updatePost, deletePost,
    loadKols, saveKol,
    loadProfiles, updateProfile,
  };
})();
