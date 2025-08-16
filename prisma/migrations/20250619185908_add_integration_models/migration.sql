-- CreateTable
CREATE TABLE "integration" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "config" JSONB NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_log" (
    "id" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integration_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "integration_companyId_idx" ON "integration"("companyId");

-- CreateIndex
CREATE INDEX "integration_type_idx" ON "integration"("type");

-- CreateIndex
CREATE INDEX "integration_status_idx" ON "integration"("status");

-- CreateIndex
CREATE INDEX "integration_createdAt_idx" ON "integration"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "integration_name_companyId_key" ON "integration"("name", "companyId");

-- CreateIndex
CREATE INDEX "integration_log_integrationId_idx" ON "integration_log"("integrationId");

-- CreateIndex
CREATE INDEX "integration_log_type_idx" ON "integration_log"("type");

-- CreateIndex
CREATE INDEX "integration_log_status_idx" ON "integration_log"("status");

-- CreateIndex
CREATE INDEX "integration_log_createdAt_idx" ON "integration_log"("createdAt");

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration_log" ADD CONSTRAINT "integration_log_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
