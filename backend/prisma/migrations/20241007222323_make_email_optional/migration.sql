-- DropIndex
DROP INDEX "LandOwners_email_key";

-- AlterTable
ALTER TABLE "LandOwners" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "cityState" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;