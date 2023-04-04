/*
  Warnings:

  - You are about to drop the column `activityid` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the `_AttendanceToMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[memberId,activityId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_activityid_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToMember" DROP CONSTRAINT "_AttendanceToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToMember" DROP CONSTRAINT "_AttendanceToMember_B_fkey";

-- DropIndex
DROP INDEX "Attendance_activityid_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "activityid",
ADD COLUMN     "activityId" INTEGER NOT NULL,
ADD COLUMN     "attended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "memberId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AttendanceToMember";

-- CreateIndex
CREATE INDEX "member_id_idx" ON "Attendance"("memberId");

-- CreateIndex
CREATE INDEX "activity_id_idx" ON "Attendance"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_memberId_activityId_key" ON "Attendance"("memberId", "activityId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
