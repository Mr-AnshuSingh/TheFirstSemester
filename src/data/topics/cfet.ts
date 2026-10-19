import { CFET_UNIT_STORIES, CFET_UNIT0_TOPICS } from './cfetUnit0';
import { CFET_UNIT1_TOPICS } from './cfetUnit1';
import { CFET_UNIT2_TOPICS } from './cfetUnit2';
import { CFET_UNIT3_TOPICS } from './cfetUnit3';
import { CFET_UNIT4_TOPICS } from './cfetUnit4';
import { TopicContent } from '@/types/syllabus';

export { CFET_UNIT_STORIES };

export const CFET_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...CFET_UNIT0_TOPICS,
  ...CFET_UNIT1_TOPICS,
  ...CFET_UNIT2_TOPICS,
  ...CFET_UNIT3_TOPICS,
  ...CFET_UNIT4_TOPICS,
};
