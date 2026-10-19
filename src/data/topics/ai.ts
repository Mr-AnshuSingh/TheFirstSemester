import { AI_UNIT_STORIES, AI_UNIT0_TOPICS } from './aiUnit0';
import { AI_UNIT1_TOPICS } from './aiUnit1';
import { AI_UNIT2_TOPICS } from './aiUnit2';
import { AI_UNIT3_TOPICS } from './aiUnit3';
import { AI_UNIT4_TOPICS } from './aiUnit4';
import { TopicContent } from '@/types/syllabus';

export { AI_UNIT_STORIES };

export const AI_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...AI_UNIT0_TOPICS,
  ...AI_UNIT1_TOPICS,
  ...AI_UNIT2_TOPICS,
  ...AI_UNIT3_TOPICS,
  ...AI_UNIT4_TOPICS,
};
