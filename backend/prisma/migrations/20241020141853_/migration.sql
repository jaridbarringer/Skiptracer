-- CreateTable
CREATE TABLE "uploaded_csvs" (
    "id" SERIAL NOT NULL,
    "queue_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "uploaded_csvs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CsvsResults" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pending" BOOLEAN NOT NULL DEFAULT false,
    "download_url" TEXT,
    "rows_uploaded" INTEGER,
    "credits_deducted" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CsvsResults_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "uploaded_csvs" ADD CONSTRAINT "uploaded_csvs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CsvsResults" ADD CONSTRAINT "CsvsResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
