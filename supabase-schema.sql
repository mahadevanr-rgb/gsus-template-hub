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


  -- Form Compositions table (Step 3C)
create table if not exists form_compositions (
  id           text primary key,
  name         text not null,
  slug         text not null unique,
  category     text not null,
  version      text default '1.0.0',
  description  text,
  overview     text,
  fields       jsonb default '[]',
  action       jsonb default '{}',
  dependencies jsonb default '[]',
  tags         jsonb default '[]',
  created_at   text,
  updated_at   text
);

alter table form_compositions enable row level security;

create policy "Public read access"
  on form_compositions for select
  using (true);

create policy "Public insert access"
  on form_compositions for insert
  with check (true);

-- Customized Cards Table (Card Customizer)
create table if not exists customized_cards (
  id                  text primary key,
  name                text not null,
  source_card_id      text not null,
  customization       jsonb not null default '{}',
  content             jsonb default '{}',
  responsive_settings jsonb default '{}',
  schema_version      text default '1.0.0',
  created_at          text,
  updated_at          text
);

alter table customized_cards enable row level security;

create policy "Public read access for customized_cards"
  on customized_cards for select
  using (true);

create policy "Public insert/update access for customized_cards"
  on customized_cards for all
  using (true);

