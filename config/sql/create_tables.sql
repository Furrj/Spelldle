CREATE SCHEMA users;
CREATE SCHEMA spells;
CREATE SCHEMA game_sessions;
CREATE SCHEMA guesses;

CREATE TABLE users.ids
(
    user_id SERIAL PRIMARY KEY
);

CREATE TABLE spells.ids
(
    spell_id INTEGER PRIMARY KEY
);

CREATE TABLE game_sessions.ids
(
  game_session_id SERIAL PRIMARY KEY
);

CREATE TABLE spells.categories
(
  spell_id INTEGER PRIMARY KEY UNIQUE REFERENCES spells.ids(spell_id),
  name TEXT UNIQUE,
  school INTEGER,
  casting_time INTEGER,
  range INTEGER,
  target INTEGER,
  duration INTEGER,
  components INTEGER[],
  class INTEGER[],
  effects INTEGER[]
);

CREATE TABLE spells.level_objects
(
  spell_id INTEGER PRIMARY KEY UNIQUE references spells.ids(spell_id),
  level INTEGER,
  is_ritual BOOLEAN
);

CREATE TABLE game_sessions.data
(
  user_id INTEGER REFERENCES users.ids(user_id),
  game_session_id INTEGER REFERENCES game_sessions.ids(game_session_id),
  spell_id INTEGER REFERENCES spells.ids(spell_id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  rounds SMALLINT
);

CREATE TABLE users.data
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES users.ids(user_id),
    username   VARCHAR(32) UNIQUE,
    password   VARCHAR(32),
    first_name VARCHAR(32),
    last_name  VARCHAR(32),
    game_session_id INTEGER REFERENCES game_sessions.ids(game_session_id)
);

CREATE TABLE guesses.categories
(
  game_session_id INTEGER REFERENCES game_sessions.ids(game_session_id),
  round SMALLINT,
  school INTEGER,
  casting_time INTEGER,
  range INTEGER,
  target INTEGER,
  duration INTEGER,
  components INTEGER[],
  class INTEGER[],
  effects INTEGER[],
  PRIMARY KEY(game_session_id, round)
);

CREATE TABLE guesses.level_objects
(
  game_session_id INTEGER REFERENCES game_sessions.ids(game_session_id),
  round SMALLINT,
  level INTEGER,
  is_ritual BOOLEAN,
  PRIMARY KEY(game_session_id, round)
);

CREATE TABLE guesses.results
(
  game_session_id INTEGER REFERENCES game_sessions.ids(game_session_id),
  round SMALLINT,
  school SMALLINT,
  casting_time SMALLINT,
  range SMALLINT,
  target SMALLINT,
  duration SMALLINT,
  level SMALLINT,
  components SMALLINT,
  class SMALLINT,
  effects SMALLINT,
  PRIMARY KEY(game_session_id, round)
);
