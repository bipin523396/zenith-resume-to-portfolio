-- ==============================================================================
-- ZENITH RESUME-TO-PORTFOLIO: SUPABASE SCHEMA MIGRATION
-- Run this in your Supabase Project: Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create portfolios table
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  custom_title text,
  profile jsonb not null,
  theme jsonb not null,
  is_public boolean not null default true,
  view_count integer not null default 0,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Performance indexes
create index if not exists portfolios_slug_idx on public.portfolios (slug);
create index if not exists portfolios_is_public_idx on public.portfolios (is_public);
create index if not exists portfolios_user_id_idx on public.portfolios (user_id);
create index if not exists portfolios_created_at_idx on public.portfolios (created_at desc);

-- 3. Automatic updated_at timestamp trigger
create or replace function public.handle_portfolios_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_portfolios_updated_at on public.portfolios;
create trigger set_portfolios_updated_at
  before update on public.portfolios
  for each row execute function public.handle_portfolios_updated_at();

-- 4. Enable Row Level Security (RLS)
alter table public.portfolios enable row level security;

-- Drop previous policies if re-running
drop policy if exists "Allow public read access to active portfolios" on public.portfolios;
drop policy if exists "Allow insert or upsert portfolios" on public.portfolios;
drop policy if exists "Allow portfolio updates" on public.portfolios;

-- 4a. Allow anyone to view public published portfolios
create policy "Allow public read access to active portfolios"
  on public.portfolios
  for select
  using (is_public = true);

-- 4b. Allow users or anonymous creators to publish / upsert portfolios
create policy "Allow insert or upsert portfolios"
  on public.portfolios
  for insert
  with check (true);

-- 4c. Allow updates to portfolios
create policy "Allow portfolio updates"
  on public.portfolios
  for update
  using (true)
  with check (true);

-- 5. Safe atomic view count increment function
create or replace function public.increment_portfolio_views(portfolio_slug text)
returns void as $$
begin
  update public.portfolios
  set view_count = coalesce(view_count, 0) + 1
  where slug = portfolio_slug;
end;
$$ language plpgsql security definer;

