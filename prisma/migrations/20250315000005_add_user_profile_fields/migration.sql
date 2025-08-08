-- Add missing optional profile fields to User
ALTER TABLE "public"."User" ADD COLUMN "phone" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "location" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "bio" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "expertise" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "payment" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "taxId" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "portfolio" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "title" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "resume" TEXT;
ALTER TABLE "public"."User" ADD COLUMN "coverLetter" TEXT;

