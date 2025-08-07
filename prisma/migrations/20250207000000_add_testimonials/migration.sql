-- CreateTable
CREATE TABLE "public"."Testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "avatarUrl" TEXT,
    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
