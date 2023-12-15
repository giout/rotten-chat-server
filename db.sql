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

CREATE TABLE IF NOT EXISTS chat.rooms (
    room_id SERIAL,
    room_title TEXT NOT NULL,
    PRIMARY KEY (room_id)
)

CREATE TABLE IF NOT EXISTS chat.messages (
    message_id SERIAL,
    message_content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_is_critic BOOLEAN NOT NULL,
    message_date TIMESTAMP NOT NULL DEFAULT NOW(),
    room_id INTEGER NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES rotten.users (user_id),
    FOREIGN KEY (room_id) REFERENCES chat.rooms (room_id)
);

