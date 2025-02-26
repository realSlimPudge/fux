-- CreateTable
CREATE TABLE "Goal" (
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
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
