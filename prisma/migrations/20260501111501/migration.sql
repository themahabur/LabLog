/*
  Warnings:

  - The values [Student,Admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "usage_log" ADD CONSTRAINT "usage_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
