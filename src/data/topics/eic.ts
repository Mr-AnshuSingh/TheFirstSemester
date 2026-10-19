import { EIC_UNIT_STORIES, EIC_UNIT0_TOPICS } from './eicUnit0';
import { EIC_UNIT1_TOPICS } from './eicUnit1';
import { EIC_UNIT2_TOPICS } from './eicUnit2';
import { EIC_UNIT3_TOPICS } from './eicUnit3';
import { EIC_UNIT4_TOPICS } from './eicUnit4';
import { TopicContent } from '@/types/syllabus';

export { EIC_UNIT_STORIES };

export const EIC_TOPIC_CONTENT: Record<string, TopicContent> = {
  ...EIC_UNIT0_TOPICS,
  ...EIC_UNIT1_TOPICS,
  ...EIC_UNIT2_TOPICS,
  ...EIC_UNIT3_TOPICS,
  ...EIC_UNIT4_TOPICS,
};
