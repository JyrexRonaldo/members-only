const { argv } = require("node:process")

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ),
  lastname VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  is_member BOOLEAN,
  is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  text VARCHAR ( 255 ),
  added TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member_posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  console.log(argv[2])
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
