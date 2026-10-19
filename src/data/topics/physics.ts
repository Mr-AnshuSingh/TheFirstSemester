import { PHY_UNIT_STORIES, PHY_UNIT0_TOPICS } from './physicsUnit0';
import { PHY_UNIT1_TOPICS } from './physicsUnit1';
import { PHY_UNIT2_TOPICS } from './physicsUnit2';
import { PHY_UNIT3_TOPICS } from './physicsUnit3';
import { PHY_UNIT4_TOPICS } from './physicsUnit4';
import { PHY_UNIT5_TOPICS } from './physicsUnit5';
import { TopicContent } from '@/types/syllabus';

export { PHY_UNIT_STORIES };

export const PHY_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...PHY_UNIT0_TOPICS,
  ...PHY_UNIT1_TOPICS,
  ...PHY_UNIT2_TOPICS,
  ...PHY_UNIT3_TOPICS,
  ...PHY_UNIT4_TOPICS,
  ...PHY_UNIT5_TOPICS,
};
