-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bio" TEXT,
    "avatar" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("avatar", "bio", "id", "userId") SELECT "avatar", "bio", "id", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
