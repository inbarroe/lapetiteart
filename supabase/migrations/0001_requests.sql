-- Requests sent through the website's contact form.
-- Nothing here is a confirmed booking: Tami calls the family and only then
-- marks the request as confirmed.

create table public.requests (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'confirmed', 'not_relevant', 'done')),

  event_type       text not null
                   check (event_type in ('birthday', 'workshop', 'camp', 'private_camp', 'class', 'other')),
  location_type    text not null
                   check (location_type in ('studio', 'customer', 'undecided')),
  city             text,
  preferred_date   date,
  alternative_date date,
  child_age        smallint check (child_age between 1 and 120),
  kids_count       smallint check (kids_count between 1 and 500),

  parent_name      text not null,
  phone            text not null,
  email            text,
  call_time        text,
  notes            text,

  -- Filled in by Tami later, from the admin area.
  agreed_price     integer,
  admin_notes      text
);

create index requests_status_created_at_idx on public.requests (status, created_at desc);

-- Row Level Security with no policies: the public (anon) key can't read or
-- write anything. Only the website's server, using the secret key, can.
alter table public.requests enable row level security;

-- The project doesn't expose new tables automatically, so grant access
-- explicitly, and only to the server-side role.
grant select, insert, update, delete on public.requests to service_role;
