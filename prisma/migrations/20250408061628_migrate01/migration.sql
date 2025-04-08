-- CreateTable
CREATE TABLE "CPU" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "socket" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "baseClock" DOUBLE PRECISION NOT NULL,
    "boostClock" DOUBLE PRECISION NOT NULL,
    "tdp" INTEGER NOT NULL,
    "supportedMemoryType" TEXT[],
    "maxMemorySpeed" INTEGER NOT NULL,
    "integratedGraphics" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3),
    "price" INTEGER NOT NULL,
    "recommendationScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "socket" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "formFactor" TEXT NOT NULL,
    "memoryType" TEXT[],
    "memorySlots" INTEGER NOT NULL,
    "maxMemorySpeed" INTEGER NOT NULL,
    "maxMemory" INTEGER NOT NULL,
    "pcie_x16" INTEGER NOT NULL,
    "pcie_x8" INTEGER NOT NULL,
    "pcie_x4" INTEGER NOT NULL,
    "pcie_x1" INTEGER NOT NULL,
    "sataConnectors" INTEGER NOT NULL,
    "m2Slots" INTEGER NOT NULL,
    "usb2" INTEGER NOT NULL,
    "usb3" INTEGER NOT NULL,
    "typeC" INTEGER NOT NULL,
    "wirelessNetworking" TEXT[],
    "imageUrl" TEXT,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3),
    "price" INTEGER NOT NULL,
    "recommendationScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentPrice" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT false,
    "shippingCost" INTEGER,
    "lastChecked" TIMESTAMP(3) NOT NULL,
    "cpuId" TEXT,
    "motherboardId" TEXT,
    "shopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "shippingCost" INTEGER,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "cpuId" TEXT,
    "motherboardId" TEXT,
    "shopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCBuild" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "totalPrice" INTEGER NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "compatibilityIssues" JSONB,
    "cpuId" TEXT,
    "motherboardId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PCBuild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CPU_manufacturer_idx" ON "CPU"("manufacturer");

-- CreateIndex
CREATE INDEX "CPU_socket_idx" ON "CPU"("socket");

-- CreateIndex
CREATE INDEX "CPU_recommendationScore_idx" ON "CPU"("recommendationScore");

-- CreateIndex
CREATE INDEX "CPU_price_idx" ON "CPU"("price");

-- CreateIndex
CREATE INDEX "Motherboard_manufacturer_idx" ON "Motherboard"("manufacturer");

-- CreateIndex
CREATE INDEX "Motherboard_socket_idx" ON "Motherboard"("socket");

-- CreateIndex
CREATE INDEX "Motherboard_chipset_idx" ON "Motherboard"("chipset");

-- CreateIndex
CREATE INDEX "Motherboard_formFactor_idx" ON "Motherboard"("formFactor");

-- CreateIndex
CREATE INDEX "Motherboard_recommendationScore_idx" ON "Motherboard"("recommendationScore");

-- CreateIndex
CREATE INDEX "Motherboard_price_idx" ON "Motherboard"("price");

-- CreateIndex
CREATE INDEX "Shop_name_idx" ON "Shop"("name");

-- CreateIndex
CREATE INDEX "Shop_isActive_priority_idx" ON "Shop"("isActive", "priority");

-- CreateIndex
CREATE INDEX "CurrentPrice_cpuId_idx" ON "CurrentPrice"("cpuId");

-- CreateIndex
CREATE INDEX "CurrentPrice_motherboardId_idx" ON "CurrentPrice"("motherboardId");

-- CreateIndex
CREATE INDEX "CurrentPrice_shopId_idx" ON "CurrentPrice"("shopId");

-- CreateIndex
CREATE INDEX "CurrentPrice_amount_idx" ON "CurrentPrice"("amount");

-- CreateIndex
CREATE INDEX "CurrentPrice_inStock_idx" ON "CurrentPrice"("inStock");

-- CreateIndex
CREATE INDEX "CurrentPrice_lastChecked_idx" ON "CurrentPrice"("lastChecked");

-- CreateIndex
CREATE INDEX "CurrentPrice_cpuId_shopId_idx" ON "CurrentPrice"("cpuId", "shopId");

-- CreateIndex
CREATE INDEX "CurrentPrice_motherboardId_shopId_idx" ON "CurrentPrice"("motherboardId", "shopId");

-- CreateIndex
CREATE INDEX "CurrentPrice_inStock_amount_idx" ON "CurrentPrice"("inStock", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "current_price_cpu_shop_unique" ON "CurrentPrice"("cpuId", "shopId");

-- CreateIndex
CREATE UNIQUE INDEX "current_price_motherboard_shop_unique" ON "CurrentPrice"("motherboardId", "shopId");

-- CreateIndex
CREATE INDEX "PriceHistory_cpuId_recordedAt_idx" ON "PriceHistory"("cpuId", "recordedAt");

-- CreateIndex
CREATE INDEX "PriceHistory_motherboardId_recordedAt_idx" ON "PriceHistory"("motherboardId", "recordedAt");

-- CreateIndex
CREATE INDEX "PriceHistory_shopId_recordedAt_idx" ON "PriceHistory"("shopId", "recordedAt");

-- CreateIndex
CREATE INDEX "PriceHistory_recordedAt_idx" ON "PriceHistory"("recordedAt");

-- CreateIndex
CREATE INDEX "PriceHistory_cpuId_shopId_recordedAt_idx" ON "PriceHistory"("cpuId", "shopId", "recordedAt");

-- CreateIndex
CREATE INDEX "PriceHistory_motherboardId_shopId_recordedAt_idx" ON "PriceHistory"("motherboardId", "shopId", "recordedAt");

-- CreateIndex
CREATE INDEX "PCBuild_createdAt_idx" ON "PCBuild"("createdAt");

-- CreateIndex
CREATE INDEX "PCBuild_lastAccessedAt_idx" ON "PCBuild"("lastAccessedAt");

-- CreateIndex
CREATE INDEX "PCBuild_expiresAt_idx" ON "PCBuild"("expiresAt");

-- AddForeignKey
ALTER TABLE "CurrentPrice" ADD CONSTRAINT "CurrentPrice_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "CPU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentPrice" ADD CONSTRAINT "CurrentPrice_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentPrice" ADD CONSTRAINT "CurrentPrice_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "CPU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCBuild" ADD CONSTRAINT "PCBuild_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "CPU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCBuild" ADD CONSTRAINT "PCBuild_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
