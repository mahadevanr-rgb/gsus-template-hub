-- TemplateHub Component Registry Table
-- Run this in Supabase SQL Editor once

create table if not exists components (
  id           text primary key,
  name         text not null,
  slug         text not null unique,
  category     text not null,
  description  text,
  framework    text default 'react',
  language     text default 'javascript',
  styling      text default 'css',
  version      text default '1.0.0',
  dependencies jsonb default '[]',
  tags         jsonb default '[]',
  files        jsonb default '[]',
  uses         jsonb default '[]',
  author       text default 'TemplateHub',
  created_at   text,
  updated_at   text
);

-- Enable Row Level Security
alter table components enable row level security;

-- Allow anyone to read components (public registry)
create policy "Public read access"
  on components for select
  using (true);
