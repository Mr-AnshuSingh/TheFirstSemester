import { MIDSEM_DATA } from '@/data/midsemNotes';
import { MIDSEM_MCQS } from '@/data/midsemMCQs';
import { MIDSEM_PRACTICE_QUESTIONS } from '@/data/midsemPracticeQues';
import { QUICK_NOTES_SUBJECTS } from '@/data/notes';
import { getDisplaySubjectShort, type MidsemMode } from './midsemTypes';

export interface MidsemSearchResult {
  id: string;
  kind: 'formula' | 'topic' | 'mcq' | 'practice' | 'handbook';
  subjectCode: string;
  subjectShort: string;
  unitNo: number;
  mode: MidsemMode;
  notesSubView?: 'cards' | 'handbook';
  topicAnchorId?: string;
  title: string;
  snippet: string;
}

interface IndexedEntry extends MidsemSearchResult {
  searchText: string;
}

let cachedIndex: IndexedEntry[] | null = null;

function buildIndex(): IndexedEntry[] {
  if (cachedIndex) return cachedIndex;
  const entries: IndexedEntry[] = [];

  for (const course of MIDSEM_DATA.courses) {
    const short = getDisplaySubjectShort(course.code, course.short);
    for (const unit of course.units) {
      unit.topics.forEach((top, tIdx) => {
        const anchorId = `topic-${course.code}-u${unit.unitNo}-${tIdx}`;
        if (top.keyFormula) {
          entries.push({
            id: `formula-${course.code}-${unit.unitNo}-${tIdx}`,
            kind: 'formula',
            subjectCode: course.code,
            subjectShort: short,
            unitNo: unit.unitNo,
            mode: 'notes',
            notesSubView: 'cards',
            topicAnchorId: anchorId,
            title: `${top.heading} — Formula Sheet`,
            snippet: top.keyFormula.replace(/\s+/g, ' ').slice(0, 110),
            searchText: `${short} unit ${unit.unitNo} ${top.heading} ${top.keyFormula}`.toLowerCase(),
          });
        }
        entries.push({
          id: `topic-${course.code}-${unit.unitNo}-${tIdx}`,
          kind: 'topic',
          subjectCode: course.code,
          subjectShort: short,
          unitNo: unit.unitNo,
          mode: 'notes',
          notesSubView: 'cards',
          topicAnchorId: anchorId,
          title: top.heading,
          snippet: top.plainExplanation.replace(/\s+/g, ' ').slice(0, 110),
          searchText: `${short} unit ${unit.unitNo} ${unit.title} ${top.heading} ${top.plainExplanation} ${top.examTip || ''}`.toLowerCase(),
        });
      });
    }
  }

  for (const mcq of MIDSEM_MCQS) {
    const short = getDisplaySubjectShort(mcq.courseCode, mcq.subject);
    entries.push({
      id: `mcq-${mcq.id}`,
      kind: 'mcq',
      subjectCode: mcq.courseCode,
      subjectShort: short,
      unitNo: mcq.unitNo,
      mode: 'mcq',
      topicAnchorId: mcq.id,
      title: `${mcq.topic}: ${mcq.q.slice(0, 72)}`,
      snippet: mcq.explanation.replace(/\s+/g, ' ').slice(0, 100),
      searchText: `${short} unit ${mcq.unitNo} ${mcq.topic} ${mcq.q} ${mcq.options.join(' ')} ${mcq.explanation}`.toLowerCase(),
    });
  }

  for (const pq of MIDSEM_PRACTICE_QUESTIONS) {
    const short = getDisplaySubjectShort(pq.courseCode, pq.subject);
    entries.push({
      id: `pq-${pq.id}`,
      kind: 'practice',
      subjectCode: pq.courseCode,
      subjectShort: short,
      unitNo: pq.unitNo,
      mode: 'practice',
      topicAnchorId: pq.id,
      title: pq.title,
      snippet: pq.question.replace(/\s+/g, ' ').slice(0, 100),
      searchText: `${short} unit ${pq.unitNo} ${pq.category} ${pq.title} ${pq.question}`.toLowerCase(),
    });
  }

  for (const qSub of QUICK_NOTES_SUBJECTS) {
    const short = getDisplaySubjectShort(qSub.code, qSub.shortLabel);
    for (const qUnit of qSub.units) {
      const unitNoNum = Number(qUnit.unitNumber) || 4;
      for (const ch of qUnit.chapters) {
        entries.push({
          id: `hb-${qUnit.id}-${ch.id}`,
          kind: 'handbook',
          subjectCode: qSub.code,
          subjectShort: short,
          unitNo: unitNoNum <= 3 ? unitNoNum : 0,
          mode: 'notes',
          notesSubView: 'handbook',
          topicAnchorId: `${qUnit.id}::${ch.id}`,
          title: `${qUnit.pillLabel} · ${ch.title}`,
          snippet: qUnit.summary,
          searchText: `${short} ${qUnit.unitTitle} ${ch.title} ${ch.markdown.slice(0, 800)}`.toLowerCase(),
        });
      }
    }
  }

  cachedIndex = entries;
  return cachedIndex;
}

export function searchMidsemContent(
  query: string,
  preferSubjectCode?: string,
  limit = 12
): MidsemSearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const idx = buildIndex();

  const scored: { item: IndexedEntry; score: number }[] = [];
  for (const item of idx) {
    if (!terms.every((t) => item.searchText.includes(t))) continue;
    let score = 0;
    if (item.subjectCode === preferSubjectCode) score += 50;
    if (item.title.toLowerCase().includes(q)) score += 30;
    if (item.kind === 'formula') score += 20;
    else if (item.kind === 'topic') score += 15;
    else if (item.kind === 'mcq') score += 10;
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ item }) => ({
    id: item.id,
    kind: item.kind,
    subjectCode: item.subjectCode,
    subjectShort: item.subjectShort,
    unitNo: item.unitNo,
    mode: item.mode,
    notesSubView: item.notesSubView,
    topicAnchorId: item.topicAnchorId,
    title: item.title,
    snippet: item.snippet,
  }));
}
