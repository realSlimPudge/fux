-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specific" TEXT NOT NULL,
    "measurable" TEXT NOT NULL,
    "achievable" TEXT NOT NULL,
    "relevant" TEXT NOT NULL,
    "timeBoundText" TEXT NOT NULL,
    "timeBoundDate" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("achievable", "description", "id", "measurable", "relevant", "specific", "timeBoundDate", "timeBoundText", "title", "userId") SELECT "achievable", "description", "id", "measurable", "relevant", "specific", "timeBoundDate", "timeBoundText", "title", "userId" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
