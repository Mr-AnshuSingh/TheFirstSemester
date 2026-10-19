import { TopicContent } from '@/types/syllabus';

/* ---------- SVG Builder Helpers ---------- */
const S = (w: number, h: number, b: string) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" class="w-full h-auto">${b}</svg>`;
const L = (a: number, b: number, c: number, d: number, k = 'l') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}"/>`;
const escT = (s: string) =>
  String(s).replace(/&(?!(lt|gt|amp);)/g, '&amp;').replace(/</g, '&lt;');
const T = (x: number, y: number, s: string, k = 't', an = 'start') =>
  `<text x="${x}" y="${y}" class="${k}" text-anchor="${an}">${escT(s)}</text>`;
const P = (d: string, k = 'l', m = '') =>
  `<path d="${d}" class="${k}" ${m}/>`;
const C = (x: number, y: number, r: number, k = 'l') =>
  `<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`;
const R = (x: number, y: number, w: number, h: number, k = 'l') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${k}"/>`;
const LA = (a: number, b: number, c: number, d: number, k = 'a') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}" marker-end="url(#ar)"/>`;

/* ---------- PPS UNIT 3 TOPIC CONTENT (2 Topics) ---------- */
export const PPS_UNIT3_TOPICS: Record<string, TopicContent> = {
  'pps:3:0': {
    explain: [
      '`struct` and `union` are user-defined aggregate data types in C that encapsulate multiple heterogeneous data members.',
      'In a `struct`, every member variable has its own distinct address offset; the total struct size equals the sum of member sizes plus padding bytes for CPU word boundary alignment.',
      'In a `union`, all member variables share the exact same starting address offset (offset 0); only one member can be valid at any given instant, and total size equals the size of its largest member.',
      'Demonstrated via an Employee Payroll system (ID, Name, Basic, DA, HRA, Gross Salary) and memory layout comparison via `sizeof()`.',
    ],
    definition:
      'Structures and unions are aggregate data constructs: structures allocate disjoint memory space for all fields with alignment padding, whereas unions share a single overlapping memory allocation sized to the largest field.',
    formula: '\\text{sizeof(struct)} \\ge \\sum \\text{sizeof}(m_i) + \\text{padding}; \\quad \\text{sizeof(union)} = \\max(\\text{sizeof}(m_i))',
    steps: [
      'Structure Definition: `struct Employee { int id; char name[20]; float basic, da, hra, gross; };`.',
      'Field Access: Use dot operator `emp.basic` for structure variables, or arrow operator `ptr->basic` for structure pointers.',
      'Payroll Calculation: `gross = basic + (basic * da / 100) + (basic * hra / 100);`.',
      'Union Shared Memory: `union Data { int i; float f; char str[20]; };` occupies 20 bytes total.',
      'Data Overwrite Trap: Writing to `data.f` overwrites the raw bit pattern of `data.i`; attempting to read `data.i` subsequently yields garbled values.',
    ],
    examAnswer: [
      'Compare `struct` and `union` in a 4-point table (Memory allocation, Member access, Size calculation, Keywords).',
      'Write the complete C program for an Employee Payroll calculation using a structure.',
      'Explain structure padding and data alignment with a concrete memory diagram.',
      'Write code demonstrating that modifying one member in a union overwrites the others.',
    ],
    slip: 'Assuming `sizeof(union)` is the sum of all members, or attempting to use multiple union members simultaneously expecting them to retain distinct values.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'STRUCT VS UNION MEMORY LAYOUT', 'ta') +
          // Struct Memory Diagram (Top)
          T(20, 38, 'struct Employee (Disjoint Addresses, Size = Sum + Pad):', 'ta') +
          R(20, 46, 50, 32) +
          T(45, 66, 'id (4B)', 't', 'middle') +
          R(70, 46, 120, 32) +
          T(130, 66, 'name[20] (20B)', 't', 'middle') +
          R(190, 46, 60, 32) +
          T(220, 66, 'basic (4B)', 't', 'middle') +
          R(250, 46, 75, 32, 'fa') +
          T(287, 66, 'gross (4B)', 'ta', 'middle') +
          T(330, 66, '...', 't') +
          // Union Memory Diagram (Bottom)
          T(20, 106, 'union Data (Shared Address Offset 0, Size = Max Member):', 'ta') +
          R(20, 114, 250, 44, 'fa') +
          T(145, 129, 'Shared 20-Byte Block', 'ta', 'middle') +
          R(25, 137, 60, 16) +
          T(55, 149, 'int i (4B)', 't', 'middle') +
          R(90, 137, 60, 16) +
          T(120, 149, 'float f (4B)', 't', 'middle') +
          R(155, 137, 105, 16) +
          T(207, 149, 'char str[20] (20B)', 't', 'middle') +
          // Callout
          T(280, 132, 'Offset 0x00 for all', 'ta') +
          T(280, 148, 'Mutually exclusive', 't')
      ),
      caption:
        'Figure 3.0: Structures allocate independent memory per member with alignment padding; unions overlay all members at address offset zero.',
    },
  },

  'pps:3:1': {
    explain: [
      'File handling in C provides persistent non-volatile secondary storage so program data survives process termination.',
      'Files are accessed as buffered byte streams managed by an opaque `FILE*` handle declared in `<stdio.h>`.',
      'Core file stream operations include opening (`fopen`), writing (`fprintf`, `fputs`), reading (`fscanf`, `fgets`), and closing (`fclose`).',
      'Demonstrated through saving student records (Roll, Name, Marks), sequential retrieval, and substring keyword matching via `strstr()`.',
    ],
    definition:
      'File handling is the standard C library stream abstraction that interfaces with persistent secondary storage, providing buffered sequential and random-access record operations, error detection, and EOF termination.',
    formula: '\\text{Stream Lifecycle: } \\text{FILE* fp} = \\text{fopen}(path, mode) \\longrightarrow \\text{fprintf/fscanf} \\longrightarrow \\text{fclose}(fp)',
    steps: [
      'File Pointer & Modes: Declare `FILE *fp = fopen("students.txt", "w");`. Modes: `"w"` (overwrite/create), `"r"` (read), `"a"` (append).',
      'NULL Verification: Always verify `if (fp == NULL)` to prevent null-pointer dereferences if file opening fails.',
      'Formatted Persistence: `fprintf(fp, "%d %s %.2f\\n", roll, name, marks);` writes formatted text lines to disk cache.',
      'Stream Closure: `fclose(fp);` flushes pending buffer data to secondary storage and releases the file descriptor.',
      'Keyword Searching: Read lines sequentially using `fgets(line, sizeof(line), fp)` and check `if (strstr(line, keyword) != NULL)` to display matching records.',
    ],
    examAnswer: [
      'Detail the 6 fundamental file opening modes in C (`"r"`, `"w"`, `"a"`, `"r+"`, `"w+"`, `"a+"`).',
      'Write complete C code to save student records into a file and search for a student by name keyword.',
      'Explain the crucial role of `fclose()` in preventing data loss and file handle exhaustion.',
      'Differentiate between text file stream operations and binary file stream operations (`fprintf/fscanf` vs `fwrite/fread`).',
    ],
    slip: 'Looping with `while (!feof(fp))` causes the last record to be processed twice because the EOF flag is only set after a read operation attempts to read past the end of the file!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'C FILE STREAM LIFECYCLE & SEARCH', 'ta') +
          // Program RAM buffer
          R(20, 35, 95, 50) +
          T(67, 54, 'Program RAM', 'ta', 'middle') +
          T(67, 70, 'Student Record', 't', 'middle') +
          LA(115, 60, 155, 60, 'a') +
          T(135, 52, 'fprintf', 't', 'middle') +
          // File Stream Buffer
          R(155, 35, 90, 50, 'fa') +
          T(200, 54, 'FILE* Stream', 'ta', 'middle') +
          T(200, 70, 'Buffer in RAM', 't', 'middle') +
          LA(245, 60, 285, 60, 'a') +
          T(265, 52, 'fclose', 'ta', 'middle') +
          // Disk storage
          R(285, 35, 65, 50) +
          T(317, 54, 'Disk File', 't', 'middle') +
          T(317, 70, '.txt', 'ta', 'middle') +
          // Search pipeline on bottom
          L(20, 105, 340, 105, 'd') +
          T(20, 125, 'Keyword Search Pipeline:', 'ta') +
          R(20, 135, 85, 36) +
          T(62, 150, 'fgets(line)', 't', 'middle') +
          T(62, 162, 'reads one line', 't', 'middle') +
          LA(105, 153, 145, 153, 'a') +
          R(145, 135, 110, 36, 'fa') +
          T(200, 150, 'strstr(line, key)', 'ta', 'middle') +
          T(200, 162, 'substring search', 't', 'middle') +
          LA(255, 153, 290, 153, 'a') +
          R(290, 135, 60, 36) +
          T(320, 150, 'Match', 'ta', 'middle') +
          T(320, 162, 'Output', 't', 'middle')
      ),
      caption:
        'Figure 3.1: File I/O stream buffering lifecycle from RAM to disk and line-by-line keyword search pipeline with strstr().',
    },
  },
};
