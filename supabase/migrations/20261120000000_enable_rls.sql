-- Migration: Enable Row Level Security (RLS) on all public tables
-- Fixes Supabase Security Advisor "Critical: RLS Disabled in Public"
-- Following Supabase Postgres Best Practices:
-- 1. Optimized subquery `(SELECT auth.uid())::text = "userId"` for cached, high-performance evaluation
-- 2. `TO authenticated` role specification (covers both email and anonymous users)
-- 3. Both USING and WITH CHECK clauses to prevent user ID tampering and unauthorized cross-student access

-- 1. Enable RLS on all 4 tables
ALTER TABLE "UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomNotes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FlashcardReview" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudySession" ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to ensure clean state
DROP POLICY IF EXISTS "Users can manage their own UserProgress" ON "UserProgress";
DROP POLICY IF EXISTS "Users can manage their own CustomNotes" ON "CustomNotes";
DROP POLICY IF EXISTS "Users can manage their own FlashcardReview" ON "FlashcardReview";
DROP POLICY IF EXISTS "Users can manage their own StudySession" ON "StudySession";

-- 3. UserProgress policy
CREATE POLICY "Users can manage their own UserProgress"
  ON "UserProgress"
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid())::text = "userId")
  WITH CHECK ((SELECT auth.uid())::text = "userId");

-- 4. CustomNotes policy
CREATE POLICY "Users can manage their own CustomNotes"
  ON "CustomNotes"
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid())::text = "userId")
  WITH CHECK ((SELECT auth.uid())::text = "userId");

-- 5. FlashcardReview policy
CREATE POLICY "Users can manage their own FlashcardReview"
  ON "FlashcardReview"
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid())::text = "userId")
  WITH CHECK ((SELECT auth.uid())::text = "userId");

-- 6. StudySession policy
CREATE POLICY "Users can manage their own StudySession"
  ON "StudySession"
  FOR ALL
  TO authenticated
  USING ((SELECT auth.uid())::text = "userId")
  WITH CHECK ((SELECT auth.uid())::text = "userId");
