CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "image" TEXT
);
