/*
  Warnings:

  - Added the required column `containerID` to the `Containers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Containers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "containerID" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "Containers_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "DockerImages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Containers" ("id", "imageId") SELECT "id", "imageId" FROM "Containers";
DROP TABLE "Containers";
ALTER TABLE "new_Containers" RENAME TO "Containers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
