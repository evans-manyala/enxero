-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountStatus" VARCHAR(20),
ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "deactivationReason" TEXT,
ADD COLUMN     "lastPasswordChange" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "passwordHistory" JSONB;

-- CreateIndex
CREATE INDEX "users_accountStatus_idx" ON "users"("accountStatus");

-- CreateIndex
CREATE INDEX "users_lastPasswordChange_idx" ON "users"("lastPasswordChange");
