import { PPS_UNIT_STORIES, PPS_UNIT0_TOPICS } from './ppsUnit0';
import { PPS_UNIT1_TOPICS } from './ppsUnit1';
import { PPS_UNIT2_TOPICS } from './ppsUnit2';
import { PPS_UNIT3_TOPICS } from './ppsUnit3';
import { PPS_UNIT4_TOPICS } from './ppsUnit4';
import { PPS_UNIT5_TOPICS } from './ppsUnit5';
import { TopicContent } from '@/types/syllabus';

export { PPS_UNIT_STORIES };

export const PPS_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...PPS_UNIT0_TOPICS,
  ...PPS_UNIT1_TOPICS,
  ...PPS_UNIT2_TOPICS,
  ...PPS_UNIT3_TOPICS,
  ...PPS_UNIT4_TOPICS,
  ...PPS_UNIT5_TOPICS,
};
