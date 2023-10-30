/*
  Warnings:

  - Added the required column `hasBuild` to the `DockerImages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DockerImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hasBuild" BOOLEAN NOT NULL
);
INSERT INTO "new_DockerImages" ("id", "name") SELECT "id", "name" FROM "DockerImages";
DROP TABLE "DockerImages";
ALTER TABLE "new_DockerImages" RENAME TO "DockerImages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
