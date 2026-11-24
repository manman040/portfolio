-- Guestbook schema. Run once in Supabase: SQL Editor > New query > paste > Run.
-- Comments stay hidden until approved: Table Editor > guestbook_comments > approved = true.

create table public.guestbook_comments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 60),
  message text not null check (char_length(btrim(message)) between 2 and 500),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index guestbook_comments_created_at_idx
  on public.guestbook_comments (created_at desc);

alter table public.guestbook_comments enable row level security;

-- Visitors can read approved rows and submit a name and message, nothing else.
revoke all on public.guestbook_comments from anon, authenticated;
grant select (id, name, message, approved, created_at)
  on public.guestbook_comments to anon;
grant insert (name, message) on public.guestbook_comments to anon;

create policy "Visitors read approved comments"
  on public.guestbook_comments for select to anon
  using (approved);

create policy "Visitors submit unapproved comments"
  on public.guestbook_comments for insert to anon
  with check (not approved);

-- Spam limits enforced in the database, so they cannot be skipped by calling
-- the API directly. They are site-wide: visitors are not tracked.
create function public.guestbook_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform pg_advisory_xact_lock(727001);
  if (select count(*) from public.guestbook_comments
      where created_at > now() - interval '1 hour') >= 20
     or (select count(*) from public.guestbook_comments
         where not approved) >= 200 then
    raise exception 'guestbook_limit';
  end if;
  if new.message ~* '(https?://|www\.)' then
    raise exception 'guestbook_links';
  end if;
  return new;
end;
$$;

revoke execute on function public.guestbook_limit() from public, anon, authenticated;

create trigger guestbook_limit
  before insert on public.guestbook_comments
  for each row execute function public.guestbook_limit();
