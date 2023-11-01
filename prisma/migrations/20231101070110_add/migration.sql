-- CreateTable
CREATE TABLE "Containers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "Containers_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "DockerImages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
