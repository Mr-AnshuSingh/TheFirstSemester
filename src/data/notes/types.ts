export type QuickSubjectId = 'maths' | 'physics' | 'beee' | 'ai' | 'cfet' | 'uhv';

export interface QuickNoteDiagram {
  src: string;
  caption: string;
}

export interface QuickNoteChapter {
  id: string;
  number: string;
  title: string;
  markdown: string;
}

export interface QuickNoteUnit {
  id: string;
  subjectId: QuickSubjectId;
  subjectName: string;
  subjectCode: string;
  unitNumber: string;
  pillLabel: string;
  unitTitle: string;
  standardTitle: string;
  summary: string;
  diagrams: QuickNoteDiagram[];
  chapters: QuickNoteChapter[];
  fullMarkdown: string;
}

export interface QuickSubjectConfig {
  id: QuickSubjectId;
  shortLabel: string;
  name: string;
  code: string;
  accentColor: 'red' | 'teal' | 'gold' | 'ink';
  units: QuickNoteUnit[];
}
