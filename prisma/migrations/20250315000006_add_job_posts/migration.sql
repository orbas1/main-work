-- CreateTable
CREATE TABLE "JobPost" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "benefits" TEXT,
    "jobType" TEXT NOT NULL,
    "location" TEXT,
    "deadline" TIMESTAMP(3),
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "employerId" INTEGER NOT NULL REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
