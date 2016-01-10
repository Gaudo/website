create table guides(
    id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created TIMESTAMP NOT NULL,
    modified TIMESTAMP
);
