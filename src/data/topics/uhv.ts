import { UHV_UNIT_STORIES, UHV_UNIT0_TOPICS } from './uhvUnit0';
import { UHV_UNIT1_TOPICS } from './uhvUnit1';
import { UHV_UNIT2_TOPICS } from './uhvUnit2';
import { UHV_UNIT3_TOPICS } from './uhvUnit3';
import { UHV_UNIT4_TOPICS } from './uhvUnit4';
import { TopicContent } from '@/types/syllabus';

export { UHV_UNIT_STORIES };

export const UHV_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...UHV_UNIT0_TOPICS,
  ...UHV_UNIT1_TOPICS,
  ...UHV_UNIT2_TOPICS,
  ...UHV_UNIT3_TOPICS,
  ...UHV_UNIT4_TOPICS,
};
