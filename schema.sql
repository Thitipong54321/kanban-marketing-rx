-- ============================================================
-- Kanban · Marketing Team R.X.
-- Supabase Database Schema
--
-- วิธีใช้: Copy ทั้งหมดไปวางใน Supabase → SQL Editor → Run
-- ============================================================

-- 1) Profiles — extends Supabase Auth
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  initial text not null default '',
  role text not null default 'member',  -- admin | member
  team text,                             -- health | ecom | lasik | rex | graphic
  title text default 'สมาชิกใหม่',
  status text not null default 'pending', -- active | pending
  created_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Profiles are viewable by authenticated" on profiles for select to authenticated using (true);
create policy "Users can update own profile" on profiles for update to authenticated using (auth.uid() = id);
create policy "Admins can update any profile" on profiles for update to authenticated using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Auth trigger can insert profiles" on profiles for insert with check (true);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, name, initial, role, team, title, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(left(new.raw_user_meta_data->>'name', 1), 'U'),
    coalesce(new.raw_user_meta_data->>'role', 'member'),
    new.raw_user_meta_data->>'team',
    coalesce(new.raw_user_meta_data->>'title', 'สมาชิกใหม่'),
    case when new.raw_user_meta_data->>'role' = 'admin' then 'active' else 'pending' end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- 2) Tasks
create table if not exists tasks (
  id bigserial primary key,
  team text not null,
  title text not null,
  priority text not null default 'Medium',
  date text,
  description text,
  status text not null default 'todo',  -- todo | progress | review | done
  assignee_id uuid references profiles(id) on delete set null,
  overdue boolean default false,
  comments int default 0,
  attach int default 0,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table tasks enable row level security;
create policy "Tasks are viewable by authenticated" on tasks for select to authenticated using (true);
create policy "Tasks are insertable by authenticated" on tasks for insert to authenticated with check (true);
create policy "Tasks are updatable by authenticated" on tasks for update to authenticated using (true);
create policy "Tasks are deletable by authenticated" on tasks for delete to authenticated using (true);


-- 3) Posts (Content Planner)
create table if not exists posts (
  id bigserial primary key,
  day int not null check (day between 1 and 31),
  channel text not null,  -- IG | FB | TT | YT | LN
  label text not null,
  accent text default '#94a3b8',
  link text,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

alter table posts enable row level security;
create policy "Posts are viewable by authenticated" on posts for select to authenticated using (true);
create policy "Posts are insertable by authenticated" on posts for insert to authenticated with check (true);
create policy "Posts are updatable by authenticated" on posts for update to authenticated using (true);
create policy "Posts are deletable by authenticated" on posts for delete to authenticated using (true);


-- 4) KOLs
create table if not exists kols (
  id bigserial primary key,
  name text not null,
  handle text,
  platform text not null,  -- IG | FB | TT | YT | LN
  followers text,
  engagement text,
  team text,
  campaigns int default 0,
  created_at timestamptz default now()
);

alter table kols enable row level security;
create policy "KOLs are viewable by authenticated" on kols for select to authenticated using (true);
create policy "KOLs are insertable by authenticated" on kols for insert to authenticated with check (true);
create policy "KOLs are updatable by authenticated" on kols for update to authenticated using (true);
create policy "KOLs are deletable by authenticated" on kols for delete to authenticated using (true);


-- 5) Seed data — insert after running schema
-- (Teams ใช้เป็น reference ในโค้ดฝั่ง client ไม่ต้องสร้าง table แยก)

-- Admin user: สร้างผ่าน Supabase Auth → Dashboard → Users → Invite
-- แล้วอัปเดต profile:
-- update profiles set role='admin', status='active', name='เอิร์ธ', initial='อ', title='Marketing Lead' where id='<user-uuid>';

-- Seed tasks
insert into tasks (team, title, priority, date, status, overdue) values
  ('health',  'รีวิวผลิตภัณฑ์เสริมอาหารตัวใหม่', 'Medium', '3 ก.ค.',    'todo',     false),
  ('graphic', 'ออกแบบ Key Visual โปรโมชั่นกลางปี', 'High',   '2 ก.ค.',    'todo',     false),
  ('health',  'แผนคอนเทนต์ LINE OA เดือนหน้า',   'Medium', '4 ก.ค.',    'todo',     false),
  ('rex',     'ตัดต่อวิดีโอ TikTok แคมเปญใหม่',   'Urgent', 'เลย 1 วัน', 'progress', true),
  ('ecom',    'วางแผนแคมเปญ Summer Sale',         'High',   '30 มิ.ย.',  'progress', false),
  ('lasik',   'เขียนบทความ SEO สุขภาพดวงตา',     'High',   '1 ก.ค.',    'progress', false),
  ('lasik',   'นัดหมายไลฟ์สดให้ความรู้',          'High',   '1 ก.ค.',    'progress', false),
  ('graphic', 'ถ่ายภาพสินค้า Lookbook คอลใหม่',   'Medium', '29 มิ.ย.',  'review',   false),
  ('ecom',    'ตั้งค่า Ads Manager FB / IG',       'Medium', '30 มิ.ย.',  'review',   false),
  ('rex',     'อัปเดตหน้า Landing Page',           'High',   '29 มิ.ย.',  'review',   false),
  ('ecom',    'สรุปยอดขายไตรมาส 2',               'Low',    '25 มิ.ย.',  'done',     false),
  ('health',  'ตอบคอมเมนต์ลูกค้าประจำสัปดาห์',    'Low',    '26 มิ.ย.',  'done',     false);

-- Seed posts
insert into posts (day, channel, label, accent) values
  (2,  'IG', 'รีวิวสินค้าใหม่',  '#10b981'),
  (3,  'TT', 'คลิปสั้นเลสิค',    '#3b82f6'),
  (5,  'FB', 'โปรกลางเดือน',     '#f59e0b'),
  (6,  'YT', 'วิดีโอ REXCUER',   '#94a3b8'),
  (9,  'LN', 'บรอดแคสต์',        '#3b82f6'),
  (11, 'IG', 'Carousel',         '#f59e0b'),
  (12, 'FB', 'Flash Sale',       '#3b82f6'),
  (12, 'IG', 'Flash Sale',       '#3b82f6'),
  (16, 'TT', 'Behind scene',     '#94a3b8'),
  (18, 'YT', 'รีวิวเลสิคจริง',    '#f59e0b'),
  (20, 'IG', 'Mid-year',         '#94a3b8'),
  (24, 'FB', 'Q3 teaser',        '#94a3b8'),
  (26, 'LN', 'ดูแลหลังเลสิค',     '#3b82f6');

-- Seed KOLs
insert into kols (name, handle, platform, followers, engagement, team, campaigns) values
  ('หมอกอล์ฟ',        '@drgolf_eye',     'IG', '285K', '4.8%', 'lasik',  3),
  ('แพร Health Coach', '@prae.healthy',   'IG', '142K', '5.2%', 'health', 5),
  ('เจ๊แดง ออนไลน์',   '@jedaeng.online', 'TT', '520K', '7.1%', 'ecom',   2),
  ('บอย PetLover',     '@boy.petlover',   'YT', '98K',  '3.5%', 'rex',    4),
  ('มิกซ์ GFX',        '@mix.gfx',        'IG', '67K',  '6.3%', 'graphic',1),
  ('ดร.เลนส์',         '@dr.lens.th',     'FB', '310K', '3.2%', 'lasik',  6);
