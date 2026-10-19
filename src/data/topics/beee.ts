import { BEEE_UNIT_STORIES, BEEE_UNIT0_TOPICS } from './beeeUnit0';
import { BEEE_UNIT1_TOPICS } from './beeeUnit1';
import { BEEE_UNIT2_TOPICS } from './beeeUnit2';
import { BEEE_UNIT3_TOPICS } from './beeeUnit3';
import { BEEE_UNIT4_TOPICS } from './beeeUnit4';
import { BEEE_UNIT5_TOPICS } from './beeeUnit5';
import { TopicContent } from '@/types/syllabus';

export { BEEE_UNIT_STORIES };

export const BEEE_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...BEEE_UNIT0_TOPICS,
  ...BEEE_UNIT1_TOPICS,
  ...BEEE_UNIT2_TOPICS,
  ...BEEE_UNIT3_TOPICS,
  ...BEEE_UNIT4_TOPICS,
  ...BEEE_UNIT5_TOPICS,
};
