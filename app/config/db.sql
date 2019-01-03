CREATE TABLE keys (
    key text,
    VALUE text,
    TIMESTAMP timestamptz NOT NULL DEFAULT (now() AT TIME zone 'utc'),
    PRIMARY key (key, TIMESTAMP)
);
