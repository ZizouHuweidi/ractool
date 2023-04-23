-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('present', 'late', 'absent');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'absent';

-- CreateIndex
CREATE INDEX "member_id_idx" ON "Attendance"("memberId");

-- CreateIndex
CREATE INDEX "activity_id_idx" ON "Attendance"("activityId");
