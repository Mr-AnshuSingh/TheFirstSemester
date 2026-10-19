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

/* ---------- PPS UNIT 1 TOPIC CONTENT (3 Topics) ---------- */
export const PPS_UNIT1_TOPICS: Record<string, TopicContent> = {
  'pps:1:0': {
    explain: [
      'A 1-D array is a linear collection of elements of identical data type placed in contiguous physical memory locations.',
      'Linear search evaluates elements sequentially from index 0 to n-1 to identify target values or locate statistical extrema (minimum and maximum).',
      'The arithmetic average is calculated by accumulating a running total and performing floating-point division by array size n.',
    ],
    definition:
      'A 1-D array is a contiguous, fixed-size linear memory sequence accessed via zero-based integer index offsets, analyzed via linear search in $O(n)$ time to determine statistical extrema and arithmetic mean.',
    formula: '\\text{Address}(A[i]) = \\text{Base} + i \\times \\text{sizeof}(T), \\quad \\text{Average} = \\frac{1}{n}\\sum_{i=0}^{n-1} A[i]',
    steps: [
      'Array Allocation: `int arr[n];` allocates $n \\times 4$ contiguous bytes in stack memory.',
      'Extremum Initialization: Set `min = arr[0]`, `max = arr[0]`, and `sum = 0`. Never initialize to arbitrary constants.',
      'Single-Pass Traversal: Loop `for (int i = 0; i < n; i++)`: update `min = (arr[i] < min) ? arr[i] : min`, update `max = (arr[i] > max) ? arr[i] : max`, and add `sum += arr[i]`.',
      'Floating Average: Cast total to float before division: `float avg = (float)sum / n;`.',
      'Boundary Safety: Ensure iteration boundaries strictly satisfy $0 \\le i < n$ to avoid undefined out-of-bounds memory access.',
    ],
    examAnswer: [
      'Write the formula for calculating the physical address of element A[i] given base address and element byte size.',
      'Write the complete C code to determine min, max, and average of an array in a single traversal.',
      'State the best-case, worst-case, and average-case time complexities of linear search ($O(1)$, $O(n)$, $O(n)$).',
      'Explain the catastrophic risks of buffer overflows resulting from array out-of-bounds indexing in C.',
    ],
    slip: 'Never initialize `min = 0` or `max = 0`; if the array contains all negative numbers (e.g. [-10, -25, -5]), initializing `max = 0` produces a false maximum of 0!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, '1-D ARRAY LINEAR SEARCH & MEMORY', 'ta') +
          // Contiguous memory blocks
          R(20, 45, 55, 36) +
          T(47, 68, '14', 't', 'middle') +
          T(47, 38, 'arr[0]', 't', 'middle') +
          R(75, 45, 55, 36) +
          T(102, 68, '-3', 't', 'middle') +
          T(102, 38, 'arr[1]', 't', 'middle') +
          R(130, 45, 55, 36, 'fa') +
          T(157, 68, '42', 'ta', 'middle') +
          T(157, 38, 'arr[2]', 'ta', 'middle') +
          R(185, 45, 55, 36) +
          T(212, 68, '9', 't', 'middle') +
          T(212, 38, 'arr[3]', 't', 'middle') +
          R(240, 45, 55, 36, 'fa') +
          T(267, 68, '-12', 'ta', 'middle') +
          T(267, 38, 'arr[4]', 'ta', 'middle') +
          // Addresses
          T(47, 95, '0x1000', 't', 'middle') +
          T(102, 95, '0x1004', 't', 'middle') +
          T(157, 95, '0x1008', 't', 'middle') +
          T(212, 95, '0x100C', 't', 'middle') +
          T(267, 95, '0x1010', 't', 'middle') +
          // Extrema pointers
          LA(157, 135, 157, 85, 'a') +
          T(157, 148, 'MAX = 42', 'ta', 'middle') +
          LA(267, 135, 267, 85, 'a') +
          T(267, 148, 'MIN = -12', 'ta', 'middle') +
          // Summary box on right
          R(20, 160, 320, 24) +
          T(180, 176, 'Sum = 50  ·  n = 5  ·  Average = (float)50 / 5 = 10.00', 't', 'middle')
      ),
      caption:
        'Figure 1.0: Contiguous 4-byte address spacing for 1-D array with single-pass maximum and minimum detection.',
    },
  },

  'pps:1:1': {
    explain: [
      'A 2-D array models mathematical matrices stored in row-major order in flat memory, where entire rows are stored one after another.',
      'Matrix transposition reflects elements across the principal diagonal, exchanging row index $i$ and column index $j$: $B[j][i] = A[i][j]$.',
      'Matrix multiplication $C = A \\times B$ computes each element $C[i][j]$ as the dot product of row $i$ of matrix $A$ and column $j$ of matrix $B$, requiring three nested loops.',
    ],
    definition:
      'A 2-D array is a two-dimensional grid of homogeneous elements flattened in row-major memory order, foundational for matrix transformations, transposition, and $O(mnp)$ dot-product matrix multiplication.',
    formula: 'C[i][j] = \\sum_{k=0}^{n-1} A[i][k] \\times B[k][j], \\quad \\text{Transpose: } T[j][i] = A[i][j]',
    steps: [
      'Dimension Compatibility: For $A_{r_1 \\times c_1} \\times B_{r_2 \\times c_2}$, multiplication is valid if and only if $c_1 == r_2$. Result dimension is $r_1 \\times c_2$.',
      'Zero Initialization: Initialize all cells of result matrix $C$ to 0 before accumulating sums.',
      'Three Nested Loops: Outer loop `i` traverses rows of $A$ ($0 \\dots r_1 - 1$), middle loop `j` traverses columns of $B$ ($0 \\dots c_2 - 1$), inner loop `k` computes dot product `C[i][j] += A[i][k] * B[k][j]`.',
      'Transposition Algorithm: For matrix $M_{r \\times c}$, create $T_{c \\times r}$ and execute `T[j][i] = M[i][j]` over double loop.',
      'Time Complexity: Matrix multiplication requires $O(r_1 \\times c_1 \\times c_2)$ multiplications; for square $N \\times N$ matrices, time complexity is $O(N^3)$.',
    ],
    examAnswer: [
      'State the algebraic condition required for two matrices to be multiplied.',
      'Write the complete C program to perform matrix multiplication with dimension validation.',
      'Write the C code to find the transpose of a non-square matrix $M_{m \\times n}$.',
      'Explain row-major memory mapping and calculate the address of $A[i][j]$ in terms of Base, number of columns $C$, and element size $S$.',
    ],
    slip: 'Forgetting to initialize `C[i][j] = 0` before the `k` accumulation loop, which causes dot products to accumulate on top of random stack garbage memory!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'MATRIX MULTIPLICATION & TRANSPOSE', 'ta') +
          // Matrix A Row i
          R(20, 40, 75, 45) +
          T(57, 56, 'Matrix A', 't', 'middle') +
          R(20, 62, 75, 18, 'fa') +
          T(57, 75, 'Row i', 'ta', 'middle') +
          T(102, 65, '×', 'ta', 'middle') +
          // Matrix B Col j
          R(115, 40, 75, 45) +
          T(152, 56, 'Matrix B', 't', 'middle') +
          R(140, 40, 25, 45, 'fa') +
          T(152, 75, 'Col j', 'ta', 'middle') +
          LA(195, 62, 220, 62, 'a') +
          // Matrix C cell (i, j)
          R(225, 40, 75, 45) +
          T(262, 56, 'Matrix C', 't', 'middle') +
          R(250, 62, 22, 18, 'fa') +
          T(261, 75, 'C[i][j]', 'ta', 'middle') +
          // Transpose illustration on bottom
          L(20, 105, 340, 105, 'd') +
          T(20, 125, 'Matrix Transpose:', 'ta') +
          R(20, 135, 95, 38) +
          T(67, 152, 'A[i][j]  (r × c)', 't', 'middle') +
          LA(120, 154, 160, 154, 'a') +
          T(140, 144, 'Swap i,j', 'ta', 'middle') +
          R(165, 135, 95, 38, 'fa') +
          T(212, 152, 'T[j][i]  (c × r)', 'ta', 'middle') +
          T(275, 152, 'B[j][i] = A[i][j]', 't')
      ),
      caption:
        'Figure 1.1: Dot-product row-by-column matrix multiplication (top) and index transposition (bottom).',
    },
  },

  'pps:1:2': {
    explain: [
      'In C, a string is an array of characters terminated by the sentinel byte `\'\\0\'` (ASCII zero).',
      'A pointer is a variable holding a memory address; pointer arithmetic increments or decrements addresses in strides of `sizeof(type)`.',
      'In-place string reversal uses two pointers starting at opposite ends and swapping inwards until they meet in the middle.',
      'Vowel and consonant classification scans each character with a pointer, normalizing case with `tolower()`.',
    ],
    definition:
      'Pointer arithmetic is the direct algebraic manipulation of memory addresses scaled by data-type widths, enabling efficient in-place traversal, character classification, and $O(n)$ two-pointer reversal of null-terminated strings.',
    formula: 'p + i = \\text{Address}(s[0]) + i \\times \\text{sizeof}(\\text{char}); \\quad *left \\longleftrightarrow *right \\quad (\\text{In-place Swap})',
    steps: [
      'Null Sentinel: Strings in C have no length metadata; the length is discovered by traversing until `*ptr == \'\\0\'`.',
      'Pointer Initialization: Set `left = str` and `right = str + strlen(str) - 1`.',
      'Two-Pointer Reversal: While `left < right`: `char temp = *left; *left = *right; *right = temp; left++; right--;`.',
      'Character Classification: Walk pointer `p` from `str`: if `isalpha(*p)` is true, check if `*p` is one of `a, e, i, o, u` to increment vowel count; otherwise increment consonant count.',
      'Pointer vs Array Notation: `*(str + i)` is syntactically and semantically identical to `str[i]`.',
    ],
    examAnswer: [
      'Explain the purpose and memory representation of the null character `\'\\0\'` in C strings.',
      'Write the complete C function to reverse a string in-place using two pointers without `string.h`.',
      'Write complete C code to count vowels and consonants using pointer arithmetic.',
      'Explain the crucial difference between `char str[] = "hello";` (mutable array on stack) and `char *str = "hello";` (pointer to read-only string literal in .rodata).',
    ],
    slip: 'Setting `right = str + strlen(str)` swaps the null-terminator `\'\\0\'` to index 0, making the string appear completely empty when printed!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'TWO-POINTER STRING REVERSAL IN MEMORY', 'ta') +
          // Character cells
          R(30, 45, 45, 36) +
          T(52, 68, '\'H\'', 't', 'middle') +
          R(75, 45, 45, 36) +
          T(97, 68, '\'E\'', 't', 'middle') +
          R(120, 45, 45, 36) +
          T(142, 68, '\'L\'', 't', 'middle') +
          R(165, 45, 45, 36) +
          T(187, 68, '\'L\'', 't', 'middle') +
          R(210, 45, 45, 36) +
          T(232, 68, '\'O\'', 't', 'middle') +
          R(255, 45, 45, 36, 'fa') +
          T(277, 68, '\'\\0\'', 'ta', 'middle') +
          // Pointers
          LA(52, 115, 52, 85, 'a') +
          T(52, 128, '*left', 'ta', 'middle') +
          LA(232, 115, 232, 85, 'a') +
          T(232, 128, '*right', 'ta', 'middle') +
          // Swap Arc
          P('M 52 42 C 52 15, 232 15, 232 42', 'a') +
          T(142, 22, 'swap(*left, *right)', 'ta', 'middle') +
          // Inward movement indicators
          LA(65, 125, 85, 125, 'a') +
          LA(220, 125, 200, 125, 'a') +
          // Null callout
          T(277, 100, 'Sentinel', 'ta', 'middle') +
          T(277, 112, '(Do NOT swap)', 't', 'middle') +
          // Bottom formula
          R(30, 150, 300, 24) +
          T(180, 166, 'while (left < right) { swap; left++; right--; }', 't', 'middle')
      ),
      caption:
        'Figure 1.2: Two-pointer in-place string reversal with left and right pointers advancing inward until convergence.',
    },
  },
};
