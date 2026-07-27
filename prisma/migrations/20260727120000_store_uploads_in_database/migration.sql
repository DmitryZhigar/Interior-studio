CREATE TABLE "Upload" (
  "id" SERIAL NOT NULL,
  "fileName" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "data" BYTEA NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Upload_fileName_key" ON "Upload"("fileName");
