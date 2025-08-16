-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "language" VARCHAR(10),
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "timezone" VARCHAR(50);
