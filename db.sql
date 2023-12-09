CREATE SCHEMA IF NOT EXISTS rotten;

CREATE TABLE IF NOT EXISTS rotten.users (
    user_id SERIAL,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    pass TEXT NOT NULL,
    is_critic BOOLEAN NOT NULL,
    UNIQUE (username),
    PRIMARY KEY (user_id)
);

CREATE SCHEMA IF NOT EXISTS chat;

CREATE TABLE IF NOT EXISTS chat.messages (
    message_id SERIAL,
    message_content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    message_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES rotten.users (user_id)
);