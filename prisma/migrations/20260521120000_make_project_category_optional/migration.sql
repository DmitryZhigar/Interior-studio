ALTER TABLE "Project" DROP CONSTRAINT "Project_categoryId_fkey";

ALTER TABLE "Project" ALTER COLUMN "categoryId" DROP NOT NULL;

ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
