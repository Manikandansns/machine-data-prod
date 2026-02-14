-- CreateTable
CREATE TABLE "MachineData" (
    "id" TEXT NOT NULL,
    "temp" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "percentage" DOUBLE PRECISION,
    "voltage" DOUBLE PRECISION,
    "current" DOUBLE PRECISION,
    "power" DOUBLE PRECISION,
    "energy" DOUBLE PRECISION,
    "frequency" DOUBLE PRECISION,
    "pf" DOUBLE PRECISION,
    "plc_error_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineData_pkey" PRIMARY KEY ("id")
);
