-- CreateTable
CREATE TABLE "LandOwners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LandOwners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandOwners_email_key" ON "LandOwners"("email");

-- AddForeignKey
ALTER TABLE "LandOwners" ADD CONSTRAINT "LandOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
